import Image from "next/image";
import { costConverter } from "../utils/utils";

const FeatureCard = ({ cuisineType, img }) => {
  return (
    <div className="relative ">
      <div className="relative overflow-hidden transition duration-300 ease-out transform cursor-pointer rounded-xl h-80 w-80 hover:scale-105 hover:opacity-70">
        <Image
          src={img || "/images/heroimg.jpg"}
          layout="fill"
          objectFit="cover"
          className="transition duration-500 ease-out transform hover:scale-110 brightness-95"
        />
      </div>

      <h3 className="absolute z-20 flex-wrap px-2 text-lg font-semibold text-black bg-yellow-200 bg-opacity-100 shadow-2xl rounded-xl h-7 left-3 bottom-3">
        {cuisineType}
      </h3>
    </div>
  );
};

export default FeatureCard;
