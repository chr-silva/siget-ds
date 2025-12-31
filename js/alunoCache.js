import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

let alunoCache = null; // inicialmente vazio


/**
 * Retorna os dados do aluno logado
 * Busca no Firestore apenas uma vez e salva como cache
 * isso evita buscas constantes e repetitivas no db pelas mesmas
 * informações
 */

export function getAlunoAtual() {
    return new Promise((resolve, reject) => {
        if (alunoCache) {
            resolve(alunoCache);
            return; 
        }

        const alunoStorage = sessionStorage.getItem("alunoCache");
        if (alunoStorage) {
            alunoCache = JSON.parse(alunoStorage);
            resolve(alunoCache);
            return;
        }

        onAuthStateChanged(auth, async (user) => {
            if (!user) {
                reject("Usuário não está logado!!");
                return;
            }

            try {
                const alunoRef  = doc(db, "alunos", user.uid);
                const alunoSnap = await getDoc(alunoRef);

                if (!alunoSnap.exists()) {
                    reject("Aluno não encontrado no DB!!");
                    return;
                }

                alunoCache = alunoSnap.data();
                sessionStorage.setItem("alunoCache", JSON.stringify(alunoCache));
                resolve(alunoCache);

            } catch(err) {
                reject(err);
            }
        });
    });
}