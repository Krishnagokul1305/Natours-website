import ProcessCard from "./ProcessCard";
import bag from "../../assets/app-img/process/bag.png";
import calendar from "../../assets/app-img/process/calendar.png";
import flight from "../../assets/app-img/process/flight.png";
import route from "../../assets/app-img/process/route.png";
import { motion } from "framer-motion";
import { staggerContainer, textVariant } from "../../utils/motion";

const trips = [
  {
    icon: route,
    title: "Trip Planning",
    description: "We help create an itinerary tailored to your needs.",
  },
  {
    icon: calendar,
    title: "Trip Booking",
    description: "We handle reservations to ensure a smooth journey.",
  },
  {
    icon: bag,
    title: "Trip Preparation",
    description: "We assist with packing lists and travel essentials.",
  },
  {
    icon: flight,
    title: "Trip Experience",
    description: "We ensure memorable moments throughout your trip.",
  },
];

function Process() {
  return (
    <motion.div
      className="process py-40 h-auto "
      variants={staggerContainer(0.2, 0.5)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: true, amount: 0.25 }}
    >
      <motion.div
        className="text-center w-full relative h-fit"
        variants={textVariant(0.1)}
      >
        <h1 className="text-6xl font-bold  font-oswald tracking-widest text-white sm:text-7xl md:text-7xl lg:text-9xl">
          PROCESS
        </h1>
        <p className="text-sm tracking-[1px] md:tracking-[10px] md:text-md lg:text-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-800">
          HOW IT WORKS
        </p>
      </motion.div>
      <div className="mx-auto flex justify-center mt-20">
        <motion.div
          className="grid gap-10 md:gap-30 lg:gap-32 grid-cols-2 md:grid-cols-4"
          variants={staggerContainer(0.5, 0.5)}
        >
          {trips.map((trip, index) => (
            <ProcessCard
              key={index}
              i={index}
              icon={trip.icon}
              title={trip.title}
              description={trip.description}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Process;
