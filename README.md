<div align="center">
  <img src="assets/logo.svg" alt="Alto Impacto Chile · Muay Thai" width="220" />

  # Alto Impacto Chile · Muay Thai

  **Sitio web oficial de la escuela de Muay Thai Alto Impacto Chile (Santiago de Chile).**

  [🌐 Ver el sitio en vivo](https://b3njjaman.github.io/alto-impacto-chile/) ·
  [Instagram @alto_impacto_chile](https://www.instagram.com/alto_impacto_chile)
</div>

---

## ✨ Qué es esto

Una página web **enrutada (SPA)** hecha con HTML, CSS y JavaScript puros — sin frameworks
ni paso de build. Se abre con doble clic y se publica gratis en GitHub Pages.

La identidad visual sale del propio logo de la escuela: paleta negra con los colores de la
bandera tailandesa (`#A51931` rojo · `#2D2A4A` azul marino) y dorado reservado para los
valores. La tipografía es el trío tailandés de la fundición Cadson Demak: **Chakra Petch**
en los titulares (sus esquinas biseladas dan filo sin caer en una tipografía agresiva),
**Kanit** en etiquetas y botones —más ancha y redonda, hace contraste— y **Prompt** en el
texto de lectura.

La estructura de página sigue la línea de [AKA Thailand](https://www.akathailand.com/):
negro casi puro con el rojo como único acento, barra superior de utilidad, trío de
tarjetas de acceso al pie del héroe, ticker, franja de acción a ancho completo y pie a
tres columnas. Donde AKA corta el scroll con fotos a sangre, aquí la imagen es la propia
tipografía: **bandas de impacto** con una palabra gigante en contorno que se desplaza según
la posición del scroll. La portada va deliberadamente apagada: el único color saturado de
esa primera pantalla es el botón de acción.

## 🎥 El bloque destacado

Encima de la sección de entrenamiento hay un bloque a ancho completo que se arma solo según
lo que pongas en `video` dentro de **`js/datos.js`**:

| Configuración | Qué muestra |
|---|---|
| `archivo: "assets/video/entrenamiento.mp4"` | El video en bucle, sin sonido, como fondo en movimiento |
| `youtube: "ID_DEL_VIDEO"` | La portada del video; el reproductor se carga recién al pulsar play, así la página no arrastra el peso de YouTube desde el inicio |
| Ambos vacíos (por defecto) | El panel **arte de los ocho miembros**: las cuatro armas con sus cifras animadas |

Así la sección nunca se ve vacía, tengas o no material grabado.

## 🎬 Librerías dinámicas

Se cargan por CDN desde `index.html` y las orquesta **`js/animaciones.js`**:

| Librería | Para qué |
|---|---|
| [Lenis](https://github.com/darkroomengineering/lenis) | Scroll suave con inercia |
| [GSAP](https://gsap.com/) + ScrollTrigger | Secuencia de entrada del héroe, apariciones por scroll, parallax del logo, bandas de impacto, ticker que acelera con la velocidad del scroll y cifras que cuentan hacia arriba |
| [Swiper](https://swiperjs.com/) | Carrusel de los 7 valores |

Todo es **opcional por diseño**: ningún elemento nace invisible desde el CSS. El estado
inicial lo aplica GSAP solo cuando de verdad va a animarlo, así que si una librería no carga
—o si el sistema pide *movimiento reducido*— el sitio se muestra completo y quieto.

## 🗺️ Rutas del sitio

| Ruta | Contenido |
|---|---|
| `#/` | Inicio: héroe-afiche con accesos, ticker de valores, programas, banda de impacto e Instagram |
| `#/nosotros` | Visión, misión y los 7 valores en carrusel |
| `#/clases` | Niveles de entrenamiento, qué llevar a la primera clase y reglas de la casa |
| `#/horarios` | Tabla de horarios semanal (editable en `js/datos.js`) |
| `#/galeria` | Publicaciones reales de Instagram (embeds oficiales) + fotos locales |
| `#/contacto` | Instagram DM, WhatsApp opcional y ubicación |

El enrutamiento es por *hash* (`js/router.js`), por lo que funciona igual en local,
en GitHub Pages o en cualquier hosting estático, sin configurar nada.

## 🚀 Cómo ver el sitio

**Opción 1 — doble clic:** abre `index.html` en el navegador. Listo.

**Opción 2 — servidor local** (recomendado para que carguen los embeds de Instagram):

```bash
npx serve .
# o con Python:
python -m http.server 8000
```

## ✏️ Cómo editar los datos (sin tocar código)

Todo lo editable vive en **`js/datos.js`**:

- **WhatsApp**: escribe el número en `whatsapp: "56912345678"` (código de país + número,
  solo dígitos). El botón flotante y la tarjeta de contacto se activan solos.
  Si lo dejas vacío, el sitio usa el DM de Instagram.
- **Horarios**: edita el arreglo `horario` (días, hora, clase, nivel).
- **Galería local**: guarda fotos en `assets/galeria/` y regístralas en el arreglo
  `galeria`. Aparecen automáticamente en la página Galería.
- **Posts de Instagram**: agrega permalinks en `instagram.posts` para sumar más embeds.
- **Video destacado**: rellena `video.archivo` o `video.youtube` (ver la tabla de arriba).

## 🖼️ El logo vectorizado

`assets/logo.svg` no es la foto original: es una **vectorización real** del logo
(`Logo_Pagina.jpeg`) hecha con [potrace](https://www.npmjs.com/package/potrace),
trazada en 3 capas de color (arte blanco + franjas roja y azul de la bandera tailandesa).
Escala a cualquier tamaño sin perder nitidez y pesa lo mismo que un ícono.
También existe `assets/logo-transparente.svg` (sin fondo) para usar sobre secciones oscuras.

## 📁 Estructura

```
├── index.html            # Shell: barra superior, cabecera, pie y botón flotante
├── css/estilos.css       # Hoja de estilos completa (tokens de diseño arriba)
├── js/
│   ├── datos.js          # ← DATOS EDITABLES (contacto, horarios, galería)
│   ├── vistas.js         # Plantillas HTML de cada ruta y piezas reutilizables
│   ├── animaciones.js    # Lenis + GSAP + Swiper (montar/desmontar por vista)
│   ├── router.js         # Router SPA por hash
│   └── app.js            # Menú móvil, embeds de Instagram y datos en la interfaz
└── assets/
    ├── logo.svg              # Logo vectorizado (fondo negro)
    ├── logo-transparente.svg # Logo vectorizado (sin fondo)
    ├── galeria/              # ← deja aquí las fotos de la galería
    └── ...
```

## 🥊 Sobre la escuela

> Inspirar a cada persona a descubrir su mejor versión a través del Muay Thai,
> acompañando su progreso con respeto, disciplina y constancia.

**Valores:** Respeto · Disciplina · Responsabilidad · Autocontrol ·
Superación personal · Compañerismo · Persistencia

---

Hecho con 🥊 para Alto Impacto Chile.

🤖 Generado con [Claude Code](https://claude.com/claude-code)
