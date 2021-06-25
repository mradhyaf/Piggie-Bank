import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authorized: false,
  currentUser: {
    displayName: null,
    email: null,
    photoURL: null,
    uid: null,
  },
  isLoading: true,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.authorized = true;
      state.currentUser = action.payload;
      state.isLoading = false;
    },
    signOut: state => {
      state.authorized = false;
      state.currentUser = initialState.currentUser;
      state.isLoading = false;
    },
    startLoading: state => {
      state.isLoading = true;
    }
  },
})

export const { signIn, signOut, startLoading } = authSlice.actions;

export const selectAuthorized= state => state.auth.authorized;
export const selectPhotoURL = state => state.auth.currentUser.photoURL;
export const selectIsLoading = state => state.auth.isLoading;

export default authSlice.reducer;