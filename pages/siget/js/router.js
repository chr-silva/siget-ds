const items = document.querySelectorAll('.c-menu__item');
const content = document.getElementById('content');

function loadPage(page) {
  fetch(`sections/${page}.html`)
    .then(res => {
      if (!res.ok) throw new Error('Página não encontrada');
      return res.text();
    })
    .then(html => {
      content.innerHTML = html;
    })
    .catch(() => {
      content.innerHTML = '<p class="text-danger">Erro crítico ao tentar carregar a página.</p>';
    });
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
