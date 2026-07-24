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

const ICONOS = {
  guante: `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true"><path d="M6 9a3 3 0 0 1 3-3h4.5A4.5 4.5 0 0 1 18 10.5V14a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V9Z"/><path d="M6 11H4.5A1.5 1.5 0 0 0 3 12.5 1.5 1.5 0 0 0 4.5 14H6"/><path d="M8 17v1.5A1.5 1.5 0 0 0 9.5 20h5a1.5 1.5 0 0 0 1.5-1.5V17"/></svg>`,
  reloj: `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.2V12l3.1 2"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s6.5-5.4 6.5-10a6.5 6.5 0 1 0-13 0C5.5 15.6 12 21 12 21Z"/><circle cx="12" cy="11" r="2.4"/></svg>`,
};

// ---------- Piezas reutilizables ----------

// Cinta divisoria inspirada en la bandera tailandesa del logo.
function cintaThai() {
  return `
  <svg class="cinta" viewBox="0 0 1200 26" preserveAspectRatio="none" aria-hidden="true">
    <path d="M0 8 Q 300 0 600 8 T 1200 8 V 11 Q 900 19 600 11 T 0 11 Z" fill="#a51931"/>
    <path d="M0 12 Q 300 4 600 12 T 1200 12 V 15 Q 900 23 600 15 T 0 15 Z" fill="#f2efe8"/>
    <path d="M0 16 Q 300 8 600 16 T 1200 16 V 19 Q 900 27 600 19 T 0 19 Z" fill="#2d2a4a"/>
  </svg>`;
}

// Ticker rojo con los valores de la escuela.
function tickerValores() {
  const items = VALORES.map(v => `<span>${v.nombre}</span><span class="marca-separador">★</span>`).join("");
  return `
  <div class="ticker" aria-hidden="true">
    <div class="ticker-pista">${items}${items}</div>
  </div>`;
}

// Banda de impacto: la palabra de fondo se mueve con el scroll.
function banda({ fantasma, eyebrow, titulo, cuerpo = "", boton = "" }) {
  return `
  <section class="banda">
    <div class="banda-fantasma" aria-hidden="true">${fantasma} · ${fantasma} · ${fantasma}</div>
    <div class="banda-interior">
      <p class="eyebrow eyebrow-centro reveal">${eyebrow}</p>
      <h2 class="reveal">${titulo}</h2>
      ${cuerpo}
      ${boton}
    </div>
  </section>`;
}

// Franja roja de ancho completo, el atajo directo a la escuela.
function franjaAccion() {
  return `
  <a class="franja" href="${DATOS.instagram.dm}" target="_blank" rel="noopener">
    <span>Escríbenos por Instagram y agenda tu clase de prueba →</span>
  </a>`;
}

function carruselValores() {
  return `
  <div class="valores-carrusel swiper" data-carrusel="valores">
    <div class="swiper-wrapper">
      ${VALORES.map(v => `
      <div class="swiper-slide">
        <article class="valor">
          <span class="estrella">★</span>
          <h3>${v.nombre.toUpperCase()}</h3>
          <p>${v.texto}</p>
        </article>
      </div>`).join("")}
    </div>
  </div>
  <div class="carrusel-control">
    <button class="carrusel-boton" data-carrusel-anterior aria-label="Valor anterior">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>
    </button>
    <button class="carrusel-boton" data-carrusel-siguiente aria-label="Valor siguiente">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>
    </button>
  </div>`;
}

// Las ocho armas del arte de los ocho miembros. Es el estado por
// defecto del bloque destacado mientras no haya video cargado.
const OCHO_ARMAS = [
  { nombre: "Puños", cantidad: 2 },
  { nombre: "Codos", cantidad: 2 },
  { nombre: "Rodillas", cantidad: 2 },
  { nombre: "Piernas", cantidad: 2 },
];

// ---------- Figura de los ocho miembros ----------
// La silueta no está dibujada a mano: sale de vectorizar la foto de
// referencia. El fondo de esa foto es frío (azulado) y la piel es
// cálida incluso en sombra, así que la separación se hace por
// temperatura de color y no por luminancia —con luminancia el guante
// y el lado oscuro del torso caen en el mismo nivel que el fondo—.
// Después se cierran los huecos, se traza el contorno y se simplifica.
//
// Sobre esa base van las prendas en los colores secundarios de la
// paleta: short y guantes en azul de bandera, mongkhon en dorado.

