const mongoose = require('mongoose');
const TourModel = require('./tourModel');

const reviewSchema = mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'review cannot be empty'],
      trim: true,
    },
    rating: {
      type: Number,
      required: [true, 'rating cannot be empty'],
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must belong to a tour'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'users',
      required: [true, 'Review must belong to a user'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

reviewSchema.statics.createReviewStats = async function (tourId) {
  const stats = await this.aggregate([
    {
      $match: { tour: tourId },
    },
    {
      $group: {
        _id: null,
        noOfRatings: { $sum: 1 },
        avgRatings: { $avg: '$rating' },
      },
    },
  ]);

  if (stats.length > 0) {
    await TourModel.findByIdAndUpdate(tourId, {
      ratingsAverage: stats[0].avgRatings,
      ratingsQuantity: stats[0].noOfRatings,
    });
  } else {
    await TourModel.findByIdAndUpdate(tourId, {
      ratingsAverage: 4.5,
      ratingsQuantity: 0,
    });
  }
};

// Post save middleware
reviewSchema.post('save', function () {
  this.constructor.createReviewStats(this.tour);
});

reviewSchema.pre(/^find/, function () {
  this.populate({
    path: 'tour user',
    select: 'name photo email',
  });
});

// Post findOneAndUpdate and findOneAndDelete middleware
reviewSchema.post(/^findOneAnd/, async function (doc) {
  if (doc) {
    await doc.constructor.createReviewStats(doc.tour);
  }
});

const reviewModel = mongoose.model('reviews', reviewSchema);

module.exports = reviewModel;
