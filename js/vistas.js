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
// Luchador dibujado en vector plano, en el lenguaje del logo: cuerpo
// en hueso, short rojo de la bandera, guantes oscuros. El esqueleto
// está en ESQUELETO y de ahí salen tanto los trazos de las
// extremidades como las marcas, así que cada punto cae exactamente
// sobre su articulación. Mover una junta mueve las dos cosas.

const ESQUELETO = {
  cabeza: { x: 158, y: 62, rx: 25, ry: 27 },
  cuello: { x: 162, y: 88 },
  hombroIzq: { x: 136, y: 118 },
  hombroDer: { x: 196, y: 112 },
  // Guardia escalonada, como en la foto: una mano a la altura del
  // mentón y la otra más arriba. A la misma altura los dos guantes
  // enmarcan la cara y el conjunto se lee como un par de ojos.
  codoIzq: { x: 98, y: 164 },
  codoDer: { x: 228, y: 142 },
  punoIzq: { x: 112, y: 114 },
  punoDer: { x: 206, y: 88 },
  caderaIzq: { x: 156, y: 202 },
  caderaDer: { x: 194, y: 198 },
  rodillaApoyo: { x: 150, y: 310 },
  tobilloApoyo: { x: 146, y: 408 },
  rodillaGolpe: { x: 300, y: 188 },
  tobilloGolpe: { x: 352, y: 292 },
};

// Punto medio entre dos juntas, para poner la marca de la espinilla
// en mitad del hueso y no sobre una articulación.
function medio(a, b, t = 0.5) {
  return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
}

const OCHO_PUNTOS = [
  { arma: "Puños", ...ESQUELETO.punoIzq },
  { arma: "Puños", ...ESQUELETO.punoDer },
  { arma: "Codos", ...ESQUELETO.codoIzq },
  { arma: "Codos", ...ESQUELETO.codoDer },
  { arma: "Rodillas", ...ESQUELETO.rodillaGolpe },
  { arma: "Rodillas", ...ESQUELETO.rodillaApoyo },
  { arma: "Piernas", ...medio(ESQUELETO.rodillaGolpe, ESQUELETO.tobilloGolpe, 0.55) },
  { arma: "Piernas", ...medio(ESQUELETO.rodillaApoyo, ESQUELETO.tobilloApoyo, 0.55) },
];

function figuraOchoPuntos() {
  const e = ESQUELETO;
  const linea = (...juntas) => juntas.map((j, i) => `${i ? "L" : "M"}${j.x} ${j.y}`).join(" ");

  return `
  <figure class="ocho-figura">
    <svg class="ocho-figura-svg" viewBox="85 18 305 428" role="img"
      aria-label="Luchador de Muay Thai lanzando una rodilla, con los ocho puntos de contacto señalados sobre el cuerpo">

      <g class="fig-miembros">
        <!-- Piernas: muslo grueso, pantorrilla más fina -->
        <path class="fig-hueso fig-muslo" d="${linea(e.caderaIzq, e.rodillaApoyo)}"/>
        <path class="fig-hueso fig-pantorrilla" d="${linea(e.rodillaApoyo, e.tobilloApoyo)}"/>
        <path class="fig-hueso fig-muslo" d="${linea(e.caderaDer, e.rodillaGolpe)}"/>
        <path class="fig-hueso fig-pantorrilla" d="${linea(e.rodillaGolpe, e.tobilloGolpe)}"/>
        <!-- Brazos en guardia: codo abajo y afuera, puño junto a la cara -->
        <path class="fig-hueso fig-brazo" d="${linea(e.hombroIzq, e.codoIzq, e.punoIzq)}"/>
        <path class="fig-hueso fig-brazo" d="${linea(e.hombroDer, e.codoDer, e.punoDer)}"/>
        <path class="fig-hueso fig-cuello" d="${linea(e.cabeza, e.cuello)}"/>
      </g>

      <!-- Pie de apoyo plano; el de la pierna que golpea, en punta -->
      <path class="fig-pie" d="M132 400 q-14 10 -14 20 q0 8 10 8 l42 0 q9 0 8 -8 q-2 -10 -18 -16 z"/>
      <path class="fig-pie" d="M338 282 q24 12 40 34 q6 9 -3 14 q-10 5 -16 -4 q-12 -18 -30 -27 z"/>

      <!-- Torso, con el pecho más ancho que la cintura -->
      <path class="fig-torso" d="M133 122 Q140 104 166 102 Q194 100 200 118 L204 200 L150 206 Z"/>
      <ellipse class="fig-cabeza" cx="${e.cabeza.x}" cy="${e.cabeza.y}" rx="${e.cabeza.rx}" ry="${e.cabeza.ry}"/>

      <!-- Short: la prenda que trae el rojo del logo. Ceñido a la
           cadera y abierto sobre el muslo que sube. -->
      <path class="fig-short" d="M141 186 L203 180 Q239 184 250 196 L243 219 Q211 206 197 209 L189 236 L143 240 Q134 212 141 186 Z"/>

      <!-- Guantes -->
      <circle class="fig-guante" cx="${e.punoIzq.x}" cy="${e.punoIzq.y}" r="16"/>
      <circle class="fig-guante" cx="${e.punoDer.x}" cy="${e.punoDer.y}" r="16"/>

      <!-- Las ocho marcas, colocadas desde el mismo esqueleto -->
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
