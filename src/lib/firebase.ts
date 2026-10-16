import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDPVII6t18j9uIE2-r4C5xYmXfl1hNMzVw",
  authDomain: "fresh-barber-98fa8.firebaseapp.com",
  projectId: "fresh-barber-98fa8",
  storageBucket: "fresh-barber-98fa8.firebasestorage.app",
  messagingSenderId: "377368698474",
  appId: "1:377368698474:web:d0a38fe261243ff1db7413",
  measurementId: "G-NQRHJEBJ1M",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
