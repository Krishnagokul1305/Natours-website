import { Link, useRouteError } from "react-router-dom";
import TourCard from "../../Features/Tour/components/TourCard";
import { motion } from "framer-motion";
import { staggerContainer, textVariant } from "../../utils/motion";

function PremiumTours({ tours }) {
  if (!tours) return null;
  return (
    <motion.section
      className="h-auto py-20"
      variants={staggerContainer(0.5, 0.5)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: true, amount: 0.25 }}
    >
      <div className="text-center w-full relative h-fit">
        <motion.h1
          className="text-2xl font-bold text-gray-700 font-oswald tracking-widest head"
          variants={textVariant(0.1)}
        >
          OUR POPULAR TOURS
        </motion.h1>
        <motion.p className="mt-3" variants={textVariant(0.17)}>
          <Link to="/tours">View all &rarr;</Link>
        </motion.p>
      </div>

      {tours.length ? (
        <motion.div
          className="flex justify-center items-center gap-10 my-10 flex-wrap mt-16"
          variants={staggerContainer(0.5, 0.5)}
        >
          {tours.map((tour, i) => (
            <TourCard key={i} tour={tour} i={i} />
          ))}
        </motion.div>
      ) : (
        <p className="text-center my-5"> failed to fetch data 🥲</p>
      )}
    </motion.section>
  );
}

export default PremiumTours;
