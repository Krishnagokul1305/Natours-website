import { useMutation } from "@tanstack/react-query";
import { postBookings } from "../../../service/apiBookings";

const usePayment = () => {
  const createAndPayMutation = useMutation({
    mutationFn: async ({ amount, currency, tourId, userId }) => {
      console.log(tourId, userId);
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

      // Step 2: Handle payment
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
      

      // Step 3: Post booking data to the booking API
      const bookingResponse = await postBookings(
        tourId,
        userId,
        paymentResponse?.razorpay_payment_id
      );
      console.log(bookingResponse);
      return bookingResponse;
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error("Payment failed:", error);
    },
  });

  return {
    createAndPay: createAndPayMutation.mutate,
    isProcessing: createAndPayMutation.isLoading,
  };
};

export default usePayment;
