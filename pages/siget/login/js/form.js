const loginForm = document.getElementById("loginForm");
const cadastroForm = document.getElementById("cadastroForm");

const abrirCadastro = document.getElementById("abrirCadastro");
const abrirLogin = document.getElementById("abrirLogin");

// Ir para cadastro
abrirCadastro.addEventListener("click", (e) => {
  e.preventDefault();
  loginForm.hidden = true;
  cadastroForm.hidden = false;
});

// Voltar para login
abrirLogin.addEventListener("click", (e) => {
  e.preventDefault();
  cadastroForm.hidden = true;
  loginForm.hidden = false;
});
