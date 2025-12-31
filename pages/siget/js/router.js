import { renderAluno } from "../../../js/alunoDados.js";
import { renderTabelaHorarios } from "../sections/js/tabulator.js";

const items = document.querySelectorAll('.c-menu__item');
const content = document.getElementById('content');

async function loadPage(page) {
  try {
    const res = await fetch(`sections/${page}.html`);
    const html = await res.text();

    content.innerHTML = html;
    // console.log("[router] conteúdo atual do container:");
    // console.log(content.innerHTML);


    if (page === "inicio" || page === "horarios") {
      await renderAluno(content);
    }

    // Página de horários (Tabulator)
    if (page === "horarios") {
      // garante que o DOM já foi pintado
      requestAnimationFrame(() => {
        renderTabelaHorarios();
      });
    }

  } catch (e) {
    console.error(e);
    content.innerHTML =
      '<p class="text-danger">Erro crítico ao tentar carregar a página.</p>';
  }
}

items.forEach(item => {
  item.addEventListener('click', () => {
    items.forEach(i => i.classList.remove('is-active'));
    item.classList.add('is-active');

    const page = item.dataset.page;
    if (!page) return;

    loadPage(page);
    history.pushState(null, '', `#${page}`);
  });
});

// carregar página inicial
const pageFromHash = location.hash.replace('#', '') || 'inicio';

const initialItem = document.querySelector(
  `.c-menu__item[data-page="${pageFromHash}"]`
);

if (initialItem) {
  initialItem.click();
}
