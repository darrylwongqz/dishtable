import Image from "next/image";

const MediumCard = ({ img, title }) => {
  return (
    // <div className="transition duration-300 ease-out transform cursor-pointer hover:scale-105">
    <div>
      <div className="relative overflow-hidden transition duration-300 ease-out transform cursor-pointer rounded-xl h-60 w-80 hover:scale-105">
        <Image
          src="/images/heroimg.png"
          layout="fill"
          objectFit="cover"
          className="transition duration-500 ease-out transform hover:scale-110"
        />
      </div>
      <h3 className="mt-3 text-lg">restaurant title</h3>
    </div>
  );
};

export default MediumCard;
