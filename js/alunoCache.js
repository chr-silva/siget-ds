// alunoCache.js
import { auth, db } from "./firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

let alunoCache = null; // cache inicialmente vazio

/**
 * Retorna os dados do aluno logado
 * Busca no Firestore apenas uma vez e salva como cache
 * isso evita buscas constantes e repetitivas no db pelas mesmas
 * informações
 */

export async function getAlunoAtual(force = false) {
  if (alunoCache && !force) {
    return alunoCache;
  }

  const alunoStorage = sessionStorage.getItem("alunoCache");
  if (alunoStorage && !force) {
    alunoCache = JSON.parse(alunoStorage);
    return alunoCache;
  }

  const user = auth.currentUser;
  if (!user) {
    throw new Error("Usuário não está logado");
  }

  const alunoRef = doc(db, "alunos", user.uid);
  const alunoSnap = await getDoc(alunoRef);

  if (!alunoSnap.exists()) {
    throw new Error("Aluno não encontrado no DB");
  }

  alunoCache = alunoSnap.data();
  sessionStorage.setItem("alunoCache", JSON.stringify(alunoCache));

  return alunoCache;
}

export function limparCacheAluno() {
  alunoCache = null;
  sessionStorage.removeItem("alunoCache");
}
