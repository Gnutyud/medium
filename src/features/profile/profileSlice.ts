import { RootState } from 'app/store';
import { createSlice } from '@reduxjs/toolkit';

const inAuthorPagePersist = localStorage.getItem('inAuthorPage');

interface InitialState {
  inAuthorPage: boolean;
  profile: ProfileType;
  isLoading: boolean;
}

const initialState: InitialState = {
  inAuthorPage: inAuthorPagePersist ? JSON.parse(inAuthorPagePersist) : false,
  profile: {} as ProfileType,
  isLoading: false,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setInAuthorPage: (state, action) => {
      state.inAuthorPage = action.payload;
    },
    getProfile: (state) => {
      state.isLoading = false;
    },
    getProfileSuccess: (state, action) => {
      state.profile = action.payload.profile;
    },
  },
});

// actions
export const { setInAuthorPage, getProfile, getProfileSuccess } = authorSlice.actions;

// selector
export const selectInAuthorPage = (state: RootState) => state.profile.inAuthorPage;
export const selectIsLoading = (state: RootState) => state.profile.isLoading;
export const selectProfile = (state: RootState) => state.profile.profile;

export default authorSlice.reducer;
