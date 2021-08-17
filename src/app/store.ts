import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authSlice from "./reducers/authSlice";
import articlesReducer from "./reducers/articlesSlice";
import tagsReducer from "./reducers/tagsSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    articles: articlesReducer,
    tags: tagsReducer,
  },
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
