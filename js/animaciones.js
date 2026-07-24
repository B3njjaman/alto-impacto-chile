// ============================================================
// ANIMACIONES — capa dinámica del sitio
// ------------------------------------------------------------
// Librerías (cargadas por CDN desde index.html):
//   · Lenis        → scroll suave con inercia
//   · GSAP         → motor de animación
//   · ScrollTrigger→ animaciones atadas a la posición del scroll
//   · Swiper       → carrusel de valores
//
// Todo es opcional: si una librería no carga, o si el sistema pide
// movimiento reducido, el sitio se muestra completo y sin animación.
// Por eso ningún elemento nace invisible desde el CSS: el estado
// inicial lo pone GSAP solo cuando sí va a animarlo.
// ============================================================

const ANIM = (() => {
  const quieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hayGsap = typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined";
  const hayLenis = typeof window.Lenis !== "undefined";
  const haySwiper = typeof window.Swiper !== "undefined";

  const animar = hayGsap && !quieto;
  let lenis = null;
  let carruseles = [];

  if (animar) gsap.registerPlugin(ScrollTrigger);

  // --- Scroll suave (una sola vez, al cargar) -----------------
  function iniciarScrollSuave() {
    if (!hayLenis || quieto) return;

    lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 1,
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    if (animar) {
      // Lenis mueve el scroll fuera del hilo nativo: hay que avisarle
      // a ScrollTrigger en cada frame y dejar que GSAP marque el ritmo.
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((tiempo) => lenis.raf(tiempo * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const bucle = (t) => { lenis.raf(t); requestAnimationFrame(bucle); };
      requestAnimationFrame(bucle);
    }
  }

  // --- Utilidades de scroll que respetan Lenis ----------------
  // Lenis aplica su scroll en el siguiente frame. Como el router
  // monta las animaciones justo después, hay que dejar el scroll
  // nativo en cero ya mismo o ScrollTrigger calcula con la posición
  // de la vista anterior.
  function irArriba() {
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
  }

  function bloquearScroll(bloquear) {
    if (!lenis) {
      document.body.style.overflow = bloquear ? "hidden" : "";
      return;
    }
    bloquear ? lenis.stop() : lenis.start();
  }

  // --- Entrada del titular del héroe, palabra por palabra -----
  function animarTitular() {
    const palabras = document.querySelectorAll(".heroe .palabra > span");
    if (!palabras.length) return;

    gsap.set(palabras, { yPercent: 115 });
    gsap.to(palabras, {
      yPercent: 0,
      duration: 1,
      ease: "expo.out",
      stagger: 0.07,
      delay: 0.1,
    });

    const acompanan = document.querySelectorAll(".heroe .eyebrow, .heroe-interior > p, .heroe-acciones, .acceso");
    gsap.set(acompanan, { opacity: 0, y: 22 });
    gsap.to(acompanan, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.07,
      delay: 0.35,
    });
  }

  // --- Aparición de bloques ----------------------------------
  // Lo que ya está en pantalla al montar la vista entra de una vez,
  // como secuencia de carga. Lo de más abajo espera al scroll.
  // Repartirlo así evita depender de que ScrollTrigger dispare hacia
  // atrás sobre elementos que quedaron por encima de la ventana.
  const entrada = {
    opacity: 1,
    y: 0,
    duration: 0.75,
    ease: "power3.out",
    stagger: 0.09,
    overwrite: true,
  };

  function animarReveals() {
    const bloques = gsap.utils.toArray(".reveal");
    if (!bloques.length) return;

    gsap.set(bloques, { opacity: 0, y: 30 });

    const limite = window.innerHeight * 0.9;
    const enPantalla = bloques.filter((el) => el.getBoundingClientRect().top < limite);
    const masAbajo = bloques.filter((el) => !enPantalla.includes(el));

    if (enPantalla.length) {
      gsap.to(enPantalla, { ...entrada, delay: 0.15 });
    }

    if (masAbajo.length) {
      ScrollTrigger.batch(masAbajo, {
        start: "top 88%",
        once: true,
        onEnter: (lote) => gsap.to(lote, entrada),
      });
    }
  }

  // --- Parallax del logo del héroe ----------------------------
  function animarHeroe() {
    const logo = document.querySelector(".heroe-logo");
    if (!logo) return;

    gsap.to(logo, {
      yPercent: 14,
      scale: 1.06,
      ease: "none",
      scrollTrigger: {
        trigger: ".heroe",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }

  // --- Bandas de impacto: la palabra de fondo sigue al scroll -
  function animarBandas() {
    gsap.utils.toArray(".banda").forEach((seccion) => {
      const fantasma = seccion.querySelector(".banda-fantasma");
      if (!fantasma) return;

      gsap.fromTo(
        fantasma,
        { xPercent: 4 },
        {
          xPercent: -30,
          ease: "none",
          scrollTrigger: {
            trigger: seccion,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        }
      );
    });
  }

  // --- Carrusel de valores ------------------------------------
  function montarCarruseles() {
    if (!haySwiper) return;

    document.querySelectorAll('[data-carrusel="valores"]').forEach((nodo) => {
      const contenedor = nodo.closest(".seccion") || document;
      carruseles.push(new Swiper(nodo, {
        slidesPerView: 1.1,
        spaceBetween: 16,
        grabCursor: true,
        speed: 550,
        breakpoints: {
          620: { slidesPerView: 2.1 },
          980: { slidesPerView: 3.2 },
        },
        navigation: {
          prevEl: contenedor.querySelector("[data-carrusel-anterior]"),
          nextEl: contenedor.querySelector("[data-carrusel-siguiente]"),
        },
      }));
    });
  }

  // --- Ciclo de vida, llamado por el router -------------------
  function montar() {
    montarCarruseles();
    if (!animar) return;

    animarTitular();
    animarReveals();
    animarHeroe();
    animarBandas();
    ScrollTrigger.refresh();
  }

  function desmontar() {
    carruseles.forEach((c) => c.destroy(true, true));
    carruseles = [];
    if (!animar) return;
    ScrollTrigger.getAll().forEach((t) => t.kill());
    gsap.killTweensOf("#app, #app *");
  }

  // Los embeds de Instagram cambian de alto al hidratarse: hay que
  // recalcular las posiciones de ScrollTrigger cuando eso pasa.
  function recalcular() {
    if (animar) ScrollTrigger.refresh();
  }

  return { iniciarScrollSuave, montar, desmontar, irArriba, bloquearScroll, recalcular };
})();

ANIM.iniciarScrollSuave();
