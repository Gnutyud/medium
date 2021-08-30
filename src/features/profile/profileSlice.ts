import { RootState } from 'app/store';
import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  profile: ProfileType;
  isLoading: boolean;
}

const initialState: InitialState = {
  profile: {} as ProfileType,
  isLoading: false,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    getProfile: (state) => {
      state.isLoading = false;
    },
    getProfileSuccess: (state, action) => {
      state.profile = action.payload.profile;
    },
    followProfile: (state) => {},
    followProfileSuccess: (state, action) => {
      state.profile = action.payload.profile;
    },
    unFollowProfile: (state) => {},
    unFollowProfileSuccess: (state, action) => {
      state.profile = action.payload.profile;
    },
  },
});

// actions
export const {
  getProfile,
  getProfileSuccess,
  followProfile,
  followProfileSuccess,
  unFollowProfile,
  unFollowProfileSuccess,
} = authorSlice.actions;

// selector
export const selectProfile = (state: RootState) => state.profile.profile;
export const selectIsLoading = (state: RootState) => state.profile.isLoading;

export default authorSlice.reducer;
