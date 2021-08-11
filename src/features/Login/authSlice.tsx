import { createSlice } from "@reduxjs/toolkit";
// interface userType {
//   username : string;
//   email : string;
// }
export interface authState {
  isRegister: boolean;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string;
  currentUser: any;
}
const initialState: authState = {
  isRegister: false,
  isLoggedIn: false,
  isLoading: false,
  error: "",
  currentUser: null,
};
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
      state.error = "";
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
      localStorage.removeItem("token");
      state.isLoggedIn = false;
      state.currentUser = null;
    },
  },
});
export const authActions = authSlice.actions;
export default authSlice;
