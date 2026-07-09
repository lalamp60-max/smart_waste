import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


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
const db = getFirestore(app);


// ✅ ADMIN EMAIL
const ADMIN_EMAIL = "admin1234@gmail.com";


// AUTH CHECK
onAuthStateChanged(auth, (user) => {

  if (!user) {

    window.location.href = "index.html";
    return;

  }

  if (user.email.trim().toLowerCase() === ADMIN_EMAIL.trim().toLowerCase()) {

    loadComplaints();

  }
  else {

    alert("Access denied. Admin only.");
    window.location.href = "dashboard.html";

  }

});


// LOAD COMPLAINTS
async function loadComplaints() {

  const container = document.getElementById("complaintsContainer");

  container.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "wasteReports"));

  querySnapshot.forEach((docSnap) => {

    const data = docSnap.data();

    const div = document.createElement("div");

    div.className = "card";

    div.innerHTML = `
      <p><b>Email:</b> ${data.email}</p>
      <p><b>Location:</b> ${data.location}</p>
      <p><b>Waste Type:</b> ${data.wasteType}</p>
      <p><b>Description:</b> ${data.description}</p>
      <p><b>Status:</b> ${data.status}</p>

      <button onclick="markComplete('${docSnap.id}')">
        Mark as Completed
      </button>

      <hr>
    `;

    container.appendChild(div);

  });

}


// MARK COMPLETE
window.markComplete = async function(id) {

  const ref = doc(db, "wasteReports", id);

  await updateDoc(ref, {

    status: "Completed"

  });

  alert("Marked as completed");

  loadComplaints();

}


// LOGOUT
window.logout = function() {

  signOut(auth).then(() => {

    window.location.href = "index.html";

  });

};