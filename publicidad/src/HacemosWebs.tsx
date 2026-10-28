/**
 * Reel «Hacemos webs a medida». La estructura sigue los gestos del video:
 *
 *   0,00 – 1,80  saludo, con el titular sobre la cabeza
 *   1,80 – 2,02  la mano barre la cámara: latigazo de luz
 *   2,00 – 4,16  los dos índices arriba: entran las capturas, una por negra
 *   4,16 – 5,30  la pregunta
 *   5,15 – 5,45  la mano tapa la lente y abre la placa final
 *
 * Los tiempos de la música (audio/componer.py) usan los mismos números: si
 * se mueve uno, hay que mover el otro.
 */
import type { CSSProperties, ReactNode } from "react";
import {
  AbsoluteFill,
  Easing,
  Html5Audio,
  Img,
  OffthreadVideo,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { color, font } from "./marca";
import { LOCKUP, MARK } from "./svgs";

const FPS = 60;
const s = (sec: number) => Math.round(sec * FPS);

const NEGRA = 3.45 / 8;
export const DURACION = s(8.5);

const t = {
  linea1: s(0.3),
  linea2: s(0.62),
  barridoIn: s(1.78),
  barridoPico: s(1.92),
  barridoOut: s(2.04),
  tarjetas: [0, 1, 2, 3, 4].map((i) => s(2.0 + i * NEGRA)),
  pregunta: s(2.0 + 5 * NEGRA),
  manoIn: s(5.15),
  placa: s(2.0 + 8 * NEGRA),
};

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// --- Piezas -----------------------------------------------------------------

/** Palabra que sube desde una máscara, con un desenfoque que se aclara. */
const Palabra = ({
  children,
  at,
  salida,
  style,
}: {
  children: ReactNode;
  at: number;
  salida?: number;
  style?: CSSProperties;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - at, fps, config: { damping: 22, stiffness: 150, mass: 0.9 } });
  const out = salida === undefined ? 0 : interpolate(frame, [salida, salida + 12], [0, 1], { ...clamp, easing: Easing.in(Easing.cubic) });
  return (
    <span style={{ display: "inline-block", overflow: "hidden", padding: "0.06em 0.12em 0.16em", margin: "-0.06em -0.12em -0.16em" }}>
      <span
        style={{
          display: "inline-block",
          transform: `translateY(${(1 - p) * 105 - out * 60}%)`,
          filter: `blur(${(1 - p) * 10 + out * 14}px)`,
          opacity: Math.min(p * 1.4, 1) * (1 - out),
          ...style,
        }}
      >
        {children}
      </span>
    </span>
  );
};

/** Dos renglones: uno liviano en Geist y el de peso en Playfair itálica. */
const Titular = ({
  arriba,
  abajo,
  at1,
  at2,
  salida,
  top,
}: {
  arriba: string;
  abajo: string;
  at1: number;
  at2: number;
  salida: number;
  top: number;
}) => (
  <div
    style={{
      position: "absolute",
      top,
      left: 0,
      right: 0,
      textAlign: "center",
      color: color.ink,
      // Un halo crema apenas visible: separa la letra de la pared sin caja.
      textShadow: `0 0 40px rgba(247,242,228,0.85), 0 0 12px rgba(247,242,228,0.6)`,
    }}
  >
    <div style={{ fontFamily: font.sans, fontWeight: 500, fontSize: 64, letterSpacing: "-0.01em", lineHeight: 1.1 }}>
      {arriba.split(" ").map((w, i) => (
        <span key={i}>
          <Palabra at={at1 + i * 4} salida={salida}>{w}</Palabra>{" "}
        </span>
      ))}
    </div>
    <div
      style={{
        fontFamily: font.serif,
        fontStyle: "italic",
        fontWeight: 500,
        fontSize: 112,
        letterSpacing: "-0.02em",
        lineHeight: 1.02,
        color: color.oliveStrong,
        marginTop: 6,
      }}
    >
      {abajo.split(" ").map((w, i) => (
        <span key={i}>
          <Palabra at={at2 + i * 5} salida={salida + 2}>{w}</Palabra>{" "}
        </span>
      ))}
    </div>
  </div>
);

