const sharp = require('sharp');
const TourModel = require('../model/tourModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/asyncHandler');
const handlerFactory = require('./handlerFactory');
const multer = require('multer');

// getting tours
const getAllTours = handlerFactory.getAll(TourModel);

// get tour by id
const getTourById = handlerFactory.getOne(TourModel, 'reviews');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.split('/')[0] == 'image') {
    cb(null, true);
  } else {
    cb(new AppError('Invalid file Please upload image', 401), false);
  }
};

const uploadImg = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const resizeImg = (req, res, next) => {
  // console.log(req.files);
  if (!req.files.imageCover || !req.files.images) return next();

  const imageCover = `tour-cover-${req.params.id}-${Date.now()}.jpeg`;
  sharp(req.files.imageCover[0].buffer)
    .resize(2000, 1333)
    .toFormat('jpeg')
    .toFile(`public/img/toursCover/${imageCover}`);

  let images = [];

  req.files.images.forEach((img) => {
    const imagesName = `tour-images-${req.params.id}-${Date.now()}.jpeg`;

    sharp(img.buffer)
      .resize(2000, 1333)
      .toFormat('jpeg')
      .toFile(`public/img/toursImages/${imagesName}`);

    images.push(imagesName);
  });

  req.body.images = images;
  req.body.imageCover = imageCover;
  next();
};
// posting tour
const postTour = handlerFactory.createOne(TourModel);

//update tour
const updateTour = handlerFactory.updateOne(TourModel);

// delete tour
const deleteTour = handlerFactory.deleteOne(TourModel);

// tours near the user location
const getTourNearMe = catchAsync(async (req, res, next) => {
  const { distance, latlng, unit } = req.params;
  if (!distance || !latlng || !unit) {
    return next(new AppError('please give valid geolocation coordinates', 400));
  }
  const [lat, lng] = latlng.split(',');
  const radian = unit === 'km' ? distance * 1000 : distance * 1609.34;

  const tours = await TourModel.find({
    startLocation: {
      $near: {
        $geometry: { type: 'Point', coordinates: [lng * 1, lat * 1] },
        $maxDistance: radian,
      },
    },
  });
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: tours,
  });
});

// tour statistics based on difficulty
const getTourStats = catchAsync(async (req, res) => {
  const stats = await TourModel.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } },
    },
    {
      $group: {
        _id: '$difficulty',
        avgRatings: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        numRatings: { $sum: '$ratingsQuantity' },
        noOfTours: { $sum: 1 },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
    {
      $sort: {
        noOfTours: -1,
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    statisticalData: stats,
  });
});

const getMonthlyTours = catchAsync(async (req, res) => {
  const year = req.params.id * 1;

  const plans = await TourModel.aggregate([
    {
      $unwind: '$startDates',
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $addFields: {
        month: { $month: '$startDates' },
      },
    },
    {
      $group: {
        _id: '$month',
        tourCounts: { $sum: 1 },
        name: { $push: '$name' },
        month: { $first: '$month' },
      },
    },

    {
      $project: {
        _id: 0,
      },
    },
    {
      $sort: {
        month: 1,
      },
    },
  ]);
  res.status(201).json({
    status: 'success',
    MonthlyData: plans,
  });
});

module.exports = {
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
};
