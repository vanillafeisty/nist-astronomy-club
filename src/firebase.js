// src/firebase.js
// ============================================================
//  STEP 1: Go to https://console.firebase.google.com
//  STEP 2: Create a project → Add a Web App
//  STEP 3: Copy your firebaseConfig object and paste it below
//  STEP 4: Enable Firestore → Build → Firestore Database → Start in Test Mode
// ============================================================

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// 🔴 REPLACE THIS with your own Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
