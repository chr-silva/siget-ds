// cadastro.js
import { cadastrarUsuario } from "./auth.js";

document.getElementById("cadastroForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome  = document.getElementById("cadastroNome").value;
  const turma = document.getElementById("cadastroTurma").value.trim();
  const email = document.getElementById("cadastroEmail").value.trim();
  const senha = document.getElementById("cadastroSenha").value;


  if (!email || !nome || !senha || !turma) {
    alert("Preencha os dados corretamente!");
    return;
  }

  try {
    await cadastrarUsuario(email, senha, nome, turma);
    alert("Cadastro realizado com sucesso!");
    window.location.href = "../index.html";
  } catch (err) {
    console.log(err);
    alert("Erro ao cadastrar: " + err);
  }
});
