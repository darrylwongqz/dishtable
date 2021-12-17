import axios from "axios";
import { useRouter } from "next/router";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar/NavBar";
import Image from "next/image";
import {
  PlusCircleIcon,
  MinusCircleIcon,
  ChevronDownIcon,
} from "@heroicons/react/solid";
import { Popover } from "@headlessui/react";
import { useEffect, useState, useRef } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Calendar } from "react-date-range";
import { format } from "date-fns";
import { costConverter } from "../../lib/cardUtils";
import { ChevronDoubleUpIcon } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";

const RestaurantDetailPage = ({ restaurantDetails }) => {
  const router = useRouter();
  const [guestCount, setGuestCount] = useState(1);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [timeList, setTimeList] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState(null);
  const calendarRef = useRef(null);
  const timePickerRef = useRef(null);
  const { data: session } = useSession();

  // console.log("current user session", session);

  // console.log(router.query.restaurantId);

  // console.log("component rendered", restaurantDetails);
  // console.log(availableTimes);

  const {
    restaurant_name,
    restaurant_description,
    restaurant_location_address,
    restaurant_location_city,
    restaurant_location_country,
    restaurant_image,
    restaurant_opening_hours,
    restaurant_facilities,
    restaurant_cuisine,
    restaurant_cost,
    restaurant_average_seating_time,
  } = restaurantDetails;

  const convertedCost = costConverter(restaurant_cost);

  useEffect(() => {
    if (date) {
      const getAvailableTimes = async () => {
        console.log("getAvailableTimes fired");
        const response = await axios.get(
          `https://api-dishtable-supa.herokuapp.com/api/reservations/time-list?partySize=${guestCount}&listDate=${date}&restaurantId=${Number(
            router.query.restaurantId
          )}`
        );

        const availableTimes = response.data;
        // console.log(availableTimes);

        setTimeList(availableTimes);
      };

      getAvailableTimes();
    }
  }, [date]);

  let prevDate = "";

  useEffect(() => {
    if (date !== "" && prevDate !== date) {
      prevDate = date;
    }
    // console.log("prevDate value", prevDate);
  }, [date]);

  let prevTime = "";

  useEffect(() => {
    if (time !== "" && prevTime !== time) {
      prevTime = time;
    }
    // console.log("prevDate value", prevDate);
  }, [time]);

  const incrementGuestCount = () => {
    if (guestCount < 5) {
      setGuestCount(guestCount + 1);
    }
    return;
  };

  const decrementGuestCount = () => {
    if (guestCount > 1) {
      setGuestCount(guestCount - 1);
    }
    return;
  };

  const handleCalendarSelect = (selectedDate) => {
    const selectedDay = selectedDate.getDate();
    const selectedMonth = selectedDate.getMonth();
    const selectedYear = selectedDate.getFullYear();
    const formattedSelectedDate = format(
      new Date(selectedYear, selectedMonth, selectedDay),
      "dd-MM-yyyy"
    );
    setDate(formattedSelectedDate);
  };

  const handleCalendarClick = () => {
    // console.log(calendarRef.current);
    if (prevDate !== "" && prevDate === date) {
      calendarRef.current.click();
    }
  };

  const handleTimeSelectorClick = () => {
    if (time !== "" && prevTime === time) {
      timePickerRef.current.click();
    }
  };

  const handleBookingSubmit = async () => {
    console.log("handleBookingSubmit fired");
    setIsSubmitting(true);
    setBookingError(null);
    // send post request to booking endpoint then once response ok setIsSubmitting(false)
    try {
      const response = await axios.post(
        "https://api-dishtable-supa.herokuapp.com/api/v2/reservations/book",
        {
          party_size: guestCount,
          date,
          time,
          restaurant_id: Number(router.query.restaurantId),
        },
        {
          headers: {
            Authorization: "Bearer " + session.token,
          },
        }
      );

      console.log(response);

      if (response.status === 200 || response.statusText === "OK") {
        setIsSubmitting(false);
        router.push("/");
      }
    } catch (err) {
      setIsSubmitting(false);
      // console.log(err);
      setBookingError(
        "Uh oh! Your slot has been snapped up, please try another date-time combination"
      );
    }
  };

  return (
    <>
      <NavBar />
      <main className="grid grid-cols-3 mx-auto mb-10 mt-28 max-w-7xl">
        {/* Header Image */}
        <section className="relative col-span-3  h-[550px]">
          <Image
            src={restaurant_image[0] || `/images/heroimg.jpg`}
            layout="fill"
            objectFit="cover"
            className=""
          />
        </section>

        {/* Main detail section */}

        <section className="relative col-span-2 p-3 px-5 ">
          <div className="flex items-center justify-between mt-10">
            <h1 className="text-2xl font-bold ">{restaurant_name}</h1>
            <p>{convertedCost}</p>
          </div>

          <p className="font-semibold">
            <span className="italic">{`${restaurant_location_country}${
              restaurant_location_country !== restaurant_location_city
                ? ", " + restaurant_location_city
                : ""
            }`}</span>{" "}
            - {restaurant_cuisine[0]} - {restaurant_cuisine[1]}
          </p>
          <p>{restaurant_location_address}</p>
          <p>{restaurant_opening_hours}</p>
          <p className="mt-5">{restaurant_description}</p>

          <div className="mt-5">
            <h2 className="text-lg font-bold">Restaurant Facilities:</h2>

            {restaurant_facilities.map((facility) => (
              <p>{facility}</p>
            ))}
          </div>
        </section>

        {/* booking tab */}

        <section className="relative col-span-1 p-3 mt-10">
          {/* Guest Button */}

          <div className="flex flex-col p-5 space-y-3 border border-gray-100 rounded-lg shadow-lg">
            <div className="flex items-center justify-between px-5 py-2 border border-gray-400">
              <p>
                {guestCount} {guestCount === 1 ? `guest` : `guests`}
              </p>
              <div className="flex space-x-1">
                <MinusCircleIcon
                  onClick={decrementGuestCount}
                  className={`w-10 h-10 ${
                    guestCount === 1
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-600 cursor-pointer"
                  } `}
                />
                <PlusCircleIcon
                  onClick={incrementGuestCount}
                  className={`w-10 h-10 ${
                    guestCount === 5
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-600 cursor-pointer"
                  } `}
                />
              </div>
            </div>

            {/* Date picker button */}

            <Popover as="div" className="relative p-4 border border-gray-400">
              {/* {({ open }) => ( */}
              <>
                <Popover.Button as="div">
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    ref={calendarRef}
                  >
                    <p
                      className={`flex flex-grow  ${!date && "text-gray-400"}`}
                    >
                      {!date ? `Add date` : date}
                    </p>
                    <ChevronDownIcon className="justify-end w-7" />
                  </div>
                </Popover.Button>
                <Popover.Panel
                  className="absolute right-0 z-50 bg-white border border-gray-400"
                  onClick={handleCalendarClick}
                >
                  <Calendar
                    date={new Date()}
                    minDate={new Date()}
                    color="#FD5B61"
                    onChange={handleCalendarSelect}
                  />
                </Popover.Panel>
              </>
              {/* )} */}
            </Popover>

            {/* Time Picker button */}
            {date && (
              <Popover
                as="div"
                value={time}
                onChange={setTime}
                className="relative p-4 border border-gray-400"
              >
                <Popover.Button as="div">
                  <div
                    className="flex items-center justify-between "
                    ref={timePickerRef}
                  >
                    <p
                      className={`flex flex-grow cursor-pointer ${
                        !date && "text-gray-400"
                      }`}
                    >
                      {!time ? "Choose time" : time}
                    </p>
                    <ChevronDownIcon className="justify-end w-7" />
                  </div>
                </Popover.Button>
                <Popover.Panel className="">
                  <div className="absolute right-0 z-50 flex flex-col w-full p-2 space-y-2 overflow-scroll bg-gray-100 border border-gray-100 shadow-2xl rounded-xl scrollbar-hide h-28">
                    {timeList.map((timeslot) => (
                      <p
                        className="p-2 bg-white rounded-full shadow-md cursor-pointer hover:bg-gray-50"
                        onClick={() => {
                          setTime(timeslot);
                          handleTimeSelectorClick();
                        }}
                      >
                        {timeslot}
                      </p>
                    ))}
                  </div>
                </Popover.Panel>
              </Popover>
            )}
            {session?.user ? (
              <div>
                {date !== "" && time !== "" ? (
                  <button
                    onClick={handleBookingSubmit}
                    disabled={isSubmitting}
                    className={`w-full px-5 py-2 text-white  ${
                      isSubmitting
                        ? "bg-red-400 cursor-not-allowed"
                        : "bg-red-600 active:scale-90 transition duration-300 transform"
                    } rounded-full shadow-md `}
                  >
                    {isSubmitting ? "Submitting Booking..." : "Book Now"}
                  </button>
                ) : (
                  <div className="flex items-center justify-center px-5 py-2 space-x-2 text-white bg-red-600 rounded-full shadow-md animate-pulse">
                    <ChevronDoubleUpIcon className="h-6" />
                    <p>Choose booking criteria</p>
                    <ChevronDoubleUpIcon className="h-6" />
                  </div>
                )}
                <div className="mt-2 text-center text-red-600">
                  {bookingError && bookingError}
                </div>
              </div>
            ) : (
              <button
                onClick={() => router.push("/login")}
                className="flex items-center justify-center px-5 py-2 space-x-2 text-white bg-red-600 rounded-full shadow-md animate-pulse"
              >
                <p>Sign in to book</p>
              </button>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default RestaurantDetailPage;

// dummy data at https://jsonkeeper.com/b/89VC

export const getServerSideProps = async (context) => {
  // const restaurantDetails = (await axios("https://jsonkeeper.com/b/89VC")).data;
  const { restaurantId } = context.query;
  const restaurantDetails = (
    await axios.get(
      `https://api-dishtable-supa.herokuapp.com/api/restaurants/${restaurantId}`
    )
  ).data;

  return {
    props: {
      restaurantDetails,
    },
  };
};
