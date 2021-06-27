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
    authRequest: state => {
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
    signUpSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signUpFail: (state, action) => {
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
      dispatch(authRequest());
      const userCredentials = await auth.signInWithEmailAndPassword(email, password);
      const { uid, photoURL, displayName, email: mail } = userCredentials.user;
      return dispatch(signInSuccess({ uid, photoURL, displayName, mail }));
    } catch (error) {
      return dispatch(signInFail(error));
    }
  }
}

export const signUp = ({ displayName, email, password }) => {
  return async (dispatch) => {
    try {   
      dispatch(authRequest());
      const userCredentials = await auth.createUserWithEmailAndPassword(email, password);
      const { user } = userCredentials;
      user.updateProfile({
        displayName,
        photoURL: "https://image.freepik.com/free-vector/piggy-bank_53876-25494.jpg"
      })
      dispatch(signUpSuccess({ 
          displayName: user.displayName, 
          email: user.email,
          photoURL: user.email,
          uid: user.uid,
        }))
    } catch (error) {
      return dispatch(signUpFail(error));
    }
  }
}

export const { authRequest, signInSuccess, signInFail, signUpSuccess, signUpFail, signOut } = userSlice.actions;

export const selectDisplayName = state => state.user.currentUser.displayName;
export const selectPhotoURL = state => state.user.currentUser.photoURL;
export const selectUserId = state => state.user.currentUser.uid;
export const selectLoading = state => state.user.loading;

export default userSlice.reducer;