import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserBookings, postBookings } from "../../service/apiBookings";

const initialState = {
  bookings: [],
  isLoading: false,
  error: "",
};

const fetchBookings = createAsyncThunk(
  "bookings/fetch",
  async function ({ id, token }) {
    const response = await getUserBookings({ id, token });
    return response;
  }
);

const createBooking = createAsyncThunk(
  "bookings/post",
  async function ({ tourId, userId }) {
    const token=localStorage.getItem("token")
    console.log(tourId,userId)
    const response = await postBookings({ tourId, userId, token });
    return response;
  }
);

const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(createBooking.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookings.push(action.payload);
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export { fetchBookings, createBooking };

export default bookingsSlice.reducer;
