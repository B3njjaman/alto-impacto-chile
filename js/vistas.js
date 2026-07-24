// ============================================================
// VISTAS — plantillas HTML de cada ruta del sitio
// ============================================================

const VALORES = [
  { nombre: "Respeto", texto: "Promovemos un ambiente sano, donde cada persona sea valorada y tratada con dignidad." },
  { nombre: "Disciplina", texto: "Fomentamos el compromiso, la constancia y el esfuerzo como base del progreso." },
  { nombre: "Responsabilidad", texto: "Impulsamos una práctica consciente, segura y enfocada en el desarrollo personal." },
  { nombre: "Autocontrol", texto: "Enseñamos a canalizar la energía con equilibrio, evitando la violencia desmedida." },
  { nombre: "Superación personal", texto: "Motivamos a cada alumno a avanzar según su propio ritmo y a superar sus límites." },
  { nombre: "Compañerismo", texto: "Creamos un espacio de apoyo mutuo, trabajo en equipo y crecimiento colectivo." },
  { nombre: "Persistencia", texto: "Valoramos el proceso, el aprendizaje continuo y la capacidad de no rendirse." },
];

// Cinta divisoria inspirada en la bandera tailandesa del logo.
function cintaThai() {
  return `
  <svg class="cinta" viewBox="0 0 1200 26" preserveAspectRatio="none" aria-hidden="true">
    <path d="M0 8 Q 300 0 600 8 T 1200 8 V 11 Q 900 19 600 11 T 0 11 Z" fill="#a51931"/>
    <path d="M0 12 Q 300 4 600 12 T 1200 12 V 15 Q 900 23 600 15 T 0 15 Z" fill="#f2efe8"/>
    <path d="M0 16 Q 300 8 600 16 T 1200 16 V 19 Q 900 27 600 19 T 0 19 Z" fill="#2d2a4a"/>
  </svg>`;
}

function iconoInstagram() {
  return `<svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true"><path fill="currentColor" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>`;
}

// Bloque "Síguenos en Instagram": reemplaza los embeds de posts
// (todavía poco prolijos) por un banner compacto de texto + ícono,
// sin depender de capturas de publicaciones.
function bloqueComunidad({ enlaceGaleria = false } = {}) {
  return `
  <div class="comunidad reveal">
    <div class="comunidad-icono" aria-hidden="true">${iconoInstagram()}</div>
    <div class="comunidad-texto">
      <p class="eyebrow">Comunidad</p>
      <h2>Síguenos en Instagram</h2>
      <p>Entrenamientos, comunidad y el día a día de la escuela — todo primero en @${DATOS.instagram.usuario}.</p>
    </div>
    <div class="comunidad-acciones">
      <a class="boton boton-rojo" href="${DATOS.instagram.url}" target="_blank" rel="noopener">Seguir</a>
      ${enlaceGaleria ? `<a class="boton boton-borde" href="#/galeria">Ver galería</a>` : ""}
    </div>
  </div>`;
}

function marqueeValores() {
  const items = VALORES.map(v => `<span>${v.nombre}</span><span class="oro">★</span>`).join("");
  return `
  <div class="marquee" aria-hidden="true">
    <div class="marquee-pista">${items}${items}</div>
  </div>`;
}

function llamadoFinal() {
  return `
  <section class="llamado reveal">
    <p class="eyebrow" style="justify-content:center">Da el primer paso</p>
    <h2>Tu mejor versión te está esperando</h2>
    <p>Escríbenos por Instagram y agenda tu clase de prueba. No necesitas experiencia: solo ganas de empezar.</p>
    <a class="boton boton-rojo" href="${DATOS.instagram.dm}" target="_blank" rel="noopener">Agenda tu clase de prueba</a>
  </section>`;
}

// Franja de confianza bajo el llamado a la acción principal: responde
// de inmediato a las dudas más comunes de quien nunca ha entrenado.
function franjaConfianza() {
  const items = ["Sin experiencia previa", "A tu propio ritmo", "Comunidad y respeto ante todo"];
  return `
  <ul class="confianza">
    ${items.map(i => `<li>${i}</li>`).join("")}
  </ul>`;
}

