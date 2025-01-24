const express = require('express');
const app = express();
const rateLimiter = require('express-rate-limit');
const morgan = require('morgan');
const helmet = require('helmet');
const sanitizer = require('express-mongo-sanitize');
const xxs = require('xss-clean');
const cookieParser = require('cookie-parser');

const TourRoute = require('./routes/tour.route');
const userRoute = require('./routes/user.route');
const reviewRoute = require('./routes/review.route');
const bookingsRoute = require('./routes/Bookings.route');
const paymentRoutes = require('./routes/Payment.route');
const testRoute = require('./routes/Testing.route');

const AppErrors = require('./utils/AppError');
const errorHandler = require('./controllers/errorController');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true, // Allow cookies to be sent with requests
  })
);
app.options(
  '*',
  cors({
    origin: 'http://localhost:5173',
    credentials: true, // Allow cookies to be sent with requests
  })
);

app.set('trust proxy', 1);

app.use(bodyParser.json());

// middleware to parse the request body
app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV == 'development') {
  app.use(morgan('dev'));
}

// middleware to server static files
app.use('/api/v1/public', express.static(path.join(__dirname, 'public')));

// middleware to setup security headers
app.use(helmet());

// middleware to limit of request per hour
// const limiter = rateLimiter({
//   limit: 1000,
//   windowMs: 1000 * 60 * 60,
//   message: 'too many requests',
// });
// app.use(limiter);

// middleware to handle noSQL injection
app.use(sanitizer());

// middleware to handle html elements to enter into db
app.use(xxs());

app.use('/api/v1/tours', TourRoute);

app.use('/api/v1/users', userRoute);

app.use('/api/v1/reviews', reviewRoute);

app.use('/api/v1/bookings', bookingsRoute);

app.use('/api/v1/payment', paymentRoutes);

app.use('/api/v1/test', testRoute);

// app.use('/api/v1/tours/:tourId/reviews', reviewRoute);

// route to handle unknown routes
app.all('*', (req, res, next) => {
  next(
    new AppErrors(
      `Can't find the request for ${req.originalUrl} on this server`,
      404
    )
  );
});

app.use(errorHandler);

module.exports = app;
