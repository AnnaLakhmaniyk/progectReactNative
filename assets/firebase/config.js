import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD6e05JkIG5A9gYLqw4doNC2XaZcySoAuo",
  authDomain: "reactnative123-ea1d7.firebaseapp.com",
  databaseURL: "https://reactnative123-ea1d7-default-rtdb.firebaseio.com",
  projectId: "reactnative123-ea1d7",
  storageBucket: "reactnative123-ea1d7.appspot.com",
  messagingSenderId: "53056403500",
  appId: "1:53056403500:web:a789423e5a477283dcb989",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
