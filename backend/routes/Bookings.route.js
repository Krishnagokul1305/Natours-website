const express = require('express');
const {
  getAllBookings,
  postBookings,
} = require('../controllers/BookingController');
const { protect } = require('../controllers/authController');

const bookingsRoute = express.Router({ mergeParams: true });

bookingsRoute.use(protect);
bookingsRoute.route('/').get(getAllBookings).post(postBookings);

module.exports = bookingsRoute;