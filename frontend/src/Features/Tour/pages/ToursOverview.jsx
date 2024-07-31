import { useLoaderData } from "react-router-dom";
import { getAllTours } from "../../../service/apiTours";
import TourCard from "../components/TourCard";
import NavBar from "../../../components/NavBar";

function ToursOverview() {
  const tours = useLoaderData();
  console.log(tours);
  return (
    <>
      <NavBar />
      <div className="flex justify-center items-center gap-16 my-10 flex-wrap mt-28">
        {tours.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
    </>
  );
}

export async function loader({ params }) {
  const tours = await getAllTours();
  return tours;
}

export default ToursOverview;
