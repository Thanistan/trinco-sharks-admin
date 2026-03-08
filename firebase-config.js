// =====================================================
//   SAVORIA — Firebase Configuration (Admin)
// =====================================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, onSnapshot, query, orderBy, serverTimestamp }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCV4KfPO21_JC_zG1g-l2YKJg5X09gseC4",
  authDomain: "trinco-sharks.firebaseapp.com",
  projectId: "trinco-sharks",
  storageBucket: "trinco-sharks.firebasestorage.app",
  messagingSenderId: "959039002873",
  appId: "1:959039002873:web:abaa6b7a742ddd367faa28",
  measurementId: "G-0JD6L4T4Z8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, getDocs, doc, updateDoc, onSnapshot, query, orderBy, serverTimestamp };
