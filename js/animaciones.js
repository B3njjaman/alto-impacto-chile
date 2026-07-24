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
  let limpiezas = []; // tareas de desmontaje que no son ScrollTriggers

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

  // --- Entrada del héroe: una sola secuencia orquestada -------
  function animarEntradaHeroe() {
    const palabras = document.querySelectorAll(".heroe .palabra > span");
    if (!palabras.length) return;

    const acompanan = ".heroe .eyebrow, .heroe-interior > p, .heroe-acciones";
    const linea = gsap.timeline({ defaults: { ease: "expo.out" } });

    linea
      .set(palabras, { yPercent: 115 })
      .set(acompanan, { opacity: 0, y: 22 })
      .set(".acceso", { opacity: 0, y: 22 })
      .from(".heroe-logo", { opacity: 0, duration: 1.6, ease: "power2.out" }, 0)
      .to(".heroe .eyebrow", { opacity: 1, y: 0, duration: 0.7 }, 0.1)
      .to(palabras, { yPercent: 0, duration: 1, stagger: 0.07 }, 0.2)
      .to(".heroe-interior > p", { opacity: 1, y: 0, duration: 0.8 }, 0.55)
      .to(".heroe-acciones", { opacity: 1, y: 0, duration: 0.8 }, 0.68)
      .to(".acceso", { opacity: 1, y: 0, duration: 0.8, stagger: 0.09 }, 0.82);
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

  // --- Ticker que reacciona a la velocidad del scroll ---------
  // GSAP le quita el bucle al CSS para poder acelerarlo según lo
  // rápido que se desplace la página, y dejarlo volver a su ritmo.
  function animarTicker() {
    const pista = document.querySelector(".ticker-pista");
    if (!pista) return;

    pista.style.animation = "none";
    const bucle = gsap.to(pista, {
      xPercent: -50,
      repeat: -1,
      duration: 34,
      ease: "none",
    });

    let objetivo = 1;
    const disparador = ScrollTrigger.create({
      onUpdate: (self) => {
        objetivo = gsap.utils.clamp(1, 5, 1 + Math.abs(self.getVelocity()) / 900);
      },
    });

    const suavizar = () => {
      bucle.timeScale(gsap.utils.interpolate(bucle.timeScale(), objetivo, 0.08));
      objetivo = gsap.utils.interpolate(objetivo, 1, 0.05);
    };
    gsap.ticker.add(suavizar);

    limpiezas.push(() => {
      gsap.ticker.remove(suavizar);
      bucle.kill();
      disparador.kill();
      pista.style.animation = "";
    });
  }

  // --- Bloque destacado (video o panel de los ocho miembros) --
  function animarDestacado() {
    const bloque = document.querySelector("[data-destacado]");
    if (!bloque) return;

    // fromTo con destino explícito: el valor por defecto de clip-path
    // es `none` y GSAP no puede interpolar hacia ahí, así que el bloque
    // se quedaría recortado a medias.
    gsap.fromTo(
      bloque,
      { clipPath: "inset(10% 14% 10% 14%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.1,
        ease: "power3.out",
        clearProps: "clipPath",
        scrollTrigger: { trigger: bloque, start: "top 85%", once: true },
      }
    );

    const piezas = bloque.querySelectorAll(
      ".ocho .eyebrow, .ocho-titulo, .ocho-arma, .ocho-total, .destacado-pie > *"
    );
    if (piezas.length) {
      gsap.set(piezas, { opacity: 0, y: 24 });
      gsap.to(piezas, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: bloque, start: "top 78%", once: true },
      });
    }

    const logo = bloque.querySelector(".ocho-logo");
    if (logo) {
      gsap.to(logo, {
        yPercent: -12,
        ease: "none",
        scrollTrigger: { trigger: bloque, start: "top bottom", end: "bottom top", scrub: true },
      });
    }
  }

  // --- Cifras que cuentan hacia arriba ------------------------
  // El HTML ya trae el número final escrito, así que sin GSAP se lee
  // igual; aquí solo se anima desde cero.
  function animarContadores() {
    document.querySelectorAll("[data-contador]").forEach((el) => {
      const fin = Number(el.dataset.contador);
      if (!Number.isFinite(fin)) return;

      const cuenta = { n: 0 };
      gsap.to(cuenta, {
        n: fin,
        duration: 1.2,
        ease: "power2.out",
        snap: { n: 1 },
        onUpdate: () => { el.textContent = String(Math.round(cuenta.n)); },
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
      });
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

    animarEntradaHeroe();
    animarReveals();
    animarHeroe();
    animarBandas();
    animarTicker();
    animarDestacado();
    animarContadores();
    ScrollTrigger.refresh();
  }

  function desmontar() {
    carruseles.forEach((c) => c.destroy(true, true));
    carruseles = [];
    limpiezas.forEach((fn) => fn());
    limpiezas = [];
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
