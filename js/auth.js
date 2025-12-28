// auth.js
import { auth, db } from "./firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

// CADASTRO
export async function cadastrarUsuario(email, senha, nome) {
  const cred = await createUserWithEmailAndPassword(auth, email, senha);
  const user = cred.user;

  await setDoc(doc(db, "usuarios", user.uid), {
    nome: nome,
    tipo: "representante",
    DtaCadastro: new Date(),
    ativo: true
  });
}

// LOGIN
export async function loginUsuario(email, senha) {
  await signInWithEmailAndPassword(auth, email, senha);
}

// LOGOUT
export async function logoutUsuario() {
  await signOut(auth);
}
