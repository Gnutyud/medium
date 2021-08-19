import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authSlice from "./reducers/authSlice";
import articlesReducer from "./reducers/articleSlice";
import tagsReducer from "./reducers/tagSlice";
import profileReducer from "./reducers/profileSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    articles: articlesReducer,
    tags: tagsReducer,
    profile: profileReducer,
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
