import { useRouter } from "next/router";

const RestaurantDetailPage = () => {
  const router = useRouter();

  console.log(router);

  return (
    <main>
      <div>I am the Restaurant Detail Page</div>
    </main>
  );
};

export default RestaurantDetailPage;
