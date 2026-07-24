// ============================================================
// APP — menú, animaciones GSAP, embeds de Instagram y contacto
// ============================================================

// --- Menú móvil ---------------------------------------------
const menuBoton = document.getElementById("menuBoton");
menuBoton.addEventListener("click", () => {
  const nav = document.getElementById("navegacion");
  const abierto = nav.classList.toggle("abierta");
  menuBoton.setAttribute("aria-expanded", String(abierto));
});

// --- Motor de animaciones -------------------------------------
// Con GSAP + ScrollTrigger si están disponibles; si no (o si el
// usuario prefiere menos movimiento), fallback a CSS puro.
const prefiereQuieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const hayGsap = typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined";

if (hayGsap && !prefiereQuieto) {
  gsap.registerPlugin(ScrollTrigger);
  document.documentElement.classList.add("gsap-activo");
}

function animarVista() {
  // Los videos de fondo se detienen si el usuario prefiere quietud.
  if (prefiereQuieto) {
    document.querySelectorAll("video[autoplay]").forEach((v) => {
      v.removeAttribute("autoplay");
      v.pause();
    });
  }

  if (!hayGsap || prefiereQuieto) {
    activarRevealsFallback();
    return;
  }

  // Limpia los triggers de la vista anterior.
  ScrollTrigger.getAll().forEach((t) => t.kill());

  // Transición de entrada de la vista.
  // OJO: opacity, no autoAlpha — visibility se hereda y contaminaría los
  // valores que capturan los from() de más abajo en este mismo tick.
  gsap.fromTo("#app", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" });

  // --- Héroe: secuencia de entrada + parallax ---
  const heroe = document.querySelector(".heroe");
  if (heroe) {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".heroe .eyebrow", { x: -28, opacity: 0, duration: 0.5 })
      .from(".heroe h1 .linea", { yPercent: 115, skewY: 5, duration: 0.75, stagger: 0.12 }, "-=0.2")
      .from(".heroe-parrafo", { opacity: 0, y: 20, duration: 0.5 }, "-=0.35")
      .from(".heroe-acciones .boton", { opacity: 0, y: 16, stagger: 0.08, duration: 0.4 }, "-=0.25")
      .from(".heroe-logo", { opacity: 0, scale: 0.85, rotation: -6, duration: 0.9, ease: "back.out(1.6)" }, "-=0.55");

    gsap.to(".heroe-media video", {
      yPercent: 12,
      ease: "none",
      scrollTrigger: { trigger: heroe, start: "top top", end: "bottom top", scrub: true },
    });
    gsap.fromTo(".heroe-interior",
      { yPercent: 0, opacity: 1 },
      { yPercent: -8, opacity: 0.35, ease: "none",
        scrollTrigger: { trigger: heroe, start: "top top", end: "bottom top", scrub: true } }
    );
  }

  // --- Reveals al hacer scroll ---
  ScrollTrigger.batch(".reveal", {
    start: "top 88%",
    once: true,
    onEnter: (els) =>
      gsap.fromTo(
        els,
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power2.out", overwrite: true }
      ),
  });

  // --- Banda de fotos: deriva horizontal con el scroll ---
  document.querySelectorAll(".banda").forEach((banda) => {
    const pista = banda.querySelector(".banda-pista");
    if (!pista) return;
    gsap.fromTo(
      pista,
      { x: 0 },
      { x: () => -(pista.scrollWidth - banda.offsetWidth || 200) * 0.35, ease: "none",
        scrollTrigger: { trigger: banda, start: "top bottom", end: "bottom top", scrub: 1 } }
    );
  });

  // --- Fotos con marco: leve zoom-out al aparecer ---
  document.querySelectorAll(".foto-marco img").forEach((img) => {
    gsap.fromTo(
      img,
      { scale: 1.15 },
      { scale: 1, ease: "none",
        scrollTrigger: { trigger: img, start: "top 95%", end: "top 30%", scrub: 1 } }
    );
  });

  ScrollTrigger.refresh();
}

// Fallback sin GSAP: IntersectionObserver + clase .visible.
function activarRevealsFallback() {
  const elementos = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || prefiereQuieto) {
    elementos.forEach((el) => el.classList.add("visible"));
    return;
  }
  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          observador.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  elementos.forEach((el) => observador.observe(el));
}

// --- Embeds oficiales de Instagram ---------------------------
let embedCargado = false;
function procesarEmbedsInstagram() {
  if (!document.querySelector(".instagram-media")) return;
  if (window.instgrm && window.instgrm.Embeds) {
    window.instgrm.Embeds.process();
    return;
  }
  if (embedCargado) return;
  embedCargado = true;
  const s = document.createElement("script");
  s.src = "https://www.instagram.com/embed.js";
  s.async = true;
  document.body.appendChild(s);
}

// --- Datos globales en la interfaz ---------------------------
document.getElementById("anio").textContent = new Date().getFullYear();
document.getElementById("pieInstagram").href = DATOS.instagram.url;
document.getElementById("pieInstagram").textContent = `Instagram → @${DATOS.instagram.usuario}`;
document.getElementById("pieCiudad").textContent = DATOS.ciudad;

// Botón flotante: WhatsApp si hay número; si no, DM de Instagram.
const flotante = document.getElementById("botonFlotante");
if (DATOS.whatsapp && DATOS.whatsapp.trim() !== "") {
  flotante.href = `https://wa.me/${DATOS.whatsapp}?text=${encodeURIComponent(
    "Hola, quiero agendar una clase de prueba de Muay Thai"
  )}`;
  flotante.setAttribute("aria-label", "Escríbenos por WhatsApp");
} else {
  flotante.href = DATOS.instagram.dm;
  flotante.classList.add("instagram");
  flotante.setAttribute("aria-label", "Escríbenos por Instagram");
  flotante.innerHTML =
    '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path fill="currentColor" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>';
}