const SILUETA_CUERPO = "M126 0 Q153 0 149.5 2 Q146 4 151 9 Q156 14 155 17.5 Q154 21 150 22.5 Q146 24 139.5 30.5 Q133 37 137 45.5 Q141 54 140.5 58 Q140 62 143.5 65.5 Q147 69 150.5 69 Q154 69 157.5 65.5 Q161 62 161.5 58.5 Q162 55 167.5 63 Q173 71 182.5 80.5 Q192 90 203.5 81 Q215 72 221 76 Q227 80 229.5 77.5 Q232 75 233 76 Q234 77 227.5 88.5 Q221 100 214.5 107 Q208 114 215 120 Q222 126 228 124 Q234 122 237 124.5 Q240 127 255.5 113.5 Q271 100 291 91 Q311 82 320 82 Q329 82 333.5 87.5 Q338 93 337.5 114.5 Q337 136 334 150 Q331 164 331.5 176 Q332 188 334.5 199 Q337 210 345.5 228.5 Q354 247 350.5 248.5 Q347 250 333 236 Q319 222 313.5 220.5 Q308 219 304.5 216 Q301 213 301 210 Q301 207 304.5 200.5 Q308 194 308 179 Q308 164 307 158.5 Q306 153 302 149 Q298 145 293.5 149.5 Q289 154 284.5 162.5 Q280 171 275 172 Q270 173 258 184 Q246 195 244 198.5 Q242 202 241 215 Q240 228 242 232.5 Q244 237 240.5 241 Q237 245 235 254 Q233 263 231 266 Q229 269 229 278.5 Q229 288 226 293.5 Q223 299 224 301.5 Q225 304 217.5 320.5 Q210 337 211.5 340.5 Q213 344 208.5 350 Q204 356 204 359.5 Q204 363 205.5 364.5 Q207 366 205 370 Q203 374 202.5 383.5 Q202 393 204 403 Q206 413 208.5 416 Q211 419 216.5 420 Q222 421 196.5 421 Q171 421 177 418 Q183 415 182.5 411.5 Q182 408 184 402.5 Q186 397 184.5 368.5 Q183 340 184.5 333.5 Q186 327 190.5 318 Q195 309 196 301 Q197 293 197 286 Q197 279 193 258 Q189 237 189 228 Q189 219 179.5 212 Q170 205 170.5 199.5 Q171 194 172.5 192 Q174 190 170.5 186.5 Q167 183 149 175 Q131 167 121.5 160.5 Q112 154 97.5 141.5 Q83 129 75.5 117 Q68 105 67.5 101 Q67 97 68.5 93 Q70 89 81.5 78 Q93 67 95 62.5 Q97 58 97.5 39.5 Q98 21 102 12.5 Q106 4 102.5 2 Z";

const SILUETA_SHORT = "M272 116 Q277 128 278.5 147 Q280 166 268.5 173.5 Q257 181 253 177.5 Q249 174 244 179 Q239 184 234 191 Q229 198 232.5 202 Q236 206 229 222 Q222 238 228 243 Q234 248 233.5 250 Q233 252 225 264.5 Q217 277 212.5 277 Q208 277 205.5 274.5 Q203 272 201 274 Q199 276 195 260.5 Q191 245 190.5 232 Q190 219 180 211 Q170 203 173 196.5 Q176 190 173.5 186 Q171 182 184.5 170 Q198 158 207 140.5 Q216 123 219.5 125 Q223 127 228.5 125 Q234 123 236.5 125.5 Q239 128 253 116 Z";

// Los ocho puntos de contacto, en coordenadas de la silueta.
const OCHO_PUNTOS = [
  { arma: "Puños", x: 150, y: 52 },
  { arma: "Puños", x: 232, y: 54 },
  { arma: "Codos", x: 102, y: 100 },
  { arma: "Codos", x: 228, y: 96 },
  { arma: "Rodillas", x: 300, y: 152 },
  { arma: "Rodillas", x: 196, y: 282 },
  { arma: "Piernas", x: 325, y: 214 },
  { arma: "Piernas", x: 188, y: 352 },
];

// Guantes: en la foto son negros y neutros, así que la máscara por
// temperatura los deja fuera. Se dibujan aparte, que además es lo que
// permite darles el azul de la paleta.
const GUANTES = [
  { x: 150, y: 52 },
  { x: 232, y: 54 },
];

