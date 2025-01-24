import { useMutation } from "@tanstack/react-query";
import { postBookings } from "../../../service/apiBookings";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../../../../config";

const usePayment = () => {

  const paymentMutation = useMutation({
    mutationFn: async ({ amount, currency }) => {
      const orderResponse = await fetch(
        `${API_BASE_URL}/payment/create-order`,
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
          name: "Natours",
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
    onSuccess: () => {
      // console.log("Payment successful:", data);
    },
    onError: (error) => {
      console.error("Payment failed:", error);
    },
  });

  // Booking function
  const bookingMutation = useMutation({
    mutationFn: async ({ tourId, userId, paymentId }) => {
      const bookingResponse = await postBookings(tourId, userId, paymentId);

      if (!bookingResponse) {
        throw new Error("Booking failed");
      }

      return bookingResponse;
    },
    onSuccess: () => {
      toast.success("Booking successful")
    },
    onError: () => {
      toast.success("Booking failed")
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
