// auth.js
import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";


// CADASTRO
export async function cadastrarUsuario(email, senha, nome, turma) {
  const cred = await createUserWithEmailAndPassword(auth, email, senha); //credencial
  const user = cred.user;

  await setDoc(doc(db, "alunos", user.uid), {
    nome: nome,
    //tipo: "representante",
    DtaCadastro: new Date(),
    turma: turma,
    ativo: true
  });
}

// LOGIN
export async function loginUsuario(email, senha) {
  await signInWithEmailAndPassword(auth, email, senha);
}

onAuthStateChanged(auth, (user) => {

  if (user) {
    const logoutBtn = document.getElementById("endSession");

    logoutBtn.addEventListener("click", async () => {
      try {
        await signOut(auth);
        sessionStorage.removeItem("alunoCache");
        window.location.href = "/pages/siget/";
      } catch (error) {
        console.error("Erro ao fazer logout:", error);
      }
    });
  }

});



