import Head from "next/head";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import NavBar from "../components/NavBar";

export default function Home() {
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

        {/* Cuisines */}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
