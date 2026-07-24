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
// está en ESQUELETO y de ahí salen tanto los contornos de las
// extremidades como las marcas, así que cada punto cae exactamente
// sobre su articulación. Mover una junta mueve las dos cosas.
//
// Las extremidades no son trazos de grosor fijo: se generan como
// contornos que se estrechan en las articulaciones y engordan en el
// vientre del músculo. Un tubo uniforme siempre se lee a maniquí.

const ESQUELETO = {
  craneo: { x: 152, y: 68 },
  menton: { x: 150, y: 102 },
  cuello: { x: 158, y: 120 },

  // Eje del torso: hombros, pecho, cintura y pelvis
  esternon: { x: 162, y: 150 },
  cintura: { x: 168, y: 206 },
  pelvis: { x: 174, y: 236 },

  // Brazos en guardia. Escalonados: una mano a la altura del mentón y
  // la otra más arriba. A la misma altura los dos guantes enmarcan la
  // cara y el conjunto se lee como un par de ojos.
  hombroIzq: { x: 124, y: 142 },
  codoIzq: { x: 96, y: 182 },
  munecaIzq: { x: 114, y: 108 },
  hombroDer: { x: 200, y: 134 },
  codoDer: { x: 240, y: 160 },
  munecaDer: { x: 202, y: 92 },

  // Piernas: la de apoyo plantada, la otra sube a golpear
  caderaIzq: { x: 154, y: 240 },
  rodillaApoyo: { x: 148, y: 354 },
  tobilloApoyo: { x: 144, y: 452 },
  caderaDer: { x: 194, y: 230 },
  rodillaGolpe: { x: 304, y: 202 },
  tobilloGolpe: { x: 354, y: 310 },
};

// --- Utilidades de geometría --------------------------------
const f = (n) => Math.round(n * 10) / 10;

function medio(a, b, t = 0.5) {
  return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
}

// Punto a cierta distancia de `a` en dirección a `b`, para sacar el
// centro del guante más allá de la muñeca.
function alargar(a, b, distancia) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const largo = Math.hypot(dx, dy) || 1;
  return { x: b.x + (dx / largo) * distancia, y: b.y + (dy / largo) * distancia };
}

// Polilínea suavizada: cada vértice se convierte en el control de una
// curva que pasa por los puntos medios. Da contornos orgánicos sin
// tener que escribir curvas a mano.
function curva(puntos, inicial = "M") {
  let d = `${inicial}${f(puntos[0].x)} ${f(puntos[0].y)}`;
  for (let i = 1; i < puntos.length - 1; i++) {
    const m = medio(puntos[i], puntos[i + 1]);
    d += ` Q${f(puntos[i].x)} ${f(puntos[i].y)} ${f(m.x)} ${f(m.y)}`;
  }
  const ultimo = puntos[puntos.length - 1];
  return `${d} L${f(ultimo.x)} ${f(ultimo.y)}`;
}

// Contorno de un miembro: recorre las juntas por un costado con los
// grosores dados, rodea la punta con un semicírculo, vuelve por el
// otro costado y cierra con el semicírculo del arranque.
function miembro(juntas, grosores) {
  const n = juntas.length;

  const normal = (i) => {
    const antes = juntas[Math.max(0, i - 1)];
    const despues = juntas[Math.min(n - 1, i + 1)];
    const dx = despues.x - antes.x;
    const dy = despues.y - antes.y;
    const largo = Math.hypot(dx, dy) || 1;
    return { x: -dy / largo, y: dx / largo };
  };

  const costado = (signo) =>
    juntas.map((p, i) => {
      const nor = normal(i);
      return {
        x: p.x + nor.x * (grosores[i] / 2) * signo,
        y: p.y + nor.y * (grosores[i] / 2) * signo,
      };
    });

  const ida = costado(1);
  const vuelta = costado(-1).reverse();
  const rPunta = grosores[n - 1] / 2;
  const rInicio = grosores[0] / 2;

  // El tramo de vuelta arranca con su propio `L` —una línea de largo
  // cero sobre el final del arco—. Sin esa letra, las coordenadas
  // quedarían pegadas a la `A` anterior y SVG las leería como los
  // parámetros de otro arco, corrompiendo el resto del contorno.
  // Barrido 0: los semicírculos de las puntas tienen que cerrar la
  // extremidad hacia afuera. Con barrido 1 muerden hacia adentro y
  // dejan una mordida cóncava en el hombro y en la cadera.
  return [
    curva(ida, "M"),
    `A${f(rPunta)} ${f(rPunta)} 0 0 0 ${f(vuelta[0].x)} ${f(vuelta[0].y)}`,
    curva(vuelta, "L"),
    `A${f(rInicio)} ${f(rInicio)} 0 0 0 ${f(ida[0].x)} ${f(ida[0].y)}`,
    "Z",
  ].join(" ");
}

