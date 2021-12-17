import Image from "next/image";
import { useRecoilState } from "recoil";
import { activatedNavState } from "../atoms/navAtom";

const LargeCard = ({ img, title, description, buttonText }) => {
  const [isSearchActivated, setIsSearchActivated] =
    useRecoilState(activatedNavState);
  return (
    <section className="relative py-16 cursor-pointer">
      <div className="relative overflow-hidden transition duration-300 ease-out transform rounded-2xl hover:scale-105  h-96 min-w-[300px]">
        <Image
          src={img}
          layout="fill"
          objectFit="cover"
          className="transition duration-500 ease-out transform hover:scale-110 brightness-95"
        />
      </div>

      <div className="absolute top-32 left-12 ">
        <div className="p-4 bg-gray-900 bg-opacity-75 rounded-2xl">
          <h3 className="w-64 mb-3 text-4xl text-white">{title}</h3>
          <p className="text-white">{description}</p>
        </div>

        <button
          onClick={() => setIsSearchActivated(!isSearchActivated)}
          className="px-6 py-2 mt-5 text-sm text-white transition duration-150 ease-out transform bg-red-600 rounded-lg hover:shadow-xl hover:font-semibold hover:scale-110 active:scale-90"
        >
          {buttonText}
        </button>
      </div>
    </section>
  );
};

export default LargeCard;