const SITIOS = [
  { img: "sitios/mirande-aybar.webp", nombre: "Mirande Aybar", rubro: "Inmobiliaria" },
  { img: "sitios/beclean-flux.webp", nombre: "BeClean", rubro: "Laboratorio" },
  { img: "sitios/mirande-propiedades.webp", nombre: "Mirande Aybar", rubro: "Catálogo" },
  { img: "sitios/beclean-pasos.webp", nombre: "BeClean", rubro: "Producto" },
  { img: "sitios/flux-portada.webp", nombre: "FluxWeb", rubro: "Nuestro estudio" },
];
const GIRO = [-3.2, 2.6, -1.8, 3.0, -0.8];
/** Borde superior de la pila: deja libre la cabeza y la zona del encabezado de Instagram. */
const TOPE = 225;

/** Pila de capturas: cada una entra con un resorte y empuja a las de atrás. */
const Tarjetas = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const salida = interpolate(frame, [t.pregunta - 4, t.pregunta + 10], [0, 1], { ...clamp, easing: Easing.in(Easing.cubic) });
  if (frame < t.tarjetas[0] - 1 || salida >= 1) return null;

  const W = 820;
  const H = Math.round(W * 0.625);
  const BAR = 46;

  return (
    <AbsoluteFill style={{ transform: `translateY(${-salida * 120}px) scale(${1 - salida * 0.08})`, opacity: 1 - salida, filter: `blur(${salida * 12}px)` }}>
      {SITIOS.map((sitio, i) => {
        const at = t.tarjetas[i];
        if (frame < at) return null;
        const p = spring({ frame: frame - at, fps, config: { damping: 15, stiffness: 210, mass: 0.85 } });
        const nuevas = t.tarjetas.filter((x) => x <= frame).length - 1 - i;
        // Las de atrás se corren de a poco, con su propio resorte.
        const empuje = t.tarjetas
          .slice(i + 1)
          .filter((x) => x <= frame)
          .reduce((acc, x) => acc + spring({ frame: frame - x, fps, config: { damping: 18, stiffness: 160 } }), 0);
        const visible = interpolate(empuje, [1.6, 2.6], [1, 0], clamp);
        if (visible <= 0) return null;
        const y = TOPE + (1 - p) * 160 - empuje * 38;
        const escala = (0.72 + 0.28 * p) * (1 - empuje * 0.055);
        const giro = GIRO[i] * (0.4 + 0.6 * p) + (1 - p) * GIRO[i] * 2.5;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: (1080 - W) / 2,
              top: y,
              width: W,
              height: H + BAR,
              transform: `scale(${escala}) rotate(${giro}deg)`,
              transformOrigin: "50% 100%",
              opacity: Math.min(p * 2, 1) * visible,
              borderRadius: 26,
              overflow: "hidden",
              background: color.paperRaise,
              border: `1px solid rgba(27,28,18,0.14)`,
              boxShadow: `0 60px 100px -40px rgba(27,28,18,0.55), 0 18px 40px -18px rgba(27,28,18,0.4)`,
              filter: `brightness(${1 - Math.min(empuje, 2) * 0.1})`,
              zIndex: i,
            }}
          >
            <div
              style={{
                height: BAR,
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "0 18px",
                borderBottom: `1px solid rgba(27,28,18,0.1)`,
              }}
            >
              {[0, 1, 2].map((d) => (
                <span key={d} style={{ width: 12, height: 12, borderRadius: 99, background: d === 0 ? color.olive : "rgba(27,28,18,0.18)" }} />
              ))}
              <span
                style={{
                  marginLeft: 14,
                  fontFamily: font.mono,
                  fontSize: 19,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: color.inkSoft,
                }}
              >
                {sitio.nombre}
                <span style={{ color: color.muted }}> · {sitio.rubro}</span>
              </span>
              <span style={{ marginLeft: "auto", fontFamily: font.mono, fontSize: 19, color: color.muted }}>
                0{i + 1}
              </span>
            </div>
            <Img src={staticFile(sitio.img)} style={{ width: W, height: H, objectFit: "cover", objectPosition: "top", display: "block" }} />
          </div>
        );
      })}
      {nuevasEtiqueta(frame)}
    </AbsoluteFill>
  );
};

