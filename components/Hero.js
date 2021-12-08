import Image from "next/image";
import HeroOverlay from "./HeroOverlay";

const Hero = () => {
  return (
    <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px] overflow-hidden">
      <Image
        src="/images/heroimg.png"
        layout="fill"
        objectFit="cover"
        className="transition duration-300 transform brightness-50 hover:scale-110"
      />
      <HeroOverlay />
    </div>
  );
};

export default Hero;
