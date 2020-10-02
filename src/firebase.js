import firebase from "firebase";
import * as firebaseui from "firebaseui";
import "firebase/firestore";
import "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCtHgGMLHe_Z4vXq5Q5hdimsXlvgDe2Yo0",
  authDomain: "poll-app-bf731.firebaseapp.com",
  databaseURL: "https://poll-app-bf731.firebaseio.com",
  projectId: "poll-app-bf731",
  storageBucket: "poll-app-bf731.appspot.com",
  messagingSenderId: "954003802278",
  appId: "1:954003802278:web:966b88114e77266ebecc67",
  measurementId: "G-4SC7W8699H",
};

firebase.initializeApp(firebaseConfig);
const firebaseAuthObj = firebase.auth;

const ui = new firebaseui.auth.AuthUI(firebase.auth());

const uiConfig = {
  signInOptions: [
    {
      provider: firebaseAuthObj.GoogleAuthProvider.PROVIDER_ID,
    },
  ],
  callbacks: {
    signInSuccess: () => false,
  },
  signInFlow: "popup",
};

const db = firebase.firestore();
const increment  = firebase.firestore.FieldValue.increment(1)
export default firebase;
export { ui, uiConfig, firebaseAuthObj, db,increment };
