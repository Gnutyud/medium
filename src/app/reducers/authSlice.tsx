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
  errorUpdateUser: userType | null;
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
  errorUpdateUser: null,
};

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (data: { user: any }, { rejectWithValue }) => {
    try {
      const response = await updateCurrentUser(data);

      return response.data.user;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.errors);
    }
  }
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
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.errorUpdateUser = null;
      })
      .addCase(updateUser.rejected, (state, action: any) => {
        console.log(action.payload);
        state.errorUpdateUser = action.payload;
      });
  },
});
export const authActions = authSlice.actions;

export const userSelector = (state: RootState) => state.auth.currentUser;
export const errorUpdateUser = (state: RootState) => state.auth.errorUpdateUser;
export default authSlice;
