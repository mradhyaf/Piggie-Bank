import firebase from "./firebase";
import optionalFunction from "../functions/optionalFunction";

const auth = firebase.auth();
export default auth;

export function authSubscriber(onChange) {
  return auth.onAuthStateChanged((user) => {
    onChange(user);
  });
}

export const signInWithEmailAndPassword = async (
  { email, password },
  onComplete
) => {
  auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      optionalFunction(onComplete)(null);
    })
    .catch((error) => {
      optionalFunction(onComplete)(error);
    });
};

export const signUpWithEmailAndPassword = async (
  { username = "Anonymous", email, password },
  onComplete
) => {
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      userCredential.user
        .updateProfile({
          displayName: username,
          photoURL:
            "https://image.freepik.com/free-vector/piggy-bank_53876-25494.jpg",
        })
        .then(() => {
          optionalFunction(onComplete)(null);
        });
    })
    .catch((error) => {
      optionalFunction(onComplete)(error);
    });
};

export const signOut = async (onComplete) => {
  auth
    .signOut()
    .then(() => {
      optionalFunction(onComplete)(null);
    })
    .catch((error) => {
      optionalFunction(onComplete)(error);
    });
};

export const sendPasswordResetEmail = async (email, onComplete) => {
  auth
    .sendPasswordResetEmail(email)
    .then(() => {
      optionalFunction(onComplete)(null);
    })
    .catch((error) => {
      optionalFunction(onComplete)(error);
    });
};

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

export const getUser = () => auth.currentUser;

export const getUserId = () => (auth.currentUser ? auth.currentUser.uid : null);

export const getPhotoURL = () =>
  auth.currentUser ? auth.currentUser.photoURL : null;
