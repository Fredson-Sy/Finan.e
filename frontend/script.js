// Lógica da página home
/* ==========================================================================
   script.js — Página inicial (Finan.e)
   ========================================================================== */

(function () {
  "use strict";

  const header = document.querySelector(".header");
  const menuButton = document.getElementById("mobile-menu-button");
  const mobileNav = document.getElementById("mobile-navigation");
  const navLinks = document.querySelectorAll("[data-section]");
  const sections = ["inicio", "conteudos", "sobre"]
    .map((id) => document.getElementById(id))
    .filter(Boolean)
    // ordem real na página (de cima para baixo)
    .sort((a, b) => a.offsetTop - b.offsetTop);

  /* ---------- Ícones Lucide ---------- */
  if (window.lucide) {
    window.lucide.createIcons();
  }

  /* ---------- Ano atual no rodapé ---------- */
  const year = document.getElementById("current-year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Menu mobile ---------- */
  function setMenu(open) {
    if (!menuButton) return;
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  }

  if (menuButton && mobileNav) {
    menuButton.addEventListener("click", () => {
      setMenu(menuButton.getAttribute("aria-expanded") !== "true");
    });

    // Fecha ao clicar em qualquer link do menu
    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenu(false));
    });

    // Fecha com Esc e ao voltar para a tela grande
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setMenu(false);
    });

    window.matchMedia("(min-width: 901px)").addEventListener("change", (event) => {
      if (event.matches) setMenu(false);
    });
  }

  /* ---------- "Início" sobe ao topo sem recarregar a página ---------- */
  document.querySelectorAll("[data-scroll-top]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      // remove o #inicio da URL, sem recarregar
      history.replaceState(null, "", window.location.pathname + window.location.search);
    });
  });

  /* ---------- Destaque do menu conforme a seção visível ---------- */
  function setActive(id) {
    navLinks.forEach((link) => {
      const isActive = link.dataset.section === id;
      link.classList.toggle("active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  function updateActiveSection() {
    if (!sections.length) return;

    const offset = (header ? header.offsetHeight : 0) + 120;
    let current = sections[0].id;

    sections.forEach((section) => {
      if (section.getBoundingClientRect().top <= offset) current = section.id;
    });

    setActive(current);
  }

  // requestAnimationFrame evita recalcular a cada pixel rolado
  let ticking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        updateActiveSection();
        ticking = false;
      });
    },
    { passive: true }
  );

  window.addEventListener("resize", updateActiveSection);
  window.addEventListener("load", updateActiveSection);
  updateActiveSection();
})();