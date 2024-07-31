import ProcessCard from "./ProcessCard";
import bag from "../../assets/app-img/process/bag.png";
import calendar from "../../assets/app-img/process/calendar.png";
import flight from "../../assets/app-img/process/flight.png";
import route from "../../assets/app-img/process/route.png";

const trips = [
  {
    icon: route,
    title: "Trip Planning",
    description: "We plan on what to do during the trip days.",
  },
  {
    icon: calendar,
    title: "Trip Booking",
    description: "We plan on what to do during the trip days.",
  },
  {
    icon: bag,
    title: "Trip Preparation",
    description: "We plan on what to do during the trip days.",
  },
  {
    icon: flight,
    title: "Trip Experience",
    description: "We plan on what to do during the trip days.",
  },
];

function Process() {
  return (
    <div className="process py-40 h-auto ">
      <div className="text-center w-full relative h-fit">
        <h1 className="text-6xl font-bold  font-oswald tracking-widest text-white sm:text-7xl md:text-7xl lg:text-9xl">
          PROCESS
        </h1>
        <p className="text-sm tracking-[1px] md:tracking-[10px] md:text-md lg:text-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-800">
          HOW IT WORKS
        </p>
      </div>
      <div className="mx-auto flex justify-center mt-20">
        <div className="grid gap-10 md:gap-30 lg:gap-32 grid-cols-2 md:grid-cols-4">
          {trips.map((trip, index) => (
            <ProcessCard
              key={index}
              i={index}
              icon={trip.icon}
              title={trip.title}
              description={trip.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Process;
