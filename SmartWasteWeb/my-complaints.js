import { db } from "./firebase.js";
import { getAuth, onAuthStateChanged } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  collection,
  getDocs,
  query,
  where
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const auth = getAuth();
const list = document.getElementById("complaintsList");

onAuthStateChanged(auth, async (user) => {

  if (!user) {
    window.location.href = "index.html";
    return;
  }

  console.log("Logged in UID:", user.uid);

  list.innerHTML = "Loading...";

  const q = query(
    collection(db, "wasteReports"),
    where("userId", "==", user.uid)
  );

  const snapshot = await getDocs(q);

  list.innerHTML = "";

  if (snapshot.empty) {
    list.innerHTML = "<p>No complaints found.</p>";
    return;
  }

  snapshot.forEach(doc => {
    const d = doc.data();

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <strong>📍 Location:</strong> ${d.location}<br>
      <strong>🗑️ Type:</strong> ${d.wasteType}<br>
      <strong>📝 Description:</strong> ${d.description || "-"}<br>
      <strong>📌 Status:</strong> ${d.status}
    `;

    list.appendChild(card);
  });
});