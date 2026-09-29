"use client";

import { useEffect, useRef } from "react";
import createGlobe, { type Arc, type Marker } from "cobe";

export type { Arc, Marker };
export type Rgb = [number, number, number];

/** Velocidad del giro, en radianes por milisegundo: una vuelta cada ~50 s. */
const GIRO = 0.000125;

/** Píxeles de arrastre que equivalen a un radián de giro. */
const ARRASTRE = 200;

/**
 * Cuadros que se dibujan en el modo quieto. La textura del mapa se decodifica
 * aparte y el primer cuadro sale sin continentes: con unos pocos más alcanza.
 */
const CUADROS_QUIETO = 30;

type WorldProps = {
  arcs: Arc[];
  markers: Marker[];
  /** Longitud que queda al frente al empezar. */
  longitude: number;
  /** Inclinación en radianes: negativa muestra más del hemisferio sur. */
  theta: number;
  colors: { base: Rgb; glow: Rgb; marker: Rgb; arc: Rgb };
  /** Sin giro automático, para quien pide menos movimiento. Se puede arrastrar igual. */
  still?: boolean;
};

/**
 * Globo de puntos con arcos, dibujado con cobe (unos 13 KB, sin
 * dependencias) en lugar de three.js. Solo dibuja mientras está en pantalla
 * y la pestaña está visible, y se puede girar arrastrando en horizontal: el
 * gesto vertical queda libre para seguir haciendo scroll en el teléfono.
 */