// Testimonios: la sección solo se dibuja si hay reseñas reales
// cargadas en DATOS.testimonios (ver js/datos.js).
function testimonios() {
  if (!DATOS.testimonios || DATOS.testimonios.length === 0) return "";
  return `
  <section class="seccion">
    <p class="eyebrow reveal">Lo que dicen nuestros alumnos</p>
    <h2 class="reveal">Historias reales, resultados reales</h2>
    <div class="testimonios-grid" style="margin-top:2rem">
      ${DATOS.testimonios.map(t => `
      <figure class="testimonio reveal">
        <div class="testimonio-estrellas" aria-hidden="true">${"★".repeat(t.estrellas || 5)}</div>
        <blockquote>${t.texto}</blockquote>
        <figcaption>${t.nombre}</figcaption>
      </figure>`).join("")}
    </div>
  </section>`;
}

// Preguntas frecuentes de un futuro alumno, con las respuestas que
// ya usamos en el resto del sitio (clases, misión, contacto).
function preguntasFrecuentes() {
  const preguntas = [
    { q: "¿Necesito experiencia previa?", r: "No. La clase de Iniciación está pensada para quienes parten de cero: postura, golpes básicos y acondicionamiento, en un ambiente seguro y cercano." },
    { q: "¿Qué debo llevar a mi primera clase?", r: "Ropa deportiva cómoda, botella de agua y toalla. El resto del equipo se conversa al llegar." },
    { q: "¿Cómo agendo mi clase de prueba?", r: "Escríbenos por Instagram y coordinamos contigo el mejor horario para empezar." },
  ];
  return `
  <section class="seccion">
    <p class="eyebrow reveal">Antes de empezar</p>
    <h2 class="reveal">Preguntas frecuentes</h2>
    <div class="faq reveal" style="margin-top:2rem">
      ${preguntas.map(p => `
      <details>
        <summary>${p.q}</summary>
        <p>${p.r}</p>
      </details>`).join("")}
    </div>
  </section>`;
}

