import Image from "next/image";
import {
  SearchIcon,
  GlobeAltIcon,
  MenuIcon,
  UserCircleIcon,
  UsersIcon,
} from "@heroicons/react/solid";

const NavBar = () => {
  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 p-5 bg-white shadow-md md:px-10">
      {/* Left */}
      <div className="relative flex items-center h-10 my-auto cursor-pointer">
        <Image
          src="/images/dishtable_logo_lightbackground.png"
          alt="Airbnb logo"
          layout="fill"
          objectFit="contain"
          objectPosition="left"
        />
      </div>

      {/* Middle Search Bar */}
      <div className="flex items-center py-2 rounded-full md:border-2 md:shadow-md">
        <input
          className="flex-grow pl-5 text-sm bg-transparent outline-none"
          placeholder="Start your search"
        />
        <SearchIcon className="hidden h-8 p-2 text-white bg-red-600 rounded-full cursor-pointer md:inline-flex md:mx-2" />
      </div>

      {/* Right */}
      <div className="flex items-center justify-end space-x-4 text-gray-500">
        <GlobeAltIcon className="h-6 cursor-pointer" />

        <div className="flex items-center p-2 space-x-2 border-2 rounded-full">
          <MenuIcon className="h-6 " />
          <UserCircleIcon className="h-6 text-red-600" />
        </div>
      </div>
    </header>
  );
};

export default NavBar;
