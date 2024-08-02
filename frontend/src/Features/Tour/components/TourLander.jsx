/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { fadeIn, staggerContainer, textVariant } from "../../../utils/motion";

function TourLander({ name, imageCover, summary, images }) {
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
          url('http://127.0.0.1:8000/api/v1/public/img/toursCover/${imageCover}')
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
        " {summary} "
      </motion.p>
      <div className="mt-5 md:mt-10 space-y-10">
        <motion.h1
          className="font-bold  gallery-title relative w-fit m-auto"
          variants={textVariant(0.4)}
        >
          Top Destinations
        </motion.h1>
        <motion.div className=" flex items-center gap-10 xl:overflow-visible overflow-scroll">
          {images.map((img, i) => (
            <motion.img
              key={i}
              src={`http://127.0.0.1:8000/api/v1/public/img/toursImages/${img}`}
              className="h-64"
              variants={fadeIn("right","spring",i*0.5,0.75)}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default TourLander;
//
