// Vectoriza la foto de referencia del luchador y saca las rutas SVG
// que usa la figura de los ocho miembros (ver js/vistas.js).
//
// Sin dependencias: decodifica el PNG con el zlib de Node, separa
// figura de fondo por temperatura de color (el fondo es frío y la piel
// cálida; la luminancia no sirve porque guante y sombra caen al nivel
// del fondo), cierra huecos, traza el contorno con Moore y lo
// simplifica con Douglas-Peucker. Los umbrales están calibrados para
// ESTA foto; si se cambia, reajústalos mirando los valores que imprime.
//
// Uso: node herramientas/vectorizar.js <entrada.png> <salida.json>
//   salida.json → { ancho, alto, cuerpo:[d], short:[d] }
// El resultado se pegó a mano en las constantes SILUETA_* de vistas.js.

const fs = require("fs");
const zlib = require("zlib");

// ---------- Decodificador PNG mínimo (8 bits, sin entrelazar) -------
function leerPng(ruta) {
  const buf = fs.readFileSync(ruta);
  if (buf.readUInt32BE(0) !== 0x89504e47) throw new Error("no es un PNG");

  let pos = 8;
  let ancho = 0, alto = 0, tipoColor = 0, profundidad = 0;
  const trozos = [];
  let paleta = null;

  while (pos < buf.length) {
    const largo = buf.readUInt32BE(pos);
    const tipo = buf.toString("ascii", pos + 4, pos + 8);
    const datos = buf.subarray(pos + 8, pos + 8 + largo);
    if (tipo === "IHDR") {
      ancho = datos.readUInt32BE(0);
      alto = datos.readUInt32BE(4);
      profundidad = datos[8];
      tipoColor = datos[9];
      if (datos[12] !== 0) throw new Error("PNG entrelazado no soportado");
    } else if (tipo === "PLTE") {
      paleta = Buffer.from(datos);
    } else if (tipo === "IDAT") {
      trozos.push(datos);
    } else if (tipo === "IEND") break;
    pos += 12 + largo;
  }
  if (profundidad !== 8) throw new Error("solo 8 bits por canal");

  const canales = { 0: 1, 2: 3, 3: 1, 4: 2, 6: 4 }[tipoColor];
  const crudo = zlib.inflateSync(Buffer.concat(trozos));
  const bpp = canales;
  const anchoLinea = ancho * bpp;
  const salida = Buffer.alloc(alto * anchoLinea);

  const paeth = (a, b, c) => {
    const p = a + b - c;
    const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
    return pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
  };

  for (let y = 0; y < alto; y++) {
    const filtro = crudo[y * (anchoLinea + 1)];
    const linea = crudo.subarray(y * (anchoLinea + 1) + 1, (y + 1) * (anchoLinea + 1));
    for (let x = 0; x < anchoLinea; x++) {
      const izq = x >= bpp ? salida[y * anchoLinea + x - bpp] : 0;
      const arriba = y > 0 ? salida[(y - 1) * anchoLinea + x] : 0;
      const diag = x >= bpp && y > 0 ? salida[(y - 1) * anchoLinea + x - bpp] : 0;
      let v = linea[x];
      if (filtro === 1) v += izq;
      else if (filtro === 2) v += arriba;
      else if (filtro === 3) v += (izq + arriba) >> 1;
      else if (filtro === 4) v += paeth(izq, arriba, diag);
      salida[y * anchoLinea + x] = v & 0xff;
    }
  }

  // Normaliza a RGB
  const rgb = new Uint8Array(ancho * alto * 3);
  for (let i = 0; i < ancho * alto; i++) {
    if (tipoColor === 2 || tipoColor === 6) {
      rgb[i * 3] = salida[i * bpp];
      rgb[i * 3 + 1] = salida[i * bpp + 1];
      rgb[i * 3 + 2] = salida[i * bpp + 2];
    } else if (tipoColor === 0 || tipoColor === 4) {
      rgb[i * 3] = rgb[i * 3 + 1] = rgb[i * 3 + 2] = salida[i * bpp];
    } else if (tipoColor === 3) {
      const p = salida[i] * 3;
      rgb[i * 3] = paleta[p];
      rgb[i * 3 + 1] = paleta[p + 1];
      rgb[i * 3 + 2] = paleta[p + 2];
    }
  }
  return { ancho, alto, rgb };
}

// ---------- Máscaras -------------------------------------------------
const lum = (r, g, b) => 0.299 * r + 0.587 * g + 0.114 * b;

