import Head from "next/head";
import Footer from "../components/Footer";
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

        {/* Featured Carousel */}

        {/* Cuisines */}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
