
"use strict";

const Dashboard = (() => {

  const global = {
    tooltipOptions: {
      placement: "right"
    },
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
      .forEach(item => item.classList.remove("is-active"));

    el.classList.add("is-active");
  }

  function sidebarChangeWidth() {
    const body = document.body;
    const hamburger = document.querySelector(".hamburger-toggle");

    body.classList.toggle("sidebar-is-reduced");
    body.classList.toggle("sidebar-is-expanded");
    hamburger.classList.toggle("is-opened");

    if (body.classList.contains("sidebar-is-expanded")) {
      destroyTooltips();
    } else {
      initTooltips();
    }
  }

  function init() {
    // Hamburger click
    document
      .querySelector(".js-hamburger")
      ?.addEventListener("click", sidebarChangeWidth);

    // Menu click
    document
      .querySelectorAll(".js-menu li")
      .forEach(item => {
        item.addEventListener("click", () => menuChangeActive(item));
      });

    // Inicializa tooltips
    initTooltips();
  }

  return { init };

})();

document.addEventListener("DOMContentLoaded", Dashboard.init);

