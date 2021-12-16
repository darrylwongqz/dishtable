import Image from "next/image";
import Link from "next/link";

const Sidebar = ({ profilePic, firstName, lastName, id }) => {
  return (
    <section className="h-full bg-red-500">
      <div className="mt-40 overflow-y-scroll scrollbar-hide">
        <div className="relative mx-auto overflow-hidden rounded-full sm:w-32 sm:h-32 md:w-48 md:h-48">
          <Image src={profilePic} layout="fill" objectFit="cover" />
        </div>
        <h1 className="mx-auto mt-10 text-2xl font-bold text-center text-white">
          Welcome, {firstName} {lastName}
        </h1>
      </div>

      {/* Options */}
      <div className="flex flex-col items-center mt-8 space-y-3 font-semibold text-white">
        <Link href={`/user/${id}/edit-profile`}>
          <a className="transition duration-150 ease-out transform hover:scale-105">
            Edit Profile
          </a>
        </Link>
        <Link href={`/user/${id}/upcoming-bookings`}>
          <a className="transition duration-150 ease-out transform hover:scale-105">
            Upcoming Bookings
          </a>
        </Link>

        <Link href={`/user/${id}/past-bookings`}>
          <a className="transition duration-150 ease-out transform hover:scale-105">
            Past Bookings
          </a>
        </Link>
      </div>
    </section>
  );
};

export default Sidebar;
