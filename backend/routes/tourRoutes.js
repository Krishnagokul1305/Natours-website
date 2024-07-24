const express = require('express');
const {
  getAllTours,
  getTourById,
  postTour,
  updateTour,
  deleteTour,
  getTourStats,
  getMonthlyTours,
  getTourNearMe,
  uploadImg,
  resizeImg,
} = require('../controllers/tourControllers');
const { protect, restrictTo } = require('../controllers/authController');

const TourRoute = express.Router();
const reviewRoute = require('../routes/reviewRoute');

// route for all tours
TourRoute.route('/')
  .get(getAllTours)
  .post(protect, restrictTo('admin', 'lead-guide'), postTour);

// route for posting reviews for specific tour
// we are using tourrouter.use because we are redirecting from that router
TourRoute.use('/:tourId/reviews', reviewRoute);

// route for getting monthly data
TourRoute.route('/monthly-plans/:id').get(getMonthlyTours);

// route for getting tours nearby the user
TourRoute.route('/tours-within/:distance/center/:latlng/unit/:unit').get(
  getTourNearMe
);

// Router for statistics
TourRoute.route('/tourstats').get(
  protect,
  restrictTo('admin,lead-guide'),
  getTourStats
);

// route for particular tour id
TourRoute.route('/:id')
  .get(getTourById)
  .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour)
  .patch(
    protect,
    restrictTo('admin', 'lead-guide'),
    uploadImg.fields([
      {
        name: 'imageCover',
        maxCount: 1,
      },
      {
        name: 'images',
        maxCount: 3,
      },
    ]),
    resizeImg,
    updateTour
  );

module.exports = TourRoute;
