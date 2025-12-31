// guard.js
import { auth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
console.log("guard.js - OK");


onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "/pages/siget/login/";
  }
});
