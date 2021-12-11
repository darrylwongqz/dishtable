import axios from "axios";
import { Router, useRouter } from "next/router";
import Footer from "../components/Footer";
import InfoCard from "../components/InfoCard";
import Map from "../components/Map";
import NavBar from "../components/NavBar/NavBar";
import { format } from "date-fns";

const Search = ({ searchResults }) => {
  //   const {
  //     location,
  //     startDate = new Date(),
  //     endDate = new Date(),
  //     noOfGuests,
  //   } = Router.query;

  //   const formattedStartDate = format(new Date(startDate), "dd MMMM yy");
  //   const formattedEndDate = format(new Date(endDate), "dd MMMM yy");

  //   const range = `${formattedStartDate} - ${formattedEndDate}`;

  console.log(searchResults);
  return (
    <div>
      <NavBar />
      <main className="flex">
        <section className="flex-grow px-6 mt-36">
          <p className="text-xs">300+ results - date - time - 3 guests</p>
          <h1 className="mt-2 mb-6 text-3xl font-semibold">
            Restaurants in Singapore
          </h1>

          {/* Restaurant List Card Section */}
          <div className="flex flex-col space-y-4">
            {searchResults.map(
              ({
                restaurant_image,
                restaurant_name,
                restaurant_description,
                restaurant_cost,
                restaurant_cuisine,
                restaurant_location_city,
                restaurant_location_country,
              }) => (
                <InfoCard
                  img={restaurant_image[0]}
                  title={restaurant_name}
                  description={restaurant_description}
                  cost={restaurant_cost}
                  cuisineType={restaurant_cuisine}
                  city={restaurant_location_city}
                  country={restaurant_location_country}
                />
              )
            )}
            <div className="pb-5 " />
          </div>
        </section>
        {/* Map Section */}
        <section className="hidden xl:inline-flex xl:w-2/3">
          <Map searchResults={searchResults} />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Search;

export const getServerSideProps = async () => {
  const searchResults = (await axios("https://jsonkeeper.com/b/RDPK")).data;

  return {
    props: {
      searchResults,
    },
  };
};
