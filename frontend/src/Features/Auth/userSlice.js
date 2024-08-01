import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  login,
  signin,
  updateUserPassword,
  updateUser,
} from "../../service/apiUser";
import { defaultuser } from "../../assets";

const initialState = {
  user: {
    name: "",
    photo: defaultuser,
    email: "",
    password: "",
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
  const userDetails = {
    name: response.userDetails.name,
    photo: response.userDetails.photo,
    email: user.email,
    password: user.password,
  };
  return userDetails;
});

const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async function ({ password, newPassword }) {
    const token = localStorage.getItem("token");
    const response = await updateUserPassword(password, newPassword, token);
    localStorage.setItem("token", response.token);
    console.log(newPassword)
    return newPassword;
  }
);

const updateUserDetails = createAsyncThunk(
  "user/updateUser",
  async function (formData) {
    const token = localStorage.getItem("token");
    const response = await updateUser(formData, token);
    console.log(response);
    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.isLogged = false;
      state.error = "";
      state.user = { name: "", photo: defaultuser, password: "", email: "" };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLogged = true;
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.user.password = action.payload.password;
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
        state.user.photo = `http://127.0.0.1:8000/api/v1/public/img/user/${action.payload.photo}`;
        state.user.email = action.payload.email;
        state.user.password = action.payload.password;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        console.log(action.payload)
        state.isLoading = false;
        state.user.password = action.payload;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateUserDetails.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(updateUserDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user.name = action.payload.name;
        state.user.photo = `http://127.0.0.1:8000/api/v1/public/img/user/${action.payload.photo}`;
      })
      .addCase(updateUserDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = userSlice.actions;

export { createUser, loginUser, updatePassword, updateUserDetails };

export default userSlice.reducer;
