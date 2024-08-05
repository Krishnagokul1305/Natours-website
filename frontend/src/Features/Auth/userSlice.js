import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  login,
  signin,
  updateUserPassword,
  updateUser,
} from "../../service/apiUser";
import { defaultuser } from "../../assets";
import { USER_IMG } from "../../../config";

const initialState = {
  user: {
    name: "",
    id: "",
    photo: defaultuser,
    email: "",
    password: "",
  },
  isLogged: false,
  isLoading: false,
  error: "",
  success: false,
};

const createUser = createAsyncThunk("user/signin", async function (user) {
  const response = await signin(user);
  localStorage.setItem("token", response.token);
  return { ...user, id: response.userDetails.id };
});

const loginUser = createAsyncThunk("user/login", async function (user) {
  const response = await login(user);

  localStorage.setItem("token", response.token);
  const userDetails = {
    name: response.userDetails.name,
    photo: response.userDetails.photo,
    id: response.userDetails.id,
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
    return newPassword;
  }
);

const updateUserDetails = createAsyncThunk(
  "user/updateUser",
  async function (formData) {
    const token = localStorage.getItem("token");
    const response = await updateUser(formData, token);
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
      state.success = false;
      state.user = { name: "", photo: defaultuser, password: "", email: "" };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLogged = true;
        state.success = true;
        state.user.name = action.payload.name;
        state.user.photo = `${USER_IMG}/${action.payload.photo}`;
        state.user.email = action.payload.email;
        state.user.password = action.payload.password;
        state.user.id = action.payload.id;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.success = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLogged = true;
        state.success = true;
        state.user.name = action.payload.name;
        state.user.photo = `${USER_IMG}/${action.payload.photo}`;
        state.user.email = action.payload.email;
        state.user.password = action.payload.password;
        state.user.id = action.payload.id;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.success = false;
      })
      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user.password = action.payload;
        state.success = true;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.success = false;
      })
      .addCase(updateUserDetails.pending, (state) => {
        state.isLoading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(updateUserDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user.name = action.payload.name;
        state.user.photo = `${USER_IMG}/${action.payload.photo}`;
        state.success = true;
      })
      .addCase(updateUserDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.success = false;
      });
  },
});

export const { logout } = userSlice.actions;

export { createUser, loginUser, updatePassword, updateUserDetails };

export default userSlice.reducer;
