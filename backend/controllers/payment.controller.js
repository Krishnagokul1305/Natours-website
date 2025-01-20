const catchAsync = require('../utils/asyncHandler');
const razorpayInstance = require('../utils/razorpay');

const createOrder = catchAsync(async function (req, res) {
  const { amount, currency } = req.body;

  try {
    const options = {
      amount: amount,
      currency: currency || 'INR',
    };

    const order = await razorpayInstance.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating RazorPay order');
  }
});

module.exports = { createOrder };
