import Image from "next/image";
import { costConverter } from "../lib/cardUtils";
import { cityMatcher, dateConverter } from "../lib/searchBarUtils";
import Link from "next/link";
import { activatedNavState } from "../atoms/navAtom";
import { useRecoilState } from "recoil";

const FeatureCard = ({ cuisineType, img, geo }) => {
  const [isSearchActivated, setIsSearchActivated] =
    useRecoilState(activatedNavState);
  let defaultDate = new Date();
  let defaultTime = "13:00";

  const convertedDefaultDate = dateConverter(defaultDate);
  const convertedCity = cityMatcher(geo);

  return (
    <Link
      href={`/search?city=${convertedCity}&date=${convertedDefaultDate}&time=${defaultTime}&party_size=2&search_term=${cuisineType}&search_flag=cuisine&p=1`}
    >
      <div onClick={() => setIsSearchActivated(false)} className="relative ">
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
    </Link>
  );
};

export default FeatureCard;
