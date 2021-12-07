import Head from "next/head";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div>
      <Head>
        <title>DishTable: Book Your Next Meal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main></main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
