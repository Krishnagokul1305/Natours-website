import { useLoaderData } from "react-router-dom";
import { getAllTours } from "../../../service/apiTours";
import TourCard from "../components/TourCard";
import NavBar from "../../../components/NavBar";
import { motion } from "framer-motion";
import { staggerContainer } from "../../../utils/motion";

function ToursOverview() {
  const tours = useLoaderData();
  console.log(tours);
  return (
    <>
      <NavBar />
      <motion.div
        className="flex justify-center items-center gap-16 my-10 flex-wrap mt-28"
        variants={staggerContainer(0.5, 0.5)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true, amount: 0.25 }}
      >
        {tours.map((tour, i) => (
          <TourCard key={tour.id} tour={tour} i={i} />
        ))}
      </motion.div>
    </>
  );
}

export default ToursOverview;
