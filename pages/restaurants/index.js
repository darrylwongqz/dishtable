import { useRouter } from "next/router";
import { useEffect } from "react";

const Restaurants = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/");
  }, []);

  return (
    <main className="flex items-center justify-center h-screen">
      <p>Redirecting to the home page...</p>
    </main>
  );
};

export default Restaurants;
