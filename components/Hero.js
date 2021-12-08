import Image from "next/image";

const Hero = () => {
  return (
    <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px]">
      <Image src="/images/heroimg.png" layout="fill" objectFit="cover" />
    </div>
  );
};

export default Hero;
