// alunoDados.js
import { getAlunoAtual } from "./alunoCache.js";

export async function renderAluno(container) {
  const aluno = await getAlunoAtual();

  const nomeAluno  = container.querySelector("#nomeAluno");
  const turmaAluno = container.querySelector("#turmaAluno");

  if (nomeAluno) {
    nomeAluno.textContent = aluno.nome;
  }

  if (turmaAluno) {
    turmaAluno.textContent = aluno.turma;
  }
}

