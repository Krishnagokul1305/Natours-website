import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/Button";
import { createBooking } from "../tourSlice";

function BookingPopup({ img, setOpen, tourId }) {
  const { id: userId } = useSelector((store) => store.user.user);

  const dispatch = useDispatch();
  function bookTour() {
    dispatch(createBooking({ tourId, userId }));
    setOpen(false);
  }
  return (
    <div className="h-screen fixed inset-0 gradient-bg flex items-center justify-center p-5">
      <div className="h-auto bg-white rounded-lg overflow-hidden relative">
        <div
          className="absolute bg-white top-0 right-0 p-3 font-bold cursor-pointer"
          onClick={() => setOpen(false)}
        >
          X
        </div>
        <img
          src={`http://127.0.0.1:8000/api/v1/public/img/toursCover/${img}`}
          alt=""
          className="h-[40vh] w-full basis-[50%]"
        />
        <div className="bg-inherit p-5 text-center space-y-3">
          <h1 className="font-oswald text-xl font-extrabold tracking-widest">
            NATOURS
          </h1>
          <p className="text-sm">Great adventure ahead !</p>
          <div className="flex justify-center">
            <Button type="small" variant="secondary" onClick={bookTour}>
              Confirm Booking
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingPopup;
