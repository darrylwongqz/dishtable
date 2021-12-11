import { CurrencyDollarIcon } from "@heroicons/react/solid";

export const costConverter = (cost) => {
  switch (cost) {
    case 1:
      return <CurrencyDollarIcon className="h-6" />;
    case 2:
      return (
        <div className="flex space-x-1">
          <CurrencyDollarIcon className="h-6" />
          <CurrencyDollarIcon className="h-6" />
        </div>
      );
    case 3:
      return (
        <div className="flex">
          <CurrencyDollarIcon className="h-6" />
          <CurrencyDollarIcon className="h-6" />
          <CurrencyDollarIcon className="h-6" />
        </div>
      );
    case 4:
      return (
        <div className="flex">
          <CurrencyDollarIcon className="h-6 " />
          <CurrencyDollarIcon className="h-6" />
          <CurrencyDollarIcon className="h-6" />
          <CurrencyDollarIcon className="h-6" />
        </div>
      );
    default:
      break;
  }
};

export const cuisineColorParser = (cuisineType) => {
  switch (cuisineType) {
    case "Italian":
      return `text-white bg-green-800`;
    case "Pizza":
      return `text-white bg-red-700`;
    case "Malaysian":
      return `text-white bg-yellow-600`;
    case "Asian":
      return `text-white bg-red-500`;
    case "International":
      return `text-white bg-blue-700`;
    case "Cafe":
      return `text-white bg-red-400`;
    case "Chinese":
      return `text-white bg-red-600`;
    case "Teochew":
      return `text-black bg-green-200`;
    case "Middle Eastern":
      return `text-white bg-yellow-900`;
    case "Halal":
      return `text-black bg-green-400`;
    case "Burgers":
      return `text-white bg-yellow-500`;
    case "American":
      return `text-white bg-blue-700`;
    case "South Asian":
      return `text-black bg-green-200`;
    case "Indian":
      return `text-white bg-yellow-800`;
    case "Singaporean":
      return `text-white bg-red-400`;
    case "Seafood":
      return `text-black bg-blue-300`;
    case "Korean":
      return `text-white bg-red-800`;
    case "East Asian":
      return `text-black bg-green-300`;
    case "Sicilian":
      return `text-white bg-pink-800`;
    case "Breakfast":
      return `text-black bg-blue-200`;
    case "Continental":
      return `text-white bg-purple-600`;
    case "English":
      return `text-white bg-blue-500`;
    case "Turkish":
      return `text-white bg-red-900`;
    case "Mediterranean":
      return `text-white bg-blue-700`;
    case "Spanish":
      return `text-black bg-red-200`;
    case "Fusion":
      return `text-white bg-indigo-800`;
    case "Modern French":
      return `text-black bg-yellow-300`;
    case "French":
      return `text-black bg-yellow-200`;
    case "Sandwich":
      return `text-white bg-green-500`;
    case "Quiche":
      return `text-white bg-gray-500`;
    case "Algerian":
      return `text-black bg-gray-200`;
    case "North African":
      return `text-white bg-yellow-800`;
    case "Moroccan":
      return `text-black bg-blue-200`;
    default:
      return `text-white bg-black`;
  }
};
