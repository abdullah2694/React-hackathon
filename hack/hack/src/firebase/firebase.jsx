import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCFLwL_AfUztTvA4hxd7n2V9N6CAHvmv5I",
  authDomain: "hack-ddfdf.firebaseapp.com",
  projectId: "hack-ddfdf",
  storageBucket: "hack-ddfdf.firebasestorage.app",
  messagingSenderId: "669008242389",
  appId: "1:669008242389:web:2c0b8443150068e37ae45c"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);