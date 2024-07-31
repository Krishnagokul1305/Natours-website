import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, signin } from "../../service/apiUser";

const initialState = {
  user: {
    name: "",
    photo: "default.jpg",
  },
  isLogged: false,
  isLoading: false,
  error: "",
};

const createUser = createAsyncThunk("user/signin", async function (user) {
  const response = await signin(user);
  localStorage.setItem("token", response.token);
  return user;
});

const loginUser = createAsyncThunk("user/login", async function (user) {
  const response = await login(user);
  localStorage.setItem("token", response.token);
  console.log(response);
  return response;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLogged = true;
        state.user.name = action.payload.userName;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLogged = true;
        state.user.name = action.payload.name;
        state.user.photo = action.payload.photo;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export { createUser, loginUser };

export default userSlice.reducer;
