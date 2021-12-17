import axios from "axios";
import { useRouter } from "next/router";
import Footer from "../components/Footer";
import InfoCard from "../components/InfoCard";
import Map from "../components/Map";
import NavBar from "../components/NavBar/NavBar";

import PaginationBar from "../components/PaginationBar";

import MobileMenuModal from "../components/NavBar/MobileMenuModal";

const Search = ({ searchResults }) => {
  const router = useRouter();
  const { city, date, party_size, time } = router.query;

  // console.log("router object on search page", router);

  // console.log(city, date, party_size, time);
  // console.log("searchResults on search page", searchResults);

  const restaurantResults = searchResults?.restaurants;
  // console.log(searchResults);

  return (
    <div>
      <NavBar />
      <main className="flex">
        <section className="flex-grow px-6 mt-36">
          <p className="text-xs">
            {restaurantResults?.length}{" "}
            {restaurantResults?.length < 2 ? `result` : `results`} - {date} -{" "}
            {time} - {party_size}{" "}
            {Number(party_size) === 1 ? `guest` : `guests`}
          </p>
          <h1 className="mt-2 mb-6 text-3xl font-semibold">
            Restaurants based on your search query
          </h1>

          {/* Restaurant List Card Section */}
          <div className="flex flex-col space-y-4 xl:max-w-1/3">
            {restaurantResults?.length ? (
              restaurantResults?.map(
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
                    id={id}
                    img={restaurant_image[0]}
                    title={restaurant_name}
                    description={restaurant_description}
                    cost={restaurant_cost}
                    cuisineType={restaurant_cuisine}
                    city={restaurant_location_city}
                    country={restaurant_location_country}
                  />
                )
              )
            ) : (
              <p className="h-screen">
                Oops there aren't any restaurants to display for this search
                query, try changing up your search
              </p>
            )}
            <div className="pb-5 " />
          </div>
          {searchResults?.pageCount > 1 && (
            <PaginationBar pageCount={searchResults?.pageCount} />
          )}
        </section>
        {/* Map Section */}
        <section className="hidden xl:inline-flex xl:w-2/3">
          {restaurantResults?.length && <Map searchResults={searchResults} />}
        </section>
      </main>
      <MobileMenuModal />

      <Footer />
    </div>
  );
};

export default Search;

// query: {
//   city: 'Singapore',
//   date: '22-12-2021',
//   time: '10:15',
//   party_size: '2',
//   search_term: 'Singapore',
//   search_flag: '',
//   p: '1'
// }

export const getServerSideProps = async (context) => {
  // console.log("context query", context.query);
  const params = context.query;
  const searchResults = (
    await axios(
      `https://api-dishtable-supa.herokuapp.com/api/restaurants/search?partySize=${params.party_size}&searchDate=${params.date}&searchTime=${params.time}&searchTerm=${params.search_term}&city=${params.city}&searchFlag=${params.search_flag}&p=${params.p}`
    )
  ).data;

  // console.log("searchResults", searchResults);

  return {
    props: {
      searchResults,
    },
  };
};
