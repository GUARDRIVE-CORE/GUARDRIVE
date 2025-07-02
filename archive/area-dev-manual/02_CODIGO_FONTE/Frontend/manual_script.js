// GuardDrive Manual Interativo - Scripts

document.addEventListener("DOMContentLoaded", function () {
  // Navegação Mobile
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");

  // Toggle Navigation
  burger.addEventListener("click", () => {
    // Toggle Nav
    nav.classList.toggle("nav-active");

    // Animate Links
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
      }
    });

    // Burger Animation
    burger.classList.toggle("toggle");
  });

  // Smooth Scrolling para Links Internos
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Fechar menu mobile se estiver aberto
        if (nav.classList.contains("nav-active")) {
          nav.classList.remove("nav-active");
          burger.classList.remove("toggle");
          navLinks.forEach((link) => {
            link.style.animation = "";
          });
        }

        // Scroll suave
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Ajuste para o header fixo
          behavior: "smooth",
        });
      }
    });
  });

  // Animação de Fade-In para seções
  const sections = document.querySelectorAll("section");

  // Função para verificar se elemento está visível na viewport
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }

  // Função para adicionar classe de animação aos elementos visíveis
  function checkVisibility() {
    sections.forEach((section) => {
      if (
        isElementInViewport(section) &&
        !section.classList.contains("fade-in")
      ) {
        section.classList.add("fade-in");
      }
    });
  }

  // Verificar visibilidade inicial
  checkVisibility();

  // Verificar visibilidade durante scroll
  window.addEventListener("scroll", checkVisibility);

  // Highlight.js para código
  document.querySelectorAll("pre code").forEach((block) => {
    hljs.highlightBlock(block);
  });

  // Tema Escuro (para implementação futura)
  const toggleTheme = () => {
    document.body.classList.toggle("dark-theme");
  };

  // Verificar preferência do sistema
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    // toggleTheme(); // Descomentado quando implementar tema escuro
  }
});
