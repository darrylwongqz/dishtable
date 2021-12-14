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
import { Listbox, Popover } from "@headlessui/react";
import { useEffect, useState, useRef } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Calendar } from "react-date-range";
import { format } from "date-fns";
import { costConverter } from "../../lib/cardUtils";

const RestaurantDetailPage = ({ restaurantDetails }) => {
  const router = useRouter();
  const [guestCount, setGuestCount] = useState(1);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [timeList, setTimeList] = useState([]);
  const calendarRef = useRef(null);

  console.log(router.query.restaurantId);

  console.log(restaurantDetails);
  // console.log(availableTimes);

  const {
    restaurant_name,
    restaurant_description,
    restaurant_location_address,
    restaurant_location_city,
    restaurant_location_country,
    restaurant_location_lat,
    restaurant_location_long,
    restaurant_image,
    restaurant_opening_hours,
    restaurant_facilities,
    restaurant_cuisine,
    restaurant_cost,
    restaurant_start_date,
    restaurant_end_date,
    restaurant_start_time,
    restaurant_end_time,
    restaurant_average_seating_time,
    restaurant_max_table_one,
    restaurant_max_table_two,
    restaurant_max_table_three,
    restaurant_max_table_four,
    restaurant_max_table_five,
  } = restaurantDetails;

  const convertedCost = costConverter(restaurant_cost);

  useEffect(() => {
    if (date) {
      const getAvailableTimes = async () => {
        const response = await axios.get(
          `https://api-dishtable-supa.herokuapp.com/api/reservations/time-list?partySize=${guestCount}&listDate=${date}&restaurantId=${Number(
            router.query.restaurantId
          )}`
        );

        const availableTimes = response.data;

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
    console.log("prevDate value", prevDate);
  }, [date]);

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
    if (date !== "" || (prevDate !== "" && prevDate === date)) {
      calendarRef.current.click();
    }
  };

  // const handleCalendarClick = () => {
  //   // console.log(calendarRef.current);
  //   // console.log("handleCalendarClick fired");
  //   if (prevDate !== "" && prevDate === date) {
  //     console.log("passed the click test");
  //     calendarRef.current.click();
  //   }
  // };

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

        {/* booking tab sticky */}

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

            <Listbox
              as="div"
              value={date}
              onChange={setDate}
              className="relative p-4 border border-gray-400"
            >
              {/* {({ open }) => ( */}
              <>
                <Listbox.Button as="div">
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
                </Listbox.Button>
                <Listbox.Options
                  className="absolute right-0 z-50 bg-white border border-gray-400"
                  // onClick={handleCalendarClick}
                >
                  <Calendar
                    date={new Date()}
                    minDate={new Date()}
                    color="#FD5B61"
                    onChange={handleCalendarSelect}
                  />
                </Listbox.Options>
              </>
              {/* )} */}
            </Listbox>

            {/* Time Picker button */}
            {date && (
              <Listbox
                as="div"
                value={time}
                onChange={setTime}
                className="relative p-4 border border-gray-400"
              >
                <Listbox.Button as="div">
                  <div className="flex items-center justify-between ">
                    <p
                      className={`flex flex-grow cursor-pointer ${
                        !date && "text-gray-400"
                      }`}
                    >
                      {!time ? "Choose time" : time}
                    </p>
                    <ChevronDownIcon className="justify-end w-7" />
                  </div>
                </Listbox.Button>
                <Listbox.Options className="">
                  <div className="absolute right-0 flex flex-col p-2 space-y-2 bg-white w-80">
                    {timeList.map((timeslot) => (
                      <Listbox.Option
                        className="p-2 bg-gray-300"
                        onClick={() => setTime(timeslot)}
                      >
                        {timeslot}
                      </Listbox.Option>
                    ))}
                  </div>
                </Listbox.Options>
              </Listbox>
            )}
            <button
              onClick={() => getAvailableDates()}
              className="px-5 py-2 text-white bg-red-600 rounded-full shadow-md"
            >
              Book Now
            </button>
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
