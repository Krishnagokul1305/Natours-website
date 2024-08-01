const express = require('express');

const {
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
} = require('../controllers/userControllers');

const {
  signUp,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
  restrictTo,
} = require('../controllers/authController');

const userRoute = express.Router();
userRoute.route('/signup').post(signUp);
userRoute.route('/login').post(login);
userRoute.route('/forgotpassword').post(forgotPassword);
userRoute.route('/resetPassword/:token').post(resetPassword);

userRoute.use(protect);
userRoute.route('/me').get(getMe, getUser);
userRoute
  .route('/updateMe')
  .patch(uploadImg.single('photo'), resizeImg, updateMe);
userRoute.route('/deleteMe').delete(deleteMe);
userRoute.route('/updatePassword').patch(updatePassword);

// userRoute.use(restrictTo('admin'));
userRoute.route('/').get(getAllUsers).post(postUser);
userRoute.route('/:id').get(getUser).delete(deleteUser).patch(updateUser);

module.exports = userRoute;
