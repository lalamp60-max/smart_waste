import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAINm0FCxQQe-fdh9f-QhaAoSWzUJUXoAM",
  authDomain: "dti-smartwastemanagement.firebaseapp.com",
  projectId: "dti-smartwastemanagement",
  storageBucket: "dti-smartwastemanagement.appspot.com",
  messagingSenderId: "387793778639",
  appId: "1:387793778639:web:1ab121a291e3905b9104ba"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);