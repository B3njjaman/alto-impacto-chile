// ============================================================
// INTERACTIVO — animaciones con GSAP: aparición al hacer scroll,
// entrada del héroe, botones magnéticos y parallax del logo.
// Se degrada sin ruido si GSAP no carga o si el usuario prefiere
// menos movimiento: activarReveals() (en app.js) toma el control.
// ============================================================

function gsapListo() {
  return !!(window.gsap && window.ScrollTrigger) && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function activarInteracciones() {
  if (!gsapListo()) return;

  if (!gsap.core.globals().ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
  document.documentElement.classList.add("gsap-listo");

  animarRevelados();
  animarHeroe();
  animarBotonesMagneticos();
  animarParallaxHeroe();
}

// Aparición al hacer scroll: reemplaza el fade plano por un
// movimiento más marcado con leve rebote, escalonado por sección.
function animarRevelados() {
  const grupos = new Map();
  document.querySelectorAll(".reveal").forEach((el) => {
    const grupo = el.closest("section, .dos-columnas, .galeria-grid") || el;
    if (!grupos.has(grupo)) grupos.set(grupo, []);
    grupos.get(grupo).push(el);
  });

  grupos.forEach((elementos) => {
    gsap.fromTo(
      elementos,
      { opacity: 0, y: 46, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        ease: "back.out(1.4)",
        stagger: 0.12,
        scrollTrigger: { trigger: elementos[0], start: "top 88%", once: true },
      }
    );
  });
}

// Entrada escalonada del héroe: se relanza cada vez que la vista de
// Inicio se vuelve a dibujar, ya que el router recrea el DOM de #app.
function animarHeroe() {
  const heroe = document.querySelector(".heroe");
  if (!heroe) return;
  gsap.timeline({ defaults: { ease: "power4.out" } })
    .from(".heroe .eyebrow", { opacity: 0, x: -30, duration: 0.6 })
    .from(".heroe h1", { opacity: 0, y: 60, scale: 0.94, duration: 0.9 }, "-=0.3")
    .from(".heroe p", { opacity: 0, y: 26, duration: 0.6 }, "-=0.5")
    .from(".heroe-acciones .boton", { opacity: 0, y: 26, stagger: 0.12, duration: 0.6 }, "-=0.4")
    .from(".confianza li", { opacity: 0, y: 14, stagger: 0.1, duration: 0.5 }, "-=0.3")
    .from(".heroe-logo", { opacity: 0, scale: 0.85, duration: 1.1 }, "-=0.9");
}

// Botones que responden con un "imán" notorio al pasar el mouse.
// Se marca cada botón con data-magnetico para no atar el mismo
// listener dos veces en elementos que viven fuera de #app (cabecera,
// CTA fijo de móvil) y sobreviven entre cambios de ruta.
function animarBotonesMagneticos() {
  if (!window.matchMedia("(pointer: fine)").matches) return;
  document.querySelectorAll(".boton").forEach((boton) => {
    if (boton.dataset.magnetico) return;
    boton.dataset.magnetico = "1";
    const escalar = gsap.quickTo(boton, "scale", { duration: 0.35, ease: "elastic.out(1, 0.5)" });
    boton.addEventListener("mouseenter", () => escalar(1.1));
    boton.addEventListener("mouseleave", () => escalar(1));
  });
}

// El logo-marca de agua del héroe se desplaza más lento que el
// scroll, dando sensación de profundidad.
function animarParallaxHeroe() {
  const logo = document.querySelector(".heroe-logo");
  if (!logo) return;
  gsap.to(logo, {
    yPercent: 22,
    ease: "none",
    scrollTrigger: { trigger: ".heroe", start: "top top", end: "bottom top", scrub: true },
  });
}
