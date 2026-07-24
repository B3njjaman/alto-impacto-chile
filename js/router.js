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
  };

  const puedeAnimar = gsapListo();
  if (esCambioDeRuta && puedeAnimar) {
    gsap.to(app, { opacity: 0, y: -10, duration: 0.2, ease: "power1.in", onComplete: dibujar });
  } else {
    dibujar();
  }
}

window.addEventListener("hashchange", () => renderizar(true));
window.addEventListener("DOMContentLoaded", () => renderizar(false));
