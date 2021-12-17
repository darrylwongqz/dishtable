import Image from "next/image";
import { costConverter, cuisineColorParser } from "../lib/cardUtils";
import { useRouter } from "next/router";

const InfoCard = ({
  img,
  title,
  description,
  cost,
  cuisineType,
  city,
  country,
  id,
}) => {
  const router = useRouter();
  const convertedCost = costConverter(cost);
  const parsedCuisineStyleClass1 = cuisineColorParser(cuisineType[0]);
  const parsedCuisineStyleClass2 = cuisineColorParser(cuisineType[1]);

  const redirectToRestaurantDetailPage = () => {
    router.push(`restaurants/${id}`);
  };

  return (
    <div
      onClick={redirectToRestaurantDetailPage}
      className="flex px-4 pr-4 transition duration-200 ease-out border border-gray-200 shadow-lg cursor-pointer rounded-xl py-7 hover:opacity-80 hover:shadow-2xl "
    >
      <div className="relative flex-shrink-0 w-40 h-24 overflow-hidden rounded-2xl md:h-52 md:w-80 ">
        <Image
          src={img}
          layout="fill"
          objectFit="cover"
          className="transition duration-500 transform hover:scale-110"
        />
      </div>

      <div className="flex flex-col flex-grow pl-5">
        <div className="flex items-center">
          <h4 className="text-xl">{title}</h4>
          <p className="px-1 text-sm italic text-gray-600">
            {city === country ? `- ${city}` : `- ${city}, ${country}`}
          </p>
        </div>
        <div className="w-10 pt-2 border-b" />
        <div className="flex justify-start mt-2 space-x-2">
          <p
            className={`px-3 text-sm ${parsedCuisineStyleClass1}  rounded-full py-auto`}
          >
            {cuisineType[0]}
          </p>
          <p
            className={`px-3 text-sm ${parsedCuisineStyleClass2} rounded-full py-auto`}
          >
            {cuisineType[1]}
          </p>
        </div>
        <p className="flex-grow pt-2 text-sm text-gray-500 ">
          {description.substr(0, 100) + "..."}
        </p>
        <div className="flex items-end pt-2">
          <p className="flex items-center">{convertedCost}</p>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;

// ----------------------------------------------------------------
// Needed to put the below in comments or the colors won't load on nextjs hotloader
// const cuisineColorParser = (cuisineType) => {
//   switch (cuisineType) {
//     case "Italian":
//       return `text-white bg-green-800`;
//     case "Pizza":
//       return `text-white bg-red-700`;
//     case "Malaysian":
//       return `text-white bg-yellow-600`;
//     case "Asian":
//       return `text-white bg-red-500`;
//     case "International":
//       return `text-white bg-blue-700`;
//     case "Cafe":
//       return `text-white bg-red-400`;
//     case "Chinese":
//       return `text-white bg-red-600`;
//     case "Teochew":
//       return `text-black bg-green-200`;
//     case "Middle Eastern":
//       return `text-white bg-yellow-900`;
//     case "Halal":
//       return `text-black bg-green-400`;
//     case "Burgers":
//       return `text-white bg-yellow-500`;
//     case "American":
//       return `text-white bg-blue-700`;
//     case "South Asian":
//       return `text-black bg-green-200`;
//     case "Indian":
//       return `text-white bg-yellow-800`;
//     case "Singaporean":
//       return `text-white bg-red-400`;
//     case "Seafood":
//       return `text-black bg-blue-300`;
//     case "Korean":
//       return `text-white bg-red-800`;
//     case "East Asian":
//       return `text-black bg-green-300`;
//     case "Sicilian":
//       return `text-white bg-pink-800`;
//     case "Breakfast":
//       return `text-black bg-blue-200`;
//     case "Continental":
//       return `text-white bg-purple-600`;
//     case "English":
//       return `text-white bg-blue-500`;
//     case "Turkish":
//       return `text-white bg-red-900`;
//     case "Mediterranean":
//       return `text-white bg-blue-700`;
//     case "Spanish":
//       return `text-black bg-red-200`;
//     case "Fusion":
//       return `text-white bg-indigo-800`;
//     case "Modern French":
//       return `text-black bg-yellow-300`;
//     case "French":
//       return `text-black bg-yellow-200`;
//     case "Sandwich":
//       return `text-white bg-green-500`;
//     case "Quiche":
//       return `text-white bg-gray-500`;
//     case "Algerian":
//       return `text-black bg-gray-200`;
//     case "North African":
//       return `text-white bg-yellow-800`;
//     case "Moroccan":
//       return `text-black bg-blue-200`;
//     default:
//       return `text-white bg-black`;
//   }
// };