function figuraOchoPuntos() {
  return `
  <figure class="ocho-figura">
    <svg class="ocho-figura-svg" viewBox="55 -6 320 434" role="img"
      aria-label="Luchador de Muay Thai lanzando una rodilla, con los ocho puntos de contacto señalados sobre el cuerpo">

      <path class="fig-piel" d="${SILUETA_CUERPO}"/>
      <path class="fig-short" d="${SILUETA_SHORT}"/>

      <!-- Al cerrar la máscara para tapar el hueco de los guantes, la
           cabeza quedó pegada al brazo levantado. Este corte en el
           color del fondo vuelve a separarlas. -->
      <path class="fig-corte" d="M156 6 Q168 38 150 74"/>

      <!-- Mongkhon: la diadema ritual que el luchador lleva al entrar
           al ring. Va en dorado, el otro color secundario. -->
      <path class="fig-mongkhon" d="M92 40 Q122 18 156 32 L154 45 Q122 32 94 53 Z"/>
      <path class="fig-mongkhon-cinta" d="M95 50 Q86 64 90 80"/>

      ${GUANTES.map(g => `
      <g transform="translate(${g.x} ${g.y})">
        <path class="fig-guante" d="M-19 2 Q-21 -20 -3 -23 Q17 -22 18 -1 Q19 15 4 18 Q-15 19 -19 2 Z"/>
        <path class="fig-guante" d="M-18 -4 q-10 3 -9 12 q2 9 10 7 z"/>
        <path class="fig-venda" d="M-14 16 q14 6 28 0 l2 10 q-16 7 -33 0 z"/>
      </g>`).join("")}

      <g class="ocho-marcas">
        ${OCHO_PUNTOS.map(p => `
        <g class="ocho-marca" data-arma="${p.arma}">
          <circle class="ocho-marca-halo" cx="${p.x}" cy="${p.y}" r="7"/>
          <circle class="ocho-marca-punto" cx="${p.x}" cy="${p.y}" r="7"/>
        </g>`).join("")}
      </g>
    </svg>
  </figure>`;
}

function panelOchoMiembros() {
  return `
  <div class="ocho">
    <div class="ocho-interior">
      <div class="ocho-texto">
        <h2 class="ocho-titulo">El arte de los ocho miembros</h2>
        <dl class="ocho-armas">
          ${OCHO_ARMAS.map(a => `
          <div class="ocho-arma" data-arma="${a.nombre}">
            <dt>${a.nombre}</dt>
            <dd><span data-contador="${a.cantidad}">${a.cantidad}</span><small>armas</small></dd>
          </div>`).join("")}
        </dl>
        <p class="ocho-total">
          <strong data-contador="8">8</strong>
          puntos de contacto: puños, codos, rodillas y piernas. Eso es lo que
          se entrena en cada clase, paso a paso y sin apuro.
        </p>
      </div>
      ${figuraOchoPuntos()}
    </div>
  </div>`;
}

// Bloque destacado a ancho completo, encima de la sección de
// entrenamiento. Se arma según lo que haya en DATOS.video.
function bloqueDestacado() {
  const v = DATOS.video || {};
  const archivo = (v.archivo || "").trim();
  const youtube = (v.youtube || "").trim();
  const portada = (v.portada || "").trim();
  const titulo = v.titulo || "Un entrenamiento por dentro";

  // Sin video configurado: el panel de los ocho miembros.
  if (!archivo && !youtube) {
    return `<section class="destacado destacado--panel" data-destacado>${panelOchoMiembros()}</section>`;
  }

  const pie = `
    <div class="destacado-velo"></div>
    <div class="destacado-pie">
      <h2>${titulo}</h2>
      <a class="boton boton-rojo" href="#/clases">Ver las clases</a>
    </div>`;

  if (archivo) {
    return `
    <section class="destacado destacado--media" data-destacado>
      <video class="destacado-media" autoplay muted loop playsinline
        ${portada ? `poster="${portada}"` : ""}>
        <source src="${archivo}" type="video/mp4" />
      </video>
      ${pie}
    </section>`;
  }

  // YouTube: portada estática y carga del reproductor recién al pulsar.
  const miniatura = portada || `https://i.ytimg.com/vi/${youtube}/maxresdefault.jpg`;
  return `
  <section class="destacado destacado--media" data-destacado>
    <img class="destacado-media" src="${miniatura}" alt="" loading="lazy" />
    <div class="destacado-velo"></div>
    <button class="destacado-play" data-youtube="${youtube}" aria-label="Reproducir: ${titulo}">
      <span>
        <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor" aria-hidden="true"><path d="M8 5.2v13.6L19 12z"/></svg>
      </span>
    </button>
    <div class="destacado-pie">
      <h2>${titulo}</h2>
      <a class="boton boton-rojo" href="#/clases">Ver las clases</a>
    </div>
  </section>`;
}

