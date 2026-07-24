// ============================================================
// APP — comportamiento global: menú, embeds y datos en la interfaz
// ============================================================

// --- Menú móvil ---------------------------------------------
const menuBoton = document.getElementById("menuBoton");
const navegacion = document.getElementById("navegacion");

function cerrarMenu() {
  if (!navegacion.classList.contains("abierta")) return;
  navegacion.classList.remove("abierta");
  document.body.classList.remove("menu-abierto");
  menuBoton.setAttribute("aria-expanded", "false");
  menuBoton.setAttribute("aria-label", "Abrir menú");
  ANIM.bloquearScroll(false);
}

menuBoton.addEventListener("click", () => {
  const abierto = navegacion.classList.toggle("abierta");
  document.body.classList.toggle("menu-abierto", abierto);
  menuBoton.setAttribute("aria-expanded", String(abierto));
  menuBoton.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
  ANIM.bloquearScroll(abierto);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") cerrarMenu();
});

// --- Embeds oficiales de Instagram ---------------------------
// Carga embed.js una sola vez y re-procesa los blockquotes al
// cambiar de vista. Al hidratarse cambian de alto, así que hay que
// recalcular las posiciones de las animaciones por scroll.
let embedCargado = false;
function procesarEmbedsInstagram() {
  if (!document.querySelector(".instagram-media")) return;

  const recalcularLuego = () => {
    setTimeout(() => ANIM.recalcular(), 1200);
    setTimeout(() => ANIM.recalcular(), 3000);
  };

  if (window.instgrm && window.instgrm.Embeds) {
    window.instgrm.Embeds.process();
    recalcularLuego();
    return;
  }
  if (embedCargado) return;
  embedCargado = true;

  const s = document.createElement("script");
  s.src = "https://www.instagram.com/embed.js";
  s.async = true;
  s.addEventListener("load", recalcularLuego);
  document.body.appendChild(s);
}

// --- Datos globales en la interfaz ---------------------------
const ABREVIATURAS = {
  Lunes: "Lun", Martes: "Mar", Miércoles: "Mié", Jueves: "Jue",
  Viernes: "Vie", Sábado: "Sáb", Domingo: "Dom",
};

// "Lunes · Miércoles · Viernes" → "Lun · Mié · Vie"
function abreviarDias(dias) {
  return dias
    .split("·")
    .map((d) => ABREVIATURAS[d.trim()] || d.trim())
    .join(" · ");
}

document.getElementById("anio").textContent = new Date().getFullYear();
document.getElementById("barraCiudad").textContent = DATOS.ciudad;
document.getElementById("pieCiudad").textContent = DATOS.ciudad;

const enlacesInstagram = [
  document.getElementById("barraInstagram"),
  document.getElementById("pieInstagram"),
];
enlacesInstagram.forEach((a) => {
  a.href = DATOS.instagram.url;
  a.textContent = `@${DATOS.instagram.usuario}`;
});

// Barra superior: el primer bloque del horario, en corto.
const primerBloque = DATOS.horario[0];
if (primerBloque) {
  document.getElementById("barraHorario").textContent =
    `${abreviarDias(primerBloque.dias)} · ${primerBloque.hora}`;
}

// Pie: la semana completa, dos columnas.
document.getElementById("pieHorario").innerHTML = DATOS.horario
  .map((h) => `<tr><td>${abreviarDias(h.dias)}</td><td>${h.hora}</td></tr>`)
  .join("");

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
