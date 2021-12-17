import { useRouter } from "next/router";
import { useSession, getSession } from "next-auth/react";
import NavBar from "../../../../components/NavBar/NavBar";
import Sidebar from "../../../../components/UserDashboard/Sidebar";
import axios from "axios";
import { useEffect, useState } from "react";
import Footer from "../../../../components/Footer";
import Image from "next/image";
import Link from "next/link";
import MobileMenuModal from "../../../../components/NavBar/MobileMenuModal";

const UserUpcomingBookings = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [cancelTrigger, setCancelTrigger] = useState(false);

  // console.log("current user logged in", session);
  const { email, id, first_name, last_name, profile_picture } = session?.user;

  // console.log(session.token);

  // console.log(router);

  useEffect(() => {
    const fetchUpcomingBookings = async () => {
      const response = await axios.get(
        "https://api-dishtable-supa.herokuapp.com/api/reservations?reservationState=upcoming",
        {
          headers: {
            Authorization: "Bearer " + session.token,
          },
        }
      );

      // console.log(response.data.upcomingReservationCombined);
      setUpcomingBookings(response.data.upcomingReservationCombined);
      setCancelTrigger(false);
    };

    fetchUpcomingBookings();
  }, [cancelTrigger]);

  const handleEditClicked = (reservation_id) => {
    console.log("handleEdit Fired");
    router.push(`/user/${id}/upcoming-bookings/${reservation_id}`);
  };

  const handleCancelClicked = async (reservation_id) => {
    console.log("handleCancel Fired");
    // console.log(reservation_id);
    try {
      const response = await axios.patch(
        `https://api-dishtable-supa.herokuapp.com/api/v2/reservations/${reservation_id}/cancel`,
        {},
        {
          headers: {
            Authorization: "Bearer " + session.token,
          },
        }
      );
      // console.log("cancel", response);
      setCancelTrigger(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavBar />
      <main className="grid grid-cols-5 overflow-hidden sm:grid-cols-4">
        <Sidebar
          profilePic={profile_picture}
          firstName={first_name}
          lastName={last_name}
          id={id}
        />

        <section className="flex flex-col h-screen col-span-4 mb-20 sm:col-span-3 mt-28">
          <div className="mt-2 mb-5 text-xl font-bold text-center">
            <h1>Upcoming Bookings</h1>
          </div>
          <div className="w-full space-y-4 overflow-y-scroll scrollbar-hide">
            {upcomingBookings.map(({ bookingDetails, restaurantDetails }) => (
              <>
                <div
                  key={bookingDetails.id}
                  className="flex justify-between w-full mx-auto overflow-hidden border rounded-lg shadow-lg sm:w-2/3 h-52 sm:h-60 bg-gradient-to-r from-red-100 to-white"
                >
                  <div className="flex flex-col justify-between flex-grow w-2/3 p-5">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h1 className="text-lg font-bold ">
                          {restaurantDetails.restaurant_name}
                        </h1>
                        <p className="hidden sm:inline-flex"> - </p>
                        <p className="hidden text-sm italic sm:inline-flex">
                          {restaurantDetails.restaurant_location_country}
                          {restaurantDetails.restaurant_location_city !==
                            restaurantDetails.restaurant_location_country &&
                            ", " + restaurantDetails.restaurant_location_city}
                        </p>
                      </div>
                      <p className="text-xs sm:text-sm">
                        {restaurantDetails.restaurant_location_address}
                      </p>
                    </div>
                    <div className="text-xs md:text-sm">
                      <p>
                        <span className="font-semibold">Booking date:</span>{" "}
                        {bookingDetails.display_date}
                      </p>
                      <p>
                        <span className="font-semibold">Booking time:</span>{" "}
                        {bookingDetails.time}
                      </p>
                      <p>
                        <span className="font-semibold">Number of guests:</span>{" "}
                        {bookingDetails.party_size}
                      </p>
                      <p className="hidden lg:inline-flex">
                        <span className="font-semibold">
                          Booking reference:
                        </span>{" "}
                        {bookingDetails.id}
                      </p>
                      {bookingDetails.reservation_status === "cancelled" ? (
                        <div className="flex items-center justify-start mt-2 space-x-1">
                          <p className="px-3 py-1 text-red-900 bg-gray-200 rounded-md cursor-not-allowed">
                            cancelled
                          </p>
                          <Link
                            href={`/restaurants/${bookingDetails.restaurant_id}`}
                          >
                            <a className="hidden px-3 py-1 text-white transition duration-150 ease-out transform bg-black rounded-md cursor-pointer sm:inline-flex hover:bg-white hover:text-red-800 active:scale-90">
                              Book Again
                            </a>
                          </Link>
                          <Link
                            href={`/restaurants/${bookingDetails.restaurant_id}`}
                          >
                            <a className="px-2 py-1 text-white transition duration-150 ease-out transform bg-black rounded-md cursor-pointer sm:hidden hover:bg-white hover:text-red-800 active:scale-90">
                              Rebook
                            </a>
                          </Link>
                        </div>
                      ) : (
                        <div className="flex items-center justify-start mt-2 space-x-1">
                          <button
                            onClick={() => handleEditClicked(bookingDetails.id)}
                            className="px-3 py-1 text-white transition-colors duration-150 bg-black rounded-md active:scale-95 hover:bg-gray-50 hover:text-black"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() =>
                              handleCancelClicked(bookingDetails.id)
                            }
                            className="px-3 py-1 text-white transition-colors duration-150 bg-red-800 rounded-md active:scale-95 hover:bg-red-400 hover:text-black"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="relative md:h-full md:w-1/3">
                    <Image
                      src={restaurantDetails.restaurant_image[0]}
                      objectFit="cover"
                      layout="fill"
                    />
                  </div>
                </div>
              </>
            ))}
          </div>
        </section>
      </main>
      <MobileMenuModal />

      <Footer />
    </>
  );
};

export default UserUpcomingBookings;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

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
