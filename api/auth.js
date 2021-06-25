import firebase from "./firebase";

export const auth = firebase.auth();

export const addAuthListener = (onSignedIn, onSignedOut) => auth.onAuthStateChanged((user) => {
  if (user) {
    return onSignedIn(user);
  } else {
    return onSignedOut();
  }
});

export const signIn = async ({ email, password }, onSuccess, onError) => {
  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    return onSuccess(userCredential.user);
  } catch (error) {
    onError(error.message);
  }
}

export const signUp = async ({ email, password }, onSuccess, onError) => {
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    defaultUserConfig(userCredential.user);
    return onSuccess(userCredential.user);
  } catch (error) {
    onError(error.message);
  }
}

export const signOut = async (onSuccess, onError) => {
  try {
    await auth.signOut();
    return onSuccess();
  } catch (error) {
    onError(error.message);
  }
}

export const sendPasswordResetEmail = async ({ email }, onSuccess, onError) => {
  try {
    await auth.sendPasswordResetEmail(email);
    return onSuccess();
  } catch (error) {
    return onError(error);
  }
}

export const getCurrentUserId = () => auth.currentUser ? auth.currentUser.uid : null;

export const getCurrentUser = () => auth.currentUser;

const defaultUserConfig = (user) => {
  user.updateProfile({
    displayName: "Anonymous",
    photoURL: "https://image.freepik.com/free-vector/piggy-bank_53876-25494.jpg"
  })
}