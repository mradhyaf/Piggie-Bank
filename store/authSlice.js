import { createSlice } from "@reduxjs/toolkit";
import { auth as firebaseAuth } from '../api/firebase';
import { clear as clearExpense} from './expensesSlice';
import optionalFunction from "../functions/optionalFunction";

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: null,
    loading: false,
    error: null
  },
  reducers: {
    request: state => {
      state.loading = true;
      state.error = null;
    },
    success: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    fail: (state, action) => {
      state.loading = false;
      state.error = action;
    }
  },
})

export const signInWithEmailAndPassword = ({ email, password }, onComplete) => {
  return async (dispatch) => {
    try {
      const userCredential = await firebaseAuth.signInWithEmailAndPassword(email, password);  
      dispatch(success(userCredential.user));
      optionalFunction(onComplete)(userCredential.user);
    } catch (error) {
      dispatch(fail(error.message));
      optionalFunction(onComplete)(error);
    }
  }
}

export const signUpWithEmailAndPassword = ({ username = "Anonymous", email, password }, onComplete) => {
  return async (dispatch) => {
    try {
      const userCredential = await firebaseAuth.createUserWithEmailAndPassword(email, password);
      await userCredential.user.updateProfile({
        displayName: username,
        photoURL: "https://image.freepik.com/free-vector/piggy-bank_53876-25494.jpg"
      });
      dispatch(success(userCredential.user));
      optionalFunction(onComplete)(userCredential.user);
    } catch (error) {
      dispatch(fail(error.message));
      optionalFunction(onComplete)(error);
    }
  }
}

export const signOut = (onComplete) => {
  return async (dispatch) => {
    try {
      await firebaseAuth.signOut();
      dispatch(success(null));
      dispatch(clearExpense());
      optionalFunction(onComplete)(null);
    } catch (error) {
      dispatch(fail(error.message));
      optionalFunction(onComplete)(error);
    }
  }
}

export const sendPasswordResetEmail = (email, onComplete) => {
  return async () => {
    try {
      await firebaseAuth.sendPasswordResetEmail(email);
      optionalFunction(onComplete)(null);
    } catch (error) {
      dispatch(fail(error.message));
      optionalFunction(onComplete)(error);
    }
  }
}

export const updateProfile = ({ displayName, photoURL }, onComplete) => {
  return async (dispatch) => {
    try {
      await firebaseAuth.currentUser.updateProfile(
        { displayName, photoURL }
      );
      optionalFunction(onComplete)(null);
    } catch (error) {
      dispatch(fail(error.message));
      optionalFunction(onComplete)(error);
    }
  }
}

export const { 
  request,
  success,
  fail
} = authSlice.actions;

export const selectUser = state => state.auth.currentUser;
export const selectDisplayName = state => state.auth.currentUser.displayName;
export const selectPhotoURL = state => state.auth.currentUser.photoURL;
export const selectUserId = state => state.auth.currentUser.uid;
export const selectLoading = state => state.auth.loading;

export default authSlice.reducer;