// La luminancia no separa nada en esta foto: el guante (lum 22) y el
// lado en sombra del torso (lum 43) están al mismo nivel que el fondo.
// Lo que sí separa es la temperatura: el fondo es frío (azulado, b>=r)
// y la piel es cálida incluso en sombra (r-b = 33 en el torso oscuro).
// Los guantes son neutros y quedan fuera a propósito: se dibujan
// aparte, para poder darles el color secundario de la paleta.
function mascaraFigura(img) {
  const { ancho, alto, rgb } = img;
  const m = new Uint8Array(ancho * alto);
  for (let i = 0; i < m.length; i++) {
    const r = rgb[i * 3], g = rgb[i * 3 + 1], b = rgb[i * 3 + 2];
    const calida = r - b > 9 && r > 20;
    const roja = r > 70 && r > g * 1.8 && r > b * 1.6;
    if (calida || roja) m[i] = 1;
  }
  return m;
}

// Vista rápida de una máscara en la terminal, para comprobar de un
// vistazo qué quedó dentro antes de trazar nada.
function previsualizar(m, ancho, alto, columnas = 74) {
  const paso = Math.ceil(ancho / columnas);
  let salida = "";
  for (let y = 0; y < alto; y += paso * 2) {
    let fila = "";
    for (let x = 0; x < ancho; x += paso) {
      let dentro = 0, total = 0;
      for (let dy = 0; dy < paso * 2 && y + dy < alto; dy++) {
        for (let dx = 0; dx < paso && x + dx < ancho; dx++) {
          total++;
          if (m[(y + dy) * ancho + x + dx]) dentro++;
        }
      }
      const razon = dentro / (total || 1);
      fila += razon > 0.66 ? "#" : razon > 0.33 ? "+" : razon > 0.08 ? "." : " ";
    }
    salida += fila + "\n";
  }
  return salida;
}

// El short: rojo saturado de verdad. No vale con "r manda", porque la
// piel en sombra (85,37,28) también cumple eso y el short se desbordaba
// por el torso y la pierna. El rojo real de la prenda es (187,8,11):
// lo que lo distingue es que verde y azul están casi a cero.
function mascaraRoja(img, dentro) {
  const { ancho, alto, rgb } = img;
  const m = new Uint8Array(ancho * alto);
  for (let i = 0; i < m.length; i++) {
    if (!dentro[i]) continue;
    const r = rgb[i * 3], g = rgb[i * 3 + 1], b = rgb[i * 3 + 2];
    if (r > 55 && g < r * 0.42 && b < r * 0.46) m[i] = 1;
  }
  return m;
}

// ---------- Morfología ------------------------------------------------
function dilatar(m, ancho, alto, radio) {
  let act = m;
  for (let paso = 0; paso < radio; paso++) {
    const sig = new Uint8Array(act.length);
    for (let y = 0; y < alto; y++) {
      for (let x = 0; x < ancho; x++) {
        const i = y * ancho + x;
        if (act[i]) { sig[i] = 1; continue; }
        if ((x > 0 && act[i - 1]) || (x < ancho - 1 && act[i + 1]) ||
            (y > 0 && act[i - ancho]) || (y < alto - 1 && act[i + ancho])) sig[i] = 1;
      }
    }
    act = sig;
  }
  return act;
}
function erosionar(m, ancho, alto, radio) {
  let act = m;
  for (let paso = 0; paso < radio; paso++) {
    const sig = new Uint8Array(act.length);
    for (let y = 0; y < alto; y++) {
      for (let x = 0; x < ancho; x++) {
        const i = y * ancho + x;
        if (!act[i]) continue;
        const borde = x === 0 || y === 0 || x === ancho - 1 || y === alto - 1;
        if (borde) { sig[i] = act[i]; continue; }
        sig[i] = act[i - 1] && act[i + 1] && act[i - ancho] && act[i + ancho] ? 1 : 0;
      }
    }
    act = sig;
  }
  return act;
}
const cerrar = (m, w, h, r) => erosionar(dilatar(m, w, h, r), w, h, r);
const abrir = (m, w, h, r) => dilatar(erosionar(m, w, h, r), w, h, r);

