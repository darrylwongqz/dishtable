import { useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

const ButtonScrollOverlay = ({ children }) => {
  const ref = useRef();
  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };
  return (
    <div className="relative ">
      {/* Scroll button overlaying the images */}
      <button
        onClick={() => scroll(-220)}
        className="absolute z-20 -ml-6 transition duration-150 ease-out rounded-full hover:bg-red-600 top-1/2 hover:bg-opacity-60 active:bg-opacity-100"
      >
        <ChevronLeftIcon className="h-10 text-transparent transition duration-150 ease-out hover:text-white" />
      </button>
      <button
        onClick={() => scroll(220)}
        className="absolute right-0 z-20 -mr-6 transition duration-150 ease-out rounded-full hover:bg-red-600 top-1/2 hover:bg-opacity-60 active:bg-opacity-100"
      >
        <ChevronRightIcon className="h-10 text-transparent transition duration-150 ease-out hover:text-white" />
      </button>
      <div
        className="flex p-3 -ml-3 space-x-3 overflow-scroll scrollbar-hide scroll-auto"
        ref={ref}
      >
        {children}
      </div>
    </div>
  );
};

export default ButtonScrollOverlay;
