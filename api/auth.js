import firebase from "./firebase";

const auth = firebase.auth();

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

export const resetEmail = ({email}) => {
    auth.sendPasswordResetEmail(
        email, null)
        .then(function() {
        // Password reset email sent.
        })
        .catch(function(error) {
        // Error occurred. Inspect error.code.
        alert(error.message);
        });
    }

export const isSignedIn = () => auth.currentUser ? true : false;

export const getCurrentUserId = () => auth.currentUser ? auth.currentUser.uid : null;
