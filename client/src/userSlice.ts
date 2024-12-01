import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { User } from './types';

const userSlice = createSlice({
  name: 'user',
  initialState: null as User | null, // Explicitly type the initialState
  reducers: {
    setUser: (state, action: PayloadAction<User>) => action.payload, // Returns a valid `User` object
    clearUser: state => null, // Resets the state to `null`
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
