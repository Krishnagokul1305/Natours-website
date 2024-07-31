const mongoose = require('mongoose');
const slugify = require('slugify');
const tourSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have name'],
      unique: true,
    },
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'tour must have group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'tour must have difficulty'],
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have price'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price;
        },
        message: 'discount must be less than the price',
      },
    },
    summary: {
      type: String,
      required: [true, 'tour must have a summary'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'tour must have an image'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    slug: String,
    startLocation: {
      type: {
        type: String,
        default: 'Point',
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates: [Number],
        day: Number,
        description: String,
      },
    ],
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'users',
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.index({ startLocation: '2dsphere' });

tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, {
    lower: true,
  });
  next();
});

tourSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'guides',
    select: '-password -createdAt -updatedAt -__v',
  });
  next();
});

tourSchema.virtual('reviews', {
  ref: 'reviews',
  foreignField: 'tour',
  localField: '_id',
});

// aggregation middleware
// tourSchema.pre('aggregate', function (next) {
//   this._pipeline.unshift({ $match: { name: { $ne: 'The City Wanderer' } } });
//   console.log(this._pipeline);
//   next();
// });

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
