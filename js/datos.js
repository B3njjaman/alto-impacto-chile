// ============================================================
// DATOS EDITABLES DEL SITIO — Alto Impacto Chile · Muay Thai
// Edita este archivo para actualizar contacto, horarios y galería
// sin tocar el resto del código.
// ============================================================

const DATOS = {
  nombre: "Alto Impacto Chile",
  disciplina: "Muay Thai",
  ciudad: "Santiago de Chile",

  // --- Redes y contacto -------------------------------------
  instagram: {
    usuario: "alto_impacto_chile",
    url: "https://www.instagram.com/alto_impacto_chile",
    dm: "https://ig.me/m/alto_impacto_chile",
  },
  // Escribe el número con código de país, solo dígitos. Ej: "56912345678".
  // Si queda vacío, el sitio usa el DM de Instagram como canal de contacto.
  whatsapp: "",
  correo: "",

  // --- Horario referencial -----------------------------------
  // Cada bloque: dias, hora, clase, nivel.
  horario: [
    { dias: "Lunes · Miércoles · Viernes", hora: "19:00 – 20:30", clase: "Muay Thai adultos", nivel: "Todos los niveles" },
    { dias: "Martes · Jueves", hora: "19:00 – 20:30", clase: "Técnica y pads", nivel: "Iniciación" },
    { dias: "Sábado", hora: "10:00 – 11:30", clase: "Entrenamiento general", nivel: "Todos los niveles" },
  ],
  notaHorario: "Horario referencial. Confírmalo por Instagram antes de tu primera visita.",

  // --- Galería local -----------------------------------------
  // Deja fotos en assets/galeria/ y agrégalas aquí, por ejemplo:
  // { archivo: "assets/galeria/entrenamiento-01.jpg", alt: "Trabajo de pads en clase" },
  galeria: [],

  // --- Testimonios ---------------------------------------------
  // Reseñas reales de alumnos. La sección solo aparece en el sitio
  // cuando hay al menos un testimonio cargado aquí. Ejemplo:
  // { nombre: "Nombre Apellido", texto: "Lo que dijo el alumno.", estrellas: 5 },
  testimonios: [],

  // --- Ubicación -------------------------------------------------
  // "consulta" es lo que se busca en el mapa. Por ahora solo la
  // ciudad (dato real). Cuando tengas la dirección exacta, reemplaza
  // "consulta" por algo como "Av. Ejemplo 1234, Ñuñoa, Santiago" y
  // cambia "confirmada" a true (eso saca la nota de "referencial").
  ubicacion: {
    consulta: "Santiago, Chile",
    confirmada: false,
  },
};
