# NATOURS

## Overview

NATOURS is a full-stack application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). It features a comprehensive tour booking platform with functionalities for authentication, user management, tour management, and review systems.

## Table of Contents

- [Project Structure](#project-structure)
- [Frontend Structure](#frontend-structure)
  - [Frontend Overview](#frontend-overview)
  - [Components](#components)
  - [Pages](#pages)
  - [Services](#services)
  - [Utilities](#utilities)
- [Backend Structure](#backend-structure)
  - [Backend Overview](#backend-overview)
  - [Routes](#routes)
  - [Controllers](#controllers)
  - [Middlewares](#middlewares)
  - [Utilities](#backend-utilities)
- [API Endpoints](#api-endpoints)

## Project Structure

### Frontend Structure

The frontend is organized as follows:

├── assets/
├── components/
│ ├── Button.jsx
│ ├── ErrorElement.jsx
│ ├── Footer.jsx
│ ├── Loader.jsx
│ ├── NavBar.jsx
│ └── Popup.jsx
├── Features/
│ ├── Auth/
│ │ ├── components/
│ │ │ ├── LoginForm.jsx
│ │ │ ├── ProtectedRoute.jsx
│ │ │ ├── SignInForm.jsx
│ │ │ ├── UserBookings.jsx
│ │ │ ├── UserBtn.jsx
│ │ │ ├── UserDetails.jsx
│ │ │ ├── UserLoader.jsx
│ │ │ ├── UserMain.jsx
│ │ │ └── UserNav.jsx
│ │ ├── pages/
│ │ │ ├── AuthPage.jsx
│ │ │ └── UserPage.jsx
│ │ └── userSlice.js
│ ├── Tour/
│ │ ├── components/
│ │ │ ├── BookingPopup.jsx
│ │ │ ├── TourAbout.jsx
│ │ │ ├── TourBooking.jsx
│ │ │ ├── TourCard.jsx
│ │ │ ├── TourLander.jsx
│ │ │ ├── TourReviews.jsx
│ │ │ ├── TourReviewsCard.jsx
│ │ │ └── TourTimeLine.jsx
│ │ ├── pages/
│ │ │ ├── Tour.jsx
│ │ │ └── ToursOverview.jsx
│ │ └── tourSlice.js
│ ├── Home/
│ │ ├── About.jsx
│ │ ├── HeroSection.jsx
│ │ ├── HomePage.jsx
│ │ ├── NewsLetter.jsx
│ │ ├── PremiumTours.jsx
│ │ ├── Process.jsx
│ │ └── ProcessCard.jsx
│ └── PageNotFound/
│ └── PageNotFound.jsx
├── service/
│ ├── apiBookings.js
│ ├── apiTours.js
│ └── apiUser.js
├── utils/
│ ├── helper.js
│ └── motion.js
├── App.jsx
├── AppLayout.jsx
├── index.css
├── main.jsx
└── store.js

### Backend Structure

The backend structure includes the following files:

├── controllers/
│ ├── authController.js
│ ├── bookingController.js
│ ├── errorController.js
│ ├── reviewController.js
│ ├── tourControllers.js
│ └── userController.js
├── models/
│ ├── bookingModel.js
│ ├── reviewModel.js
│ ├── tourModel.js
│ └── userModel.js
├── routes/
│ ├── bookingsRoute.js
│ ├── reviewRoute.js
│ ├── tourRoutes.js
│ └── userRoutes.js
├── utils/
│ ├── AppError.js
│ └── catchAsync.js
├── app.js
├── server.js

## Frontend Overview

### Components

- **Button.jsx**: Reusable button component.
- **ErrorElement.jsx**: Error boundary component.
- **Footer.jsx**: Footer component.
- **Loader.jsx**: Loading spinner component.
- **NavBar.jsx**: Navigation bar component.
- **Popup.jsx**: Popup modal component.

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
