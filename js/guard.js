// guard.js
import { auth } from "./firebase.js";
import { onAuthStateChanged } from
  "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

let authResolvida = false;
let authPromise = null;
let emailVerificado = true;

export function isEmailVerificado() {
  return emailVerificado;
}

export function esperarAuth() {
  if (authResolvida) {
    return Promise.resolve(auth.currentUser);
  }

  if (!authPromise) {
    authPromise = new Promise((resolve) => {
      onAuthStateChanged(auth, async (user) => {
        authResolvida = true;

        if (!user) {
          window.location.href = "/pages/siget/login/";
          return;
        }

        await user.reload();
        emailVerificado = user.emailVerified;

        resolve(user);
      });
    });
  }

  return authPromise;
}
