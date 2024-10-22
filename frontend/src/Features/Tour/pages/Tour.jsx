import { useLoaderData, useNavigate } from "react-router-dom";
import TourLander from "../components/TourLander";
import TourAbout from "../components/TourAbout";
import TourReviews from "../components/TourReviews";
import TourBooking from "../components/TourBooking";
import TourTimeLine from "../components/TourTimeLine";
import { lArrow } from "../../../assets";
import { motion } from "framer-motion";

function Tour() {
  const tour = useLoaderData();
  const navigate = useNavigate();
  return (
    <motion.div
      className="font-poppins overflow-x-hidden"
    >
      <button
        className="absolute top-5 left-5 bg-white w-[50px] h-[50px] rounded-full"
        onClick={() => navigate(-1)}
      >
        <img src={lArrow} alt="" className="w-[24px] m-auto" />
      </button>
      <TourLander
        name={tour.name}
        imageCover={tour.imageCover}
        summary={tour.summary}
        images={tour.images}
      />
      <TourAbout
        name={tour.name}
        description={tour.description}
        duration={tour.duration}
        maxGroupSize={tour.maxGroupSize}
        img={tour.imageCover}
        place={tour.startLocation.description}
      />
      <TourTimeLine
        locations={tour.locations}
        startLocation={tour.startLocation}
      />
      <TourReviews
        ratingsAverage={tour.ratingsAverage}
        ratingsQuantity={tour.ratingsQuantity}
        reviews={tour.reviews}
      />
      <TourBooking
        price={tour.price}
        startDates={tour.startDates}
        locations={tour.locations}
        img={tour.imageCover}
        tourId={tour.id}
      />
    </motion.div>
  );
}



export default Tour;
