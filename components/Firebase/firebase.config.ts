// firebase.config.js
import { initializeApp } from "firebase/app";
// @ts-ignore - Firebase Auth TS definitions mismatch in React Native, but this is required for runtime persistence
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

import { Platform } from "react-native";

const firebaseConfig = {
  apiKey: "AIzaSyDtqiRnwC4q6ujXLrHpzzBcofCAs9qeUBY",
  authDomain: "gym-project-7eb9b.firebaseapp.com",
  projectId: "gym-project-7eb9b",
  storageBucket: "gym-project-7eb9b.appspot.com",
  messagingSenderId: "918238493396",
  appId: "1:918238493396:web:817b67e48484110f7d9941",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let auth;
if (Platform.OS === "web") {
  // Web uses the default native browser persistence (IndexedDB/Local Storage)
  auth = initializeAuth(app);
} else {
  // Mobile uses AsyncStorage for persistence
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
}

export default auth;