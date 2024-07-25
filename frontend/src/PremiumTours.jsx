import TourCard from "./TourCard";

const tours = [{}, {}, {}];

function PremiumTours() {
  return (
    <section className="h-screen">
      <div className="flex justify-center items-center gap-10 my-10 flex-wrap ">
        {tours.map((tour, i) => (
          <TourCard key={i} />
        ))}
      </div>
    </section>
  );
}

export default PremiumTours;