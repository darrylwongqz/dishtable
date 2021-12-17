import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { LogoutIcon, UserIcon, TableIcon } from "@heroicons/react/outline";

const Sidebar = ({ profilePic, firstName, lastName, id }) => {
  return (
    <section className="h-full bg-red-600">
      <div className="overflow-y-scroll mt-28 sm:mt-40 scrollbar-hide">
        <div className="relative mx-auto overflow-hidden rounded-full sm:w-32 sm:h-32 md:w-48 md:h-48">
          <Image src={profilePic} layout="fill" objectFit="cover" />
        </div>
        <h1 className="hidden mx-auto mt-10 font-bold text-center text-white sm:relative md:text-2xl">
          Welcome, {firstName} {lastName}
        </h1>
      </div>

      {/* Options */}
      <div className="flex flex-col items-center space-y-8 text-xs font-semibold text-white sm:mt-8 sm:space-y-4 md:text-base">
        <div className="hidden sm:flex">
          <Link href={`/user/${id}/edit-profile`}>
            <a className="transition duration-150 ease-out transform hover:scale-105">
              Edit Profile
            </a>
          </Link>
        </div>

        <Link href={`/user/${id}/edit-profile`}>
          <a>
            <UserIcon className="w-7 h-7 sm:hidden" />
          </a>
        </Link>

        <div className="hidden sm:flex">
          <Link href={`/user/${id}/upcoming-bookings`}>
            <a className="text-center transition duration-150 ease-out transform hover:scale-105">
              Upcoming Bookings
            </a>
          </Link>
        </div>

        <Link href={`/user/${id}/upcoming-bookings`}>
          <a>
            <TableIcon className="w-7 h-7 sm:hidden" />
          </a>
        </Link>

        <div className="hidden sm:flex">
          <Link href={`/user/${id}/past-bookings`}>
            <a className="transition duration-150 ease-out transform hover:scale-105">
              Past Bookings
            </a>
          </Link>
        </div>

        <Link href={`/user/${id}/past-bookings`}>
          <a>
            <LogoutIcon className="w-7 h-7 sm:hidden" />
          </a>
        </Link>

        <button
          onClick={() => signOut()}
          className="hidden px-2 py-1 font-semibold text-black transition duration-300 ease-out transform bg-white rounded-full sm:flex sm:text-sm sm:px-4 sm:py-2 hover:bg-black hover:text-white active:scale-90"
        >
          Log Out
        </button>
      </div>
    </section>
  );
};

export default Sidebar;
