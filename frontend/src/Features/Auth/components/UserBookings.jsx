import { useEffect } from "react";
import { formatCurrency } from "../../../utils/helper";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings } from "../../Tour/tourSlice";
import UserLoader from "./UserLoader";

function UserBookings() {
  const navigate = useNavigate();
  const { id } = useSelector((store) => store.user.user);
  const { bookings, isLoading } = useSelector((store) => store.bookings);
  const tourBookings = bookings || [];
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    dispatch(fetchBookings({ id, token }));

  }, [id,dispatch]);

  if (isLoading) return <UserLoader />;
  return (
    <div className="px-10 py-5 space-y-5 bg-white min-h-[40vh] w-[95%] m-auto rounded-md overflow-x-scroll">
      <h1 className="font-extrabold text-ptext">Your Bookings</h1>
      {tourBookings.length ? (
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
            {bookings.map((booking, i) => (
              <tr key={booking._id}>
                <td className="py-2 px-4 border-b">{i + 1}</td>
                <td className="py-2 px-4 border-b">
                  <div className="flex items-center gap-2">
                    <img
                      src={`http://127.0.0.1:8000/api/v1/public/img/toursCover/${booking.tour.imageCover}`}
                      className="h-[24px] rounded-md"
                      alt=""
                    />{" "}
                    <h1>{booking.tour.name}</h1>{" "}
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
      ) : (
        <p className="font-extrabold text-ptext text-center">
          No bookings yet!
        </p>
      )}
    </div>
  );
}

export default UserBookings;
