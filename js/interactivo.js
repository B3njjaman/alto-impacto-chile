// ============================================================
// INTERACTIVO — animaciones con GSAP: entrada del héroe, botones
// magnéticos y parallax del logo. Se degrada sin ruido si GSAP no
// carga (p. ej. sin conexión) o si el usuario prefiere menos
// movimiento: el sitio queda igual de funcional sin esto.
// ============================================================

function activarInteracciones() {
  if (!window.gsap || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  if (window.ScrollTrigger && !gsap.core.globals().ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  animarHeroe();
  animarBotonesMagneticos();
  animarParallaxHeroe();
}

// Entrada escalonada del héroe: se relanza cada vez que la vista de
// Inicio se vuelve a dibujar, ya que el router recrea el DOM de #app.
function animarHeroe() {
  const heroe = document.querySelector(".heroe");
  if (!heroe) return;
  gsap.timeline({ defaults: { ease: "power3.out" } })
    .from(".heroe .eyebrow", { opacity: 0, x: -20, duration: 0.5 })
    .from(".heroe h1", { opacity: 0, y: 34, duration: 0.7 }, "-=0.25")
    .from(".heroe p", { opacity: 0, y: 18, duration: 0.5 }, "-=0.35")
    .from(".heroe-acciones .boton", { opacity: 0, y: 18, stagger: 0.1, duration: 0.5 }, "-=0.3")
    .from(".confianza li", { opacity: 0, y: 10, stagger: 0.08, duration: 0.4 }, "-=0.25");
}

// Botones que responden con un leve "imán" al pasar el mouse.
// Se marca cada botón con data-magnetico para no atar el mismo
// listener dos veces en elementos que viven fuera de #app (cabecera,
// CTA fijo de móvil) y sobreviven entre cambios de ruta.
function animarBotonesMagneticos() {
  if (!window.matchMedia("(pointer: fine)").matches) return;
  document.querySelectorAll(".boton").forEach((boton) => {
    if (boton.dataset.magnetico) return;
    boton.dataset.magnetico = "1";
    const escalar = gsap.quickTo(boton, "scale", { duration: 0.3, ease: "power3.out" });
    boton.addEventListener("mouseenter", () => escalar(1.06));
    boton.addEventListener("mouseleave", () => escalar(1));
  });
}

// El logo-marca de agua del héroe se desplaza un poco más lento que
// el scroll, dando sensación de profundidad.
function animarParallaxHeroe() {
  if (!window.ScrollTrigger) return;
  const logo = document.querySelector(".heroe-logo");
  if (!logo) return;
  gsap.to(logo, {
    yPercent: 12,
    ease: "none",
    scrollTrigger: { trigger: ".heroe", start: "top top", end: "bottom top", scrub: true },
  });
}
