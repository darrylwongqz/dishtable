import React, { Fragment, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Dialog, Transition } from "@headlessui/react";
import { mobileMenuModal } from "../../atoms/modalAtom";

import axios from "axios";
import Link from "next/link";
import { SearchIcon } from "@heroicons/react/outline";
import { cityMatcher, dateConverter } from "../../lib/searchBarUtils";
import { geoState } from "../../atoms/navAtom";

export default function MobileMenuModal() {
  const [open, setOpen] = useRecoilState(mobileMenuModal);
  const [dynamicSearchInput, setDynamicSearchInput] = useState("");
  const [geo, setGeo] = useRecoilState(geoState);

  const convertedCity = cityMatcher(geo);

  const [dynamicSearchResults, setDynamicSearchResults] = useState({
    locationList: [],
    cuisineList: [],
    restaurantNameList: [],
  });

  let defaultDate = new Date();
  const defaultTime = "13:00";

  const convertedDefaultDate = dateConverter(defaultDate);

  useEffect(() => {
    if (dynamicSearchInput !== "") {
      const fetchSuggestedSearch = async () => {
        try {
          const response = await axios
            .get(
              `https://api-dishtable-supa.herokuapp.com/api/restaurants/suggested?searchTerm=${dynamicSearchInput}&city=${convertedCity}`
            )
            .catch((error) => {});
          setDynamicSearchResults(response.data);
          // console.log(response.data);
        } catch (error) {
          console.log(error);
        }
      };

      fetchSuggestedSearch();
    } else {
      setDynamicSearchResults({
        locationList: [],
        cuisineList: [],
        restaurantNameList: [],
      });
    }
  }, [dynamicSearchInput]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div>
                <div>
                  <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full">
                    <SearchIcon
                      className="w-6 h-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Search for Restaurant, location, cuisine
                    </Dialog.Title>

                    <div className="mt-2">
                      <input
                        className="w-full py-2 text-center bg-gray-100 border-gray-100 focus:ring-0"
                        type="text"
                        value={dynamicSearchInput}
                        onChange={(e) => setDynamicSearchInput(e.target.value)}
                        placeholder="Type your search here"
                      />
                    </div>
                    <div className="flex flex-col mt-2 space-y-1">
                      {dynamicSearchResults?.restaurantNameList?.length > 0 && (
                        <div className="w-full text-center cursor-pointer">
                          <h3 className="py-2 text-white bg-red-600 rounded-md">
                            Restaurants
                          </h3>
                          <div className="flex flex-col w-full mt-2 space-y-2 overflow-scroll max-h-24 scrollbar-hide">
                            {dynamicSearchResults?.restaurantNameList?.map(
                              (result) => (
                                <Link
                                  key={result.id}
                                  href={`/restaurants/${result.id}`}
                                  className="w-full bg-gray-200"
                                >
                                  <div className="w-full py-1 transition duration-300 ease-out bg-gray-100 hover:bg-black hover:text-white">
                                    <a className="px-2 ">
                                      {result.restaurant_name}
                                    </a>
                                  </div>
                                </Link>
                              )
                            )}
                          </div>
                        </div>
                      )}

                      {/* cuisine list */}
                      {dynamicSearchResults?.cuisineList?.length > 0 && (
                        <div className="w-full text-center cursor-pointer">
                          <h3 className="py-2 text-white bg-red-600 rounded-md">
                            Cuisines
                          </h3>
                          <div className="flex flex-col w-full mt-2 space-y-2 overflow-scroll max-h-24 scrollbar-hide">
                            {dynamicSearchResults?.cuisineList?.map(
                              (result) => (
                                <Link
                                  key={result.id}
                                  href={`/search?city=${convertedCity}&date=${convertedDefaultDate}&time=${defaultTime}&party_size=2&search_term=${dynamicSearchInput}&search_flag=cuisine&p=1`}
                                  className="w-full bg-gray-200"
                                >
                                  <div className="w-full py-1 transition duration-300 ease-out bg-gray-100 hover:bg-black hover:text-white">
                                    <a className="px-2 ">
                                      {result.restaurant_cuisine[0]} -{" "}
                                      {result.restaurant_cuisine[1]}
                                    </a>
                                  </div>
                                </Link>
                              )
                            )}
                          </div>
                        </div>
                      )}
                      {/* location list */}
                      {dynamicSearchResults?.locationList?.length > 0 && (
                        <div className="w-full text-center cursor-pointer">
                          <h3 className="py-2 text-white bg-red-600 rounded-md">
                            Location
                          </h3>
                          <div className="flex flex-col w-full mt-2 space-y-2 overflow-scroll max-h-24 scrollbar-hide">
                            {dynamicSearchResults?.locationList?.map(
                              (result) => (
                                <Link
                                  key={result.id}
                                  href={`/search?city=${convertedCity}&date=${convertedDefaultDate}&time=${defaultTime}&party_size=2&search_term=${result.restaurant_location_city}&search_flag=location&p=1`}
                                  className="w-full bg-gray-200"
                                >
                                  <div className="w-full py-1 transition duration-300 ease-out bg-gray-100 hover:bg-black hover:text-white">
                                    <a className="px-2 ">
                                      {result.restaurant_location_country} -{" "}
                                      {result.restaurant_location_city}
                                    </a>
                                  </div>
                                </Link>
                              )
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
