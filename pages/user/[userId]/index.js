import { useRouter } from "next/router";

const UserDetailPage = () => {
  const router = useRouter();

  console.log(router);

  return (
    <main>
      <div>I am the User Detail Page</div>
    </main>
  );
};

export default UserDetailPage;
