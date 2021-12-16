import { useRouter } from "next/router";
import { useSession, getSession } from "next-auth/react";
import NavBar from "../../../../components/NavBar/NavBar";
import Sidebar from "../../../../components/UserDashboard/Sidebar";
import axios from "axios";
import { useEffect, useState } from "react";
import Footer from "../../../../components/Footer";
import Image from "next/image";
import {
  PlusCircleIcon,
  MinusCircleIcon,
  ChevronDoubleUpIcon,
} from "@heroicons/react/solid";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Calendar } from "react-date-range";
import { format } from "date-fns";

const ReservationDetails = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [bookingDetails, setBookingDetails] = useState({});
  const [restaurantDetails, setRestaurantDetails] = useState({});
  const [guestCount, setGuestCount] = useState(1);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [timeList, setTimeList] = useState([]);

  // console.log("current user logged in", session);
  const { email, id, first_name, last_name, profile_picture } = session?.user;

  // console.log(session.token);

  // console.log(router);
  // console.log(router.query.reservationId);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      const response = await axios.get(
        `https://api-dishtable-supa.herokuapp.com/api/reservations/${router.query.reservationId}/edit`,
        {
          headers: {
            Authorization: "Bearer " + session.token,
          },
        }
      );

      const restaurantId = response.data.restaurant_id;
      setBookingDetails(response.data);
      setGuestCount(response.data.party_size);

      const fetchedRestaurantDetails = (
        await axios.get(
          `https://api-dishtable-supa.herokuapp.com/api/restaurants/${restaurantId}`
        )
      ).data;

      setRestaurantDetails(fetchedRestaurantDetails);
    };

    fetchBookingDetails();
  }, []);

  console.log("fetched booking details", bookingDetails);
  console.log("fetched resto details", restaurantDetails);

  useEffect(() => {
    if (date) {
      const getAvailableTimes = async () => {
        console.log("getAvailableTimes fired");
        const response = await axios.get(
          `https://api-dishtable-supa.herokuapp.com/api/reservations/time-list?partySize=${guestCount}&listDate=${date}&restaurantId=${Number(
            bookingDetails.restaurant_id
          )}`
        );

        const availableTimes = response.data;
        // console.log(availableTimes);

        setTimeList(availableTimes);
      };

      getAvailableTimes();
    }
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
  };

  const handleEditClicked = async () => {
    console.log(
      guestCount,
      date,
      time,
      bookingDetails.restaurant_id,
      session.token
    );

    try {
      const response = await axios.patch(
        `https://api-dishtable-supa.herokuapp.com/api/v2/reservations/${router.query.reservationId}`,
        {
          party_size: guestCount,
          date,
          time,
          restaurant_id: Number(bookingDetails.restaurant_id),
        },
        {
          headers: {
            Authorization: "Bearer " + session.token,
          },
        }
      );

      if (response.status === 200 || response.statusText === "OK") {
        router.push(`/user/${id}/upcoming-bookings`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <NavBar />
      <main className="grid grid-cols-4 overflow-hidden">
        <Sidebar
          profilePic={profile_picture}
          firstName={first_name}
          lastName={last_name}
          id={id}
        />

        <section className="flex flex-col h-screen col-span-3 mb-20 mt-28">
          <div className="mt-2 mb-5 text-xl font-bold text-center">
            <h1>Booking Details</h1>
          </div>
          <div className="w-full space-y-4 overflow-y-scroll scrollbar-hide">
            <div
              key={bookingDetails?.id}
              className="flex justify-between w-2/3 h-48 mx-auto overflow-hidden border rounded-lg shadow-lg bg-gradient-to-r from-red-100 to-white"
            >
              <div className="flex flex-col justify-between flex-grow w-2/3 p-5">
                <div>
                  <div className="flex items-center space-x-2">
                    <h1 className="text-lg font-bold ">
                      {restaurantDetails?.restaurant_name}
                    </h1>
                    <p> - </p>
                    <p className="text-sm italic">
                      {restaurantDetails?.restaurant_location_country}
                      {restaurantDetails?.restaurant_location_city !==
                        restaurantDetails?.restaurant_location_country &&
                        ", " + restaurantDetails?.restaurant_location_city}
                    </p>
                  </div>
                  <p className="text-sm font-semibold">
                    Previous booking details:
                  </p>
                </div>
                <div className="text-xs md:text-sm">
                  <p>
                    <span className="font-semibold">Booking date:</span>{" "}
                    {bookingDetails?.display_date}
                  </p>
                  <p>
                    <span className="font-semibold">Booking time:</span>{" "}
                    {bookingDetails?.time}
                  </p>
                  <p>
                    <span className="font-semibold">Number of guests:</span>{" "}
                    {bookingDetails?.party_size}
                  </p>
                  <p>
                    <span className="font-semibold">Booking reference:</span>{" "}
                    {router.query.reservationId}
                  </p>
                </div>
              </div>
              <div className="relative md:h-full md:w-1/3">
                {restaurantDetails ? (
                  <Image
                    src={
                      restaurantDetails?.restaurant_image?.[0] ||
                      "/images/heroimg.jpg"
                    }
                    objectFit="cover"
                    layout="fill"
                  />
                ) : (
                  <Image
                    src={"/images/heroimg.jpg"}
                    objectFit="cover"
                    layout="fill"
                  />
                )}
              </div>
            </div>

            {/* edit booking section */}
            <div className="grid w-2/3 grid-cols-3 mx-auto shadow-lg h-[400px]">
              <div className="col-span-2 overflow-hidden bg-gray-100 rounded-lg ">
                <div className="flex items-center justify-center mt-3 text-white">
                  <div className="flex bg-black border rounded-lg">
                    <h2 className="p-2 pr-4">Number of Guests</h2>
                    <div className="flex items-center space-x-1 bg-red-200 rounded-r-md">
                      <MinusCircleIcon
                        onClick={decrementGuestCount}
                        className={`w-10 h-10 duration-150 ease-out ${
                          guestCount > 1
                            ? "cursor-pointer hover:text-gray-400"
                            : "cursor-not-allowed opacity-70"
                        } transition-colorscolor `}
                      />
                      <p className="text-black ">{guestCount}</p>
                      <PlusCircleIcon
                        onClick={incrementGuestCount}
                        className={`w-10 h-10 duration-150 ease-out ${
                          guestCount < 5
                            ? "cursor-pointer hover:text-gray-400"
                            : "cursor-not-allowed opacity-70"
                        } transition-colorscolor `}
                      />
                    </div>
                  </div>
                </div>

                {/* Calendar */}

                <div className="flex flex-col items-center justify-center mt-2">
                  {date ? (
                    <p className="mb-2 text-sm">Date chosen: {date}</p>
                  ) : (
                    <p className="mb-2 text-sm">Choose date</p>
                  )}
                  <Calendar
                    date={new Date()}
                    minDate={new Date()}
                    color="#FD5B61"
                    onChange={handleCalendarSelect}
                  />
                </div>
              </div>

              {/* Available Times */}
              <div className="mx-auto mt-3 overflow-scroll scrollbar-hide">
                <h2 className="font-semibold">Available Times</h2>
                {timeList.map((timeslot) => (
                  <p
                    className={`p-2 my-2  border rounded-full shadow-md cursor-pointer hover:bg-gray-100 ${
                      timeslot === time ? "bg-black text-white" : "bg-white"
                    }`}
                    onClick={() => {
                      setTime(timeslot);
                    }}
                  >
                    {timeslot}
                  </p>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center space-x-1">
              {date && time ? (
                <button
                  onClick={() => handleEditClicked(bookingDetails?.id)}
                  className="px-3 py-1 mt-5 text-white transition-colors duration-150 bg-black rounded-md animate-bounce active:scale-95 hover:bg-gray-50 hover:text-black"
                >
                  Save booking change
                </button>
              ) : (
                <div className="flex items-center px-3 py-1 mt-5 space-x-2 text-white bg-black rounded-md animate-pulse">
                  <ChevronDoubleUpIcon className="h-5" />
                  <p>Choose Booking Criteria</p>
                  <ChevronDoubleUpIcon className="h-5" />
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ReservationDetails;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  // console.log("context params", context.params);
  console.log("serversideprops upcomingbookings", session);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
