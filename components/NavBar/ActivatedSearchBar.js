import { useState } from "react";
import { SearchIcon } from "@heroicons/react/solid";
import { Fragment } from "react";
import GuestModal from "./GuestModal";
import { Popover, Transition } from "@headlessui/react";
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/outline";

const ActivatedSearchBar = () => {
  const [guestSelected, setGuestSelected] = useState(false);
  const [dateSelected, setDateSelected] = useState(false);
  const [timeSelected, setTimeSelected] = useState(false);
  const [dynamicSearchSelected, setDynamicSearchSelected] = useState(false);
  const [searchBarBgGray, setSearchBarBgGray] = useState(false);
  const [guestCount, setGuestCount] = useState(0);

  const handleGuestSelected = () => {
    console.log("handleGuestSelected fired");
    setSearchBarBgGray(true);
    setGuestSelected(true);
    setDateSelected(false);
    setTimeSelected(false);
    setDynamicSearchSelected(false);
  };

  const handleDateSelected = () => {
    console.log("handleDateSelected fired");
    setGuestSelected(false);
    setDateSelected(true);
    setTimeSelected(false);
    setDynamicSearchSelected(false);
  };

  const handleTimeSelected = () => {
    console.log("handleTimeSelected fired");
    setGuestSelected(false);
    setDateSelected(false);
    setTimeSelected(true);
    setDynamicSearchSelected(false);
  };

  const handleDynamicSearchSelected = () => {
    console.log("handleDynamicSearchSelected fired");
    setGuestSelected(false);
    setDateSelected(false);
    setTimeSelected(false);
    setDynamicSearchSelected(true);
  };

  const incrementGuestCount = () => {
    if (guestCount < 5) {
      setGuestCount(guestCount + 1);
    }
    return;
  };

  const decrementGuestCount = () => {
    if (guestCount > 0) {
      setGuestCount(guestCount - 1);
    }
    return;
  };

  return (
    <Fragment>
      <div className="absolute mx-auto z-50 flex justify-center w-full col-span-2.5 mt-4 top-16">
        <div
          className={`${
            searchBarBgGray && "bg-gray-100"
          } flex justify-center border rounded-full border-slate-100`}
        >
          {/* Guests */}
          <Popover className="relative">
            {({ open }) => (
              <>
                <div onClick={handleGuestSelected}>
                  <Popover.Button
                    className={
                      guestSelected && open
                        ? `flex items-center justify-center border-3 flex-grow h-16 px-2 py-1 transition bg-white shadow-2xl duration-150 ease-out rounded-full cursor-pointer min-w-[10rem] `
                        : `flex items-center justify-center flex-grow h-16 px-2 py-1 transition duration-150 ease-out rounded-full cursor-pointer min-w-[10rem] hover:bg-gray-200 hover:bg-opacity-75`
                    }
                  >
                    Guests
                  </Popover.Button>
                </div>

                <Popover.Panel className="absolute z-10 p-5 bg-white border-[0.3px] shadow-2xl rounded-2xl top-20 left-1">
                  <div className="flex items-center space-x-4">
                    <button onClick={decrementGuestCount}>
                      <MinusCircleIcon
                        className={
                          guestCount > 0
                            ? `h-8 text-gray-500`
                            : `h-8 text-gray-300 opacity-75 cursor-not-allowed`
                        }
                      />
                    </button>
                    <p>{guestCount}</p>
                    <button onClick={incrementGuestCount}>
                      <PlusCircleIcon
                        className={
                          guestCount < 5
                            ? `h-8 text-gray-500`
                            : `h-8 text-gray-300 opacity-75 cursor-not-allowed`
                        }
                      />
                    </button>
                  </div>
                </Popover.Panel>
              </>
            )}
          </Popover>

          <div className="flex items-center">
            <h1 className="text-gray-200">|</h1>
          </div>

          {/* Calendar date */}

          <div
            onClick={handleDateSelected}
            className="flex items-center justify-center flex-grow h-16 px-2 py-1 transition duration-150 ease-out bg-white rounded-full cursor-pointer min-w-[10rem] hover:bg-gray-200 hover:bg-opacity-75"
          >
            <h3>Pick a Date</h3>
          </div>

          <div className="flex items-center">
            <h1 className="text-gray-200">|</h1>
          </div>

          {/* Timeslot */}

          <div
            onClick={handleTimeSelected}
            className="flex items-center justify-center flex-grow h-16 px-2 py-1 transition duration-150 ease-out bg-white rounded-full cursor-pointer min-w-[10rem] hover:bg-gray-200 hover:bg-opacity-75"
          >
            <h3>Pick a Time</h3>
          </div>

          <div className="flex items-center">
            <h1 className="text-gray-200">|</h1>
          </div>

          {/* Location, cuisine or restaurant */}
          <div className="flex items-center justify-between flex-grow h-16 px-2 py-1 transition duration-150 ease-out bg-white rounded-full cursor-pointer hover:bg-gray-200 hover:bg-opacity-75">
            <div onClick={handleDynamicSearchSelected} className="mr-4">
              <h3 className="pl-5">Location, cuisine or restaurant</h3>
            </div>

            <div className="flex items-center justify-end p-3 text-white bg-red-600 rounded-full">
              <SearchIcon className="h-5" />
              {(guestSelected ||
                dateSelected ||
                dynamicSearchSelected ||
                timeSelected) && (
                <h3 className="pl-1 transition duration-500 ease-out">
                  Search
                </h3>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ActivatedSearchBar;
