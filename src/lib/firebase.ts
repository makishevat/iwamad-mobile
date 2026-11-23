import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyC1JSDJuIqQwofWllrZ62j6YXEg-0_MmYo",
  authDomain: "iwamad-chat-4000c.firebaseapp.com",
  databaseURL: "https://iwamad-chat-4000c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId:  "iwamad-chat-4000c",
  storageBucket: "iwamad-chat-4000c.firebasestorage.app",
  messagingSenderId: "109148908569",
  appId: "1:109148908569:web:7fdf9ee7ee129905004e88"
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

