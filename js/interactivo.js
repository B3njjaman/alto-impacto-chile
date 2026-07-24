// ============================================================
// INTERACTIVO — animaciones con GSAP: aparición al hacer scroll,
// entrada del héroe, botones magnéticos, cursor personalizado,
// nav líquida, cinta tailandesa animada e impacto en los CTA.
// Se degrada sin ruido si GSAP no carga o si el usuario prefiere
// menos movimiento: activarReveals() (en app.js) toma el control.
// ============================================================

let primerRenderNav = true;

function gsapListo() {
  return !!(window.gsap && window.ScrollTrigger) && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function activarInteracciones() {
  if (!gsapListo()) return;

  if (!gsap.core.globals().ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
  document.documentElement.classList.add("gsap-listo");

  // #app se reemplaza entero en cada render: cualquier ScrollTrigger
  // de la vista anterior quedó apuntando a nodos ya removidos.
  ScrollTrigger.getAll().forEach((st) => st.kill());

  animarRevelados();
  animarHeroe();
  animarBotonesMagneticos();
  animarParallaxHeroe();
  animarCintaThai();
  moverIndicadorNav();
  activarCursorPersonalizado();
  activarImpactoCTA();
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

// La cinta tailandesa se "despliega" franja por franja, como una
// bandera abriéndose, en vez de aparecer de golpe.
function animarCintaThai() {
  document.querySelectorAll(".cinta").forEach((svg) => {
    const paths = svg.querySelectorAll("path");
    if (!paths.length) return;
    gsap.fromTo(
      paths,
      { scaleX: 0, transformOrigin: "0% 50%" },
      {
        scaleX: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: svg, start: "top 92%", once: true },
      }
    );
  });
}

// Barra líquida bajo el link activo de la navegación: se desliza en
// vez de aparecer/desaparecer seca. Solo en el layout de escritorio.
function moverIndicadorNav() {
  const indicador = document.getElementById("navIndicador");
  const nav = document.getElementById("navegacion");
  const activo = nav && nav.querySelector("a.activo");
  if (!indicador || !nav || !activo || window.matchMedia("(max-width: 900px)").matches) return;

  const rectActivo = activo.getBoundingClientRect();
  const rectNav = nav.getBoundingClientRect();
  const destino = { left: rectActivo.left - rectNav.left, width: rectActivo.width };

  if (primerRenderNav) {
    gsap.set(indicador, destino);
    primerRenderNav = false;
  } else {
    gsap.to(indicador, { ...destino, duration: 0.5, ease: "elastic.out(1, 0.75)" });
  }
}

// Cursor a la medida: un anillo dorado que sigue el mouse y se
// "estampa" en rojo al pasar sobre algo interactivo — la marca
// Alto Impacto, literalmente, en el propio cursor. Se activa una
// sola vez; solo en dispositivos con mouse (pointer: fine).
function activarCursorPersonalizado() {
  if (!window.matchMedia("(pointer: fine)").matches) return;
  if (document.documentElement.classList.contains("cursor-listo")) return;

  const cursor = document.getElementById("cursorImpacto");
  if (!cursor) return;
  document.documentElement.classList.add("cursor-listo");

  gsap.set(cursor, { xPercent: -50, yPercent: -50 });
  const moverX = gsap.quickTo(cursor, "x", { duration: 0.45, ease: "power3.out" });
  const moverY = gsap.quickTo(cursor, "y", { duration: 0.45, ease: "power3.out" });

  document.addEventListener("mousemove", (e) => {
    moverX(e.clientX);
    moverY(e.clientY);
  });

  document.addEventListener("mouseover", (e) => {
    if (e.target.closest("a, button, .boton, summary")) {
      cursor.classList.add("activo");
      gsap.to(cursor, { scale: 1.9, duration: 0.35, ease: "elastic.out(1, 0.4)" });
      crearChispas(e.clientX, e.clientY);
    }
  });
  document.addEventListener("mouseout", (e) => {
    if (e.target.closest("a, button, .boton, summary")) {
      cursor.classList.remove("activo");
      gsap.to(cursor, { scale: 1, duration: 0.3, ease: "power2.out" });
    }
  });
}

// Ráfaga corta de chispas alrededor del cursor al "conectar" con un
// elemento interactivo. Pocas, chicas y breves para no estorbar.
function crearChispas(x, y) {
  const cantidad = 6;
  for (let i = 0; i < cantidad; i++) {
    const chispa = document.createElement("span");
    chispa.className = "cursor-chispa";
    chispa.style.left = `${x}px`;
    chispa.style.top = `${y}px`;
    document.body.appendChild(chispa);
    gsap.set(chispa, { xPercent: -50, yPercent: -50 });

    const angulo = (Math.PI * 2 * i) / cantidad + (Math.random() - 0.5) * 0.6;
    const distancia = 16 + Math.random() * 12;
    gsap.to(chispa, {
      x: Math.cos(angulo) * distancia,
      y: Math.sin(angulo) * distancia,
      opacity: 0,
      scale: 0.3,
      duration: 0.45 + Math.random() * 0.2,
      ease: "power2.out",
      onComplete: () => chispa.remove(),
    });
  }
}

// Impacto en los CTA principales: rebote de escala + un anillo que
// se expande y se apaga al hacer click, como un golpe conectando.
// En móviles con soporte, se suma una vibración corta.
function activarImpactoCTA() {
  document.querySelectorAll(".boton-rojo").forEach((boton) => {
    if (boton.dataset.impacto) return;
    boton.dataset.impacto = "1";
    boton.addEventListener("click", () => {
      gsap.timeline()
        .to(boton, { scale: 0.9, duration: 0.08, ease: "power1.out" })
        .to(boton, { scale: 1.08, duration: 0.18, ease: "back.out(3)" })
        .to(boton, { scale: 1, duration: 0.15 });

      const rect = boton.getBoundingClientRect();
      const anillo = document.createElement("span");
      anillo.className = "impacto-anillo";
      anillo.style.left = `${rect.left + rect.width / 2}px`;
      anillo.style.top = `${rect.top + rect.height / 2}px`;
      document.body.appendChild(anillo);
      gsap.to(anillo, {
        scale: 3.2,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => anillo.remove(),
      });

      if (navigator.vibrate) navigator.vibrate(12);
    });
  });
}
