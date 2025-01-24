import { useMutation } from "@tanstack/react-query";
import { postBookings } from "../../../service/apiBookings";

const usePayment = () => {
  // Payment function
  const paymentMutation = useMutation({
    mutationFn: async ({ amount, currency }) => {
      const orderResponse = await fetch(
        "http://localhost:8000/api/v1/payment/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount, currency }),
        }
      );

      if (!orderResponse.ok) {
        throw new Error("Failed to create order");
      }

      const orderDetails = await orderResponse.json();
      const {
        id: order_id,
        amount: orderAmount,
        currency: orderCurrency,
      } = orderDetails;

      const paymentResponse = await new Promise((resolve, reject) => {
        const options = {
          key: "rzp_test_kbl3MiiWsJqyGu", // Replace with your RazorPay Key ID
          amount: orderAmount,
          currency: orderCurrency,
          name: "Your App Name",
          description: "Test Transaction",
          order_id: order_id,
          method: "upi",
          handler: (response) => {
            resolve(response); // Resolve the promise with the payment response
          },
          prefill: {
            name: "John Doe",
            email: "john.doe@example.com",
            contact: "9999999999",
          },
          theme: {
            color: "#3399cc",
          },
          modal: {
            ondismiss: () => {
              reject(new Error("Payment dismissed by the user"));
            },
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      });

      return paymentResponse;
    },
    onSuccess: (data) => {
      console.log("Payment successful:", data);
    },
    onError: (error) => {
      console.error("Payment failed:", error);
    },
  });

  // Booking function
  const bookingMutation = useMutation({
    mutationFn: async ({ tourId, userId, paymentId }) => {
      console.log(tourId, userId, paymentId)
      const bookingResponse = await postBookings(tourId, userId, paymentId);

      if (!bookingResponse) {
        throw new Error("Booking failed");
      }

      return bookingResponse;
    },
    onSuccess: (data) => {
      console.log("Booking successful:", data);
    },
    onError: (error) => {
      console.error("Booking failed:", error);
    },
  });

  return {
    createPayment: paymentMutation.mutate,
    isProcessingPayment: paymentMutation.isLoading,
    createBooking: bookingMutation.mutate,
    isProcessingBooking: bookingMutation.isLoading,
  };
};

export default usePayment;
