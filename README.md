<div align="center">
  <img src="assets/logo.svg" alt="Alto Impacto Chile · Muay Thai" width="220" />

  # Alto Impacto Chile · Muay Thai

  **Sitio web oficial de la escuela de Muay Thai Alto Impacto Chile (Santiago de Chile).**

  [🌐 Ver el sitio en vivo](https://b3njjaman.github.io/alto-impacto-chile/) ·
  [Instagram @alto_impacto_chile](https://www.instagram.com/alto_impacto_chile)
</div>

---

## ✨ Qué es esto

Una página web **enrutada (SPA)** hecha con HTML, CSS y JavaScript puros — sin build ni
dependencias de npm. Las animaciones corren con **GSAP + ScrollTrigger** (vía CDN): entrada
cinematográfica del héroe, parallax del video de fondo, reveals al hacer scroll y bandas de
fotos con deriva. Si GSAP no carga (o el usuario prefiere menos movimiento), el sitio cae a
un fallback con CSS puro. Se abre con doble clic y se publica gratis en GitHub Pages.

La identidad visual sale del propio logo de la escuela: paleta negra con los colores de la
bandera tailandesa (`#A51931` rojo · `#2D2A4A` azul marino) y dorado para los valores,
y estética de afiche de pelea tailandés. La tipografía es el trío tailandés de la fundición
Cadson Demak: **Kanit** (titulares en negra cursiva — "Kanit" significa *matemáticas* en
tailandés), **Chakra Petch** (etiquetas y botones, angular) y **Prompt** (texto de lectura). El diseño rescata
los mejores patrones de los sitios de gimnasios top del mundo (Evolve MMA, Tiger Muay Thai,
Bangtao, Yokkao): héroe a pantalla completa con CTA doble, marquee de valores, tarjetas de
programas, tabla de horarios, botón flotante de contacto y llamado a la acción repetido.

## 🗺️ Rutas del sitio

| Ruta | Contenido |
|---|---|
| `#/` | Inicio: héroe-afiche, valores, programas, visión resumida e Instagram |
| `#/nosotros` | Visión, misión y los 7 valores completos de la escuela |
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

## 🖼️ El logo vectorizado

`assets/logo.svg` no es la foto original: es una **vectorización real** del logo
(`Logo_Pagina.jpeg`) hecha con [potrace](https://www.npmjs.com/package/potrace),
trazada en 3 capas de color (arte blanco + franjas roja y azul de la bandera tailandesa).
Escala a cualquier tamaño sin perder nitidez y pesa lo mismo que un ícono.
También existe `assets/logo-transparente.svg` (sin fondo) para usar sobre secciones oscuras.

## 📁 Estructura

```
├── index.html            # Shell: cabecera, navegación, pie y botón flotante
├── css/estilos.css       # Hoja de estilos completa (tokens de diseño arriba)
├── js/
│   ├── datos.js          # ← DATOS EDITABLES (contacto, horarios, galería)
│   ├── vistas.js         # Plantillas HTML de cada ruta
│   ├── router.js         # Router SPA por hash
│   └── app.js            # Menú móvil, animaciones, embeds de Instagram
└── assets/
    ├── logo.svg              # Logo vectorizado (fondo negro)
    ├── logo-transparente.svg # Logo vectorizado (sin fondo)
    ├── galeria/              # ← deja aquí las fotos de la galería
    └── ...
```

## 📷 Fotos y videos (importante)

Las fotografías de `assets/fotos/` y los videos de `assets/videos/` son **material
referencial de banco libre** ([Pexels](https://www.pexels.com/license/), uso comercial
gratuito) para que el sitio no nazca vacío. Autores: RDNE, Glebkrs, Tima Miroshnichenko,
Davner Ribeiro, Franco Monsalvo, Mateusz Turbinski, Coco Championship y Bruno Gobo Foto.

**Cuando tengan fotos y videos reales de la escuela**: reemplacen los archivos (o agreguen
nuevos) y actualicen las rutas en `js/datos.js` (`galeria`, `videoHero`, `videoClases`).

## 🥊 Sobre la escuela

> Inspirar a cada persona a descubrir su mejor versión a través del Muay Thai,
> acompañando su progreso con respeto, disciplina y constancia.

**Valores:** Respeto · Disciplina · Responsabilidad · Autocontrol ·
Superación personal · Compañerismo · Persistencia

---

Hecho con 🥊 para Alto Impacto Chile.

🤖 Generado con [Claude Code](https://claude.com/claude-code)
