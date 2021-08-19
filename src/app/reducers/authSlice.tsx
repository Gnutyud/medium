import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getCurrentUser, updateCurrentUser } from "../api/authApi";
import { RootState } from "../store";

interface userType {
  username: undefined | string;
  email: undefined | string;
  "email or password": undefined | string;
}

export interface authState {
  isRegister: boolean;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: userType | null;
  currentUser: any;
}

let isAuth;

const jsonUser = localStorage.getItem("user");
if (jsonUser) {
  isAuth = JSON.parse(jsonUser).token;
}
const isLoggedIn = !!isAuth;
const initialState: authState = {
  isRegister: false,
  isLoggedIn,
  isLoading: false,
  error: null,
  currentUser: null,
};

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (data: { user: any }) => {
    const response = await updateCurrentUser(data);
    return response.data.user;
  },
);

export const getUser = createAsyncThunk("user/getUser", async () => {
  const response = await getCurrentUser();
  return response.data.user;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginPending(state) {
      state.isLoading = true;
    },
    loginSuccess(state, action) {
      state.isLoggedIn = true;
      state.isLoading = false;
      state.error = null;
      state.currentUser = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    loginFail(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    switchAuthModeHandler(state) {
      state.isRegister = !state.isRegister;
    },
    logoutHandler(state) {
      localStorage.removeItem("user");
      state.isLoggedIn = false;
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        console.log(action.payload);
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      });
  },
});
export const authActions = authSlice.actions;

export const userSelector = (state: RootState) => state.auth.currentUser;

export default authSlice;
