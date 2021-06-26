import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../../api/auth";

const initialState = {
  currentUser: {
    displayName: null,
    email: null,
    photoURL: null,
    uid: null,
  },
  loading: false,
  error: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInRequest: state => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFail: (state, action) => {
      state.currentUser = {...initialState.currentUser};
      state.loading = false;
      state.error = action.payload;
    },
    signOut: state => {
      state.currentUser = {...initialState.currentUser};
      state.loading = initialState.loading;
      state.error = initialState.error;
    }
  },
})

export const signIn = ({ email, password }) => {
  return async (dispatch) => {
    try {
      dispatch(signInRequest());
      const userCredentials = await auth.signInWithEmailAndPassword(email, password);
      const { uid, photoURL, displayName, email: mail } = userCredentials.user;
      return dispatch(signInSuccess({ uid, photoURL, displayName, mail }));
    } catch (error) {
      return dispatch(signInFail(error));
    }
  }
}

export const { signInRequest, signInSuccess, signInFail, signOut } = userSlice.actions;

export const selectDisplayName = state => state.user.currentUser.displayName;
export const selectPhotoURL = state => state.user.currentUser.photoURL;
export const selectUserId = state => state.user.currentUser.uid;
export const selectLoading = state => state.user.loading;

export default userSlice.reducer;