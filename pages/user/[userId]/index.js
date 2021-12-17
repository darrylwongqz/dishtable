import { useRouter } from "next/router";
import { useSession, getSession } from "next-auth/react";
import NavBar from "../../../components/NavBar/NavBar";
import Sidebar from "../../../components/UserDashboard/Sidebar";
import { ChevronDoubleLeftIcon } from "@heroicons/react/outline";
import Footer from "../../../components/Footer";
import { useEffect } from "react";
import MobileMenuModal from "../../../components/NavBar/MobileMenuModal";

const UserDetailPage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  // console.log("current user logged in", session);
  const { id, email, first_name, last_name, profile_picture } = session?.user;

  useEffect(() => {
    router.push(`/user/${id}/edit-profile`);
  }, []);

  return (
    <>
      <NavBar />
      <main className="grid h-screen grid-cols-4 ">
        <Sidebar
          profilePic={profile_picture}
          firstName={first_name}
          lastName={last_name}
          id={id}
        />

        <section className="flex justify-center h-full col-span-3 mt-96">
          <div className="inline-flex mx-auto animate-pulse">
            <ChevronDoubleLeftIcon className="h-8" />
            <h2 className="text-2xl font-cookie">
              Click on the options on the left to navigate the dashboard!
            </h2>
          </div>
        </section>
      </main>
      <MobileMenuModal />

      <Footer />
    </>
  );
};

export default UserDetailPage;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  // console.log("serversideprops index on user", session);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
