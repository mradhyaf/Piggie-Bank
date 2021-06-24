import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isLoading: true,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.currentUser = action.payload
      state.isLoading = false;
    },
    signOut: state => {
      state.currentUser = null;
      state.isLoading = false;
    },
    startLoading: state => {
      state.isLoading = true;
    }
  },
})

export const { signIn, signOut, startLoading } = authSlice.actions;

export const selectCurrentUser = state => state.auth.currentUser;
export const selectIsLoading = state => state.auth.isLoading;

export default authSlice.reducer;