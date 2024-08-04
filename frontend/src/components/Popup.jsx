import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function Popup({ message = "unauthorized" }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false); 
    }, 3000);

    return () => clearTimeout(timer); 
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <motion.div
      className="fixed z-30 top-1 left-1/2 transform -translate-x-1/2 px-10 py-3 md:text-lg text-sm bg-white text-white shadow-lg rounded-full error flex items-center gap-2"
      initial={{ opacity: 0, y: -50,x:-100 }}
      animate={{ opacity: 1, y: 20 ,x:-100}}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      {message}
      <svg
        fill="#ffff"
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="24px"
        viewBox="0 0 478.125 478.125"
        xmlSpace="preserve"
      >
        <g>
          <g>
            <g>
              <circle cx="239.904" cy="314.721" r="35.878" />
              <path
                d="M256.657,127.525h-31.9c-10.557,0-19.125,8.645-19.125,19.125v101.975c0,10.48,8.645,19.125,19.125,19.125h31.9
                c10.48,0,19.125-8.645,19.125-19.125V146.65C275.782,136.17,267.138,127.525,256.657,127.525z"
              />
              <path
                d="M239.062,0C106.947,0,0,106.947,0,239.062s106.947,239.062,239.062,239.062c132.115,0,239.062-106.947,239.062-239.062
                S371.178,0,239.062,0z M239.292,409.734c-94.171,0-170.595-76.348-170.595-170.596c0-94.248,76.347-170.595,170.595-170.595
                s170.595,76.347,170.595,170.595C409.887,333.387,333.464,409.734,239.292,409.734z"
              />
            </g>
          </g>
        </g>
      </svg>
    </motion.div>
  );
}

export default Popup;
