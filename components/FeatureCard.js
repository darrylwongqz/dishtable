import Image from "next/image";
import { costConverter } from "../lib/cardUtils";
import Link from "next/link";
import { activatedNavState } from "../atoms/navAtom";
import { useRecoilState } from "recoil";

const FeatureCard = ({ id, img, title, cost, description }) => {
  const [isSearchActivated, setIsSearchActivated] =
    useRecoilState(activatedNavState);
  const truncatedTitle = title.substring(0, 30);

  const convertedCost = costConverter(cost);

  return (
    <Link href={`/restaurants/${id}`}>
      <div onClick={() => setIsSearchActivated(false)} className="relative ">
        <div className="relative overflow-hidden transition duration-300 ease-out transform cursor-pointer rounded-xl h-60 w-80 hover:scale-105 hover:opacity-70">
          <Image
            src={img[0] || "/images/heroimg.jpg"}
            layout="fill"
            objectFit="cover"
            className="transition duration-500 ease-out transform hover:scale-110 brightness-95"
          />
        </div>
        <p className="absolute text-yellow-200 bg-black rounded-full top-3 right-2 ">
          {convertedCost}
        </p>
        <h3 className="absolute z-20 flex-wrap px-2 text-lg font-semibold text-white bg-red-600 shadow-2xl rounded-xl h-7 left-3 bottom-3">
          {title.length < 30 ? title : truncatedTitle + "..."}
        </h3>
      </div>
    </Link>
  );
};

export default FeatureCard;
