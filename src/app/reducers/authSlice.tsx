import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
<<<<<<< HEAD
import { getCurrentUser, updateCurrentUser } from "../api/authApi";
=======
import { updateCurrentUser } from "../api/authApi";
>>>>>>> b11afc66d4fa7713a813286a67cdb9e0613940e6
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
<<<<<<< HEAD
  "user/updateUser",
  async (data: { user: any }) => {
    const response = await updateCurrentUser(data);
    return response.data.user;
  }
);

export const getUser = createAsyncThunk("user/getUser", async () => {
  const response = await getCurrentUser();
  return response.data.user;
});

=======
  "user/update",
  async (data: { user: any }) => {
    const response = await updateCurrentUser(data);
    return data;
  }
);

>>>>>>> b11afc66d4fa7713a813286a67cdb9e0613940e6
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
<<<<<<< HEAD
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      });
  },
=======
>>>>>>> b11afc66d4fa7713a813286a67cdb9e0613940e6
});
export const authActions = authSlice.actions;
export default authSlice;