const GUANTE_IZQ = alargar(ESQUELETO.codoIzq, ESQUELETO.munecaIzq, 15);
const GUANTE_DER = alargar(ESQUELETO.codoDer, ESQUELETO.munecaDer, 15);

// Guante de Muay Thai: mitón, pulgar y puño de muñeca vendado. Se
// dibuja en coordenadas locales apuntando hacia arriba y se gira para
// que siga la línea del antebrazo, así los dos guantes quedan bien
// orientados sin escribir dos trazados distintos.
function guante(centro, desde) {
  const grados = (Math.atan2(centro.y - desde.y, centro.x - desde.x) * 180) / Math.PI + 90;
  return `
  <g transform="translate(${f(centro.x)} ${f(centro.y)}) rotate(${f(grados)})">
    <path class="fig-guante" d="M-15 1 Q-17 -17 -2 -20 Q14 -19 15 -1 Q16 12 3 15 Q-12 16 -15 1 Z"/>
    <path class="fig-guante" d="M-14 -3 q-9 2 -8 10 q2 8 9 6 z"/>
    <path class="fig-venda" d="M-12 13 q12 5 24 0 l2 9 q-14 6 -28 0 z"/>
  </g>`;
}

const OCHO_PUNTOS = [
  { arma: "Puños", ...GUANTE_IZQ },
  { arma: "Puños", ...GUANTE_DER },
  { arma: "Codos", ...ESQUELETO.codoIzq },
  { arma: "Codos", ...ESQUELETO.codoDer },
  { arma: "Rodillas", ...ESQUELETO.rodillaGolpe },
  { arma: "Rodillas", ...ESQUELETO.rodillaApoyo },
  { arma: "Piernas", ...medio(ESQUELETO.rodillaGolpe, ESQUELETO.tobilloGolpe, 0.55) },
  { arma: "Piernas", ...medio(ESQUELETO.rodillaApoyo, ESQUELETO.tobilloApoyo, 0.55) },
];

