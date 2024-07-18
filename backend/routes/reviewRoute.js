const express = require('express');
const reviewRoute = express.Router({ mergeParams: true });
const { protect, restrictTo } = require('../controllers/authController');
const {
  postReview,
  getAllReviews,
  deleteReview,
  updateReview,
  checkUserTour,
} = require('../controllers/reviewController');

reviewRoute.use(protect);
reviewRoute
  .route('/')
  .get(getAllReviews)
  .post(restrictTo('user'), checkUserTour, postReview);

reviewRoute
  .route('/:id')
  .delete(restrictTo('user'), deleteReview)
  .patch(restrictTo('user'), updateReview);
module.exports = reviewRoute;
