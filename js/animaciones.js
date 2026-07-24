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

  // Si el bloque ya está en pantalla cuando se monta la vista, la
  // animación arranca de una vez. Un ScrollTrigger `once` sobre algo
  // que ya quedó por encima de la línea de disparo no llega a
  // ejecutarse nunca y el contenido se queda en su estado inicial.
  function alEntrar(bloque, retraso = 0) {
    const yaVisible = bloque.getBoundingClientRect().top < window.innerHeight * 0.85;
    return yaVisible
      ? { delay: retraso }
      : { scrollTrigger: { trigger: bloque, start: "top 82%", once: true } };
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
        ...alEntrar(bloque),
      }
    );

    const piezas = bloque.querySelectorAll(
      ".ocho-titulo, .ocho-arma, .ocho-total, .destacado-pie > *"
    );
    if (piezas.length) {
      gsap.set(piezas, { opacity: 0, y: 24 });
      gsap.to(piezas, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.08,
        ...alEntrar(bloque, 0.15),
      });
    }

    animarFigura(bloque);
  }

  // --- Figura con los ocho puntos ----------------------------
  // La foto entra, las marcas caen una a una sobre el cuerpo y después
  // queda viva: una onda recorre los ocho puntos en bucle. Pasar por
  // un arma de la leyenda resalta sus dos marcas.
  function animarFigura(bloque) {
    const figura = bloque.querySelector(".ocho-figura");
    if (!figura) return;

    const cuerpo = figura.querySelectorAll(
      ".fig-hueso, .fig-torso, .fig-cabeza, .fig-pie, .fig-short, .fig-cinturon, .fig-guante"
    );
    const marcas = gsap.utils.toArray(figura.querySelectorAll(".ocho-marca"));
    const puntos = figura.querySelectorAll(".ocho-marca-punto");
    const halos = figura.querySelectorAll(".ocho-marca-halo");

    // Se anima el radio y no la escala: en SVG, GSAP escribe su propio
    // transform-origin en línea y pisa al `transform-box` del CSS, con
    // lo que las marcas escaladas se van de sitio.
    gsap.set(puntos, { attr: { r: 0 } });

    gsap.timeline(alEntrar(bloque))
      .from(cuerpo, { opacity: 0, duration: 0.9, ease: "power2.out", stagger: 0.05 })
      .to(puntos, { attr: { r: 7 }, duration: 0.5, ease: "back.out(2.6)", stagger: 0.09 }, 0.7);

    // Onda que recorre los ocho puntos, uno tras otro.
    const onda = gsap.timeline({ repeat: -1, repeatDelay: 1.1, delay: 2.2 });
    halos.forEach((halo, i) => {
      onda.fromTo(
        halo,
        { attr: { r: 6 }, opacity: 0.85 },
        { attr: { r: 24 }, opacity: 0, duration: 1, ease: "power2.out" },
        i * 0.13
      );
    });
    limpiezas.push(() => onda.kill());

    // Vínculo con la leyenda: resalta el par y apaga el resto.
    bloque.querySelectorAll(".ocho-arma[data-arma]").forEach((celda) => {
      const propias = marcas.filter((m) => m.dataset.arma === celda.dataset.arma);
      const otras = marcas.filter((m) => m.dataset.arma !== celda.dataset.arma);
      if (!propias.length) return;

      const entrar = () => {
        gsap.to(propias.map((m) => m.querySelector(".ocho-marca-punto")), {
          attr: { r: 12 }, duration: 0.35, ease: "back.out(2)", overwrite: true,
        });
        gsap.to(otras, { opacity: 0.2, duration: 0.3, overwrite: true });
      };
      const salir = () => {
        gsap.to(puntos, { attr: { r: 7 }, duration: 0.35, overwrite: true });
        gsap.to(marcas, { opacity: 1, duration: 0.35, overwrite: true });
      };

      celda.addEventListener("pointerenter", entrar);
      celda.addEventListener("pointerleave", salir);
      limpiezas.push(() => {
        celda.removeEventListener("pointerenter", entrar);
        celda.removeEventListener("pointerleave", salir);
      });
    });
  }

  // --- Tarjetas: inclinación que sigue al puntero -------------
  // Solo con puntero fino (ratón). En táctil no aporta y estorba.
  function animarTarjetas() {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    gsap.utils.toArray(".programa, .contacto-tarjeta, .acceso").forEach((tarjeta) => {
      const girarY = gsap.quickTo(tarjeta, "rotationY", { duration: 0.6, ease: "power3.out" });
      const girarX = gsap.quickTo(tarjeta, "rotationX", { duration: 0.6, ease: "power3.out" });
      const subir = gsap.quickTo(tarjeta, "y", { duration: 0.45, ease: "power3.out" });

      const entrar = () => {
        gsap.set(tarjeta, { transformPerspective: 900, transformOrigin: "center" });
        subir(-7);
      };
      const mover = (e) => {
        const caja = tarjeta.getBoundingClientRect();
        girarY(((e.clientX - caja.left) / caja.width - 0.5) * 7);
        girarX((0.5 - (e.clientY - caja.top) / caja.height) * 7);
      };
      const salir = () => { girarX(0); girarY(0); subir(0); };

      tarjeta.addEventListener("pointerenter", entrar);
      tarjeta.addEventListener("pointermove", mover);
      tarjeta.addEventListener("pointerleave", salir);

      limpiezas.push(() => {
        tarjeta.removeEventListener("pointerenter", entrar);
        tarjeta.removeEventListener("pointermove", mover);
        tarjeta.removeEventListener("pointerleave", salir);
      });
    });
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

  // --- Red de seguridad --------------------------------------
  // Repartir los reveals entre "ya visible" y "más abajo" depende de
  // que el scroll esté en cero cuando se monta la vista, y eso no
  // siempre se cumple: Lenis aplica su posición en el frame siguiente
  // y el alto del documento cambia al reemplazar el contenido. Si algo
  // quedó invisible estando en pantalla, se muestra igual. Nada de
  // contenido escondido por una animación que no llegó a dispararse.
  function asegurarVisibles() {
    const limite = window.innerHeight;

    gsap.utils.toArray(".reveal").forEach((el) => {
      if (el.getBoundingClientRect().top < limite && gsap.getProperty(el, "opacity") === 0) {
        gsap.to(el, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", overwrite: true });
      }
    });

    const figura = document.querySelector(".ocho-figura");
    if (figura && figura.getBoundingClientRect().top < limite) {
      const dormidos = [...figura.querySelectorAll(".ocho-marca-punto")]
        .filter((p) => Number(p.getAttribute("r")) === 0);
      if (dormidos.length) {
        gsap.to(dormidos, { attr: { r: 7 }, duration: 0.4, ease: "back.out(2.4)", stagger: 0.07 });
      }
    }
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
    animarTarjetas();
    animarContadores();
    ScrollTrigger.refresh();
    gsap.delayedCall(0.4, asegurarVisibles);
    gsap.delayedCall(1.4, asegurarVisibles);
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
  // recalcular las posiciones de ScrollTrigger cuando eso pasa. El
  // reacomodo puede empujar bloques por encima de su línea de
  // disparo, así que se pasa también la red de seguridad.
  function recalcular() {
    if (!animar) return;
    ScrollTrigger.refresh();
    asegurarVisibles();
  }

  return { iniciarScrollSuave, montar, desmontar, irArriba, bloquearScroll, recalcular };
})();

ANIM.iniciarScrollSuave();
