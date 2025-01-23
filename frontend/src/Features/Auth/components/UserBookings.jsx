import {  useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUserBookings } from "../../../service/apiBookings";
import ReservationCard from "../../Booking/components/ReservationCard";
import ReservationSkeleton from "../../../components/ReservationSkeleton";

function UserBookings() {
  let { id } = useParams();

  const { data: tourBookings, isLoading } = useQuery({
    queryKey: ["userBookings"],
    queryFn: () => getUserBookings(id),
  });

  return (
    <div className="px-10 py-5 space-y-5 bg-white min-h-[40vh] w-[95%] m-auto rounded-md overflow-x-scroll">
      <h1 className="font-extrabold text-ptext">Your Bookings</h1>

      {!tourBookings && !isLoading && (
        <p className="font-extrabold text-ptext text-center mt-5">
          No bookings yet!
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mx-auto">
        {!isLoading &&
          tourBookings.map((booking) => (
            <ReservationCard key={booking._id} booking={booking} />
          ))}
        {isLoading && <ReservationSkeleton count={5} />}
      </div>
    </div>
  );
}

export default UserBookings;
