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

  // Antes de reemplazar el DOM hay que soltar las animaciones y
  // carruseles que apuntaban a los nodos que están por desaparecer.
  ANIM.desmontar();

  app.innerHTML = vista.html();
  document.title = vista.titulo;

  // Marca el enlace activo en la navegación.
  document.querySelectorAll(".navegacion a").forEach((a) => {
    a.classList.toggle("activo", a.dataset.ruta === ruta);
    if (a.dataset.ruta === ruta) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });

  cerrarMenu();
  ANIM.irArriba();
  ANIM.montar();
  procesarEmbedsInstagram();
}

window.addEventListener("hashchange", renderizar);
window.addEventListener("DOMContentLoaded", renderizar);
