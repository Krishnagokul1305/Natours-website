const catchAsync = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');
const ApiFeatures = require('../utils/ApiFeatures');
const tourModel = require('../model/tourModel');
const Email = require('../utils/email');

// deleting documents handler
exports.deleteOne = (model) =>
  catchAsync(async (req, res) => {
    const id = req.params.id;
    await model.findByIdAndDelete(id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

//   updating documents handler
exports.updateOne = (model) =>
  catchAsync(async (req, res) => {
    const id = req.params.id;

    const doc = await model.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(201).json({
      status: 'success',
      data: doc,
    });
  });

exports.createOne = (model, isBooking) =>
  catchAsync(async (req, res) => {
    const doc = await model.create(req.body);
    if (isBooking) {
      const tour = await tourModel.findById(req.body.tour);
      new Email(
        { name: req.user.name, email: req.user.email },
        ''
      ).sendBookingConfirmation(tour);
    }
    res.status(201).json({
      status: 'success',
      data: doc,
    });
  });

// getting one doc handler function
exports.getOne = (model, populateOpt) =>
  catchAsync(async (req, res, next) => {
    const id = req.params.id;
    let query = model.findById(id);
    if (populateOpt) query.populate(populateOpt);
    const doc = await query;
    if (!doc) {
      return next(new AppError(`no document found with the id`, 404));
    }
    res.status(200).json({
      status: 'success',
      data: doc,
    });
  });

// get all docs handler function
exports.getAll = (model) =>
  catchAsync(async (req, res) => {
    // for nested routes
    let query = {};
    if (req.params.tourId) query = { tour: req.params.tourId };
    if (req.params.userId) query = { ...query, user: req.params.userId };

    const features = new ApiFeatures(model.find(query), req.query)
      .filter()
      .sort()
      .limit()
      .page();

    const doc = await features.query;
    res.status(200).json({
      status: 'success',
      result: doc.length,
      data: doc,
    });
  });
