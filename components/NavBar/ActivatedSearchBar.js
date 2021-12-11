import { useState, useEffect } from "react";
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
    setSearchBarBgGray(true);
    setGuestSelected(false);
    setDateSelected(true);
    setTimeSelected(false);
    setDynamicSearchSelected(false);
  };

  const handleTimeSelected = () => {
    console.log("handleTimeSelected fired");
    setSearchBarBgGray(true);
    setGuestSelected(false);
    setDateSelected(false);
    setTimeSelected(true);
    setDynamicSearchSelected(false);
  };

  const handleDynamicSearchSelected = () => {
    console.log("handleDynamicSearchSelected fired");
    setSearchBarBgGray(true);
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

  console.log("searchBarBgGray", searchBarBgGray);
  console.log("guestSelected", guestSelected);
  console.log("dateSelected", dateSelected);
  console.log("timeSelected", timeSelected);
  console.log("dynamicSearchSelected", dynamicSearchSelected);

  return (
    <Fragment>
      <div className="absolute z-50 flex justify-center w-full mx-auto mt-4 top-16">
        <div
          className={`${
            searchBarBgGray && "bg-gray-100"
          } flex justify-center border-[0.3px] rounded-full border-slate-100 h-16`}
        >
          {/* Guests */}
          <Popover className="relative">
            {({ open, close }) => (
              <>
                <div
                  onClick={handleGuestSelected}
                  onClick={
                    !open
                      ? handleGuestSelected
                      : () => {
                          setSearchBarBgGray(false);
                          setGuestSelected(false);
                        }
                  }
                >
                  <Popover.Button
                    className={
                      guestSelected && open
                        ? `flex flex-col items-start justify-center  flex-grow h-16 pl-8 py-1 transition bg-white shadow-xl duration-150 ease-out rounded-full cursor-pointer min-w-[10rem] `
                        : `flex flex-col items-start justify-center flex-grow h-16 pl-8 py-1 transition duration-150 ease-out rounded-full cursor-pointer min-w-[10rem] hover:bg-gray-200 hover:bg-opacity-75`
                    }
                  >
                    <h3>Guests</h3>
                    {guestCount !== 0 ? (
                      <p className="text-sm ">
                        {guestCount} {guestCount === 1 ? `guest` : `guests`}
                      </p>
                    ) : (
                      <p className="text-sm text-gray-400">Add guests</p>
                    )}
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
                {/* {setSearchBarBgGray(open)}
                {setGuestSelected(open)} */}
              </>
            )}
          </Popover>

          <div className="flex items-center">
            <h1 className="text-gray-200">|</h1>
          </div>

          {/* Calendar date */}

          <Popover className="relative">
            {({ open }) => (
              <>
                <div
                  onClick={handleDateSelected}
                  onClick={
                    !open
                      ? handleDateSelected
                      : () => {
                          setSearchBarBgGray(false);
                          setDateSelected(false);
                        }
                  }
                >
                  <Popover.Button
                    className={
                      dateSelected && open
                        ? `flex flex-col items-start justify-center  flex-grow h-16 pl-7 py-1 transition bg-white shadow-xl duration-150 ease-out rounded-full cursor-pointer min-w-[10rem] `
                        : `flex flex-col items-start justify-center flex-grow h-16 pl-7 py-1 transition duration-150 ease-out  rounded-full cursor-pointer min-w-[10rem] hover:bg-gray-200 hover:bg-opacity-75`
                    }
                  >
                    <h3>Pick a Date</h3>
                    <p className="text-sm text-gray-400">Add Date</p>
                  </Popover.Button>

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
                  {/* {setSearchBarBgGray(open)}
                  {setDateSelected(open)} */}
                </div>
              </>
            )}
          </Popover>
          <div className="flex items-center">
            <h1 className="text-gray-200">|</h1>
          </div>

          {/* Timeslot */}
          <Popover className="relative">
            {({ open }) => (
              <>
                <div
                  onClick={handleTimeSelected}
                  onClick={
                    !open
                      ? handleTimeSelected
                      : () => {
                          setSearchBarBgGray(false);
                          setTimeSelected(false);
                        }
                  }
                >
                  <Popover.Button
                    className={
                      timeSelected && open
                        ? `flex flex-col items-start justify-center pl-7  flex-grow h-16 px-2 py-1 transition bg-white shadow-xl duration-150 ease-out rounded-full cursor-pointer min-w-[10rem] `
                        : `flex flex-col items-start justify-center flex-grow pl-7 h-16 px-2 py-1 transition duration-150 ease-out  rounded-full cursor-pointer min-w-[10rem] hover:bg-gray-200 hover:bg-opacity-75`
                    }
                  >
                    <h3>Pick a Time</h3>
                    <p className="text-sm text-gray-400">Choose Time</p>
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
                {/* {setSearchBarBgGray(open)}
                {setTimeSelected(open)} */}
              </>
            )}
          </Popover>
          <div className="flex items-center">
            <h1 className="text-gray-200">|</h1>
          </div>

          {/* Location, cuisine or restaurant */}
          <Popover className="relative">
            {({ open }) => (
              <>
                <div
                  className={
                    dynamicSearchSelected && open
                      ? `flex items-center justify-between flex-grow h-16 px-2 py-1 transition duration-150 ease-out shadow-xl bg-white rounded-full cursor-pointer `
                      : `flex items-center justify-between flex-grow h-16 px-2 py-1 transition duration-150 ease-out rounded-full cursor-pointer hover:bg-gray-200 hover:bg-opacity-75`
                  }
                >
                  <div
                    onClick={handleDynamicSearchSelected}
                    onClick={
                      !open
                        ? handleDynamicSearchSelected
                        : () => {
                            setSearchBarBgGray(false);
                            setDynamicSearchSelected(false);
                          }
                    }
                  >
                    <Popover.Button className="py-5 pr-4 rounded-full">
                      <h3 className="pl-5">Location, cuisine or restaurant</h3>
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
                  {/* {setSearchBarBgGray(open)}
                  {setDynamicSearchSelected(open)} */}
                  <div
                    onClick={() => {
                      console.log("search button clicked");
                    }}
                    className="flex items-center justify-end p-3 text-white bg-red-600 rounded-full"
                  >
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
              </>
            )}
          </Popover>
        </div>
      </div>
    </Fragment>
  );
};

export default ActivatedSearchBar;