/** Contador mínimo bajo la pila: «05 sitios en línea», como prueba. */
function nuevasEtiqueta(frame: number) {
  const n = t.tarjetas.filter((x) => x <= frame).length;
  const p = interpolate(frame, [t.tarjetas[0] + 6, t.tarjetas[0] + 18], [0, 1], clamp);
  return (
    <div
      style={{
        position: "absolute",
        top: TOPE + 605,
        left: 0,
        right: 0,
        // Por encima de la pila: la captura que entra baja con el resorte.
        zIndex: 10,
        textAlign: "center",
        fontFamily: font.mono,
        fontSize: 22,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color: color.ink,
        opacity: p * 0.85,
        textShadow: `0 0 18px rgba(247,242,228,0.9)`,
      }}
    >
      Todo en línea, nada de maquetas · 0{n}/05
    </div>
  );
}

/** El video, con el latigazo de luz cuando la mano barre la cámara. */
const Video = () => {
  const frame = useCurrentFrame();
  const latigazo = interpolate(frame, [t.barridoIn, t.barridoPico, t.barridoOut], [0, 1, 0], {
    ...clamp,
    easing: Easing.inOut(Easing.quad),
  });
  // Cuando la mano tapa la lente, el video se va a blanco cálido.
  const tapado = interpolate(frame, [t.manoIn + 4, t.placa], [0, 1], { ...clamp, easing: Easing.in(Easing.quad) });
  return (
    <AbsoluteFill
      style={{
        transform: `scale(${1 + latigazo * 0.09 + tapado * 0.05}) translateY(${-latigazo * 30}px)`,
        filter: `blur(${latigazo * 9 + tapado * 16}px) saturate(${1 - tapado * 0.3})`,
      }}
    >
      <OffthreadVideo src={staticFile("media/francisco.mp4")} muted style={{ width: 1080, height: 1920 }} />
    </AbsoluteFill>
  );
};

/** Banda de luz oliva que acompaña la mano de abajo hacia arriba. */
const Luz = () => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [t.barridoIn, t.barridoOut + 4], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  if (p <= 0 || p >= 1) return null;
  const y = interpolate(p, [0, 1], [1920, -900]);
  const fuerza = Math.sin(p * Math.PI);
  return (
    <AbsoluteFill style={{ mixBlendMode: "screen", pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: -200,
          right: -200,
          top: y,
          height: 900,
          background: `linear-gradient(180deg, transparent, rgba(185,189,122,${0.75 * fuerza}) 45%, rgba(247,242,228,${0.9 * fuerza}) 55%, transparent)`,
          filter: "blur(60px)",
          transform: "rotate(-8deg)",
        }}
      />
    </AbsoluteFill>
  );
};

/** Viñeta suave y grano de película, como el papel del sitio. */
const Acabado = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <AbsoluteFill style={{ background: "radial-gradient(120% 80% at 50% 45%, transparent 55%, rgba(27,28,18,0.28))" }} />
      <AbsoluteFill style={{ opacity: 0.07, mixBlendMode: "multiply" }}>
        <svg width="1080" height="1920">
          <filter id="grano">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed={frame % 24} />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="1080" height="1920" filter="url(#grano)" />
        </svg>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/** Placa final: se abre desde el centro cuando la mano tapa la lente. */
