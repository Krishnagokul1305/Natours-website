const express = require('express');
const app = express();
const rateLimiter = require('express-rate-limit');
const morgan = require('morgan');
const helmet = require('helmet');
const sanitizer = require('express-mongo-sanitize');
const xxs = require('xss-clean');
const TourRoute = require('./routes/tourRoutes');
const userRoute = require('./routes/userRoutes');
const reviewRoute = require('./routes/reviewRoute');
const AppErrors = require('./utils/AppError');
const errorHandler = require('./controllers/errorController');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const bookingsRoute = require('./routes/BookingsRoute');

app.use(cors());

app.use(bodyParser.json());

// middleware to parse the request body
app.use(express.json());

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
