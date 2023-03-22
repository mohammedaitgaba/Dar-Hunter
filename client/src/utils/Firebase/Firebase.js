import { initializeApp } from "firebase/app";
import {getStorage}from 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyC8PxDATjSLSrytot1D_7o9G5kNt3MVtIE",
  authDomain: "darhunter-fbdcf.firebaseapp.com",
  projectId: "darhunter-fbdcf",
  storageBucket: "darhunter-fbdcf.appspot.com",
  messagingSenderId: "654213446270",
  appId: "1:654213446270:web:fe04fcfbbb6090dea5f62f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)