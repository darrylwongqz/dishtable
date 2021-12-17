import Link from "next/link";
import { useRecoilState } from "recoil";
import { geoState } from "../atoms/navAtom";
import { cityMatcher, dateConverter } from "../lib/searchBarUtils";

let defaultDate = new Date();
let defaultTime = "13:00";

const convertedDefaultDate = dateConverter(defaultDate);

const Footer = () => {
  const [geo, setGeo] = useRecoilState(geoState);
  const convertedCity = cityMatcher(geo);

  return (
    <footer className="items-center justify-center w-full h-40">
      <div className="bg-red-600">
        <div className="grid grid-cols-1 px-32 mx-auto sm:grid-cols-2 md:grid-cols-4 gap-y-10 py-14 max-w-7xl">
          <div className="space-y-4 text-xs text-white">
            <h5 className="text-sm font-bold">LOCATION</h5>
            <div className="transition duration-300 ease-out transform cursor-pointer hover:translate-x-2 hover:scale-105 hover:font-semibold">
              <p>79 Anson Rd, Level 20,</p>
              <p>Singapore 079906</p>
              <p className="mt-4 ">General Assembly</p>
            </div>
          </div>
          <div className="flex flex-col space-y-4 text-xs text-white">
            <h5 className="text-sm font-bold">LEGAL</h5>
            <Link href="/">
              <a className="transition duration-300 ease-out transform hover:translate-x-2 hover:underline hover:scale-105 hover:font-semibold">
                Terms and Conditions
              </a>
            </Link>
            <Link href="/">
              <a className="transition duration-300 ease-out transform hover:translate-x-2 hover:underline hover:scale-105 hover:font-semibold">
                Privacy Policy
              </a>
            </Link>
          </div>
          <div className="flex flex-col space-y-4 text-xs text-white">
            <h5 className="text-sm font-bold">COUNTRIES</h5>

            <Link
              href={`/search?city=${convertedCity}&date=${convertedDefaultDate}&time=${defaultTime}&party_size=2&search_term=Singapore&search_flag=location&p=1`}
            >
              <a className="transition duration-300 ease-out transform hover:translate-x-2 hover:underline hover:scale-105 hover:font-semibold">
                Singapore
              </a>
            </Link>
            <Link
              href={`/search?city=${convertedCity}&date=${convertedDefaultDate}&time=${defaultTime}&party_size=2&search_term=London&search_flag=location&p=1`}
            >
              <a className="transition duration-300 ease-out transform hover:translate-x-2 hover:underline hover:scale-105 hover:font-semibold">
                London
              </a>
            </Link>
            <Link
              href={`/search?city=${convertedCity}&date=${convertedDefaultDate}&time=${defaultTime}&party_size=2&search_term=Seoul&search_flag=location&p=1`}
            >
              <a className="transition duration-300 ease-out transform hover:translate-x-2 hover:underline hover:scale-105 hover:font-semibold">
                Seoul
              </a>
            </Link>
            <Link
              href={`/search?city=${convertedCity}&date=${convertedDefaultDate}&time=${defaultTime}&party_size=2&search_term=Paris&search_flag=location&p=1`}
            >
              <a className="transition duration-300 ease-out transform hover:translate-x-2 hover:underline hover:scale-105 hover:font-semibold">
                Paris
              </a>
            </Link>
          </div>
          <div className="space-y-4 text-xs text-white">
            <h5 className="text-sm font-bold">ABOUT</h5>
            <p className="transition duration-300 ease-out transform cursor-pointer hover:scale-105 hover:translate-x-2 hover:font-semibold">
              This is not a real site
            </p>
            <p className="transition duration-300 ease-out transform cursor-pointer hover:scale-105 hover:translate-x-2 hover:font-semibold">
              Its a pretty awesome build
            </p>
            <p className="transition duration-300 ease-out transform cursor-pointer hover:scale-105 hover:translate-x-2 hover:font-semibold">
              Build using Next.js
            </p>
            <p className="transition duration-300 ease-out transform hover:underline hover:scale-105 hover:translate-x-2 hover:font-semibold">
              <a
                href="https://github.com/darrylwongqz/dishtable"
                target="_blank"
                rel="noopener noreferrer"
              >
                By Darryl Wong
              </a>
            </p>

            <p className="transition duration-300 ease-out transform hover:underline hover:scale-105 hover:translate-x-2 hover:font-semibold">
              <a
                href="https://github.com/atulnk1/restaurant-app-e"
                target="_blank"
                rel="noopener noreferrer"
              >
                & Atul Nandakumar
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center py-5 text-sm font-semibold text-white bg-black">
        <p>
          ©2021{" "}
          <a
            href="https://github.com/darrylwongqz/dishtable"
            target="_blank"
            rel="noopener noreferrer"
            className="transition duration-300 ease-out transform hover:scale-105 hover:translate-x-2 hover:font-bold"
          >
            Darryl Wong
          </a>{" "}
          &{" "}
          <a
            href="https://github.com/atulnk1/restaurant-app-e"
            target="_blank"
            rel="noopener noreferrer"
            className="transition duration-300 ease-out transform hover:scale-105 hover:translate-x-2 hover:font-bold"
          >
            Atul Nandakumar
          </a>{" "}
          || All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
