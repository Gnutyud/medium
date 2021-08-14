import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authSlice from "../features/Login/authSlice";
import articlesReducer from "../features/articles/slice/articleSlice";

const store = configureStore({
  reducer: { auth: authSlice.reducer, articles: articlesReducer },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export default store;
