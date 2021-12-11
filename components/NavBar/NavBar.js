import Image from "next/image";
import {
  SearchIcon,
  GlobeAltIcon,
  MenuIcon,
  UserCircleIcon,
  ChevronDoubleUpIcon,
} from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import ActivatedSearchBar from "./ActivatedSearchBar";

const NavBar = () => {
  const [solidNavBar, setSolidNavBar] = useState(true); // remember to change to false after done with search bar dev
  const [isSearchActivated, setIsSearchActivated] = useState(false); // remember to change to false after done with search bar dev

  // const changeNavBackground = () => { // remember to uncomment after done with search bar dev
  //   if (window.scrollY >= 200) {
  //     setSolidNavBar(true);
  //   } else {
  //     setSolidNavBar(false);
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", changeNavBackground);
  // }, []);

  return (
    <header
      className={
        solidNavBar
          ? `fixed top-0 z-50 grid items-center grid-cols-3 p-5 bg-white shadow-md md:px-10 header w-full duration-500 transition-colors ${
              isSearchActivated && "pt-6 pb-[6.5rem]"
            }`
          : `fixed top-0 z-50 grid w-full grid-cols-2 p-5 md:px-10 pt-6`
      }
    >
      {/* Left */}
      <div className="relative flex items-center h-10 my-auto cursor-pointer">
        <Image
          src={
            solidNavBar
              ? `/images/dishtable_logo_lightbackground.png`
              : `/images/dishtable_logo_darkbackground.png`
          }
          alt="Airbnb logo"
          layout="fill"
          objectFit="contain"
          objectPosition="left"
        />
      </div>

      {/* Middle Search Bar */}
      {isSearchActivated ? (
        <div className="flex items-center justify-center space-x-2">
          <h1 className="font-semibold">Choose your reservation criteria</h1>
          {/* <button
            onClick={() => setIsSearchActivated(false)}
            className="animate-bounce"
          >
            <ChevronDoubleUpIcon className="w-8 h-6 p-1 text-white bg-red-600 rounded-lg animate-pulse" />
          </button> */}
        </div>
      ) : (
        <div className="flex justify-center ">
          <div
            onClick={() => setIsSearchActivated(true)}
            className={
              solidNavBar
                ? `flex items-center py-2 rounded-full md:border md:shadow-md justify-between flex-grow max-w-xs cursor-pointer`
                : `hidden`
            }
          >
            <p className="pl-5 text-sm font-semibold">Start your search</p>
            <SearchIcon
              className={
                solidNavBar
                  ? `hidden h-8 p-2 text-white bg-red-600 rounded-full cursor-pointer md:inline-flex md:mx-2`
                  : ``
              }
            />
          </div>
        </div>
      )}

      {/* Right */}
      <div
        className={
          solidNavBar
            ? `flex items-center justify-end space-x-4 text-gray-500 duration-500 transition-colors`
            : `flex items-center justify-end space-x-4 text-white`
        }
      >
        <GlobeAltIcon className={`h-6 cursor-pointer`} />

        <div className="flex items-center p-2 space-x-2 border-2 rounded-full">
          <MenuIcon className="h-6 " />
          <UserCircleIcon className="h-6 text-red-600" />
        </div>
      </div>

      {/* Activated Search Bar */}
      {isSearchActivated && <ActivatedSearchBar />}

      {/* Exit button that toggles isSearchActivated back to false */}
      {isSearchActivated && (
        <button
          onClick={() => setIsSearchActivated(false)}
          className="absolute bottom-0 right-0 flex items-center text-white bg-red-600 rounded-tl-lg animate-pulse"
        >
          <ChevronDoubleUpIcon className="w-8 h-6 p-1 text-white rounded-tl-lg" />
          <p className="text-sm">minimize</p>
          <ChevronDoubleUpIcon className="w-8 h-6 p-1 text-white rounded-tl-lg" />
        </button>
      )}
    </header>
  );
};

export default NavBar;
