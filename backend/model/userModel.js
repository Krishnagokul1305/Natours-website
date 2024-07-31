const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
  },
  // confirmPassword: {
  //   type: String,
  //   required: true,
  //   validate: {
  //     validator: function (el) {
  //       return this.password === el;
  //     },
  //     message: 'Passwords do not match',
  //   },
  // },
  photo: {
    type: String,
    default: 'default.jpg',
  },
  updatedAt: Date,
  role: {
    type: String,
    enum: ['user', 'admin', 'guide', 'lead-guide'],
    default: 'user',
  },
  passwordResetToken: String,
  tokenExpireTime: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// Pre-save middleware to hash the password
userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete the passwordConfirm field
  this.confirmPassword = undefined;
  next();
});

// Middleware to set updatedAt field
userSchema.pre('save', function (next) {
  if (!this.isModified() || this.isNew) return next();
  this.updatedAt = Date.now() - 1000;
  next();
});

// qurrey middleware to send only active users
userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

// Instance method to compare passwords
userSchema.methods.passwordConfirm = async function (userPassword, dbPassword) {
  return bcrypt.compare(userPassword, dbPassword);
};

// Instance method to check if the token was issued after the password was changed
userSchema.methods.isUpdated = function (tokenInitiateTime) {
  if (this.updatedAt) {
    return tokenInitiateTime < this.updatedAt.getTime() / 1000;
  }
  return false;
};

// Instance method to create password reset token
userSchema.methods.createPasswordToken = async function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.tokenExpireTime = Date.now() + 10 * 60 * 1000; // Token expires in 10 minutes

  return resetToken;
};

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;
