import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { fetchProfile } from ".././api/profileApi";
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
export const getProfile = createAsyncThunk(
  "profiles/getProfile",
  async (username: string) => {
    const response = await fetchProfile(username);
    return response.data.profile;
  },
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
  },
});
export const profileSelector = (state: RootState) => state.profile.profile;
export default profileSlice.reducer;
