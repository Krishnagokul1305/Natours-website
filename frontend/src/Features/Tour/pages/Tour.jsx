import { useNavigate, useParams } from "react-router-dom";
import TourLander from "../components/TourLander";
import TourAbout from "../components/TourAbout";
import TourReviews from "../components/TourReviews";
// import TourBooking from "../components/TourBooking";

import { lArrow } from "../../../assets";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getTourById } from "../../../service/apiTours";
import TourDestinationMap from "../components/TourDestinationMap";
import Footer from "../../../components/Footer";
import Loader from "../../../components/Loader";
import BookingForm from "../../Booking/components/BookingForm";
import { useUsers } from "../../Auth/hooks/useUser";

function Tour() {
  const { id } = useParams();
 
  const { data: tour, isLoading } = useQuery({
    queryKey: ["tour", id],
    queryFn: () => getTourById(id),
  });
  const navigate = useNavigate();
  const { data, isLoading: userLoading } = useUsers();
  if (isLoading || userLoading) return <Loader />;
  return (
    <motion.div className="font-poppins overflow-x-hidden">
      <button
        className="absolute top-5 left-5 bg-white w-[50px] h-[50px] rounded-full"
        onClick={() => navigate("/tours")}
      >
        <img src={lArrow} alt="" className="w-[24px] m-auto" />
      </button>
      <TourLander
        name={tour.name}
        imageCover={tour.imageCover}
        summary={tour.summary}
      />
      <TourAbout
        name={tour.name}
        description={tour.description}
        duration={tour.duration}
        maxGroupSize={tour.maxGroupSize}
        img={tour.imageCover}
        images={tour.images}
        place={tour.startLocation.description}
      />
      <div className="max-w-7xl mx-auto p-5">
        <h1 className="text-2xl font-bold text-ptext mb-7 font-oswald tracking-widest head text-center">
          Destinations
        </h1>
        <TourDestinationMap locations={tour.locations} />
      </div>
{/*       <TourReviews
        ratingsAverage={tour.ratingsAverage}
        ratingsQuantity={tour.ratingsQuantity}
        reviews={tour.reviews}
        data={data}
      /> */}
      <BookingForm user={data} tourPrice={tour.price} tourId={tour._id} />
      <Footer />
    </motion.div>
  );
}

export default Tour;
