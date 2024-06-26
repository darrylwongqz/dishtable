import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
// import getCenter from "geolib/es/getCenter";
import Image from "next/image";

const Map = ({ searchResults }) => {
  const [selectedLocation, setSelectedLocation] = useState({});

  //transform search result object to pass into e.g. { latitude: 51.5103, longitude: 7.49347 } for geolib

  //   const coordinates = searchResults.map((result) => ({
  //     longitude: result.restaurant_location_lat,
  //     latitude: result.restaurant_location_long,
  //   }));

  // The latitude and longitude of the center of locations coordinates
  //   const center = getCenter(coordinates);

  //   "restaurant_location_lat": 1.311199,
  // "restaurant_location_long": 103.8611239,

  // const firstRestaurantLat = parseFloat(searchResults.restaurants[0].restaurant_location_lat)
  // const firstRestaurantLong = parseFloat(
  //   searchResults.restaurants[0].restaurant_location_long
  // )

  // console.log(searchResults);

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    // latitude: center.latitude,
    // longitude: center.longitude,
    latitude: parseFloat(searchResults.restaurants[0].restaurant_location_lat),
    longitude: parseFloat(
      searchResults.restaurants[0].restaurant_location_long
    ),
    zoom: 13,
  });

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/darrylwongqz/ckx214yrg33wr15p9ki0ii1h1"
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      {searchResults?.restaurants.map((result) => (
        <div key={result.restaurant_location_long}>
          <Marker
            longitude={parseFloat(result.restaurant_location_long)}
            latitude={parseFloat(result.restaurant_location_lat)}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p
              role="img"
              onClick={() => setSelectedLocation(result)}
              className="text-2xl cursor-pointer animate-bounce"
              aria-label="push-pin"
            >
              📌
            </p>
          </Marker>

          {/* Popup that should show if we click on a Marker */}
          {selectedLocation.restaurant_location_long ===
          result.restaurant_location_long ? (
            <Popup
              onClose={() => setSelectedLocation({})}
              closeOnClick={true}
              latitude={parseFloat(result.restaurant_location_lat)}
              longitude={parseFloat(result.restaurant_location_long)}
              className="relative overflow-hidden rounded-lg"
            >
              {/* {result.restaurant_name} */}
              <div className="w-40 h-24">
                <Image
                  src={result.restaurant_image[0]}
                  objectFit="cover"
                  layout="fill"
                />
                <h2 className="absolute px-2 text-white bg-red-600 rounded-md bottom-2">
                  {result.restaurant_name}
                </h2>
              </div>
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
};

export default Map;