// Rellena huecos interiores (lo que no se alcanza desde el borde).
function rellenarHuecos(m, ancho, alto) {
  const fuera = new Uint8Array(m.length);
  const pila = [];
  const meter = (x, y) => {
    const i = y * ancho + x;
    if (fuera[i] || m[i]) return;
    fuera[i] = 1;
    pila.push(i);
  };
  for (let x = 0; x < ancho; x++) { meter(x, 0); meter(x, alto - 1); }
  for (let y = 0; y < alto; y++) { meter(0, y); meter(ancho - 1, y); }
  while (pila.length) {
    const i = pila.pop();
    const x = i % ancho, y = (i / ancho) | 0;
    if (x > 0) meter(x - 1, y);
    if (x < ancho - 1) meter(x + 1, y);
    if (y > 0) meter(x, y - 1);
    if (y < alto - 1) meter(x, y + 1);
  }
  const r = new Uint8Array(m.length);
  for (let i = 0; i < m.length; i++) r[i] = m[i] || !fuera[i] ? 1 : 0;
  return r;
}

// ---------- Componentes conexas ---------------------------------------
function componentes(m, ancho, alto, minimo) {
  const visto = new Uint8Array(m.length);
  const grupos = [];
  for (let s = 0; s < m.length; s++) {
    if (!m[s] || visto[s]) continue;
    const pila = [s];
    const px = [];
    visto[s] = 1;
    while (pila.length) {
      const i = pila.pop();
      px.push(i);
      const x = i % ancho, y = (i / ancho) | 0;
      const vec = [];
      if (x > 0) vec.push(i - 1);
      if (x < ancho - 1) vec.push(i + 1);
      if (y > 0) vec.push(i - ancho);
      if (y < alto - 1) vec.push(i + ancho);
      for (const j of vec) if (m[j] && !visto[j]) { visto[j] = 1; pila.push(j); }
    }
    if (px.length >= minimo) grupos.push(px);
  }
  grupos.sort((a, b) => b.length - a.length);
  return grupos;
}

function soloGrupo(px, largo) {
  const m = new Uint8Array(largo);
  for (const i of px) m[i] = 1;
  return m;
}

// ---------- Trazado de contorno (Moore) --------------------------------
function contorno(m, ancho, alto) {
  let inicio = -1;
  for (let i = 0; i < m.length; i++) if (m[i]) { inicio = i; break; }
  if (inicio < 0) return [];

  const dentro = (x, y) => x >= 0 && y >= 0 && x < ancho && y < alto && m[y * ancho + x];
  const dirs = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]];

  const x0 = inicio % ancho, y0 = (inicio / ancho) | 0;
  const puntos = [[x0, y0]];
  let cx = x0, cy = y0, dir = 6;
  for (let paso = 0; paso < ancho * alto * 8; paso++) {
    let hallado = false;
    for (let k = 0; k < 8; k++) {
      const d = (dir + 6 + k) % 8;
      const nx = cx + dirs[d][0], ny = cy + dirs[d][1];
      if (dentro(nx, ny)) {
        cx = nx; cy = ny; dir = d; hallado = true;
        puntos.push([cx, cy]);
        break;
      }
    }
    if (!hallado) break;
    if (cx === x0 && cy === y0) break;
  }
  return puntos;
}

// ---------- Simplificación y suavizado ---------------------------------
function douglasPeucker(pts, eps) {
  if (pts.length < 3) return pts;
  let maxD = 0, idx = 0;
  const [ax, ay] = pts[0], [bx, by] = pts[pts.length - 1];
  const dx = bx - ax, dy = by - ay;
  const norma = Math.hypot(dx, dy) || 1;
  for (let i = 1; i < pts.length - 1; i++) {
    const d = Math.abs((pts[i][0] - ax) * dy - (pts[i][1] - ay) * dx) / norma;
    if (d > maxD) { maxD = d; idx = i; }
  }
  if (maxD <= eps) return [pts[0], pts[pts.length - 1]];
  return [
    ...douglasPeucker(pts.slice(0, idx + 1), eps).slice(0, -1),
    ...douglasPeucker(pts.slice(idx), eps),
  ];
}

// Douglas-Peucker sobre un contorno cerrado no funciona directo: el
// primer y el último punto coinciden, la línea base mide cero y todas
// las distancias salen nulas, así que devuelve dos puntos. Hay que
// cortarlo en el punto más lejano al inicio y simplificar cada mitad.
function simplificarCerrado(pts, eps) {
  if (pts.length < 8) return pts;
  const [ax, ay] = pts[0];
  let lejano = 0, maxD = -1;
  for (let i = 1; i < pts.length; i++) {
    const d = (pts[i][0] - ax) ** 2 + (pts[i][1] - ay) ** 2;
    if (d > maxD) { maxD = d; lejano = i; }
  }
  const mitadA = douglasPeucker(pts.slice(0, lejano + 1), eps);
  const mitadB = douglasPeucker(pts.slice(lejano), eps);
  return mitadA.slice(0, -1).concat(mitadB.slice(0, -1));
}

