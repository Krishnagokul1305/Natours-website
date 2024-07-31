import Button from "../../components/Button";

function HeroSection() {
  return (
    <section className="h-screen flex items-center justify-center hero-bg flex-col text-white">
      <p className="font-oswald tracking-[.12rem] sm:tracking-[0.2rem] text-sm  sm:text-lg md:text-2xl lg:text-4xl">
        UNFORGETTABLE TRAVEL AWAITS THE
      </p>
      <h1 className="font-extrabold text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[15rem] font-oswald leading-none mb-10">
        ADVENTURE
      </h1>
      <Button variant="primary" type="big" to="/tours">
        Go to Tours
      </Button>
    </section>
  );
}

export default HeroSection;