import Link from "next/link";

const Footer = () => {
  return (
    <footer className="items-center justify-center w-full h-40">
      <div className="bg-red-700">
        <div className="grid grid-cols-1 px-32 mx-auto sm:grid-cols-2 md:grid-cols-4 gap-y-10 py-14 max-w-7xl">
          <div className="space-y-4 text-xs text-white">
            <h5 className="text-sm font-bold">LOCATION</h5>
            <div className="transition duration-300 ease-out transform hover:translate-x-2 hover:scale-105 hover:font-semibold">
              <p>79 Anson Rd, Level 20,</p>
              <p>Singapore 079906</p>
              <p className="mt-4 ">General Assembly</p>
            </div>
          </div>
          <div className="space-y-4 text-xs text-white">
            <h5 className="text-sm font-bold">LEGAL</h5>
            <Link href="/">
              <p className="transition duration-300 ease-out transform hover:translate-x-2 hover:underline hover:scale-105 hover:font-semibold">
                Terms and Conditions
              </p>
            </Link>
            <Link href="/">
              <p className="transition duration-300 ease-out transform hover:translate-x-2 hover:underline hover:scale-105 hover:font-semibold">
                Privacy Policy
              </p>
            </Link>
          </div>
          <div className="space-y-4 text-xs text-white">
            <h5 className="text-sm font-bold">COUNTRIES</h5>

            <Link href="/">
              <p className="transition duration-300 ease-out transform hover:translate-x-2 hover:underline hover:scale-105 hover:font-semibold">
                Singapore
              </p>
            </Link>
            <Link href="/">
              <p className="transition duration-300 ease-out transform hover:translate-x-2 hover:underline hover:scale-105 hover:font-semibold">
                London
              </p>
            </Link>
            <Link href="/">
              <p className="transition duration-300 ease-out transform hover:translate-x-2 hover:underline hover:scale-105 hover:font-semibold">
                Seoul
              </p>
            </Link>
            <Link href="/">
              <p className="transition duration-300 ease-out transform hover:translate-x-2 hover:underline hover:scale-105 hover:font-semibold">
                Paris
              </p>
            </Link>
          </div>
          <div className="space-y-4 text-xs text-white">
            <h5 className="text-sm font-bold">ABOUT</h5>
            <p className="transition duration-300 ease-out transform hover:translate-x-2 hover:scale-105 hover:font-semibold">
              This is not a real site
            </p>
            <p className="transition duration-300 ease-out transform hover:scale-105 hover:translate-x-2 hover:font-semibold">
              Its a pretty awesome build
            </p>
            <p className="transition duration-300 ease-out transform hover:scale-105 hover:translate-x-2 hover:font-semibold">
              Build using Next.js
            </p>
            <p className="transition duration-300 ease-out transform hover:scale-105 hover:translate-x-2 hover:font-semibold">
              By Darryl Wong
            </p>
            <p className="transition duration-300 ease-out transform hover:scale-105 hover:translate-x-2 hover:font-semibold">
              & Atul Nandakumar
            </p>
          </div>
        </div>
      </div>
      <p className="flex items-center justify-center py-5 text-sm font-semibold text-white bg-black">
        ©2021 Darryl Wong & Atul Nandakumar || All Rights Reserved
      </p>
    </footer>
  );
};

export default Footer;
