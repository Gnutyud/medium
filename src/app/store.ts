import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authSlice from "./reducers/authSlice";
import articlesReducer from "./reducers/articleSlice";

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