export function World({
  arcs,
  markers,
  longitude,
  theta,
  colors,
  still = false,
}: WorldProps) {
  const wrap = useRef<HTMLDivElement>(null);
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = wrap.current;
    const escena = host.current;
    if (!box || !escena) return;

    /* cobe no avisa cuando falla: sin contexto devuelve un globo vacío. Se
       comprueba antes para que WebGLBoundary muestre la alternativa. */
    if (!supportsWebGL()) throw new Error("WebGL no disponible");

    /* cobe envuelve el lienzo en un div propio y lo cambia de lugar en el
       DOM. Por eso el lienzo se crea acá y no en el JSX: React solo es dueño
       del contenedor vacío, y lo que cobe agrega se limpia al desmontar. */
    const canvas = document.createElement("canvas");
    canvas.className = "block cursor-grab touch-pan-y";
    escena.append(canvas);

    /* En pantallas táctiles el globo competía con el scroll del dedo y la
       página se trababa: ahí va con menos píxeles y menos puntos, sin
       antialias, a 30 cuadros por segundo y quieto mientras se desplaza. */
    const tactil = window.matchMedia("(pointer: coarse)").matches;
    const intervalo = tactil ? 1000 / 30 : 0;

    const medir = () =>
      Math.max(1, Math.floor(Math.min(box.clientWidth, box.clientHeight)));
    let size = medir();
    const aplicarTamano = () => {
      for (const nodo of [escena, canvas]) {
        nodo.style.width = `${size}px`;
        nodo.style.height = `${size}px`;
      }
    };
    aplicarTamano();

    let phi = Math.PI - ((longitude * Math.PI) / 180 - Math.PI / 2);
    let arrastre = 0;
    let origen = 0;
    let puntero: number | null = null;

    const globe = createGlobe(canvas, {
      devicePixelRatio: Math.min(window.devicePixelRatio || 1, tactil ? 1.5 : 2),
      width: size,
      height: size,
      phi,
      theta,
      dark: 1,
      diffuse: 1.2,
      mapSamples: tactil ? 8000 : 16000,
      context: { antialias: !tactil },
      mapBrightness: 5,
      baseColor: colors.base,
      markerColor: colors.marker,
      glowColor: colors.glow,
      markers,
      arcs,
      arcColor: colors.arc,
      arcWidth: 0.6,
      arcHeight: 0.28,
      markerElevation: 0.01,
    });
    const dibujar = () => globe.update({ phi: phi + arrastre });

    let cuadro = 0;
    let anterior = 0;
    let restantes = CUADROS_QUIETO;
    let enPantalla = false;

    const paso = (ahora: number) => {
      if (anterior && ahora - anterior < intervalo - 1) {
        cuadro = requestAnimationFrame(paso);
        return;
      }
      const dt = anterior ? Math.min(ahora - anterior, 64) : 16;
      anterior = ahora;
      if (!still && puntero === null) phi += dt * GIRO;
      dibujar();
      if (still && --restantes <= 0) {
        cuadro = 0;
        return;
      }
      cuadro = requestAnimationFrame(paso);
    };
    const arrancar = () => {
      if (cuadro || !enPantalla || document.hidden) return;
      if (still && restantes <= 0) return;
      anterior = 0;
      cuadro = requestAnimationFrame(paso);
    };
    const frenar = () => {
      cancelAnimationFrame(cuadro);
      cuadro = 0;
    };

    const observador = new IntersectionObserver(([entrada]) => {
      enPantalla = Boolean(entrada?.isIntersecting);
      if (enPantalla) arrancar();
      else frenar();
    });
    observador.observe(canvas);

    const alCambiarVisibilidad = () =>
      document.hidden ? frenar() : arrancar();
    document.addEventListener("visibilitychange", alCambiarVisibilidad);

    // En táctil se detiene mientras la página se desplaza y sigue al parar.
    let reanudar = 0;
    const alDesplazar = () => {
      frenar();
      window.clearTimeout(reanudar);
      reanudar = window.setTimeout(arrancar, 160);
    };
    if (tactil && !still) {
      window.addEventListener("scroll", alDesplazar, { passive: true });
    }

    const medidor = new ResizeObserver(() => {
      const nuevo = medir();
      if (nuevo === size) return;
      size = nuevo;
      aplicarTamano();
      globe.update({ width: size, height: size, phi: phi + arrastre });
    });
    medidor.observe(box);

    const bajar = (event: PointerEvent) => {
      puntero = event.pointerId;
      origen = event.clientX - arrastre * ARRASTRE;
      canvas.setPointerCapture(event.pointerId);
      canvas.style.cursor = "grabbing";
    };
    const mover = (event: PointerEvent) => {
      if (event.pointerId !== puntero) return;
      arrastre = (event.clientX - origen) / ARRASTRE;
      if (!cuadro) dibujar();
    };
    const soltar = (event: PointerEvent) => {
      if (event.pointerId !== puntero) return;
      puntero = null;
      canvas.style.cursor = "";
    };
    canvas.addEventListener("pointerdown", bajar);
    canvas.addEventListener("pointermove", mover);
    canvas.addEventListener("pointerup", soltar);
    canvas.addEventListener("pointercancel", soltar);

    /* Aparece cuando la textura ya tuvo tiempo de cargar. */
    const aparicion = window.setTimeout(() => {
      escena.style.opacity = "1";
    }, 120);

    return () => {
      window.clearTimeout(aparicion);
      window.clearTimeout(reanudar);
      window.removeEventListener("scroll", alDesplazar);
      frenar();
      observador.disconnect();
      medidor.disconnect();
      document.removeEventListener("visibilitychange", alCambiarVisibilidad);
      canvas.removeEventListener("pointerdown", bajar);
      canvas.removeEventListener("pointermove", mover);
      canvas.removeEventListener("pointerup", soltar);
      canvas.removeEventListener("pointercancel", soltar);
      globe.destroy();
      escena.replaceChildren();
      escena.style.opacity = "";
    };
  }, [arcs, markers, longitude, theta, colors, still]);

  return (
    <div ref={wrap} className="absolute inset-0">
      <div
        ref={host}
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-1000 ease-out motion-reduce:transition-none"
      />
    </div>
  );
}

/** Prueba con un lienzo aparte y libera el contexto enseguida. */
function supportsWebGL() {
  try {
    const prueba = document.createElement("canvas");
    const contexto = prueba.getContext("webgl2") ?? prueba.getContext("webgl");
    contexto?.getExtension("WEBGL_lose_context")?.loseContext();
    return contexto !== null;
  } catch {
    return false;
  }
}
