function UserBookings() {
  const bookings = [];
  return (
    <div className="px-10 py-5 space-y-5 bg-white h-full w-[95%] m-auto rounded-md">
      {!bookings ? (
        <div>
          <h1 className="font-extrabold text-ptext">Your Bookings</h1>
        </div>
      ) : (
        <p className="font-extrabold text-ptext text-center">
          No bookings yet !
        </p>
      )}
    </div>
  );
}

export default UserBookings;
