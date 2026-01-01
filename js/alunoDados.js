// alunoDados.js
import { getAlunoAtual } from "./alunoCache.js";

export async function renderAluno(container) {
  const aluno = await getAlunoAtual();

  const nomeAluno   = container.querySelector("#nomeAluno");
  const turmaAluno  = container.querySelector("#turmaAluno");
  const emailAluno  = container.querySelector("#emailAluno");
  const cidadeAluno = container.querySelector("#cidadeAluno");
  const estadoAluno = container.querySelector("#estadoAluno");
  const generoAluno = container.querySelector("#generoAluno"); 

  if (nomeAluno) {
    nomeAluno.textContent = aluno.nome;
  }

  if (turmaAluno) {
    turmaAluno.textContent = aluno.turma;
  }

  if (emailAluno) {
    emailAluno.value = aluno.email;
  }

  if (cidadeAluno) {
    cidadeAluno.value = aluno.cidade;
  }

  if (estadoAluno) {
    estadoAluno.value = aluno.estado;
  }

  if(generoAluno) {
    generoAluno.value = aluno.genero;
  }

  if (nomeAluno) {
    nomeAluno.value = aluno.nome;
  }

  // Data de nascimento
if (aluno.nascimento) {
  const [ano, mes, dia] = aluno.nascimento.split("-");

  const diaSelect = container.querySelector("#dia-nascimento");
  const mesSelect = container.querySelector("#mes-nascimento");
  const anoSelect = container.querySelector("#ano-nascimento");

  if (diaSelect) diaSelect.value = String(Number(dia)); // remove zero à esquerda
  if (mesSelect) mesSelect.value = mes;                 // já vem com 01..12
  if (anoSelect) anoSelect.value = ano;
}

}

