import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
interface ProfileType {
  username: string;
  image: string;
  following: boolean;
  bio: string;
}
interface Profile {
  profile: ProfileType | null;
}
const initialState: Profile = {
  profile: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    getProfile: (state, action) => {},
    getProfileSaga: (state, action) => {
      state.profile = action.payload;
    },
  },
});
export const { getProfile, getProfileSaga } = profileSlice.actions;
export const profileSelector = (state: RootState) => state.profile.profile;
export default profileSlice.reducer;
