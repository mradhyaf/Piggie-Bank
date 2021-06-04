import firebase from "./firebase";

export const auth = firebase.auth();

export const setOnAuthStateChanged = (onSignedIn, onSignedOut) => auth.onAuthStateChanged((user) => {
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
    return onError(error);
  }
}

export const signUp = async ({ email, password }, onSuccess, onError) => {
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    return onSuccess(userCredential.user);
  } catch (error) {
    return onError(error);
  }
}

export const signOut = async (onSuccess, onError) => {
  try {
    await auth.signOut();
    return onSuccess();
  } catch (error) {
    return onError(error);
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