function llamadoFinal() {
  return `
  <section class="llamado">
    <p class="eyebrow eyebrow-centro reveal">Da el primer paso</p>
    <h2 class="reveal">Tu mejor versión te está esperando</h2>
    <p class="reveal">Escríbenos por Instagram y agenda tu clase de prueba. No necesitas experiencia: solo ganas de empezar.</p>
    <a class="boton boton-rojo reveal" href="${DATOS.instagram.dm}" target="_blank" rel="noopener">Agenda tu clase de prueba</a>
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
        <h1>
          <span class="palabra"><span>Descubre</span></span>
          <span class="palabra"><span>tu</span></span>
          <span class="palabra acento"><span>mejor</span></span>
          <span class="palabra acento"><span>versión</span></span>
        </h1>
        <p>Entrenamiento disciplinado, progresivo y respetuoso. Avanza a tu propio ritmo, fortalece tu confianza y alcanza tus metas dentro y fuera del entrenamiento.</p>
        <div class="heroe-acciones">
          <a class="boton boton-rojo" href="#/contacto">Agenda tu clase de prueba</a>
          <a class="boton boton-borde" href="#/nosotros">Conoce la escuela</a>
        </div>
      </div>

      <div class="accesos-envoltura">
        <div class="accesos">
          <a class="acceso" href="#/clases">
            ${ICONOS.guante}
            <span class="acceso-texto">
              <strong>Clases y niveles<br />Cómo se entrena aquí</strong>
              <span class="acceso-detalle">Ver clases ›</span>
            </span>
          </a>
          <a class="acceso" href="#/horarios">
            ${ICONOS.reloj}
            <span class="acceso-texto">
              <strong>Horarios semanales<br />Cuándo entrenamos</strong>
              <span class="acceso-detalle">Ver horarios ›</span>
            </span>
          </a>
          <a class="acceso" href="#/contacto">
            ${ICONOS.pin}
            <span class="acceso-texto">
              <strong>Dónde estamos<br />Cómo llegar y escribirnos</strong>
              <span class="acceso-detalle">Ver contacto ›</span>
            </span>
          </a>
        </div>
      </div>
    </section>

    ${tickerValores()}

    ${bloqueDestacado()}

    <section class="seccion">
      <div class="seccion-cabeza">
        <div class="reveal">
          <p class="eyebrow">Entrenamiento</p>
          <h2>Un camino para cada persona</h2>
        </div>
        <a class="boton boton-borde reveal" href="#/clases">Ver las clases</a>
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

    ${banda({
      fantasma: "Esfuerzo",
      eyebrow: "Nuestra escuela",
      titulo: "El esfuerzo vale más que la violencia",
      cuerpo: `
        <p class="reveal">En Alto Impacto Chile creemos en un camino de superación real, donde el esfuerzo, el autocontrol y la perseverancia construyen una vida más fuerte, segura y consciente.</p>
        <blockquote class="banda-cita reveal">«Acompañamos a cada persona en su proceso de crecimiento físico, mental y emocional, para que avance a su propio ritmo y alcance sus metas dentro y fuera del entrenamiento.»</blockquote>`,
      boton: `<a class="boton boton-borde reveal" href="#/nosotros">Visión, misión y valores</a>`,
    })}

    ${cintaThai()}

    <section class="seccion">
      <div class="seccion-cabeza">
        <div class="reveal">
          <p class="eyebrow">Comunidad</p>
          <h2>Síguenos en Instagram</h2>
        </div>
        <a class="boton boton-borde reveal" href="#/galeria">Ver la galería</a>
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

    ${franjaAccion()}
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
      <div class="seccion-cabeza">
        <div class="reveal">
          <p class="eyebrow">Lo que nos define</p>
          <h2>Nuestros valores</h2>
        </div>
      </div>
      <div class="reveal">
        ${carruselValores()}
      </div>
    </section>

    ${franjaAccion()}
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

      <div class="programas" style="margin-top:2.8rem">
        <article class="programa programa-paso reveal" data-paso="01">
          <span class="nivel">Paso 1</span>
          <h3>Iniciación</h3>
          <p>Postura, desplazamientos y los golpes fundamentales del arte de los ocho miembros: puños, codos, rodillas y piernas. Sin experiencia previa.</p>
        </article>
        <article class="programa programa-paso reveal" data-paso="02">
          <span class="nivel">Paso 2</span>
          <h3>Intermedio</h3>
          <p>Combinaciones, defensa, clinch y trabajo de pads. Empiezas a construir tu propio estilo con la técnica como base.</p>
        </article>
        <article class="programa programa-paso reveal" data-paso="03">
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
            <ul class="lista-marcada">
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

    ${banda({
      fantasma: "Ocho miembros",
      eyebrow: "Da el paso",
      titulo: "¿Listo para probar?",
      cuerpo: `<p class="reveal">Revisa los horarios y agenda tu primera clase.</p>`,
      boton: `
        <div class="heroe-acciones reveal" style="justify-content:center">
          <a class="boton boton-rojo" href="#/horarios">Ver horarios</a>
          <a class="boton boton-borde" href="#/contacto">Contacto</a>
        </div>`,
    })}

    ${franjaAccion()}
    `,
  },

  // ---------- HORARIOS ----------
  "/horarios": {
    titulo: "Horarios · Alto Impacto Chile",
    html: () => `
    <section class="seccion">
      <p class="eyebrow reveal">Horarios</p>
      <h2 class="reveal">Planifica tu semana</h2>

      <div class="tabla-envoltura reveal" style="margin-top:2.2rem">
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

    ${franjaAccion()}
    ${llamadoFinal()}
    `,
  },

  // ---------- GALERÍA ----------
  "/galeria": {
    titulo: "Galería · Alto Impacto Chile",
    html: () => `
    <section class="seccion">
      <div class="seccion-cabeza">
        <div class="reveal">
          <p class="eyebrow">Galería</p>
          <h2>La escuela en acción</h2>
        </div>
        <a class="boton boton-rojo reveal" href="${DATOS.instagram.url}" target="_blank" rel="noopener">Seguir en Instagram</a>
      </div>

      <div class="galeria-grid">
        ${DATOS.galeria.map(f => `
        <figure class="galeria-foto reveal">
          <img src="${f.archivo}" alt="${f.alt}" loading="lazy" />
        </figure>`).join("")}
        ${DATOS.instagram.posts.map(p => embedInstagram(p)).join("")}
        <div class="tarjeta-instagram reveal">
          <img src="assets/logo.svg" alt="Logo de Alto Impacto Chile" />
          <strong>@${DATOS.instagram.usuario}</strong>
          <p>Todas las fotos y videos de la escuela están en nuestro Instagram.</p>
          <a class="boton boton-rojo" href="${DATOS.instagram.url}" target="_blank" rel="noopener">Ver el perfil completo</a>
        </div>
      </div>
    </section>

    ${franjaAccion()}
    ${llamadoFinal()}
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

      <div class="contacto-grid" style="margin-top:2.8rem">
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

    ${banda({
      fantasma: "Empieza",
      eyebrow: "Sin experiencia previa",
      titulo: "Primera vez entrenando un arte marcial",
      cuerpo: `<p class="reveal">Perfecto: nuestra especialidad es acompañarte desde cero, a tu propio ritmo y con respeto.</p>`,
      boton: `<a class="boton boton-rojo reveal" href="${DATOS.instagram.dm}" target="_blank" rel="noopener">Quiero empezar</a>`,
    })}
    `;
    },
  },
};

