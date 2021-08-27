import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

export const settingSlice = createSlice({
  name: 'setting',
  initialState: { currentUser: null as any, isLoading: false },
  reducers: {
    getUser: (state) => {
      state.isLoading = true;
    },
    getUserSaga: (state, action: PayloadAction<any>) => {
      state.currentUser = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    updateUser: (state) => {
      state.isLoading = true;
    },
    updateUserSaga: (state, action: PayloadAction<any>) => {
      state.currentUser = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
  },
});

export const { getUser, updateUser, getUserSaga, updateUserSaga } = settingSlice.actions;
export const selectUser = (state: RootState) => state.setting.currentUser;
export const selectLoading = (state: RootState) => state.setting.isLoading;

export default settingSlice.reducer;
