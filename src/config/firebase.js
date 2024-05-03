
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD7NRvcpALYJOdH4jWkaOH-f5_6Now5SCo",
  authDomain: "it-sysarch32-store-climaco.firebaseapp.com",
  projectId: "it-sysarch32-store-climaco",
  storageBucket: "it-sysarch32-store-climaco.appspot.com",
  messagingSenderId: "319510315003",
  appId: "1:319510315003:web:870542d69687ab4765955e"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);