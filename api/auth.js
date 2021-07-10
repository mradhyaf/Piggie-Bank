import firebase from "./firebase";
import optionalFunction from "../functions/optionalFunction";

const auth = firebase.auth();
export default auth;

export function authSubscriber(onSignedIn, onSignedOut) {
  return auth.onAuthStateChanged((user) => {
    if (user) {
      onSignedIn(user);
    } else {
      onSignedOut();
    }
  })
}

export const signInWithEmailAndPassword = async ({ email, password }, onSuccess, onError) => {
  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);  
    optionalFunction(onSuccess)(userCredential.user);
  } catch (error) {
    optionalFunction(onError)(error);
  }
}

export const signUpWithEmailAndPassword = async ({ username = "Anonymous", email, password }, onSuccess, onError) => {
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    await userCredential.user.updateProfile({
      displayName: username,
      photoURL: "https://image.freepik.com/free-vector/piggy-bank_53876-25494.jpg"
    })
    optionalFunction(onSuccess)(userCredential.user);
  } catch (error) {
    optionalFunction(onError)(error);
  }
}

export const signOut = async (onSuccess, onError) => {
  try {
    await auth.signOut();
    optionalFunction(onSuccess)();
  } catch (error) {
    optionalFunction(onError)(error);
  }
}

export const sendPasswordResetEmail = async (email, onSuccess, onError) => {
  try {
    await auth.sendPasswordResetEmail(email);
    optionalFunction(onSuccess)();
  } catch (error) {
    optionalFunction(onError)(error);
  }
}

export const getCurrentUserId = () => auth.currentUser ? auth.currentUser.uid : null;

export const getCurrentUserDisplayName = () => auth.currentUser ? auth.currentUser.displayName : null;

const defaultUserConfig = (user) => {
  user.updateProfile({
    displayName: "Anonymous",
    photoURL: "https://image.freepik.com/free-vector/piggy-bank_53876-25494.jpg"
  })
}