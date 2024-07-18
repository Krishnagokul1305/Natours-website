const reviewModel = require('../model/reviewModel');
const catchAsync = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');
const handlerFactory = require('./handlerFactory');

const checkUserTour = (req, res, next) => {
  req.body.tour = req.body.tour || req.params.tourId;
  req.body.user = req.body.user || req.user._id;
  next();
};

const getAllReviews = handlerFactory.getAll(reviewModel);
const postReview = handlerFactory.createOne(reviewModel);
const updateReview = handlerFactory.updateOne(reviewModel);
const deleteReview = handlerFactory.deleteOne(reviewModel);

module.exports = {
  postReview,
  getAllReviews,
  deleteReview,
  updateReview,
  checkUserTour,
};
