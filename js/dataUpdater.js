import { limparCacheAluno } from "./alunoCache.js";
import { renderAluno } from "./alunoDados.js";
import { auth, db } from "./firebase.js";
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential, verifyBeforeUpdateEmail, sendEmailVerification, signOut } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

/**
 * 
 * @returns Sempre que algo muda no Auth,
 * e dependemos de auth.currentUser,
 * use await auth.currentUser.reload() antes de continuar.
 */


async function alterarSenha() {
  const user = auth.currentUser;
  if (!user) return "sem-usuario";

  const senhaAtual = document.getElementById("senhaAtualAluno").value;
  const novaSenha  = document.getElementById("senhaNovaAluno").value;

  // usuário não quer trocar senha
  if (!senhaAtual || !novaSenha) {
    return "senha-ignorada";
  }

  try {
    const cred = EmailAuthProvider.credential(
      user.email,
      senhaAtual
    );

    // reautentica
    await reauthenticateWithCredential(user, cred);

    // troca senha
    await updatePassword(user, novaSenha);

    alert("Senha atualizada com sucesso!");

    return "senha-ok";

  } catch (err) {
    if (err.code === "auth/wrong-password") {
      alert("Senha atual incorreta.");
    } else if (err.code === "auth/weak-password") {
      alert("A nova senha é muito fraca.");
    } else {
      alert("Erro ao atualizar senha.");
      console.error(err);
    }

    return "senha-erro"; //return pra checagem futura
  }
}



function validarDados(dados) {
  if (dados.cidade.length < 2) return "Cidade inválida";
  if (dados.estado.length < 2) return "Estado inválido";

  if (!/^\d{4}-\d{2}-\d{2}$/.test(dados.nascimento)) {
    return "Data inválida";
  }

  if (dados.email && !dados.email.includes("@")) {
    return "Email inválido";
  }

  if (dados.senha && dados.senha.length < 6) {
    return "Senha deve ter no mínimo 6 caracteres";
  }

  return null;
}


export function initConfigForm() {
  const form = document.getElementById("configForm");
  if (!form) return;

  const aviso = document.getElementById("emailAviso");
  const btnReenviar = document.getElementById("reenviarEmail")

  const user = auth.currentUser;

  if (user && !user.emailVerified) {
    aviso.classList.remove("d-none");
    btnReenviar.classList.remove("d-none");
  }

  btnReenviar?.addEventListener("click", async () => {

    try {
      await sendEmailVerification(user);
      alert("Email de verificação enviado! Cheque sua caixa de spam caso não encontre o email de confirmação.");
      await user.reload();
    } catch (err) {
        console.log(err);
        alert("Ocorreu um erro ao enviar o email.");
    }
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const dia = document.getElementById("dia-nascimento").value;
    const mes = document.getElementById("mes-nascimento").value;
    const ano = document.getElementById("ano-nascimento").value;

    const nome   = document.getElementById("nomeAluno"); 
    const email  = document.getElementById("emailAluno");
    const genero = document.getElementById("generoAluno");
    const cidade = document.getElementById("cidadeAluno");
    const estado = document.getElementById("estadoAluno");

    if (!dia || !mes || !ano) {
      alert("Preencha todos os dados corretamente!");
      return;
    }

    const nascimento =
      `${ano}-${mes.padStart(2, "0")}-${dia.padStart(2, "0")}`;

    const dados = {
      nome: nome.value,
      cidade: cidade.value.trim(),
      estado: estado.value.trim(),
      genero: genero.value || null,
      nascimento,
      email: email.value.trim()
    };

    const erro = validarDados(dados);
    if (erro) {
      alert(erro);
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      alert("Usuário não autenticado");
      return;
    }

    // 1. Dados + email
    try {
      await updateDoc(doc(db, "alunos", user.uid), {
        nome: dados.nome,
        cidade: dados.cidade,
        estado: dados.estado,
        nascimento: dados.nascimento,
        genero: dados.genero
      });

    if (dados.email && dados.email !== user.email) {

      if (!user.emailVerified) {
        alert("Confirme seu e-mail atual antes de alterá-lo.");
        return;
      }

      await verifyBeforeUpdateEmail(user, dados.email);

      alert(
        "Enviamos um link para confirmar seu novo e-mail.\n" +
        "Após confirmar, faça login novamente."
      );

      // limpa cache AGORA
      limparCacheAluno();
      sessionStorage.removeItem("alunoCache");

      // encerra a sessão
      await signOut(auth);

      // redireciona
      window.location.href = "/pages/siget/login/";
      return;
    }


    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar dados básicos");
      return;
    }

    // 2. Senha (independente)
    await alterarSenha();

    // Finalização
    alert("Dados atualizados com sucesso!");
    limparCacheAluno();
    await renderAluno(document.getElementById("content"));
  });
}

