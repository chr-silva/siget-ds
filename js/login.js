// login.js
import { loginUsuario } from "./auth.js";

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const senha = document.getElementById("loginSenha").value;

  try {
    await loginUsuario(email, senha);
    alert("Sucesso! Redirecionando..");
    window.location.href = "../index.html";
  } catch {
    alert("Email ou senha incorretos");
  }
});
