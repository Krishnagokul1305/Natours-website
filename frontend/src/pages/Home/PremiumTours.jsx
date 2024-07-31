import { Link } from "react-router-dom";
import TourCard from "../../Features/Tour/components/TourCard";

function PremiumTours({ tours }) {
  if (!tours) return null;
  return (
    <section className="h-auto py-20">
      <div className="text-center w-full relative h-fit">
        <h1 className="text-2xl font-bold text-gray-700 font-oswald tracking-widest head">
          OUR POPULAR TOURS
        </h1>
        <p className="mt-3">
          <Link to="/tours">View all &rarr;</Link>
        </p>
      </div>

      <div className="flex justify-center items-center gap-10 my-10 flex-wrap mt-16">
        {tours.map((tour, i) => (
          <TourCard key={i} tour={tour} />
        ))}
      </div>
    </section>
  );
}

export default PremiumTours;
