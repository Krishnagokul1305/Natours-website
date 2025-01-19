import { motion } from "framer-motion";
import { staggerContainer, textVariant } from "../../../utils/motion";
import { TOUR_COVER } from "../../../../config";

function TourLander({ name, imageCover, summary }) {
  const handleExploreClick = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div
      className="h-screen bg-cover bg-center flex flex-col justify-center items-center text-white text-center px-5"
      style={{
        backgroundImage: `
          linear-gradient(
            0deg, 
            rgba(1, 1, 1, 0.548) 0%, 
            rgba(0, 0, 0, 0.201) 100%
          ),
          url('${TOUR_COVER}/${imageCover}')
        `,
      }}
      variants={staggerContainer(0.5, 0.5)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: true, amount: 0.25 }}
    >
      <motion.h1
        className="font-extrabold text-5xl sm:text-7xl lg:text-[6rem] xl:text-[6rem] font-oswald leading-none mb-5 md:mb-8 mt-44 md:mt-0"
        variants={textVariant(0.2)}
      >
        {name}
      </motion.h1>
      <motion.p
        className="text-xs mb-2 text-gray-100 md:text-lg"
        variants={textVariant(0.3)}
      >
        &quot; {summary} &quot;
      </motion.p>
      <motion.button
        variants={textVariant(0.3)}
        onClick={handleExploreClick}
        className="bg-white focus:ring-white rounded-full  focus:ring-offset-white text-gray-800 px-7 py-3 text-sm mt-5  transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-offset-2 font-bold flex flex-row items-center gap-2 hover:translate-y-[-4px] hover:shadow-lg"
      >
        Explore More
      </motion.button>
    </motion.div>
  );
}

export default TourLander;
//
