import Button from "../../components/Button";
import { motion } from "framer-motion";
import { staggerContainer, textVariant } from "../../utils/motion";

function HeroSection() {

  return (
    <motion.section
      className="h-screen flex items-center justify-center hero-bg flex-col text-white"
      variants={staggerContainer(0.5, 0.5)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: true, amount: 0.25 }}
    >
      <motion.p
        className="font-oswald tracking-[.12rem] sm:tracking-[0.2rem] text-sm  sm:text-lg md:text-2xl lg:text-4xl"
        variants={textVariant(0.2)}
      >
        UNFORGETTABLE TRAVEL AWAITS THE
      </motion.p>
      <motion.h1
        className="font-extrabold text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[15rem] font-oswald leading-none mb-10"
        variants={textVariant(0.4)}
      >
        ADVENTURE
      </motion.h1>
      <motion.div variants={textVariant(0.6)}>
        <Button variant="primary" type="big" to="/tours">
          Go to Tours
        </Button>
      </motion.div>
    </motion.section>
  );
}

export default HeroSection;
