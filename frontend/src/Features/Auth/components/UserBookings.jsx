import { formatCurrency } from "../../../utils/helper";
import Button from "../../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import TableSkeleton from "../../../components/TableSkeleton";
import { useQuery } from "@tanstack/react-query";
import { getUserBookings } from "../../../service/apiBookings";

function UserBookings() {
  const navigate = useNavigate();
  let { id } = useParams();
  console.log(id);
  const { data: tourBookings, isLoading } = useQuery({
    queryKey: ["userBookings"],
    queryFn: () => getUserBookings(id),
  });
  return (
    <div className="px-10 py-5 space-y-5 bg-white min-h-[40vh] w-[95%] m-auto rounded-md overflow-x-scroll">
      <h1 className="font-extrabold text-ptext">Your Bookings</h1>
      {isLoading && <TableSkeleton />}
      {tourBookings && !isLoading && (
        <>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">S.No</th>
                <th className="py-2 px-4 border-b text-left">Tour Name</th>
                <th className="py-2 px-4 border-b text-left">Price</th>
                <th className="py-2 px-4 border-b text-left">Booked At</th>
                <th className="py-2 px-4 border-b text-left"></th>
              </tr>
            </thead>
            <tbody>
              {tourBookings.map((booking, i) => (
                <tr key={booking._id}>
                  <td className="py-2 px-4 border-b">{i + 1}</td>
                  <td className="py-2 px-4 border-b">
                    <div className="flex items-center gap-2">
                      <h1>{booking.tour.name}</h1>
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b">
                    {formatCurrency(booking.tour.price)}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {new Date(booking.createdAt).toLocaleString()}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <Button
                      type="small"
                      variant="secondary"
                      onClick={() => navigate(`/tours/${booking.tour._id}`)}
                    >
                      view
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      {!tourBookings.length && !isLoading && (
        <p className="font-extrabold text-ptext text-center mt-5">
          No bookings yet!
        </p>
      )}
    </div>
  );
}

export default UserBookings;
