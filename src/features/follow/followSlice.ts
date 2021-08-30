import { RootState } from 'app/store';
import { createSlice } from '@reduxjs/toolkit';
interface InitialState {
  profileState: ProfileType;
  isLoading: boolean;
}

const initialState: InitialState = {
  profileState: {} as ProfileType,
  isLoading: false,
};

export const followSlice = createSlice({
  name: 'follow',
  initialState,
  reducers: {
    followProfile: (state) => {
      state.isLoading = true;
    },
    followProfileSuccess: (state, action) => {
      state.isLoading = false;
      state.profileState = action.payload.profile;
    },
    unFollowProfile: (state) => {
      state.isLoading = true;
    },
    unFollowProfileSuccess: (state, action) => {
      state.isLoading = false;
      state.profileState = action.payload.profile;
    },
  },
});

// actions
export const { followProfile, followProfileSuccess, unFollowProfile, unFollowProfileSuccess } =
  followSlice.actions;

// selector
export const selectProfile = (state: RootState) => state.follow.profileState;
export const isLoading = (state: RootState) => state.follow.isLoading;

export default followSlice.reducer;
