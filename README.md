# NATOURS

## Overview

NATOURS is a full-stack application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). It features a comprehensive tour booking platform with functionalities for authentication, user management, tour management, and review systems.

### Pages

- **AuthPage.jsx**: Authentication page.
- **UserPage.jsx**: User profile and settings page.
- **Tour.jsx**: Single tour detail page.
- **ToursOverview.jsx**: Overview of all tours.
- **HomePage.jsx**: Landing page with sections like About, Hero, Newsletter, etc.
- **PageNotFound.jsx**: 404 error page.

### Services

- **apiBookings.js**: API calls related to bookings.
- **apiTours.js**: API calls related to tours.
- **apiUser.js**: API calls related to user management.

### Utilities

- **helper.js**: Helper functions.
- **motion.js**: Animations and motion-related utilities.

## Backend Overview

### Routes

- **tourRoutes.js**: Routes related to tour management.
- **userRoutes.js**: Routes related to user management.
- **reviewRoute.js**: Routes related to reviews.
- **bookingsRoute.js**: Routes related to bookings.

### Controllers

- **authController.js**: Handles authentication, including login, signup, and password management.
- **bookingController.js**: Handles booking-related operations.
- **errorController.js**: Global error handler.
- **reviewController.js**: Handles review-related operations.
- **tourControllers.js**: Handles tour-related operations.

### Middlewares

- **limiter.js**: Rate limiting middleware to prevent abuse.
- **sanitizer.js**: NoSQL injection prevention middleware.
- **securityHeaders.js**: Middleware to set security headers using Helmet.
- **staticFiles.js**: Middleware to serve static files.
- **xssClean.js**: Middleware to sanitize user input and prevent XSS attacks.

### Backend Utilities

- **AppError.js**: Custom error class for handling application errors.
- **catchAsync.js**: Utility function for handling async errors in controllers.

## API Endpoints

### User Routes

- `POST /api/v1/users/signup`: Sign up a new user.
- `POST /api/v1/users/login`: Log in an existing user.
- `POST /api/v1/users/forgotpassword`: Initiate password reset.
- `POST /api/v1/users/resetPassword/:token`: Reset password using a token.
- `GET /api/v1/users/me`: Get current user's details.
- `PATCH /api/v1/users/updateMe`: Update current user's details.
- `DELETE /api/v1/users/deleteMe`: Deactivate current user's account.
- `GET /api/v1/users`: Get all users (admin only).
- `GET /api/v1/users/:id`: Get a specific user by ID.
- `DELETE /api/v1/users/:id`: Delete a user by ID (admin only).
- `PATCH /api/v1/users/:id`: Update a user by ID (admin only).

### Tour Routes

- `GET /api/v1/tours`: Get all tours.
- `GET /api/v1/tours/top-3-tours`: Get top 3 tours.
- `GET /api/v1/tours/monthly-plans/:year`: Get monthly plan data for a specific tour.
- `GET /api/v1/tours/tours-within/:distance/center/:latlng/unit/:unit`: Get tours within a certain distance from a location.
- `GET /api/v1/tours/tourstats`: Get tour statistics (admin only).
- `GET /api/v1/tours/:id`: Get details of a specific tour by ID.
- `POST /api/v1/tours`: Create a new tour (admin only).
- `PATCH /api/v1/tours/:id`: Update a specific tour by ID (admin only).
- `DELETE /api/v1/tours/:id`: Delete a specific tour by ID (admin only).

### Review Routes

- `GET /api/v1/reviews`: Get all reviews.
- `POST /api/v1/reviews`: Create a new review (authenticated users only).
- `PATCH /api/v1/reviews/:id`: Update a specific review by ID (authenticated users only).
- `DELETE /api/v1/reviews/:id`: Delete a specific review by ID (authenticated users only).

### Booking Routes

- `GET /api/v1/bookings`: Get all bookings (authenticated users only).
- `POST /api/v1/bookings`: Create a new booking (authenticated users only).
