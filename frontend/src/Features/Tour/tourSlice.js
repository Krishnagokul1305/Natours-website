import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserBookings, postBookings } from "../../service/apiBookings";

const initialState = {
  bookings: [],
  isLoading: false,
  error: "",
  success:false
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
    const token = localStorage.getItem("token");
    const response = await postBookings({ tourId, userId, token });
    return response;
  }
);

const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.success = false;
    },
  },

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
        state.success=false
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success=true
        state.bookings.push(action.payload);
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.success=false
        state.error = action.error.message;
      });
  },
});

export { fetchBookings, createBooking };

export default bookingsSlice.reducer;