const Placa = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const apertura = interpolate(frame, [t.placa - 9, t.placa + 6], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  if (apertura <= 0) return null;

  const logo = spring({ frame: frame - t.placa, fps, config: { damping: 13, stiffness: 120, mass: 1 } });
  const negra = Math.round(NEGRA * FPS);
  const lema = t.placa + negra;
  const cta = spring({ frame: frame - (t.placa + 2 * negra), fps, config: { damping: 16, stiffness: 140 } });
  const deriva = (frame - t.placa) / FPS;

  return (
    <AbsoluteFill
      style={{
        clipPath: `circle(${apertura * 125}% at 50% 48%)`,
        background: `radial-gradient(90% 60% at 50% 42%, ${color.paperRaise}, ${color.paper} 55%, ${color.paperSink})`,
      }}
    >
      {/* El nudo gigante, casi invisible, girando despacio detrás. */}
      <svg
        viewBox={MARK.viewBox}
        style={{
          position: "absolute",
          width: 1500,
          left: -210,
          top: 260,
          opacity: 0.045,
          transform: `rotate(${-12 + deriva * 3}deg) scale(${1.08 - apertura * 0.08})`,
        }}
      >
        <path d={MARK.paths[0]} fill={color.olive} fillRule="evenodd" />
      </svg>

      <div style={{ position: "absolute", top: 560, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <svg
          viewBox={MARK.viewBox}
          style={{
            width: 210,
            transform: `scale(${0.6 + 0.4 * logo}) rotate(${(1 - logo) * -25}deg)`,
            opacity: Math.min(logo * 1.5, 1),
          }}
        >
          <path d={MARK.paths[0]} fill={color.olive} fillRule="evenodd" />
        </svg>
        <svg
          // El lockup trae su propio nudo a la izquierda: este recorte deja
          // solo el logotipo, porque el nudo grande ya está arriba.
          viewBox="262 40 567 130"
          style={{
            width: 560,
            marginTop: 40,
            opacity: interpolate(frame, [t.placa + 6, t.placa + 20], [0, 1], clamp),
            transform: `translateY(${interpolate(frame, [t.placa + 6, t.placa + 26], [24, 0], { ...clamp, easing: Easing.out(Easing.cubic) })}px)`,
          }}
        >
          <path d={LOCKUP.paths[0]} fill={color.ink} fillRule="evenodd" />
        </svg>

        <div
          style={{
            marginTop: 70,
            textAlign: "center",
            fontFamily: font.serif,
            fontWeight: 500,
            fontSize: 70,
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            color: color.ink,
          }}
        >
          <div>
            {"La web que tu".split(" ").map((w, i) => (
              <span key={i}>
                <Palabra at={lema + i * 3}>{w}</Palabra>{" "}
              </span>
            ))}
          </div>
          <div>
            <Palabra at={lema + 12}>emprendimiento</Palabra>{" "}
            <Palabra at={lema + 16} style={{ fontStyle: "italic", color: color.olive }}>
              merece.
            </Palabra>
          </div>
        </div>

        <div
          style={{
            marginTop: 80,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 26,
            opacity: Math.min(cta * 1.4, 1),
            transform: `translateY(${(1 - cta) * 40}px)`,
          }}
        >
          <div
            style={{
              background: color.olive,
              color: color.paperRaise,
              fontFamily: font.sans,
              fontWeight: 500,
              fontSize: 40,
              padding: "26px 54px",
              borderRadius: 999,
              boxShadow: `0 24px 50px -24px rgba(78,79,45,0.8)`,
              display: "flex",
              alignItems: "center",
              gap: 18,
            }}
          >
            Empezar mi proyecto
            <span style={{ fontSize: 40, transform: `translateX(${Math.sin(deriva * 4) * 4}px)` }}>→</span>
          </div>
          <div style={{ fontFamily: font.mono, fontSize: 28, letterSpacing: "0.14em", color: color.muted, textTransform: "uppercase" }}>
            @fluxwebpages
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// --- Composición ------------------------------------------------------------

export const HacemosWebs = () => (
  <AbsoluteFill style={{ background: color.paper }}>
    <Video />
    <Acabado />
    <Titular arriba="Hacemos" abajo="webs a medida:" at1={t.linea1} at2={t.linea2} salida={t.barridoIn} top={300} />
    <Tarjetas />
    <Titular arriba="¿Tu emprendimiento" abajo="necesita una?" at1={t.pregunta + 2} at2={t.pregunta + 14} salida={t.manoIn + 6} top={420} />
    <Luz />
    <Placa />
    <Html5Audio src={staticFile("media/audio.wav")} />
  </AbsoluteFill>
);
