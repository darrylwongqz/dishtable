import Head from "next/head";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import MediumCard from "../components/MediumCard";
import NavBar from "../components/NavBar";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { useRef } from "react";

export default function Home() {
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
            <h2 className="py-8 text-4xl font-semibold">
              Featured Restaurants
            </h2>
            <div className="relative ">
              <button
                onClick={() => scroll(-220)}
                className="absolute z-20 -ml-6 transition duration-150 ease-out rounded-full hover:bg-red-600 top-1/2 hover:bg-opacity-40"
              >
                <ChevronLeftIcon className="h-10 text-transparent transition duration-150 ease-out hover:text-white" />
              </button>
              <button
                onClick={() => scroll(220)}
                className="absolute right-0 z-20 -mr-6 transition duration-150 ease-out rounded-full hover:bg-red-600 top-1/2 hover:bg-opacity-40"
              >
                <ChevronRightIcon className="h-10 text-transparent transition duration-150 ease-out hover:text-white" />
              </button>
              <div
                className="flex p-3 -ml-3 space-x-3 overflow-scroll scrollbar-hide scroll-auto"
                ref={featuredRef}
              >
                <MediumCard />
                <MediumCard />
                <MediumCard />
                <MediumCard />
                <MediumCard />
                <MediumCard />
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
