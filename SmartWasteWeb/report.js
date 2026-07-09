import { db } from "./firebase.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const auth = getAuth();

window.submitWaste = async function () {

  const user = auth.currentUser;

  if (!user) {
    alert("Please login first");
    window.location.href = "index.html";
    return;
  }

  const location = document.getElementById("location").value;
  const type = document.getElementById("type").value;
  const description = document.getElementById("description").value;

  if (location === "" || type === "") {
    alert("Please fill all required fields");
    return;
  }

  try {
    await addDoc(collection(db, "wasteReports"), {
      userId: user.uid,              // 🔥 IMPORTANT
      email: user.email,             // optional (nice for admin)
      location: location,
      wasteType: type,
      description: description,
      status: "Pending",
      createdAt: serverTimestamp()
    });

    alert("✅ Waste Report Submitted");

    document.getElementById("location").value = "";
    document.getElementById("type").value = "";
    document.getElementById("description").value = "";

  } catch (error) {
    alert("❌ Error while saving data");
    console.error(error);
  }
};