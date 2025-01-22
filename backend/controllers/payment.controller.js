const catchAsync = require('../utils/asyncHandler');
const razorpayInstance = require('../utils/razorpay');
const AppError = require('../utils/AppError');
const crypto = require('crypto');

const createOrder = catchAsync(async function (req, res) {
  const { amount, currency } = req.body;
  const options = {
    amount: amount * 100,
    currency: currency || 'INR',
    receipt: `receipt_${Date.now()}`,
  };

  const order = await razorpayInstance.orders.create(options);
  res.status(200).json(order);
});

const verifyPayment = catchAsync(async (req, res, next) => {
  const { order_id, payment_id, signature } = req.body;
    
  const generatedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${order_id}|${payment_id}`)
    .digest('hex');

  if (generatedSignature != signature) {
    throw new App();
  } else {
    next(new AppError('Invalid payment signature', 400));
  }
  res
    .status(200)
    .json({ success: true, message: 'Payment verified successfully' });
});

module.exports = { createOrder, verifyPayment };
