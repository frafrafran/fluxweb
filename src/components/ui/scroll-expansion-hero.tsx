"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import useMeasure from "react-use-measure";
import { Pause, Play } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export type ScrollExpandMediaProps = {
  mediaSrc: string;
  posterSrc: string;
  /** Título partido en dos: cada mitad se aleja del video al expandirse. */
  titleStart: string;
  titleEnd: string;
  eyebrow?: string;
  /** Pista de que hay que seguir bajando; desaparece al expandirse. */
  scrollHint?: string;
  /** Descripción del video para tecnologías de apoyo. */
  mediaLabel: string;
  playLabel: string;
  pauseLabel: string;
  className?: string;
  children?: ReactNode;
};

/** Debajo de este ancho la escena se trata como pantalla de teléfono. */
const ANCHO_TELEFONO = 768;

/**
 * Video que crece a medida que se baja.
 *
 * Adaptado del «Scroll Expansion Hero» de 21st.dev. El original captura la
 * rueda y el táctil de toda la ventana y fuerza `scrollTo(0, 0)` hasta que el
 * video termina de crecer: eso choca con Lenis, anula el teclado y solo sirve
 * al principio de una página. Acá la expansión sale del scroll real: un
 * envoltorio alto sostiene una escena fija y el avance dentro de él mueve
 * escala, texto y velo. Funciona en cualquier lugar de la página y con
 * cualquier forma de desplazarse.
 *
 * La escena se mide para adaptarse al dispositivo: en un teléfono el video
 * arranca casi del ancho de la pantalla —con la escala del escritorio quedaba
 * del tamaño de una estampilla— y el título se desvanece en el lugar en vez de
 * abrirse hacia los costados, que ahí lo sacaría de cuadro.
 *
 * El video se reproduce solo mientras está en pantalla, sin sonido, y siempre
 * hay un botón para detenerlo. Con «reducir movimiento» activado no se
 * reproduce solo y la escena aparece ya expandida.
 */
