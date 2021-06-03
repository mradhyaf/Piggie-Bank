import firebase from "./firebase";

const auth = firebase.auth();

export const signIn = ({ email, password }, onError) => {
  auth.signInWithEmailAndPassword(email, password)git
  .then((userCredential) => {
    const user = userCredential.user;
    return user;
  })
  .catch((error) => {
    // var errorCode = error.code;
    // var errorMessage = error.message;
    return onError(error);
  });
}
export const signUp = ({ email, password }, onError) => {
  auth.createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    return user;
  })
  .catch((error) => {
    // var errorCode = error.code;
    // var errorMessage = error.message;
    return onError(error);
  });
}

export const signOut = (onSuccess, onError) => {
  auth.signOut()
  .then(() => {
    return onSuccess();
  })
  .catch((error) =>{
    return onError(error);
  })
}

export const isSignedIn = () => auth.currentUser ? true : false;

export const getCurrentUserId = () => auth.currentUser ? auth.currentUser.uid : null;
