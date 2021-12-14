import { useState, useEffect, useRef } from "react";
import { SearchIcon } from "@heroicons/react/solid";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { cityMatcher } from "../../lib/searchBarUtils";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Calendar } from "react-date-range";
import { format } from "date-fns";

// *************** creating the booking times array ****************************************
const x = 15; //minutes interval
const bookingTimes = []; // time array
let tt = 9 * 60; // start time
// const ap = ["AM", "PM"]; // AM-PM

//loop to increment the time and push results in array
for (let i = 0; tt < 23.25 * 60; i++) {
  let hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
  let mm = tt % 60; // getting minutes of the hour in 0-55 format
  bookingTimes[i] = ("0" + (hh % 24)).slice(-2) + ":" + ("0" + mm).slice(-2);
  // ap[Math.floor(hh / 12)]; // pushing data in array in [00:00 - 12:00 AM/PM format]
  tt = tt + x;
}

// *************** creating the booking times array ****************************************

// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv component below vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv

const ActivatedSearchBar = ({ geo }) => {
  const [searchBarBgGray, setSearchBarBgGray] = useState(false);
  const router = useRouter();
  const calendarRef = useRef();

  //Popover States
  const [guestSelected, setGuestSelected] = useState(false);
  const [dateSelected, setDateSelected] = useState(false);
  const [timeSelected, setTimeSelected] = useState(false);
  const [dynamicSearchSelected, setDynamicSearchSelected] = useState(false);

  //Input States
  const [guestCount, setGuestCount] = useState(0); // Remember to set validation as 0 cannot submit
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [dynamicSearchInput, setDynamicSearchInput] = useState("");
  const [searchFlag, setSearchFlag] = useState("");

  const convertedCity = cityMatcher(geo);

  let prevDate = "";
  useEffect(() => {
    if (date !== "" && prevDate !== date) {
      prevDate = date;
    }
    console.log("prevDate value", prevDate);
  }, [date]);

  const resetInput = () => {
    setGuestCount(0);
    setGuestCount(0);
    setDate("");
    setTime("12:00");
    setDynamicSearchInput("");
    setSearchFlag("");
  };

  const search = () => {
    if (!dynamicSearchInput) return;
    router.push({
      pathname: "/search",
      query: {
        city: convertedCity,
        date: date.toString(),
        time: time,
        party_size: guestCount,
        search_term: dynamicSearchInput,
        search_flag: searchFlag,
        p: 1,
      },
    });
    resetInput();
  };

  const handleFieldSelected = (
    guest = false,
    date = false,
    time = false,
    dynamicSearch = false
  ) => {
    console.log("handleFieldSelected fired");
    setSearchBarBgGray(true);
    setGuestSelected(guest);
    setDateSelected(date);
    setTimeSelected(time);
    setDynamicSearchSelected(dynamicSearch);
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

  const handleCalendarSelect = (selectedDate) => {
    const selectedDay = selectedDate.getDate();
    const selectedMonth = selectedDate.getMonth();
    const selectedYear = selectedDate.getFullYear();
    const formattedSelectedDate = format(
      new Date(selectedYear, selectedMonth, selectedDay),
      "dd-MM-yyyy"
    );
    setDate(formattedSelectedDate);
  };

  const handleCalendarClick = () => {
    // console.log(calendarRef.current);
    if (prevDate !== "" && prevDate === date) {
      calendarRef.current.click();
    }
  };
  // console.log(typeof date);
  // console.log("searchBarBgGray", searchBarBgGray);
  // console.log("guestSelected", guestSelected);
  // console.log("dateSelected", dateSelected);/
  // console.log("timeSelected", timeSelected);
  // console.log("dynamicSearchSelected", dynamicSearchSelected);

  return (
    <Fragment>
      <div className="absolute z-50 flex justify-center w-full mx-auto mt-4 top-16 ">
        <div
          className={`${
            searchBarBgGray && "bg-gray-100"
          } flex justify-center border-[0.3px] rounded-full border-slate-100 h-16`}
        >
          {/* ********************************************************* Guests Start ********************************************************* */}
          <Popover className="relative">
            {({ open }) => (
              <>
                <div
                  onClick={
                    !open
                      ? () => handleFieldSelected(true, false, false, false)
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

          {/* ********************************************************* Guests End ********************************************************* */}

          <div className="flex items-center">
            <h1 className="text-gray-200">|</h1>
          </div>

          {/* ********************************************************* Calendar date ********************************************************* */}

          <Popover className="relative">
            {({ open }) => (
              <>
                <div
                  onClick={
                    !open
                      ? () => handleFieldSelected(false, true, false, false)
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
                    <h3 ref={calendarRef}>Pick a Date</h3>
                    <p
                      className={
                        date === "" ? `text-sm text-gray-400` : `text-sm`
                      }
                    >
                      {date === "" ? `Add date` : date.toString()}
                    </p>
                  </Popover.Button>

                  <Popover.Panel className="absolute flex justify-center z-10 bg-white border-[0.3px] shadow-2xl rounded-2xl top-20 left-1 h-80 w-96 ">
                    <div className="" onClick={handleCalendarClick}>
                      <Calendar
                        date={new Date()}
                        minDate={new Date()}
                        color="#FD5B61"
                        onChange={handleCalendarSelect}
                      />
                    </div>
                  </Popover.Panel>
                  {/* {setSearchBarBgGray(open)}
                  {setDateSelected(open)} */}
                </div>
              </>
            )}
          </Popover>

          {/* ********************************************************* Calendar date end ********************************************************* */}

          <div className="flex items-center">
            <h1 className="text-gray-200">|</h1>
          </div>

          {/* ********************************************************* Timeslot Start ********************************************************* */}
          <Popover className="relative">
            {({ open }) => (
              <>
                <div
                  onClick={
                    !open
                      ? () => handleFieldSelected(false, false, true, false)
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
                    <p
                      className={
                        time === "" ? `text-sm text-gray-400` : `text-sm`
                      }
                    >
                      {time === "" ? `Choose Time` : time}
                    </p>
                  </Popover.Button>
                </div>

                <Popover.Panel className="absolute z-10 p-5 -mx-4 bg-white border-[0.3px] shadow-2xl rounded-2xl top-20 left-1">
                  <div className="grid grid-cols-2 overflow-scroll gap-x-4 gap-y-2 justify-items-center max-h-44 scrollbar-hide">
                    {bookingTimes.map((timeslot) => (
                      <button
                        onClick={() => setTime(timeslot)}
                        className="py-1 px-3 bg-white shadow-lg border-[0.5px] rounded-xl hover:bg-gray-200 transition ease-out active:scale-90 transform"
                      >
                        {timeslot}
                      </button>
                    ))}
                  </div>
                </Popover.Panel>
              </>
            )}
          </Popover>

          {/* ********************************************************* Timeslot End ********************************************************* */}

          <div className="flex items-center">
            <h1 className="text-gray-200">|</h1>
          </div>

          {/* ********************************************************* Location, cuisine or restaurant ********************************************************* */}

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
                    onClick={
                      !open
                        ? () => handleFieldSelected(false, false, false, true)
                        : () => {
                            setSearchBarBgGray(false);
                            setDynamicSearchSelected(false);
                          }
                    }
                  >
                    <Popover.Button className="flex flex-col items-start justify-center py-5 pr-4 rounded-full">
                      <h3 className="pl-5">Location, cuisine or restaurant</h3>
                      <p className="pl-5 text-sm text-gray-400">
                        {dynamicSearchInput !== ""
                          ? dynamicSearchInput
                          : `Where to next?`}
                      </p>
                    </Popover.Button>
                  </div>
                  <Popover.Panel className="absolute z-10 p-5 bg-white border-[0.3px] shadow-2xl rounded-2xl top-20 left-1">
                    <input
                      type="text"
                      placeholder="Start your search here"
                      value={dynamicSearchInput}
                      onChange={(e) => setDynamicSearchInput(e.target.value)}
                      className="px-8 py-2 mx-3 text-sm bg-gray-100 outline-none rounded-2xl"
                    />
                  </Popover.Panel>

                  <div
                    onClick={search}
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

          {/* ********************************************************* Location, cuisine or restaurant end ********************************************************* */}
        </div>
      </div>
    </Fragment>
  );
};

export default ActivatedSearchBar;
