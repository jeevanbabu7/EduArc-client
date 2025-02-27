
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID
  } from "expo-constants"


// const firebaseConfig = {
//   apiKey: FIREBASE_API_KEY,
//   authDomain: FIREBASE_AUTH_DOMAIN,
//   projectId: FIREBASE_PROJECT_ID,
//   storageBucket: FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
//   appId: FIREBASE_APP_ID,
//   measurementId: FIREBASE_MEASUREMENT_ID

// };

const firebaseConfig = {
  apiKey: "AIzaSyA7LUPyJTWp7ywfDwaayJbQQU5h8ZzZDzE",
  authDomain: "text-editor-56e8c.firebaseapp.com",
  projectId: "text-editor-56e8c",
  storageBucket: "text-editor-56e8c.firebasestorage.app",
  messagingSenderId: "776489891914",
  appId: "1:776489891914:web:97bd36cf06d9bb739d4eb3",
  measurementId: "G-57YFJ79DCV"
};

// const firebaseConfig = {
//   apiKey: "AIzaSyA6KqgfJXcOcOHDYn9EUVGgnFYjIK9-rOY",
//   authDomain: "eduarc-27f72.firebaseapp.com",
//   projectId: "eduarc-27f72",
//   storageBucket: "eduarc-27f72.firebasestorage.app",
//   messagingSenderId: "253029122735",
//   appId: "1:253029122735:web:868610aea5c45123f9ca5a"
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


export default app;