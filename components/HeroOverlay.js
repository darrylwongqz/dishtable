const HeroOverlay = () => {
  return (
    <div className="absolute w-full text-center top-1/3">
      <p className="mb-5 text-5xl font-bold tracking-wide text-white font-cookie sm:text-7xl">
        It's time to treat yourself.
      </p>

      <button className="px-10 py-4 my-3 font-bold text-red-600 transition duration-150 ease-out transform bg-white rounded-full shadow-md hover:scale-105 hover:shadow-xl active:scale-90">
        Book Now
      </button>
    </div>
  );
};

export default HeroOverlay;
