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
