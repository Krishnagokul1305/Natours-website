import { useState, useEffect } from "react";

const PaymentButton = () => {
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    // Fake data for order details
    const fakeData = {
      id: "order_12345", // Fake order ID
      amount: 50000, // Fake amount in paise (500 INR)
      currency: "INR", // Fake currency
    };

    // Simulate a successful API response
    setOrderDetails(fakeData);
  }, []);

  useEffect(() => {
    const createOrder = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/v1/payment/create-order",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              amount: 500, // Amount in rupees
              currency: "INR",
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to create order");
        }

        const data = await response.json();
        setOrderDetails(data);
      } catch (error) {
        console.error("Failed to create order:", error);
      }
    };

    createOrder();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  const handlePayment = () => {
    if (!orderDetails) {
      alert("Order details are not ready. Please try again later.");
      return;
    }

    const { id: order_id, amount, currency } = orderDetails;

    const options = {
      key: "rzp_test_kbl3MiiWsJqyGu", // Replace with your RazorPay Key ID
      amount: amount,
      currency: currency,
      name: "Your App Name",
      description: "Test Transaction",
      order_id: order_id,
      handler: (response) => {
        alert(
          `Payment Successful! Payment ID: ${response.razorpay_payment_id}`
        );
      },
      prefill: {
        name: "John Doe",
        email: "john.doe@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return <button onClick={handlePayment}>Pay Now</button>;
};

export default PaymentButton;
