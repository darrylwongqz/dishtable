import Head from "next/head";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import MediumCard from "../components/MediumCard";
import NavBar from "../components/NavBar";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { useRef } from "react";
import axios from "axios";

export default function Home({ featuredData }) {
  const featuredRef = useRef();

  const scroll = (scrollOffset) => {
    console.log(featuredRef.current.scrollLeft);
    featuredRef.current.scrollLeft += scrollOffset;
  };

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
        {/* Featured Carousel */}
        <main className="px-8 mx-auto max-w-7xl sm:px-16">
          <section>
            <h2 className="pt-10 text-4xl font-semibold pb-7">
              Featured Restaurants
            </h2>
            <div className="relative ">
              {/* Scroll button overlaying the featured resto images */}
              <button
                onClick={() => scroll(-220)}
                className="absolute z-20 -ml-6 transition duration-150 ease-out rounded-full hover:bg-red-600 top-28 hover:bg-opacity-60"
              >
                <ChevronLeftIcon className="h-10 text-transparent transition duration-150 ease-out hover:text-white" />
              </button>
              <button
                onClick={() => scroll(220)}
                className="absolute right-0 z-20 -mr-6 transition duration-150 ease-out rounded-full hover:bg-red-600 top-28 hover:bg-opacity-60"
              >
                <ChevronRightIcon className="h-10 text-transparent transition duration-150 ease-out hover:text-white" />
              </button>
              <div
                className="flex p-3 -ml-3 space-x-3 overflow-scroll scrollbar-hide scroll-auto"
                ref={featuredRef}
              >
                {/* {
    "id": 1,
    "restaurant_name": "Pizza Plaza",
    "restaurant_description": "The original Pizza Plaza opened in 1990!",
    "restaurant_image": [
    "https://i.ibb.co/VmQ70j6/photo-1414235077428-338989a2e8c0-ixlib-rb-1-2.jpg"
    ],
    "restaurant_cost": 3
    }, */}
                {featuredData?.map(
                  ({
                    id,
                    restaurant_name,
                    restaurant_description,
                    restaurant_image,
                    restaurant_cost,
                  }) => (
                    <MediumCard
                      key={id}
                      img={restaurant_image}
                      title={restaurant_name}
                      cost={restaurant_cost}
                      description={restaurant_description}
                    />
                  )
                )}
              </div>
            </div>
          </section>
        </main>
        {/* Cuisines */}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

// https://jsonkeeper.com/b/YW9D

export const getStaticProps = async () => {
  const featuredData = (await axios.get("https://jsonkeeper.com/b/YW9D")).data;

  return {
    props: {
      featuredData,
    },
    revalidate: 300,
  };
};
