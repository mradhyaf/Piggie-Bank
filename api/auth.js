import firebase from "./firebase";

const auth = firebase.auth();

export const currentUser = auth.onAuthStateChanged((user) => {
  if (user) {
    return user.uid;
  } else {
    return null;
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

export const isSignedIn = () => auth.currentUser ? true : false;