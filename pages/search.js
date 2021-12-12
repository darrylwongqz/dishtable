import axios from "axios";
import { useRouter } from "next/router";
import Footer from "../components/Footer";
import InfoCard from "../components/InfoCard";
import Map from "../components/Map";
import NavBar from "../components/NavBar/NavBar";
import { format } from "date-fns";
import PaginationBar from "../components/PaginationBar";

const Search = ({ searchResults }) => {
  const router = useRouter();
  const { city, date, party_size, time } = router.query;

  // console.log("router object on search page", router);

  // console.log(city, date, party_size, time);
  // console.log("searchResults on search page", searchResults);

  return (
    <div>
      <NavBar />
      <main className="flex">
        <section className="flex-grow px-6 mt-36">
          <p className="text-xs">
            {searchResults?.length}{" "}
            {searchResults?.length < 2 ? `result` : `results`} - {date} - {time}{" "}
            - {party_size} {Number(party_size) === 1 ? `guest` : `guests`}
          </p>
          <h1 className="mt-2 mb-6 text-3xl font-semibold">
            Restaurants in {city}
          </h1>

          {/* Restaurant List Card Section */}
          <div className="flex flex-col space-y-4">
            {searchResults?.map(
              ({
                restaurant_image,
                restaurant_name,
                restaurant_description,
                restaurant_cost,
                restaurant_cuisine,
                restaurant_location_city,
                restaurant_location_country,
                id,
              }) => (
                <InfoCard
                  key={id}
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
          <PaginationBar />
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
