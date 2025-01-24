import TourCard from "../components/TourCard";
import NavBar from "../../../components/NavBar";
import { motion } from "framer-motion";
import { staggerContainer, textVariant } from "../../../utils/motion";
import { useQuery } from "@tanstack/react-query";
import { getAllTours } from "../../../service/apiTours";
import CardSkeleton from "../../../components/CardSkeleton";
import Footer from "../../../components/Footer";

function ToursOverview() {
  const { data, isLoading } = useQuery({
    queryKey: ["tours"],
    queryFn: getAllTours,
  });
  return (
    <>
      <NavBar />

      <div className="relative  h-screen w-full">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1439694458393-78ecf14da7f9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
          }}
        ></div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80"></div>

        {/* Hero Section */}
        <motion.div
          className="relative flex flex-col items-center justify-center h-full text-center text-white"
          variants={staggerContainer(0.5, 0.5)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <motion.p
            className="text-lg uppercase tracking-wide font-oswald"
            variants={textVariant(0.2)}
          >
            Let us plan you a perfect
          </motion.p>
          <motion.h1
            className="font-extrabold text-7xl sm:text-8xl md:text-9xl lg:text-[8rem] xl:text-[10rem] font-oswald leading-none mb-10"
            variants={textVariant(0.3)}
          >
            Explore Trip
          </motion.h1>
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: 10 }}
            className="absolute bottom-10 cursor-pointer"
            transition={{
              repeat: Infinity,
              duration: 1.5,
              repeatType: "reverse",
            }}
            onClick={() =>
              window.scrollTo({
                top: document.getElementById("tours").offsetTop,
                behavior: "smooth",
              })
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="white"
              className="w-8 h-8 mt-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
      <motion.div
        className="my-20 space-y-7"
        id="tours"
        variants={staggerContainer(0.5, 0.5)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <motion.h1
          className="text-2xl font-bold text-ptext font-oswald tracking-widest head text-center"
          variants={textVariant(0.2)}
        >
          Our Tours
        </motion.h1>
        <motion.div variants={textVariant(0.2)} className="p-5">
          
          {isLoading ? (
            <CardSkeleton size={6} />
          ) : (
            <div className="flex max-w-7xl mx-auto justify-center items-center gap-16 flex-wrap">
              {data.map((tour, i) => (
                <TourCard key={tour.id} tour={tour} i={i} />
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
      <Footer />
    </>
  );
}

export default ToursOverview;
