// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxU-JLgZTpeD2x5nk5JGr-GXO8Bw3QubI",
  authDomain: "coffee-app-e3db0.firebaseapp.com",
  projectId: "coffee-app-e3db0",
  storageBucket: "coffee-app-e3db0.firebasestorage.app",
  messagingSenderId: "431639826205",
  appId: "1:431639826205:web:b7495afc8ff907c35bdbf4",
  measurementId: "G-P0DD289FGY"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const storage = getStorage(app);

export const auth = getAuth(app);
export const db = getFirestore(app)

// Keep this as a function to be called ONLY in useEffect or client-side
export const initAnalytics = async () => {
  if (typeof window !== "undefined") {
    const supported = await isSupported();
    if (supported) return getAnalytics(app);
  }
  return null;
};
export const analytics = initAnalytics();
export default app