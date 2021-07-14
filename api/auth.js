import firebase from "./firebase";
import optionalFunction from "../functions/optionalFunction";

const auth = firebase.auth();
export default auth;

export function authSubscriber(onChange) {
  return auth.onAuthStateChanged((user) => {
    onChange(user);
  })
}

export const signInWithEmailAndPassword = async ({ email, password }, onComplete) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);  
    optionalFunction(onComplete)(null);
  } catch (error) {
    optionalFunction(onComplete)(error);
  }
}

export const signUpWithEmailAndPassword = async ({ username = "Anonymous", email, password }, onComplete) => {
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    await userCredential.user.updateProfile({
      displayName: username,
      photoURL: "https://image.freepik.com/free-vector/piggy-bank_53876-25494.jpg"
    })
    optionalFunction(onComplete)(null);
  } catch (error) {
    optionalFunction(onComplete)(error);
  }
}

export const signOut = async (onComplete) => {
  try {
    await auth.signOut();
    optionalFunction(onComplete)(null);
  } catch (error) {
    optionalFunction(onComplete)(error);
  }
}

export const sendPasswordResetEmail = async (email, onComplete) => {
  try {
    await auth.sendPasswordResetEmail(email);
    optionalFunction(onComplete)(null);
  } catch (error) {
    optionalFunction(onComplete)(error);
  }
}

export const updateDisplayName = async (displayName, onComplete) => {
  auth.currentUser
    .updateProfile({ displayName })
    .then(() => {
      optionalFunction(onComplete)(null);
    })
    .catch((error) => {
      optionalFunction(onComplete)(error);
    });
};

export const getUserId = () => auth.currentUser ? auth.currentUser.uid : null;

export const getDisplayName = () => auth.currentUser ? auth.currentUser.displayName : null;

export const getPhotoURL = () => auth.currentUser ? auth.currentUser.photoURL : null;