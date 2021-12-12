import axios from "axios";
import { useRouter } from "next/router";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar/NavBar";

const RestaurantDetailPage = ({ restaurantDetails }) => {
  const router = useRouter();
  console.log(router);

  console.log(restaurantDetails);

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

  return (
    <>
      <NavBar />
      <main className="mx-auto mt-24 bg-gray-200 max-w-7xl">
        <div>I am the Restaurant Detail Page</div>
      </main>
      <Footer />
    </>
  );
};

export default RestaurantDetailPage;

// dummy data at https://jsonkeeper.com/b/89VC

export const getServerSideProps = async () => {
  const restaurantDetails = (await axios("https://jsonkeeper.com/b/89VC")).data;

  return {
    props: {
      restaurantDetails,
    },
  };
};
