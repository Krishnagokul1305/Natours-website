import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Features/Auth/userSlice";
import bookingsReducer from "./Features/Tour/tourSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    bookings: bookingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
