// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";


// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAINm0FCxQQe-fdh9f-QhaAoSWzUJUXoAM",
  authDomain: "dti-smartwastemanagement.firebaseapp.com",
  projectId: "dti-smartwastemanagement",
  storageBucket: "dti-smartwastemanagement.appspot.com",
  messagingSenderId: "387793778639",
  appId: "1:387793778639:web:1ab121a291e3905b9104ba"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


// ✅ SET YOUR ADMIN EMAIL HERE
const ADMIN_EMAIL = "admin1234@gmail.com";


// HTML elements
const email = document.getElementById("email");
const password = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const msg = document.getElementById("msg");
const logoutBtn = document.getElementById("logoutBtn");


// ================= LOGIN =================
if (loginBtn) {

  loginBtn.addEventListener("click", () => {

    signInWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {

        const user = userCredential.user;

        // ✅ ADMIN LOGIN
        if (user.email.trim().toLowerCase() === ADMIN_EMAIL.trim().toLowerCase()) {

          window.location.href = "admin.html";

        }
        else {

          window.location.href = "dashboard.html";

        }

      })
      .catch((error) => {

        msg.innerText = error.message;
        msg.style.color = "red";

      });

  });

}


// ================= REGISTER =================
if (registerBtn) {

  registerBtn.addEventListener("click", () => {

    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then(() => {

        msg.innerText = "Registration successful. Now login.";
        msg.style.color = "green";

      })
      .catch((error) => {

        msg.innerText = error.message;
        msg.style.color = "red";

      });

  });

}


// ================= LOGOUT =================
if (logoutBtn) {

  logoutBtn.addEventListener("click", () => {

    signOut(auth).then(() => {

      window.location.href = "index.html";

    });

  });

}


// ================= PAGE PROTECTION =================

// ADMIN PAGE
if (window.location.pathname.includes("admin.html")) {

  onAuthStateChanged(auth, (user) => {

    if (!user) {

      window.location.href = "index.html";
      return;

    }

    if (user.email.trim().toLowerCase() !== ADMIN_EMAIL.trim().toLowerCase()) {

      alert("Access denied. Admin only.");
      window.location.href = "dashboard.html";

    }

  });

}


// USER PAGE
if (window.location.pathname.includes("dashboard.html")) {

  onAuthStateChanged(auth, (user) => {

    if (!user) {

      window.location.href = "index.html";

    }

  });

}