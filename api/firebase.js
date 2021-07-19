import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import { 
  API_KEY,
  AUTH_DOMAIN,
  DATABASE_URL,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID,
  GOOGLE_CLOUD_VISION_API_KEY
 } from "@env";

const googleCloudVisionApiKey = GOOGLE_CLOUD_VISION_API_KEY;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;

export const auth = firebaseApp.auth()

export const db = firebaseApp.database();