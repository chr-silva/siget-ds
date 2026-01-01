import { auth } from "../../../js/firebase.js";
import { criarModalEmailNaoVerificado } from "./modals.js";
import { esperarAuth, isEmailVerificado } from "../../../js/guard.js";
import { sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const Dashboard = (() => {

  const global = {
    tooltipOptions: { placement: "right" },
    menuClass: ".c-menu"
  };

  let tooltips = [];

  function initTooltips() {
    destroyTooltips();
    document
      .querySelectorAll('[data-bs-toggle="tooltip"]')
      .forEach(el => {
        tooltips.push(new bootstrap.Tooltip(el, global.tooltipOptions));
      });
  }

  function destroyTooltips() {
    tooltips.forEach(t => t.dispose());
    tooltips = [];
  }

  function menuChangeActive(el) {
    document
      .querySelectorAll(`${global.menuClass} .is-active`)
      .forEach(i => i.classList.remove("is-active"));

    el.classList.add("is-active");
  }

  function sidebarChangeWidth() {
    const body = document.body;
    const hamburger = document.querySelector(".hamburger-toggle");

    body.classList.toggle("sidebar-is-reduced");
    body.classList.toggle("sidebar-is-expanded");
    hamburger.classList.toggle("is-opened");

    body.classList.contains("sidebar-is-expanded")
      ? destroyTooltips()
      : initTooltips();
  }

  async function init() {
    // UI
    document
      .querySelector(".js-hamburger")
      ?.addEventListener("click", sidebarChangeWidth);

    // menu click
    document
      .querySelectorAll(".js-menu li")
      .forEach(item =>
        item.addEventListener("click", () => menuChangeActive(item))
      );
    
    // inicializa tooltips
    initTooltips();

    // 🔐 Auth + verificação de email
    await esperarAuth();

    if (!isEmailVerificado()) {
      criarModalEmailNaoVerificado();

      const modalEl = document.getElementById("modalEmailNaoVerificado");
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    }
  }

  return { init };

})();

document.addEventListener("DOMContentLoaded", Dashboard.init);

document.addEventListener("click", async (e) => {
  if (e.target.id !== "reenviarEmailModal") return;

  const user = auth.currentUser;
  if (!user) return;

  try {
    await sendEmailVerification(user);
    alert("Email de confirmação reenviado!");
  } catch (err) {
    console.error(err);
    alert("Erro ao reenviar email.");
  }
});