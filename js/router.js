// ============================================================
// ROUTER — enrutamiento por hash (#/ruta), sin dependencias
// ============================================================

function rutaActual() {
  const hash = window.location.hash || "#/";
  const ruta = hash.replace(/^#/, "").split("?")[0];
  return ruta === "" ? "/" : ruta;
}

function renderizar() {
  const ruta = rutaActual();
  const vista = VISTAS[ruta] || VISTA_404;
  const app = document.getElementById("app");

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

  animarVista();
  procesarEmbedsInstagram();
}

window.addEventListener("hashchange", renderizar);
window.addEventListener("DOMContentLoaded", renderizar);
