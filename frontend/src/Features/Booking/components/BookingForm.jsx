import { logoWhite } from "../../../assets/index";
import Button from "../../../components/Button";
import usePayment from "../hooks/usePayment";

function BookingForm({ user, tourPrice, tourId }) {
  const {
    createPayment,
    isProcessingPayment,
    createBooking,
    isProcessingBooking,
  } = usePayment();

  const handleBooking = async () => {
    try {
      // Step 1: Initiate payment
      const paymentResponse = await new Promise((resolve, reject) => {
        createPayment(
          { amount: tourPrice , currency: "INR" }, // Convert amount to smallest unit (e.g., paise for INR)
          {
            onSuccess: resolve,
            onError: reject,
          }
        );
      });

      createBooking({
        tourId,
        userId: user._id,
        paymentId: paymentResponse?.razorpay_payment_id,
      });
    } catch (error) {
      console.error("Error during payment or booking:", error);
    }
  };

  return (
    <section className="px-5 py-16">
      <div className="mx-auto rounded-2xl w-fit px-5 md:py-7 py-10 border flex items-center overflow-hidden bg-white">
        <div className="bg-primary hidden md:flex rounded-full md:translate-x-[-55%] translate-x-[-80%] w-[150px] h-[150px] items-center justify-center shadow-lg">
          <img
            src={logoWhite}
            alt="Natours logo"
            className="object-contain h-[6rem]"
          />
        </div>
        <div className="flex items-start md:items-center gap-5 md:gap-14 flex-col md:flex-row justify-between">
          <div className="space-y-2 md:space-y-4">
            {user ? (
              <>
                <h2 className="font-semibold text-ptext md:text-2xl">
                  What are you waiting for?
                </h2>
                <p className="text-gray-500 text-xs md:text-lg">
                  10 days. 1 adventure. Infinite memories. Make it yours today!
                </p>
              </>
            ) : (
              <h2 className="font-semibold text-ptext md:text-2xl">
                Log in to Book Tours
              </h2>
            )}
          </div>

          {user ? (
            <Button
              type="big"
              variant="secondary"
              onClick={handleBooking}
              disabled={isProcessingPayment || isProcessingBooking}
            >
              {isProcessingPayment || isProcessingBooking
                ? "Processing..."
                : "Book tour now!"}
            </Button>
          ) : (
            <Button type="big" variant="secondary" to="/auth/login">
              Login
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}

export default BookingForm;
