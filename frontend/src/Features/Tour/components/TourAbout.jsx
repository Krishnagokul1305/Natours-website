import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "../../../utils/motion";

function TourAbout({ img, description, name }) {
  return (
    <motion.div
      className="px-5 py-20 flex flex-wrap flex-col md:flex-row "
      variants={staggerContainer(0.5, 0.5)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: true, amount: 0.25 }}
    >
      <motion.div className="space-y-7 max-w-[50rem] mx-auto flex-1 flex item flex-col justify-center md:px-10 px-5" variants={fadeIn("right","spring",0.5,0.75)}>
        <h1 className="text-2xl font-bold text-ptext font-oswald tracking-widest head text-center">
          About {name}
        </h1>
        <p className="text-gray-600 leading-5 md:leading-8 text-sm md:text-base">
          {description}
        </p>
      </motion.div>
      <motion.div className="mt-10 md:w-1/2"  variants={fadeIn("left","spring",0.5,0.75)}>
        <img
          src={`http://127.0.0.1:8000/api/v1/public/img/toursCover/${img}`}
          alt=""
          className="h-auto w-[90%] object-contain m-auto"
        />
      </motion.div>
    </motion.div>
  );
}

export default TourAbout;
