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

function marqueeValores() {
  const items = VALORES.map(v => `<span>${v.nombre}</span><span class="oro">★</span>`).join("");
  return `
  <div class="marquee" aria-hidden="true">
    <div class="marquee-pista">${items}${items}</div>
  </div>`;
}

// Banda horizontal de fotos con deriva al hacer scroll (GSAP).
function bandaFotos(fotos) {
  const imgs = fotos.map(f => `<img src="${f.archivo}" alt="" loading="lazy" />`).join("");
  return `
  <div class="banda" aria-hidden="true">
    <div class="banda-pista">${imgs}</div>
  </div>`;
}

function llamadoFinal(fondo) {
  return `
  <section class="llamado reveal">
    ${fondo ? `<div class="llamado-fondo" style="background-image:url('${fondo}')"></div>` : ""}
    <p class="eyebrow" style="justify-content:center">Da el primer paso</p>
    <h2>Tu mejor versión te está esperando</h2>
    <p>Escríbenos por Instagram y agenda tu clase de prueba. No necesitas experiencia: solo ganas de empezar.</p>
    <a class="boton boton-rojo" href="${DATOS.instagram.dm}" target="_blank" rel="noopener">Agenda tu clase de prueba</a>
  </section>`;
}

const VISTAS = {

  // ---------- INICIO ----------
  "/": {
    titulo: "Alto Impacto Chile · Muay Thai",
    html: () => `
    <section class="heroe">
      <div class="heroe-media" aria-hidden="true">
        <video id="videoHero" autoplay muted loop playsinline preload="auto" poster="${DATOS.posterHero}">
          <source src="${DATOS.videoHero}" type="video/mp4" />
        </video>
      </div>
      <img class="heroe-logo" src="assets/logo-transparente.svg" alt="" />
      <div class="heroe-interior">
        <p class="eyebrow">Muay Thai · ${DATOS.ciudad}</p>
        <h1>
          <span class="mascara"><span class="linea">Descubre tu</span></span>
          <span class="mascara"><span class="linea acento">mejor versión</span></span>
        </h1>
        <p class="heroe-parrafo">Entrenamiento disciplinado, progresivo y respetuoso. Avanza a tu propio ritmo, fortalece tu confianza y alcanza tus metas dentro y fuera del entrenamiento.</p>
        <div class="heroe-acciones">
          <a class="boton boton-rojo" href="#/contacto">Agenda tu clase de prueba</a>
          <a class="boton boton-borde" href="#/clases">Así son las clases</a>
        </div>
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
          <div class="programa-foto"><img src="assets/fotos/vendas.jpg" alt="Peleador colocándose las vendas antes de entrenar" loading="lazy" /></div>
          <div class="programa-cuerpo">
            <span class="nivel">Sin experiencia</span>
            <h3>Iniciación</h3>
            <p>Tus primeros pasos en el arte de los ocho miembros: postura, golpes básicos y acondicionamiento, en un ambiente seguro y cercano.</p>
          </div>
        </article>
        <article class="programa reveal">
          <div class="programa-foto"><img src="assets/fotos/sparring-tecnica.jpg" alt="Trabajo técnico de sparring en el gimnasio" loading="lazy" /></div>
          <div class="programa-cuerpo">
            <span class="nivel">Con base técnica</span>
            <h3>Intermedio y avanzado</h3>
            <p>Combinaciones, clinch, trabajo de pads y sparring controlado, siempre con el autocontrol como regla número uno.</p>
          </div>
        </article>
        <article class="programa reveal">
          <div class="programa-foto"><img src="assets/fotos/estiramiento-ring.jpg" alt="Atletas estirando dentro del ring" loading="lazy" /></div>
          <div class="programa-cuerpo">
            <span class="nivel">Para todos</span>
            <h3>Acondicionamiento</h3>
            <p>Fuerza, resistencia y movilidad al servicio de tu Muay Thai y de una vida más fuerte, segura y consciente.</p>
          </div>
        </article>
      </div>
    </section>

    ${bandaFotos(DATOS.galeria.slice(0, 6))}

    <div class="seccion-oscura-envoltura">
      <section class="seccion">
        <div class="dos-columnas">
          <div class="reveal">
            <p class="eyebrow">Nuestra escuela</p>
            <h2>El esfuerzo vale más que la violencia</h2>
            <p class="seccion-intro">En Alto Impacto Chile creemos en un camino de superación real, donde el esfuerzo, el autocontrol y la perseverancia construyen una vida más fuerte, segura y consciente.</p>
            <p style="margin-top:1.5rem"><a class="boton boton-borde" href="#/nosotros">Visión, misión y valores</a></p>
          </div>
          <figure class="foto-marco reveal">
            <img src="assets/fotos/clase-grupal.jpg" alt="Alumna practicando rodillazos con su entrenador en el ring" loading="lazy" />
          </figure>
        </div>
      </section>
    </div>

    ${cintaThai()}

    <section class="seccion">
      <div class="seccion-cabeza reveal">
        <div>
          <p class="eyebrow">Comunidad</p>
          <h2>Síguenos en Instagram</h2>
        </div>
        <a class="boton boton-borde" href="#/galeria">Ver la galería</a>
      </div>
      <div class="galeria-grid">
        <div class="tarjeta-instagram reveal">
          <img src="assets/logo.svg" alt="Logo de Alto Impacto Chile" />
          <strong>@${DATOS.instagram.usuario}</strong>
          <p>Entrenamientos, comunidad y el día a día de la escuela.</p>
          <a class="boton boton-rojo" href="${DATOS.instagram.url}" target="_blank" rel="noopener">Seguir</a>
        </div>
        ${DATOS.instagram.posts.map(p => embedInstagram(p)).join("")}
      </div>
    </section>

    ${llamadoFinal("assets/fotos/ring-gimnasio.jpg")}
    `,
  },

  // ---------- NOSOTROS ----------
  "/nosotros": {
    titulo: "Nosotros · Alto Impacto Chile",
    html: () => `
    <section class="seccion">
      <div class="dos-columnas">
        <div>
          <p class="eyebrow reveal">Nosotros</p>
          <h2 class="reveal">Una escuela con propósito</h2>
          <p class="seccion-intro reveal">El saludo de nuestro logo no es casualidad: en el Muay Thai, juntar los guantes es un gesto de respeto por quien entrena contigo. Así entendemos este arte: fuerza al servicio del crecimiento, nunca de la violencia.</p>
        </div>
        <figure class="foto-marco reveal">
          <img src="assets/fotos/combate-bangkok.jpg" alt="Combate de Muay Thai en Bangkok, Tailandia" loading="lazy" />
        </figure>
      </div>
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

    ${bandaFotos(DATOS.galeria.slice(6, 12))}

    ${llamadoFinal("assets/fotos/arena-combate.jpg")}
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

      <figure class="video-ambiente reveal" style="margin-top:2.5rem">
        <video autoplay muted loop playsinline preload="metadata" poster="assets/fotos/clase-grupal.jpg">
          <source src="${DATOS.videoClases}" type="video/mp4" />
        </video>
        <figcaption>Una clase en movimiento</figcaption>
      </figure>

      <div class="programas" style="margin-top:2.5rem">
        <article class="programa reveal">
          <div class="programa-foto"><img src="assets/fotos/kickboxing-tecnica.jpg" alt="Técnica de patada" loading="lazy" /></div>
          <div class="programa-cuerpo">
            <span class="nivel">Paso 1</span>
            <h3>Iniciación</h3>
            <p>Postura, desplazamientos y los golpes fundamentales del arte de los ocho miembros: puños, codos, rodillas y piernas. Sin experiencia previa.</p>
          </div>
        </article>
        <article class="programa reveal">
          <div class="programa-foto"><img src="assets/fotos/sparring-intenso.jpg" alt="Sparring de intensidad controlada" loading="lazy" /></div>
          <div class="programa-cuerpo">
            <span class="nivel">Paso 2</span>
            <h3>Intermedio</h3>
            <p>Combinaciones, defensa, clinch y trabajo de pads. Empiezas a construir tu propio estilo con la técnica como base.</p>
          </div>
        </article>
        <article class="programa reveal">
          <div class="programa-foto"><img src="assets/fotos/ring-bn.jpg" alt="Combate en blanco y negro" loading="lazy" /></div>
          <div class="programa-cuerpo">
            <span class="nivel">Paso 3</span>
            <h3>Avanzado</h3>
            <p>Estrategia, ritmo y sparring controlado. La intensidad sube, el respeto se mantiene: el autocontrol es la regla número uno.</p>
          </div>
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
            <div class="panel reveal" style="margin-top:1.6rem">
              <h3>Reglas de la casa</h3>
              <p>El respeto no se negocia: saludamos al entrar, cuidamos a los compañeros y dejamos el ego fuera del tatami. La energía se canaliza con equilibrio.</p>
            </div>
          </div>
          <figure class="foto-marco reveal">
            <img src="assets/fotos/vendas.jpg" alt="Peleador colocándose las vendas antes de entrenar" loading="lazy" />
          </figure>
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

    ${bandaFotos(DATOS.galeria.slice(3, 9))}

    ${llamadoFinal("assets/fotos/entrenamiento-dinamico.jpg")}
    `,
  },

  // ---------- GALERÍA ----------
  "/galeria": {
    titulo: "Galería · Alto Impacto Chile",
    html: () => `
    <section class="seccion">
      <div class="seccion-cabeza reveal">
        <div>
          <p class="eyebrow">Galería</p>
          <h2>El día a día de la escuela</h2>
        </div>
        <a class="boton boton-rojo" href="${DATOS.instagram.url}" target="_blank" rel="noopener">Seguir en Instagram</a>
      </div>

      <div class="galeria-grid">
        ${DATOS.instagram.posts.map(p => embedInstagram(p)).join("")}
        <div class="tarjeta-instagram reveal">
          <img src="assets/logo.svg" alt="Logo de Alto Impacto Chile" />
          <strong>@${DATOS.instagram.usuario}</strong>
          <p>Todas las fotos y videos de la escuela están en nuestro Instagram.</p>
          <a class="boton boton-rojo" href="${DATOS.instagram.url}" target="_blank" rel="noopener">Ver el perfil completo</a>
        </div>
      </div>
    </section>

    <div class="seccion-oscura-envoltura">
      <section class="seccion">
        <p class="eyebrow reveal">El arte de los ocho miembros</p>
        <h2 class="reveal">Muay Thai en imágenes</h2>
        <p class="seccion-intro reveal">${DATOS.creditoFotos}</p>
        <div class="galeria-grid" style="margin-top:2rem">
          ${DATOS.galeria.map(f => `
          <figure class="galeria-foto reveal">
            <img src="${f.archivo}" alt="${f.alt}" loading="lazy" />
          </figure>`).join("")}
        </div>
      </section>
    </div>

    ${llamadoFinal("assets/fotos/combate-bangkok.jpg")}
    `,
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

    <section class="seccion">
      <div class="dos-columnas">
        <figure class="foto-marco reveal">
          <img src="assets/fotos/clase-grupal.jpg" alt="Clase de Muay Thai con entrenador" loading="lazy" />
        </figure>
        <div class="reveal">
          <h2 style="max-width:24ch">Primera vez entrenando un arte marcial</h2>
          <p class="seccion-intro" style="margin:1rem 0 2rem">Perfecto: nuestra especialidad es acompañarte desde cero, a tu propio ritmo y con respeto.</p>
          <a class="boton boton-rojo" href="${DATOS.instagram.dm}" target="_blank" rel="noopener">Quiero empezar</a>
        </div>
      </div>
    </section>
    `;
    },
  },
};

// Embed oficial de Instagram: el script embed.js lo hidrata con la foto real.
function embedInstagram(permalink) {
  return `
  <blockquote class="instagram-media reveal" data-instgrm-permalink="${permalink}" data-instgrm-version="14"
    style="background:#15151a; border:1px solid #26262e; border-radius:10px; max-width:540px; min-width:unset; width:100%;">
    <a href="${permalink}" target="_blank" rel="noopener" style="display:block; padding:2rem; color:#9a99a1; text-decoration:none; text-align:center;">
      Ver esta publicación en Instagram
    </a>
  </blockquote>`;
}

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