function figuraOchoPuntos() {
  const e = ESQUELETO;

  // El vientre del gemelo va un poco por fuera del eje del hueso.
  const gemeloApoyo = { x: e.rodillaApoyo.x - 5, y: medio(e.rodillaApoyo, e.tobilloApoyo, 0.35).y };
  const gemeloGolpe = medio(e.rodillaGolpe, e.tobilloGolpe, 0.35);

  const piernaApoyo = miembro(
    [e.caderaIzq, medio(e.caderaIzq, e.rodillaApoyo, 0.45), e.rodillaApoyo, gemeloApoyo, e.tobilloApoyo],
    [46, 44, 30, 33, 15]
  );
  const piernaGolpe = miembro(
    [e.caderaDer, medio(e.caderaDer, e.rodillaGolpe, 0.45), e.rodillaGolpe, gemeloGolpe, e.tobilloGolpe],
    [48, 46, 31, 34, 15]
  );
  const brazoIzq = miembro(
    [e.hombroIzq, medio(e.hombroIzq, e.codoIzq, 0.45), e.codoIzq, medio(e.codoIzq, e.munecaIzq, 0.4), e.munecaIzq],
    [30, 27, 20, 21, 14]
  );
  const brazoDer = miembro(
    [e.hombroDer, medio(e.hombroDer, e.codoDer, 0.45), e.codoDer, medio(e.codoDer, e.munecaDer, 0.4), e.munecaDer],
    [30, 27, 20, 21, 14]
  );
  // El torso va a mano y no con `miembro`: el tapón semicircular de la
  // punta le pone una cúpula encima de los hombros y se come el
  // cuello, que es justo lo que delata al maniquí. Aquí el escote
  // entre los trapecios se dibuja explícito.
  const torso = `
    M146 116
    Q118 126 114 154
    Q126 174 130 190
    Q136 214 138 232
    Q139 253 149 265
    L201 260
    Q212 246 209 228
    Q207 200 201 186
    Q199 155 195 136
    Q186 119 173 115
    Z`.replace(/\s+/g, " ").trim();

  return `
  <figure class="ocho-figura">
    <svg class="ocho-figura-svg" viewBox="66 26 328 462" role="img"
      aria-label="Luchador de Muay Thai lanzando una rodilla, con los ocho puntos de contacto señalados sobre el cuerpo">

      <!-- Pies: el de apoyo asentado, el que golpea en punta -->
      <path class="fig-piel" d="M134 442 q-18 8 -22 20 q-3 10 8 11 l50 0 q11 -1 9 -11 q-3 -12 -22 -19 z"/>
      <path class="fig-piel" d="M340 300 q26 12 44 36 q7 10 -3 16 q-11 5 -18 -5 q-13 -19 -33 -29 z"/>

      <!-- Cuello, detrás de todo: asoma en el escote del torso -->
      <path class="fig-piel" d="M145 88 L173 86 L176 126 L147 128 Z"/>

      <!-- Piernas y brazos, detrás del torso -->
      <path class="fig-piel" d="${piernaApoyo}"/>
      <path class="fig-piel" d="${piernaGolpe}"/>
      <path class="fig-piel" d="${brazoIzq}"/>
      <path class="fig-piel" d="${brazoDer}"/>

      <!-- Torso -->
      <path class="fig-piel" d="${torso}"/>

      <!-- Cabeza: cráneo, sien y mandíbula hasta el mentón -->
      <path class="fig-piel" d="M132 62 Q131 35 154 34 Q177 35 178 62 Q179 78 172 89 Q163 101 151 97 Q137 88 132 62 Z"/>

      <!-- Cortes de sombra: lo que separa un cuerpo de una silueta -->
      <g class="fig-sombra">
        <path d="M138 62 Q142 84 154 94"/>
        <path d="M132 154 Q158 172 187 160"/>
        <path d="M162 176 L166 212"/>
        <path d="M122 146 Q134 161 133 178"/>
        <path d="M198 142 Q190 157 192 174"/>
        <path d="M137 348 Q149 357 160 349"/>
        <path d="M292 198 Q304 210 317 199"/>
        <path d="M133 382 Q139 402 137 420"/>
      </g>

      <!-- Short: la prenda que trae el rojo del logo -->
      <path class="fig-short" d="M140 216 Q168 208 202 212 Q244 218 258 232 L250 258 Q214 240 198 244 L192 276 Q166 284 142 276 Q134 244 140 216 Z"/>

      <!-- Guantes -->
      ${guante(GUANTE_IZQ, ESQUELETO.codoIzq)}
      ${guante(GUANTE_DER, ESQUELETO.codoDer)}

      <!-- Las ocho marcas, colocadas desde el mismo esqueleto -->
      <g class="ocho-marcas">
        ${OCHO_PUNTOS.map(p => `
        <g class="ocho-marca" data-arma="${p.arma}">
          <circle class="ocho-marca-halo" cx="${f(p.x)}" cy="${f(p.y)}" r="7"/>
          <circle class="ocho-marca-punto" cx="${f(p.x)}" cy="${f(p.y)}" r="7"/>
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
