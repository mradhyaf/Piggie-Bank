import { createSlice } from "@reduxjs/toolkit";
import { auth, auth as firebaseAuth } from "../../api/auth";

const initialState = {
  currentUser: {
    displayName: null,
    email: null,
    photoURL: null,
    uid: null,
  },
  loading: false,
  error: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authRequest: state => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
    },
    signInFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signUpSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
    },
    signUpFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signOutSuccess: state => {
      state.currentUser = {...initialState.currentUser};
      state.loading = false;
    },
    signOutFail: (state, action) => {
      state.loading = false;
      state.error = action.payload
    },
    passwordRecoveryFail: (state, action) => {
      state.error = action.payload
    }
  },
})

export const signIn = ({ email, password }) => {
  return async (dispatch) => {
    try {
      dispatch(authRequest());
      const userCredentials = await firebaseAuth.signInWithEmailAndPassword(email, password);
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
      const userCredentials = await firebaseAuth.createUserWithEmailAndPassword(email, password);
      const { user } = userCredentials;
      user.updateProfile({
        displayName,
        photoURL: "https://image.freepik.com/free-vector/piggy-bank_53876-25494.jpg"
      })
      return dispatch(signUpSuccess({ 
          displayName: user.displayName, 
          email: user.email,
          photoURL: user.email,
          uid: user.uid,
        }));
    } catch (error) {
      return dispatch(signUpFail(error));
    }
  }
}

export const signOut = () => {
  return async (dispatch) => {
    try {
      dispatch(authRequest());
      await firebaseAuth.signOut();
      return dispatch(signOutSuccess());
    } catch (error) {
      return dispatch(signOutFail());
    }
  }
}

export const passwordRecovery = (email) => {
  return async (dispatch) => {
    try {
      await firebaseAuth.sendPasswordResetEmail(email);
    } catch (error) {
      return dispatch(passwordRecoveryFail(error));
    }
  }
}

export const { 
  authRequest, 
  signInSuccess, 
  signInFail, 
  signUpSuccess, 
  signUpFail, 
  signOutSuccess, 
  signOutFail,
  passwordRecoveryFail
} = authSlice.actions;

export const selectDisplayName = state => state.auth.currentUser.displayName;
export const selectPhotoURL = state => state.auth.currentUser.photoURL;
export const selectUserId = state => state.auth.currentUser.uid;
export const selectLoading = state => state.auth.loading;

export default authSlice.reducer;