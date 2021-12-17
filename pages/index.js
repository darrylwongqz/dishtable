import Head from "next/head";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import FeatureCard from "../components/FeatureCard";
import NavBar from "../components/NavBar/NavBar";
import axios from "axios";
import CuisineCard from "../components/CuisineCard";
import ButtonScrollOverlay from "../components/ButtonScrollOverlay";
import LargeCard from "../components/LargeCard";
import { useRecoilState } from "recoil";
import { geoState } from "../atoms/navAtom";
import MobileMenuModal from "../components/NavBar/MobileMenuModal";

export default function Home({ featuredData, cuisineData }) {
  // console.log(cuisineData);

  const [geo, setGeo] = useRecoilState(geoState);

  return (
    <div>
      <Head>
        <title>DishTable: Book Your Next Meal</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Cookie&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main>
        {/* NavBar */}
        <NavBar />
        {/* Hero Image */}

        <Hero />
        <main className="px-8 mx-auto max-w-7xl sm:px-16">
          {/* Featured Carousel Section*/}
          <section>
            <h2 className="pt-10 text-4xl font-semibold pb-7">
              Featured Restaurants
            </h2>
            <ButtonScrollOverlay>
              {featuredData?.map(
                ({
                  id,
                  restaurant_name,
                  restaurant_description,
                  restaurant_image,
                  restaurant_cost,
                }) => (
                  <FeatureCard
                    key={id}
                    id={id}
                    img={restaurant_image}
                    title={restaurant_name}
                    cost={restaurant_cost}
                    description={restaurant_description}
                  />
                )
              )}
            </ButtonScrollOverlay>
          </section>

          {/* Cuisines Section*/}

          <section>
            <h2 className="py-8 text-4xl font-semibold">Cuisines</h2>
            <ButtonScrollOverlay>
              {cuisineData?.map(({ id, cuisine_type, cuisine_image }) => (
                <CuisineCard
                  key={id}
                  cuisineType={cuisine_type}
                  img={cuisine_image}
                  geo={geo}
                />
              ))}
            </ButtonScrollOverlay>
          </section>

          {/* Bottom CTA */}
          <LargeCard
            img="https://i.ibb.co/72gwwMp/photo-1511978293554-7b92f19bd77d-ixlib-rb-1-2.jpg"
            title="We know you're hungry"
            description="Book your next meal now"
            buttonText="Book now"
            geo={geo}
          />
        </main>
      </main>
      <MobileMenuModal />

      {/* Footer */}
      <Footer />
    </div>
  );
}

// https://jsonkeeper.com/b/YW9D - featuredData
// https://api-dishtable-supa.herokuapp.com/api/restaurant/featured - production

// https://jsonkeeper.com/b/JNOQ - cuisineData

export const getStaticProps = async () => {
  const featuredData = (
    await axios.get(
      "https://api-dishtable-supa.herokuapp.com/api/restaurants/featured?city=Singapore"
    )
  ).data;

  // console.log(featuredData);

  const cuisineData = (await axios.get("https://jsonkeeper.com/b/0V4A")).data;

  return {
    props: {
      featuredData,
      cuisineData,
    },
    revalidate: 300,
  };
};