const r1 = (n) => Math.round(n * 10) / 10;

// Cada vértice hace de control y la curva pasa por los puntos medios.
function rutaSuave(pts) {
  if (pts.length < 3) return "";
  const m0 = [(pts[0][0] + pts[1][0]) / 2, (pts[0][1] + pts[1][1]) / 2];
  let d = `M${r1(m0[0])} ${r1(m0[1])}`;
  for (let i = 1; i < pts.length; i++) {
    const s = pts[(i + 1) % pts.length];
    const m = [(pts[i][0] + s[0]) / 2, (pts[i][1] + s[1]) / 2];
    d += ` Q${r1(pts[i][0])} ${r1(pts[i][1])} ${r1(m[0])} ${r1(m[1])}`;
  }
  return d + " Z";
}

function trazar(mascara, ancho, alto, eps, minimoPx, maxPiezas, etiqueta = "") {
  const grupos = componentes(mascara, ancho, alto, minimoPx);
  console.error(`[${etiqueta}] componentes: ${grupos.length}, mayor: ${grupos[0] ? grupos[0].length : 0} px`);
  return grupos
    .slice(0, maxPiezas)
    .map((px) => {
      const c = contorno(soloGrupo(px, mascara.length), ancho, alto);
      const simple = simplificarCerrado(c, eps);
      console.error(`[${etiqueta}] contorno: ${c.length} puntos -> ${simple.length} tras simplificar`);
      if (simple.length < 4) return null;
      return rutaSuave(simple);
    })
    .filter(Boolean);
}

// ---------- Programa ---------------------------------------------------
const [, , entrada, salida] = process.argv;
const img = leerPng(entrada);
const { ancho, alto } = img;

// Cierre generoso: los guantes son neutros y quedan fuera de la
// máscara cálida, abriendo una muesca dentada entre la cabeza y los
// brazos. Puentearla da una silueta limpia, y esa zona va tapada de
// todos modos por los guantes que se dibujan encima.
let figura = mascaraFigura(img);
figura = cerrar(figura, ancho, alto, 6);
figura = rellenarHuecos(figura, ancho, alto);
figura = abrir(figura, ancho, alto, 2);
const mayor = componentes(figura, ancho, alto, 800)[0] || [];
figura = rellenarHuecos(soloGrupo(mayor, figura.length), ancho, alto);
figura = cerrar(figura, ancho, alto, 3);

let short = mascaraRoja(img, figura);
short = cerrar(short, ancho, alto, 7);
short = abrir(short, ancho, alto, 3);
short = rellenarHuecos(short, ancho, alto);
short = cerrar(short, ancho, alto, 4);

// Vuelca la máscara como tramos horizontales, para poder comparar en
// pantalla lo que se detectó contra lo que salió trazado.
function tramos(m, ancho, alto) {
  const salida = [];
  for (let y = 0; y < alto; y++) {
    let inicio = -1;
    for (let x = 0; x <= ancho; x++) {
      const dentro = x < ancho && m[y * ancho + x];
      if (dentro && inicio < 0) inicio = x;
      if (!dentro && inicio >= 0) { salida.push([inicio, y, x - inicio]); inicio = -1; }
    }
  }
  return salida;
}

const resultado = {
  ancho,
  alto,
  cuerpo: trazar(figura, ancho, alto, 1.8, 800, 1, 'cuerpo'),
  short: trazar(short, ancho, alto, 2.6, 300, 1, 'short'),
  mascaraCuerpo: tramos(figura, ancho, alto),
  mascaraShort: tramos(short, ancho, alto),
};

fs.writeFileSync(salida, JSON.stringify(resultado, null, 2));
console.log(previsualizar(figura, ancho, alto));
console.log(
  `figura: ${mayor.length} px (${((mayor.length / (ancho * alto)) * 100).toFixed(1)}% del cuadro)\n` +
  `cuerpo: ${resultado.cuerpo.length} contorno(s)\n` +
  `short: ${resultado.short.length} contorno(s)`
);