// Embed oficial de Instagram: el script embed.js lo hidrata con la foto real.
// Sin clase `reveal` a propósito: embed.js reemplaza el blockquote por un
// iframe y se lleva el `style` inline, así que heredaría el opacity:0 de la
// animación mientras el tween apunta a un nodo que ya no está en el DOM.
function embedInstagram(permalink) {
  return `
  <blockquote class="instagram-media" data-instgrm-permalink="${permalink}" data-instgrm-version="14"
    style="background:#101014; border:1px solid #22222a; border-radius:0; max-width:540px; min-width:unset; width:100%;">
    <a href="${permalink}" target="_blank" rel="noopener" style="display:block; padding:2rem; color:#8f8f98; text-decoration:none; text-align:center;">
      Ver esta publicación en Instagram
    </a>
  </blockquote>`;
}

// Vista 404
const VISTA_404 = {
  titulo: "Página no encontrada · Alto Impacto Chile",
  html: () => `
  ${banda({
    fantasma: "404",
    eyebrow: "Error 404",
    titulo: "Te saliste del ring",
    cuerpo: `<p class="reveal">La página que buscas no existe. Volvamos al entrenamiento.</p>`,
    boton: `<a class="boton boton-rojo reveal" href="#/">Volver al inicio</a>`,
  })}`,
};
