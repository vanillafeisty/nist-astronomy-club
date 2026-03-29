import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBgeTiuAJMFuOfjagGNnk3ozcYWzeqAMxU",
  authDomain: "nist-astronomy-club.firebaseapp.com",
  projectId: "nist-astronomy-club",
  storageBucket: "nist-astronomy-club.firebasestorage.app",
  messagingSenderId: "967539338705",
  appId: "1:967539338705:web:2ef2b958510f70ae4704f0"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
