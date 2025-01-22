const mongoose = require('mongoose');

const bookingsSchema = mongoose.Schema(
  {
    tour: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tour',
      required: [true, 'Tour ID is required'],
      validate: {
        validator: (value) => mongoose.Types.ObjectId.isValid(value),
        message: 'Invalid Tour ID format',
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: [true, 'User ID is required'],
      validate: {
        validator: (value) => mongoose.Types.ObjectId.isValid(value),
        message: 'Invalid User ID format',
      },
    },
    paid: {
      type: Boolean,
      default: false,
    },
    paymentId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

bookingsSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name',
  }).populate({
    path: 'tour',
    select: 'name imageCover price',
    options: { skipPopulateGuides: true },
  });
  next();
});

const bookingsModel = mongoose.model('Booking', bookingsSchema);

module.exports = bookingsModel;
