import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "../../../utils/motion";
import { TOUR_IMAGES } from "../../../../config";

function TourAbout({ description, name, images }) {
  return (
    <motion.div
      className="px-5 py-20  "
      variants={staggerContainer(0.5, 0.5)}
      initial="hidden"
      whileInView={"show"}
      id="about"
      viewport={{ once: true, amount: 0.25 }}
    >
      <motion.div
        className="space-y-7 max-w-7xl text-center mx-auto justify-center md:px-10 px-5"
        variants={fadeIn("right", "spring", 0.5, 0.75)}
      >
        <h1 className="text-2xl font-bold text-ptext font-oswald tracking-widest head text-center">
          About {name}
        </h1>
        <p className="text-gray-600 leading-5 md:leading-8 text-sm md:text-base">
          {description}
        </p>
      </motion.div>

      <div className="mt-5 md:mt-10 space-y-5 mx-auto">
        <motion.div className=" flex items-center gap-10 flex-col md:flex-row justify-center">
          {images.map((img, i) => (
            <motion.img
              key={i}
              src={`${TOUR_IMAGES}/${img}`}
              className="h-64"
              variants={fadeIn("right", "spring", i * 0.5, 0.75)}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default TourAbout;
