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
import { Listbox } from "@headlessui/react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const NavBar = () => {
  const [solidNavBar, setSolidNavBar] = useState(true); // remember to change to false after done with search bar dev
  const [isSearchActivated, setIsSearchActivated] = useState(false); // remember to change to false after done with search bar dev
  const [geo, setGeo] = useState("SG");
  const [searchInput, setSearchInput] = useState("Start your search");
  const router = useRouter();
  const { data: session } = useSession();

  // console.log(session);
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

  useEffect(() => {
    switch (router.pathname) {
      case "/":
        return setSearchInput("Start your search");
      case "/search":
        return setSearchInput(
          `${router.query.city} | ${router.query.date} |  ${
            router.query.time
          } | ${router.query.party_size} ${
            Number(router.query.party_size) === 1 ? "guest" : "guests"
          }`
        );

      default:
        return setSearchInput("Start your search");
    }
  }, []);

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
            <p className="pl-5 text-sm font-semibold">{searchInput}</p>
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
        <Listbox as="div" value={geo} onChange={setGeo} className="relative">
          <Listbox.Button>
            <div className="flex space-x-1">
              <GlobeAltIcon className={`h-6 cursor-pointer`} />
              <h3>{geo}</h3>
            </div>
          </Listbox.Button>
          <Listbox.Options className="absolute space-y-2 bg-white shadow-2xl left-4 top-10 rounded-xl z-100">
            <Listbox.Option
              className="px-3 py-1 bg-white rounded-xl hover:bg-gray-200"
              value="SG"
            >
              {"SG"}
            </Listbox.Option>
            <Listbox.Option
              className="px-3 py-1 bg-white rounded-xl hover:bg-gray-200"
              value="KR"
            >
              {"KR"}
            </Listbox.Option>
            <Listbox.Option
              className="px-3 py-1 bg-white rounded-xl hover:bg-gray-200"
              value="FR"
            >
              {"FR"}
            </Listbox.Option>
            <Listbox.Option
              className="px-3 py-1 bg-white rounded-xl hover:bg-gray-200"
              value="UK"
            >
              {"UK"}
            </Listbox.Option>
          </Listbox.Options>
        </Listbox>

        <div className="flex items-center p-2 space-x-2 border-2 rounded-full">
          <MenuIcon className="h-6 " />
          {session?.user ? (
            <Image src={session.user.profile_picture} width={30} height={30} />
          ) : (
            <UserCircleIcon className="h-6 text-red-600" />
          )}
        </div>
      </div>

      {/* Activated Search Bar */}
      {isSearchActivated && <ActivatedSearchBar geo={geo} />}

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
