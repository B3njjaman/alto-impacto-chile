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
    // Permalinks de posts reales para los embeds oficiales de la galería.
    posts: [
      "https://www.instagram.com/p/DUHbfZYCTFg/",
      "https://www.instagram.com/p/DU9fWLCiR69/",
    ],
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

  // --- Video del héroe ---------------------------------------
  // Reemplázalo por un video propio de la escuela cuando exista.
  videoHero: "assets/videos/hero-clase.mp4",
  posterHero: "assets/fotos/hero-sparring.jpg",
  videoClases: "assets/videos/clase-grupal.mp4",

  // --- Galería local -----------------------------------------
  // FOTOS REFERENCIALES de banco libre (Pexels, uso comercial gratuito).
  // Reemplázalas por fotos reales de la escuela: deja los archivos en
  // assets/fotos/ o assets/galeria/ y actualiza esta lista.
  galeria: [
    { archivo: "assets/fotos/hero-sparring.jpg", alt: "Sparring de Muay Thai en el ring" },
    { archivo: "assets/fotos/clase-grupal.jpg", alt: "Alumna y entrenador practicando rodillazos" },
    { archivo: "assets/fotos/vendas.jpg", alt: "Peleador colocándose las vendas" },
    { archivo: "assets/fotos/sparring-tecnica.jpg", alt: "Trabajo técnico de sparring" },
    { archivo: "assets/fotos/ring-bn.jpg", alt: "Combate en blanco y negro" },
    { archivo: "assets/fotos/entrenamiento-dinamico.jpg", alt: "Entrenamiento dinámico en el gimnasio" },
    { archivo: "assets/fotos/estiramiento-ring.jpg", alt: "Estiramiento y movilidad en el ring" },
    { archivo: "assets/fotos/sparring-intenso.jpg", alt: "Sparring de intensidad controlada" },
    { archivo: "assets/fotos/combate-bangkok.jpg", alt: "Combate de Muay Thai en Bangkok" },
    { archivo: "assets/fotos/ring-gimnasio.jpg", alt: "Ring del gimnasio" },
    { archivo: "assets/fotos/arena-combate.jpg", alt: "Combate en arena" },
    { archivo: "assets/fotos/kickboxing-tecnica.jpg", alt: "Técnica de patada en kickboxing" },
  ],
  creditoFotos: "Fotografía referencial de banco (Pexels) mientras reunimos las fotos propias de la escuela.",
};
