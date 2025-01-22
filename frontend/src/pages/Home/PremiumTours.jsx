import { Link } from "react-router-dom";
import TourCard from "../../Features/Tour/components/TourCard";
import { motion } from "framer-motion";
import { staggerContainer, textVariant } from "../../utils/motion";
import { getPopularTour } from "../../service/apiTours";
import { useQuery } from "@tanstack/react-query";
import CardSkeleton from "../../components/CardSkeleton";

function PremiumTours() {
  const { data, isLoading } = useQuery({
    queryKey: ["popularTours"],
    queryFn: getPopularTour,
  });
  return (
    <motion.section
      className="h-auto min-h-[20vh] py-20 space-y-5"
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

      {isLoading ? (
        <CardSkeleton />
      ) : (
        <motion.div
          className="flex justify-center items-center gap-10 my-10 flex-wrap mt-16"
          variants={staggerContainer(0.5, 0.5)}
        >
          {data.map((tour, i) => (
            <TourCard key={i} tour={tour} i={i} />
          ))}
        </motion.div>
      )}
    </motion.section>
  );
}

export default PremiumTours;