const VISTAS = {

  // ---------- INICIO ----------
  "/": {
    titulo: "Alto Impacto Chile · Muay Thai",
    html: () => `
    <section class="heroe">
      <img class="heroe-logo" src="assets/logo-transparente.svg" alt="" />
      <div class="heroe-interior">
        <p class="eyebrow">Muay Thai · ${DATOS.ciudad}</p>
        <h1>Descubre tu <span class="acento">mejor versión</span></h1>
        <p>Entrenamiento disciplinado, progresivo y respetuoso. Avanza a tu propio ritmo, fortalece tu confianza y alcanza tus metas dentro y fuera del entrenamiento.</p>
        <div class="heroe-acciones">
          <a class="boton boton-rojo" href="#/contacto">Agenda tu clase de prueba</a>
          <a class="boton boton-borde" href="#/nosotros">Conoce la escuela</a>
        </div>
        ${franjaConfianza()}
      </div>
    </section>

    ${marqueeValores()}

    <section class="seccion">
      <div class="seccion-cabeza reveal">
        <div>
          <p class="eyebrow">Entrenamiento</p>
          <h2>Un camino para cada persona</h2>
        </div>
        <a class="boton boton-borde" href="#/clases">Ver las clases</a>
      </div>
      <div class="programas">
        <article class="programa reveal">
          <span class="nivel">Sin experiencia</span>
          <h3>Iniciación</h3>
          <p>Tus primeros pasos en el arte de los ocho miembros: postura, golpes básicos y acondicionamiento, en un ambiente seguro y cercano.</p>
        </article>
        <article class="programa reveal">
          <span class="nivel">Con base técnica</span>
          <h3>Intermedio y avanzado</h3>
          <p>Combinaciones, clinch, trabajo de pads y sparring controlado, siempre con el autocontrol como regla número uno.</p>
        </article>
        <article class="programa reveal">
          <span class="nivel">Para todos</span>
          <h3>Acondicionamiento</h3>
          <p>Fuerza, resistencia y movilidad al servicio de tu Muay Thai y de una vida más fuerte, segura y consciente.</p>
        </article>
      </div>
    </section>

    <div class="seccion-oscura-envoltura">
      <section class="seccion">
        <div class="dos-columnas">
          <div class="reveal">
            <p class="eyebrow">Nuestra escuela</p>
            <h2>El esfuerzo vale más que la violencia</h2>
            <p class="seccion-intro">En Alto Impacto Chile creemos en un camino de superación real, donde el esfuerzo, el autocontrol y la perseverancia construyen una vida más fuerte, segura y consciente.</p>
            <p style="margin-top:1.5rem"><a class="boton boton-borde" href="#/nosotros">Visión, misión y valores</a></p>
          </div>
          <blockquote class="cita-grande reveal">
            «Acompañamos a cada persona en su proceso de crecimiento físico, mental y emocional, para que avance a su propio ritmo y alcance sus metas dentro y fuera del entrenamiento.»
          </blockquote>
        </div>
      </section>
    </div>

    ${cintaThai()}

    <section class="seccion">
      ${bloqueComunidad({ enlaceGaleria: true })}
    </section>

    ${testimonios()}

    ${cintaThai()}

    ${preguntasFrecuentes()}

    ${llamadoFinal()}
    `,
  },

  // ---------- NOSOTROS ----------
  "/nosotros": {
    titulo: "Nosotros · Alto Impacto Chile",
    html: () => `
    <section class="seccion">
      <p class="eyebrow reveal">Nosotros</p>
      <h2 class="reveal">Una escuela con propósito</h2>
      <p class="seccion-intro reveal">El saludo de nuestro logo no es casualidad: en el Muay Thai, juntar los guantes es un gesto de respeto por quien entrena contigo. Así entendemos este arte.</p>
    </section>

    <div class="seccion-oscura-envoltura">
      <section class="seccion">
        <div class="dos-columnas">
          <div class="panel reveal">
            <h3>Visión</h3>
            <p>Inspirar a cada persona a descubrir su mejor versión a través del Muay Thai, acompañando su progreso con respeto, disciplina y constancia, para que avance a su propio ritmo y alcance sus metas dentro y fuera del entrenamiento.</p>
            <p>Creemos en un camino de superación real, donde el esfuerzo, el autocontrol y la perseverancia valen más que la violencia, y donde cada paso cuenta en la construcción de una vida más fuerte, segura y consciente.</p>
          </div>
          <div class="panel reveal">
            <h3>Misión</h3>
            <p>Formamos y acompañamos a cada persona en su proceso de crecimiento físico, mental y emocional a través del entrenamiento disciplinado, progresivo y respetuoso del Muay Thai.</p>
            <p>Buscamos entregar un espacio seguro, motivador y cercano, donde cada alumno pueda desarrollar sus objetivos personales a su propio ritmo, fortaleciendo la confianza, el autocontrol, la constancia y el respeto por sí mismo y por los demás.</p>
          </div>
        </div>
      </section>
    </div>

    ${cintaThai()}

    <section class="seccion">
      <p class="eyebrow reveal">Lo que nos define</p>
      <h2 class="reveal">Nuestros valores</h2>
      <div class="valores" style="margin-top:2rem">
        ${VALORES.map(v => `
        <article class="valor reveal">
          <span class="estrella">★</span>
          <h3>${v.nombre.toUpperCase()}</h3>
          <p>${v.texto}</p>
        </article>`).join("")}
      </div>
    </section>

    ${llamadoFinal()}
    `,
  },

  // ---------- CLASES ----------
  "/clases": {
    titulo: "Clases · Alto Impacto Chile",
    html: () => `
    <section class="seccion">
      <p class="eyebrow reveal">Clases</p>
      <h2 class="reveal">Así se entrena en Alto Impacto</h2>
      <p class="seccion-intro reveal">Cada clase combina técnica, acondicionamiento y trabajo en equipo. El nivel se adapta a ti: nadie queda atrás y nadie se aburre.</p>

      <div class="programas" style="margin-top:2.5rem">
        <article class="programa reveal">
          <span class="nivel">Paso 1</span>
          <h3>Iniciación</h3>
          <p>Postura, desplazamientos y los golpes fundamentales del arte de los ocho miembros: puños, codos, rodillas y piernas. Sin experiencia previa.</p>
        </article>
        <article class="programa reveal">
          <span class="nivel">Paso 2</span>
          <h3>Intermedio</h3>
          <p>Combinaciones, defensa, clinch y trabajo de pads. Empiezas a construir tu propio estilo con la técnica como base.</p>
        </article>
        <article class="programa reveal">
          <span class="nivel">Paso 3</span>
          <h3>Avanzado</h3>
          <p>Estrategia, ritmo y sparring controlado. La intensidad sube, el respeto se mantiene: el autocontrol es la regla número uno.</p>
        </article>
      </div>
    </section>

    <div class="seccion-oscura-envoltura">
      <section class="seccion">
        <div class="dos-columnas">
          <div class="reveal">
            <p class="eyebrow">Tu primera clase</p>
            <h2>¿Qué necesito para empezar?</h2>
            <p class="seccion-intro">Menos de lo que crees. Para tu primera clase basta con:</p>
            <ul style="margin:1.2rem 0 0 1.2rem; color:var(--gris); display:grid; gap:0.5rem">
              <li>Ropa deportiva cómoda</li>
              <li>Botella de agua y toalla</li>
              <li>Ganas de aprender: el equipo se conversa al llegar</li>
            </ul>
          </div>
          <div class="panel reveal">
            <h3>Reglas de la casa</h3>
            <p>El respeto no se negocia: saludamos al entrar, cuidamos a los compañeros y dejamos el ego fuera del tatami.</p>
            <p>La energía se canaliza con equilibrio — aquí se entrena duro, nunca con violencia desmedida.</p>
          </div>
        </div>
      </section>
    </div>

    ${cintaThai()}

    <section class="seccion" style="text-align:center">
      <h2 class="reveal" style="margin-inline:auto">¿Listo para probar?</h2>
      <p class="seccion-intro reveal" style="margin:0 auto 2rem">Revisa los horarios y agenda tu primera clase.</p>
      <div class="heroe-acciones reveal" style="justify-content:center">
        <a class="boton boton-rojo" href="#/horarios">Ver horarios</a>
        <a class="boton boton-borde" href="#/contacto">Contacto</a>
      </div>
    </section>
    `,
  },

  // ---------- HORARIOS ----------
  "/horarios": {
    titulo: "Horarios · Alto Impacto Chile",
    html: () => `
    <section class="seccion">
      <p class="eyebrow reveal">Horarios</p>
      <h2 class="reveal">Planifica tu semana</h2>

      <div class="tabla-envoltura reveal" style="margin-top:2rem">
        <table class="horario">
          <thead>
            <tr><th>Días</th><th>Horario</th><th>Clase</th><th>Nivel</th></tr>
          </thead>
          <tbody>
            ${DATOS.horario.map(h => `
            <tr>
              <td>${h.dias}</td>
              <td>${h.hora}</td>
              <td>${h.clase}</td>
              <td><span class="insignia">${h.nivel}</span></td>
            </tr>`).join("")}
          </tbody>
        </table>
      </div>
      <p class="nota reveal">${DATOS.notaHorario}</p>
    </section>

    ${llamadoFinal()}
    `,
  },

  // ---------- GALERÍA ----------
  "/galeria": {
    titulo: "Galería · Alto Impacto Chile",
    html: () => {
      const hayFotos = DATOS.galeria && DATOS.galeria.length > 0;
      return `
    <section class="seccion">
      <p class="eyebrow reveal">Galería</p>
      <h2 class="reveal">La escuela en acción</h2>

      ${hayFotos ? `
      <div class="galeria-grid" style="margin-top:2.5rem">
        ${DATOS.galeria.map(f => `
        <figure class="galeria-foto reveal">
          <img src="${f.archivo}" alt="${f.alt}" loading="lazy" />
        </figure>`).join("")}
      </div>` : `
      <p class="seccion-intro reveal" style="margin-top:1rem">Todavía estamos construyendo esta galería. Mientras tanto, el día a día de la escuela está en Instagram.</p>
      `}

      <div style="margin-top:2.5rem">
        ${bloqueComunidad()}
      </div>
    </section>

    ${llamadoFinal()}
    `;
    },
  },

  // ---------- CONTACTO ----------
  "/contacto": {
    titulo: "Contacto · Alto Impacto Chile",
    html: () => {
      const hayWsp = DATOS.whatsapp && DATOS.whatsapp.trim() !== "";
      const hayCorreo = DATOS.correo && DATOS.correo.trim() !== "";
      return `
    <section class="seccion">
      <p class="eyebrow reveal">Contacto</p>
      <h2 class="reveal">Agenda tu clase de prueba</h2>
      <p class="seccion-intro reveal">Cuéntanos tu experiencia (o si partes de cero) y te orientamos con el mejor horario para empezar.</p>

      <div class="contacto-grid" style="margin-top:2.5rem">
        <div class="contacto-tarjeta reveal">
          <h3>Instagram</h3>
          <p>El canal más rápido: escríbenos por mensaje directo y te respondemos a la brevedad.</p>
          <a class="boton boton-rojo" href="${DATOS.instagram.dm}" target="_blank" rel="noopener">Enviar mensaje</a>
        </div>
        ${hayWsp ? `
        <div class="contacto-tarjeta reveal">
          <h3>WhatsApp</h3>
          <p>Escríbenos directo al WhatsApp de la escuela.</p>
          <a class="boton boton-rojo" href="https://wa.me/${DATOS.whatsapp}?text=${encodeURIComponent("Hola, quiero agendar una clase de prueba de Muay Thai")}" target="_blank" rel="noopener">Abrir WhatsApp</a>
        </div>` : ""}
        ${hayCorreo ? `
        <div class="contacto-tarjeta reveal">
          <h3>Correo</h3>
          <p>También puedes escribirnos un correo con tus dudas.</p>
          <a class="boton boton-borde" href="mailto:${DATOS.correo}">${DATOS.correo}</a>
        </div>` : ""}
        <div class="contacto-tarjeta reveal">
          <h3>Ubicación</h3>
          <p>${DATOS.ciudad}. Escríbenos y te compartimos la dirección exacta y cómo llegar.</p>
          <a class="boton boton-borde" href="${DATOS.instagram.url}" target="_blank" rel="noopener">@${DATOS.instagram.usuario}</a>
        </div>
      </div>
    </section>

    ${cintaThai()}

    <section class="seccion" style="text-align:center">
      <h2 class="reveal" style="margin-inline:auto; max-width:24ch">Primera vez entrenando un arte marcial</h2>
      <p class="seccion-intro reveal" style="margin:0 auto 2rem">Perfecto: nuestra especialidad es acompañarte desde cero, a tu propio ritmo y con respeto.</p>
      <a class="boton boton-rojo reveal" href="${DATOS.instagram.dm}" target="_blank" rel="noopener">Quiero empezar</a>
    </section>
    `;
    },
  },
};

// Vista 404
const VISTA_404 = {
  titulo: "Página no encontrada · Alto Impacto Chile",
  html: () => `
  <section class="seccion" style="text-align:center; min-height:50vh; display:flex; flex-direction:column; justify-content:center; align-items:center">
    <p class="eyebrow" style="justify-content:center">Error 404</p>
    <h2 style="margin-inline:auto">Te saliste del ring</h2>
    <p class="seccion-intro" style="margin:0 auto 2rem">La página que buscas no existe. Volvamos al entrenamiento.</p>
    <a class="boton boton-rojo" href="#/">Volver al inicio</a>
  </section>`,
};