export function ScrollExpandMedia({
  mediaSrc,
  posterSrc,
  titleStart,
  titleEnd,
  eyebrow,
  scrollHint,
  mediaLabel,
  playLabel,
  pauseLabel,
  className,
  children,
}: ScrollExpandMediaProps) {
  const reduce = useReducedMotion();
  const wrapper = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [escena, { width }] = useMeasure();

  /* Antes de medir se asume escritorio: es el caso en el que un valor errado
     se nota menos, porque sobra espacio. */
  const esTelefono = width > 0 && width < ANCHO_TELEFONO;
  const escalaInicial = esTelefono ? 0.88 : 0.42;
  const apertura = esTelefono ? "0vw" : "38vw";

  const { scrollYProgress } = useScroll({
    target: wrapper,
    offset: ["start start", "end end"],
  });

  /* Escala del marco: de tarjeta a casi todo el ancho. */
  const scale = useTransform(scrollYProgress, [0, 0.85], [escalaInicial, 1]);
  const radius = useTransform(scrollYProgress, [0, 0.85], [28, 22]);
  /* Cada mitad del título se corre hacia su lado y se apaga. */
  const leftX = useTransform(scrollYProgress, [0, 0.8], ["0vw", `-${apertura}`]);
  const rightX = useTransform(scrollYProgress, [0, 0.8], ["0vw", apertura]);
  const titleOpacity = useTransform(scrollYProgress, [0.4, 0.72], [1, 0]);
  /* El velo del fondo se retira cuando el video ya ocupa la escena. */
  const veilOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  /* Reproducción: solo en pantalla y solo si nadie la detuvo a mano. */
  const inView = useInView(wrapper, { amount: 0.25 });
  const [paused, setPaused] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setExpanded(value > 0.8);
  });

  useEffect(() => {
    const node = video.current;
    if (!node) return;
    const shouldPlay = inView && !paused && !reduce;
    if (shouldPlay) {
      node.play().catch(() => {
        /* El navegador puede negar el autoplay: queda el póster y el botón. */
      });
    } else {
      node.pause();
    }
  }, [inView, paused, reduce]);

  const frame = (
    <div className="relative aspect-video w-full overflow-hidden bg-[#1b1d13]">
      <video
        ref={video}
        src={mediaSrc}
        poster={posterSrc}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={mediaLabel}
        className="size-full object-cover"
      />
      <button
        type="button"
        onClick={() => setPaused((value) => !value)}
        aria-label={paused ? playLabel : pauseLabel}
        aria-pressed={paused}
        className="absolute bottom-3 right-3 grid size-11 place-items-center rounded-full border border-[#f0e9d6]/30 bg-[#1b1d13]/70 text-[#f0e9d6] backdrop-blur transition-colors duration-300 hover:bg-[#1b1d13] sm:bottom-4 sm:right-4"
      >
        {paused || reduce ? (
          <Play size={18} weight="fill" aria-hidden="true" />
        ) : (
          <Pause size={18} weight="fill" aria-hidden="true" />
        )}
      </button>
    </div>
  );

  if (reduce) {
    return (
      <section
        className={cn("relative bg-[#1b1d13] py-20 text-[#f0e9d6]", className)}
      >
        <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
          {eyebrow ? (
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-[#a3a58c]">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="mt-4 max-w-[20ch] font-display text-display-lg font-medium">
            {titleStart} {titleEnd}
          </h2>
          <div className="mt-10 overflow-hidden rounded-[22px] border border-[#f0e9d6]/15">
            {frame}
          </div>
          {children ? <div className="mt-12">{children}</div> : null}
        </div>
      </section>
    );
  }

  return (
    <section className={cn("relative bg-[#1b1d13] text-[#f0e9d6]", className)}>
      {/* Alto de recorrido: cuánto scroll dura la expansión. En el teléfono es
          más corto, porque cada pantalla de scroll cuesta más pulgar. */}
      <div ref={wrapper} className="relative h-[180vh] sm:h-[240vh]">
        <div
          ref={escena}
          className="sticky top-0 flex h-[100dvh] items-center justify-center overflow-hidden"
        >
          {/* Fondo: el póster desenfocado, que se retira al expandirse. */}
          <motion.div
            aria-hidden="true"
            style={{ opacity: veilOpacity }}
            className="pointer-events-none absolute inset-0"
          >
            <div
              className="absolute inset-0 scale-110 bg-cover bg-center blur-2xl"
              style={{ backgroundImage: `url(${posterSrc})` }}
            />
            <div className="absolute inset-0 bg-[#1b1d13]/75" />
          </motion.div>

          {/* Marco del video. */}
          <motion.div
            style={{ scale, borderRadius: radius }}
            className="relative z-10 w-[min(96vw,1400px)] overflow-hidden border border-[#f0e9d6]/15 shadow-[0_40px_120px_rgba(0,0,0,0.45)] [transform-origin:center]"
          >
            {frame}
          </motion.div>

          {/* Título partido: se abre como una cortina. */}
          <div
            aria-hidden={expanded}
            className="pointer-events-none absolute inset-x-0 top-1/2 z-20 -translate-y-1/2 px-5 text-center"
          >
            {eyebrow ? (
              <motion.p
                style={{ opacity: titleOpacity }}
                className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-[#d8d3ab]"
              >
                {eyebrow}
              </motion.p>
            ) : null}
            <h2 className="mt-4 flex flex-col items-center font-display text-display-lg font-medium leading-[1.02] [text-shadow:0_2px_24px_rgba(0,0,0,0.6)] sm:flex-row sm:justify-center sm:gap-[0.35em]">
              <motion.span
                style={{ x: leftX, opacity: titleOpacity }}
                className="block"
              >
                {titleStart}
              </motion.span>
              <motion.span
                style={{ x: rightX, opacity: titleOpacity }}
                className="block"
              >
                {titleEnd}
              </motion.span>
            </h2>
          </div>

          {scrollHint ? (
            <motion.p
              aria-hidden="true"
              style={{ opacity: hintOpacity }}
              className="pointer-events-none absolute bottom-8 left-1/2 z-20 -translate-x-1/2 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-[#a3a58c]"
            >
              {scrollHint}
            </motion.p>
          ) : null}
        </div>
      </div>

      {children ? (
        <div className="mx-auto max-w-[1560px] px-5 pb-24 pt-6 sm:px-8 lg:px-12">
          {children}
        </div>
      ) : null}
    </section>
  );
}
