import TourCard from "../components/TourCard";
import NavBar from "../../../components/NavBar";
import { motion } from "framer-motion";
import { staggerContainer } from "../../../utils/motion";
import { useQuery } from "@tanstack/react-query";
import { getAllTours } from "../../../service/apiTours";
import LoaderMini from "../../../components/LoaderMini";

function ToursOverview() {
  const { data, isLoading } = useQuery({
    queryKey: ["tours"],
    queryFn: getAllTours,
  });
  return (
    <>
      <NavBar />
      {isLoading ? (
        <LoaderMini />
      ) : (
        <motion.div
          className="flex max-w-7xl mx-auto justify-center items-center gap-16 my-10 flex-wrap mt-28"
          variants={staggerContainer(0.5, 0.5)}
          initial="hidden"
          animate="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          {data.map((tour, i) => (
            <TourCard key={tour.id} tour={tour} i={i} />
          ))}
        </motion.div>
      )}
    </>
  );
}

export default ToursOverview;
