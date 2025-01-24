const catchAsync = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');
const userModel = require('../model/userModel');
const handlerFactory = require('./handlerFactory');
const multer = require('multer');
const sharp = require('sharp');

const filterOptions = (obj, ...includes) => {
  let filtered = {};
  Object.keys(obj).forEach((key) => {
    if (includes.includes(key)) {
      filtered[key] = obj[key];
    }
  });
  return filtered;
};

// users action
// middleware to set the param id to user id which we will get during authentication
const getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

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
  if (!req.file) return next();

  req.fileName = `user-${req.user.id}-${Date.now()}.jpeg`;
  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/user/${req.fileName}`);
  next();
};

const updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.confirmPassword) {
    return next(new AppError('This route is not for password updates', 400));
  }
  let filtered = filterOptions(req.body, 'name', 'email', 'photo');
  if (req.fileName) {
    filtered.photo = req.fileName;
  }

  const updated = await userModel.findByIdAndUpdate(req.user._id, filtered, {
    runValidators: true,
    new: true,
  });
  res.status(201).json({
    status: 'success',
    data: updated,
  });
});

const deleteMe = catchAsync(async (req, res, next) => {
  await userModel.findByIdAndUpdate(req.user._id, { active: false });
  res.status(204).json({
    status: 'no user found',
    data: null,
  });
});

function postUser(req, res) {
  res.status(500).json({
    status: 'error',
    message: 'this route is not for creating user go to signin route',
  });
}

const getAllUsers = handlerFactory.getAll(userModel);
const getUser = handlerFactory.getOne(userModel);
const updateUser = handlerFactory.updateOne(userModel);
const deleteUser = handlerFactory.deleteOne(userModel);

module.exports = {
  getAllUsers,
  getUser,
  postUser,
  deleteUser,
  updateUser,
  updateMe,
  deleteMe,
  getMe,
  uploadImg,
  resizeImg,
};