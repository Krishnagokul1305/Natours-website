const userModel = require('../model/userModel');
const catchAsync = require('../utils/asyncHandler');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const crypto = require('crypto');
const sendEmail = require('../utils/email');

// Function to sign JWT token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_STRING, {
    expiresIn: '10d',
  });
};

// Function to send token in response
const sendTokenResponse = (res, user) => {
  console.log(user);

  const token = signToken(user._id);
  console.log(token);
  // Set JWT cookie with expiration
  res.cookie('jwt', token, {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days in milliseconds
    httpOnly: true,
  });

  const userDetails = {
    name: user.name,
    email: user.email,
    photo: user.photo,
    id: user._id,
  };

  // Respond with token in JSON format
  res.status(201).json({
    status: 'success',
    token,
    userDetails,
  });
};

// Signup function to create a new user
const signUp = catchAsync(async (req, res, next) => {
  const newUser = await userModel.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    role: req.body.role,
  });

  // Send token in response upon successful signup
  sendTokenResponse(res, newUser);
});

// Login function to authenticate and log in user
const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }
  const user = await userModel.findOne({ email });

  if (!user || !(await user.passwordConfirm(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }
  // Send token in response upon successful login
  sendTokenResponse(res, user);
});

// Middleware to protect routes requiring authentication
const protect = catchAsync(async (req, res, next) => {
  let token;
  // Check if authorization header contains a valid JWT
  console.log(req.headers);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  console.log(req.cookie);
  if (!token) {
    return next(new AppError('Unauthorized access - please log in', 401));
  }

  // Verify JWT token
  const decoded = jwt.verify(token, 'this-is-my-password-encryption-secret');
  if (!decoded.id) {
    return next(new AppError('Unauthorized access - invalid token', 401));
  }

  // Retrieve current user based on decoded JWT
  const currentUser = await userModel.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError('User not found for provided token', 401));
  }

  // Check if user's password was changed after the token was issued
  if (await currentUser.isUpdated(decoded.iat)) {
    return next(
      new AppError(
        'Unauthorized access - password has changed recently Please login again !',
        401
      )
    );
  }

  // Grant access to protected route
  // we are creating property in req to send user to next middlewares
  req.user = currentUser;

  next();
});

// Middleware to restrict access based on user roles
const restrictTo = (...roles) => {
  return (req, res, next) => {
    const { role } = req.user;
    console.log(role, roles, roles.includes(role), req.user);
    if (!roles.includes(role)) {
      return next(
        new AppError('You are not authorized to perform this action', 403)
      );
    }
    console.log(role);
    next();
  };
};

// Function to initiate password reset request
const forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return next(new AppError('Please provide your email', 400));
  }

  // Find user with provided email
  const user = await userModel.findOne({ email });
  if (!user) {
    return next(
      new AppError('User not found - please enter a valid email', 400)
    );
  }

  // Generate and save password reset token
  const token = await user.createPasswordToken();
  await user.save({ validateBeforeSave: false });

  // Construct password reset URL and send email
  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetPassword/${token}`;
  const message = `Forgot your password? Submit your PATCH request to: ${resetUrl}`;

  await sendEmail({
    email,
    subject: 'Your password reset token (valid for 10 minutes)',
    message,
  });

  // Respond with status indicating email sent
  res.status(200).json({
    status: 'Token sent to email',
  });
});

// Function to reset user's password using valid reset token
const resetPassword = catchAsync(async (req, res, next) => {
  const resetToken = req.params.token;
  if (!resetToken) {
    return next(new AppError('Token not found', 400));
  }

  // Encrypt reset token and find user with matching token
  const encryptedToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  const user = await userModel.findOne({
    passwordResetToken: encryptedToken,
    tokenExpireTime: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError('Invalid token or token expired', 401));
  }

  // Update user's password and clear reset token fields
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.tokenExpireTime = undefined;
  user.passwordResetToken = undefined;
  await user.save();

  // Send token in response upon successful password reset
  sendTokenResponse(res, user);
});

// Function to update user's password
const updatePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return next(new AppError('Please provide current and new passwords', 400));
  }
  console.log(currentPassword, newPassword);

  // Find user and validate current password
  const user = await userModel.findById(req.user.id);
  console.log(user, await user.passwordConfirm(currentPassword, user.password));
  if (!user || !(await user.passwordConfirm(currentPassword, user.password))) {
    return next(new AppError('Invalid user or password', 401));
  }

  // Update user's password
  user.password = newPassword;
  user.confirmPassword = newPassword;
  await user.save();

  // Send token in response upon successful password update
  sendTokenResponse(res, user);
});

module.exports = {
  signUp,
  login,
  protect,
  restrictTo,
  forgotPassword,
  resetPassword,
  updatePassword,
};
