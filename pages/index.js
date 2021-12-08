import Head from "next/head";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import FeatureCard from "../components/FeatureCard";
import NavBar from "../components/NavBar";
import axios from "axios";
import CuisineCard from "../components/CuisineCard";
import ButtonScrollOverlay from "../components/ButtonScrollOverlay";

export default function Home({ featuredData, cuisineData }) {
  console.log(cuisineData);
  return (
    <div>
      <Head>
        <title>DishTable: Book Your Next Meal</title>
        <link rel="icon" href="/favicon.ico" />
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
                />
              ))}
            </ButtonScrollOverlay>

            <div className="flex p-3 -ml-3 space-x-3 overflow-scroll scrollbar-hide"></div>
          </section>
        </main>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

// https://jsonkeeper.com/b/YW9D - featuredData

// https://jsonkeeper.com/b/JNOQ - cuisineData

export const getStaticProps = async () => {
  const featuredData = (await axios.get("https://jsonkeeper.com/b/YW9D")).data;

  const cuisineData = (await axios.get("https://jsonkeeper.com/b/JNOQ")).data;

  return {
    props: {
      featuredData,
      cuisineData,
    },
    revalidate: 300,
  };
};
