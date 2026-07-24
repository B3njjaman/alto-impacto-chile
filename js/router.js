// ============================================================
// ROUTER — enrutamiento por hash (#/ruta), sin dependencias.
// Cuando GSAP está disponible, la salida/entrada de #app se anima;
// si no, el cambio de vista es instantáneo (misma experiencia base).
// ============================================================

function rutaActual() {
  const hash = window.location.hash || "#/";
  const ruta = hash.replace(/^#/, "").split("?")[0];
  return ruta === "" ? "/" : ruta;
}

function renderizar(esCambioDeRuta) {
  const app = document.getElementById("app");

  const dibujar = () => {
    const ruta = rutaActual();
    const vista = VISTAS[ruta] || VISTA_404;

    app.innerHTML = vista.html();
    document.title = vista.titulo;

    // Marca el enlace activo en la navegación.
    document.querySelectorAll(".navegacion a").forEach((a) => {
      a.classList.toggle("activo", a.dataset.ruta === ruta);
      if (a.dataset.ruta === ruta) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });

    // Cierra el menú móvil si estaba abierto.
    document.getElementById("navegacion").classList.remove("abierta");
    document.getElementById("menuBoton").setAttribute("aria-expanded", "false");

    window.scrollTo({ top: 0, behavior: "instant" });

    // Un solo sistema de aparición a la vez: GSAP si está disponible
    // y el usuario acepta movimiento; si no, el observer simple.
    if (gsapListo()) {
      activarInteracciones();
    } else {
      activarReveals();
    }

    // Los puntos del diagrama de los ocho miembros deben responder
    // al click/hover exista o no GSAP: es la función de la sección,
    // no solo su animación de entrada.
    activarPuntosMiembros();
  };

  const puedeAnimar = gsapListo();
  if (esCambioDeRuta && puedeAnimar) {
    // Cortina con los colores de la bandera tailandesa: barre la
    // pantalla, cambia el contenido debajo y sigue de largo.
    const franjas = document.querySelectorAll(".cortina-transicion .franja");
    gsap.timeline()
      .to(franjas, { xPercent: 0, duration: 0.35, stagger: 0.05, ease: "power2.inOut" })
      .call(dibujar)
      .to(franjas, { xPercent: 100, duration: 0.35, stagger: 0.05, ease: "power2.inOut" }, "+=0.05")
      .set(franjas, { xPercent: -100 });
  } else {
    dibujar();
  }
}

window.addEventListener("hashchange", () => renderizar(true));
window.addEventListener("DOMContentLoaded", () => {
  renderizar(false);
  mostrarPistaNavegacion();
});

// ============================================================
// NAVEGACIÓN SIN TABS — mismo orden que el menú. Flechas del
// teclado en escritorio, deslizar en móvil.
// ============================================================

const ORDEN_RUTAS = ["/", "/nosotros", "/clases", "/horarios", "/galeria", "/contacto"];

function irASeccion(direccion) {
  const indice = ORDEN_RUTAS.indexOf(rutaActual());
  const siguiente = indice + direccion;
  if (indice === -1 || siguiente < 0 || siguiente >= ORDEN_RUTAS.length) return;
  window.location.hash = `#${ORDEN_RUTAS[siguiente]}`;
}

document.addEventListener("keydown", (e) => {
  const foco = document.activeElement;
  if (foco && /^(INPUT|TEXTAREA|SELECT)$/.test(foco.tagName)) return;
  if (e.key === "ArrowRight" || e.key === "ArrowDown") {
    e.preventDefault();
    irASeccion(1);
  } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
    e.preventDefault();
    irASeccion(-1);
  }
});

// Deslizar para pasar de sección; ignora el gesto dentro de zonas
// que ya tienen su propio scroll horizontal (la tabla de horarios).
let tocando = null;
document.addEventListener(
  "touchstart",
  (e) => {
    if (e.target.closest(".tabla-envoltura")) {
      tocando = null;
      return;
    }
    tocando = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  },
  { passive: true }
);
document.addEventListener(
  "touchend",
  (e) => {
    if (!tocando) return;
    const deltaX = e.changedTouches[0].clientX - tocando.x;
    const deltaY = e.changedTouches[0].clientY - tocando.y;
    tocando = null;
    if (Math.abs(deltaX) < 80 || Math.abs(deltaX) < Math.abs(deltaY) * 1.5) return;
    irASeccion(deltaX < 0 ? 1 : -1);
  },
  { passive: true }
);

// Aviso único (una sola vez, guardado en localStorage) para que se
// descubra el atajo, sin dejar nada visible de forma permanente.
function mostrarPistaNavegacion() {
  let vista;
  try {
    vista = localStorage.getItem("pistaNavMostrada");
  } catch (err) {
    return;
  }
  if (vista) return;
  const pista = document.getElementById("pistaNavegacion");
  if (!pista) return;
  try {
    localStorage.setItem("pistaNavMostrada", "1");
  } catch (err) {
    /* almacenamiento no disponible, se muestra igual esta vez */
  }

  if (window.gsap) {
    gsap.timeline({ delay: 1.2 })
      .to(pista, { opacity: 1, duration: 0.4 })
      .to(pista, { opacity: 0, duration: 0.4, delay: 3.2 });
  } else {
    pista.style.transition = "opacity 0.4s";
    setTimeout(() => { pista.style.opacity = "1"; }, 1200);
    setTimeout(() => { pista.style.opacity = "0"; }, 4800);
  }
}
