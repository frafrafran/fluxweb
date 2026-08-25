/**
 * Fuente única de contenido del sitio.
 * Cambiar textos, proyectos o equipo desde acá: los componentes solo renderizan.
 */

export const site = {
  name: "FluxWeb",
  legalName: "Flux Webpages",
  tagline: "Diseño, desarrollo y automatización para emprendimientos.",
  description:
    "Estudio de diseño y desarrollo web. Creamos sitios a medida para emprendimientos y automatizamos las tareas repetitivas de tu negocio.",
  email: "fluxwebpages@gmail.com",
  instagram: {
    handle: "@fluxwebpages",
    url: "https://www.instagram.com/fluxwebpages/",
  },
  repo: "https://github.com/frafrafran/fluxweb",
  /** Reemplazar por el dominio definitivo cuando se publique. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://fluxweb.vercel.app",
} as const;

export const navLinks = [
  { href: "/#servicios", label: "Servicios" },
  { href: "/#trabajos", label: "Trabajos" },
  { href: "/#proceso", label: "Proceso" },
  { href: "/#equipo", label: "Equipo" },
] as const;

export type Service = {
  id: string;
  title: string;
  body: string;
  points: string[];
};

export const services: Service[] = [
  {
    id: "sitios",
    title: "Sitios a medida",
    body: "Diseñamos y programamos cada sitio desde cero, con la identidad de tu marca y sin plantillas de por medio.",
    points: ["Landing y sitios institucionales", "Catálogos", "Blogs y contenido"],
  },
  {
    id: "tiendas",
    title: "Tiendas y reservas",
    body: "Vendé o tomá turnos sin depender de responder mensajes uno por uno.",
    points: ["Carrito y pagos", "Turnos online", "Panel de administración"],
  },
  {
    id: "automatizacion",
    title: "Automatización",
    body: "Conectamos los formularios, la planilla, el mail y WhatsApp para que el trabajo repetido se haga solo.",
    points: ["Respuestas automáticas", "Reportes semanales", "Integraciones con IA"],
  },
  {
    id: "mantenimiento",
    title: "Mantenimiento",
    body: "El sitio queda vivo: cambios, copias de seguridad y monitoreo mes a mes.",
    points: ["Cambios de contenido", "Backups", "Monitoreo y velocidad"],
  },
  {
    id: "marca",
    title: "Marca y contenido",
    body: "Si la identidad todavía no existe, la construimos: logotipo, paleta, tono y textos que suenan a vos.",
    points: ["Identidad visual", "Textos del sitio", "Contenido para redes"],
  },
];

export type Project = {
  slug: string;
  name: string;
  sector: string;
  year: string;
  summary: string;
  contributions: string[];
  url: string;
  image: string;
  imageAlt: string;
  /** Preview: desplegado y navegable, todavía sin dominio propio. */
  status: "Preview" | "En línea";
};

export const projects: Project[] = [
  {
    slug: "mirande-aybar",
    name: "Mirande Aybar",
    sector: "Inmobiliaria · Valle de Calamuchita",
    year: "2026",
    summary:
      "Una inmobiliaria con quince años en el valle que trabajaba por teléfono y recomendación. Armamos el catálogo de propiedades y un camino claro para consultar.",
    contributions: ["Identidad y dirección de arte", "Catálogo de propiedades", "Consultas por WhatsApp"],
    url: "https://mirande-aybar.vercel.app/",
    image: "/work/mirande-aybar.webp",
    imageAlt:
      "Portada del sitio de Mirande Aybar: fotografía de las sierras al amanecer con el título Casas, campos y terrenos.",
    status: "Preview",
  },
  {
    slug: "beclean",
    name: "BeClean",
    sector: "Laboratorio de limpieza · PYAM",
    year: "2026",
    summary:
      "Un producto técnico que necesitaba explicarse en treinta segundos. Construimos el argumento en pantalla: mecanismo, evidencia y cotización.",
    contributions: ["Arquitectura del argumento", "Sitio de producto", "Pedido de cotización"],
    url: "https://becleanflux.vercel.app/",
    image: "/work/beclean-flux.webp",
    imageAlt:
      "Portada del sitio de BeClean: fondo oscuro con el título Limpiemos hoy, cuidando el mañana y una tableta efervescente.",
    status: "Preview",
  },
];

export type ProcessStep = {
  id: string;
  title: string;
  body: string;
  detail: string[];
};

export const processSteps: ProcessStep[] = [
  {
    id: "entender",
    title: "Entender",
    body: "Media hora de charla para saber qué vendés, a quién y qué te está frenando hoy.",
    detail: ["Objetivos del negocio", "Público y competencia", "Alcance y presupuesto"],
  },
  {
    id: "disenar",
    title: "Diseñar",
    body: "Antes de programar mostramos cómo se va a ver y cómo se va a usar, pantalla por pantalla.",
    detail: ["Estructura de la información", "Diseño en escritorio y celular", "Textos del sitio"],
  },
  {
    id: "construir",
    title: "Construir",
    body: "Desarrollo a medida, rápido y accesible. Vas viendo avances reales, no capturas.",
    detail: ["Código propio, sin plantillas", "Velocidad y SEO técnico", "Enlace de prueba permanente"],
  },
  {
    id: "sostener",
    title: "Lanzar y sostener",
    body: "Publicamos, medimos y seguimos al lado tuyo para que el sitio acompañe al negocio.",
    detail: ["Dominio y publicación", "Medición de visitas", "Cambios y soporte"],
  },
];

export type AutomationCase = {
  id: string;
  pain: string;
  title: string;
  flow: [string, string, string];
  result: string;
};

export const automationCases: AutomationCase[] = [
  {
    id: "consultas",
    pain: "Respondo las mismas preguntas todo el día",
    title: "Respuestas y derivación automática",
    flow: [
      "Alguien consulta desde el sitio o Instagram",
      "El sistema responde al instante y clasifica el pedido",
      "Te llega solo lo que necesita una respuesta humana",
    ],
    result: "Menos mensajes repetidos y ninguna consulta perdida a la madrugada.",
  },
  {
    id: "presupuestos",
    pain: "Armo cada presupuesto a mano",
    title: "Presupuestos generados solos",
    flow: [
      "El cliente completa un formulario con su pedido",
      "Se calcula el precio con tus reglas y tu lista actualizada",
      "Sale el PDF firmado a su correo y queda registrado",
    ],
    result: "De cuarenta minutos por presupuesto a una revisión rápida.",
  },
  {
    id: "turnos",
    pain: "Coordino turnos por WhatsApp",
    title: "Agenda que se completa sola",
    flow: [
      "La persona elige día y horario disponible",
      "Se bloquea en tu calendario y se cobra la seña",
      "Recibe el recordatorio antes de la cita",
    ],
    result: "Menos ausencias y una agenda que siempre dice la verdad.",
  },
  {
    id: "reportes",
    pain: "No sé qué está funcionando",
    title: "Reporte semanal en tu correo",
    flow: [
      "Se juntan visitas, consultas y ventas del sitio",
      "Se comparan con la semana anterior",
      "Llega un resumen corto todos los lunes",
    ],
    result: "Decisiones con datos, sin abrir cinco paneles distintos.",
  },
];

export type TeamMember = {
  name: string;
  initials: string;
  role: string;
  focus: string;
  instagram: string;
  handle: string;
};

export const team: TeamMember[] = [
  {
    name: "Francisco Aybar",
    initials: "FA",
    role: "Desarrollo fullstack",
    focus: "Arquitectura, interfaz y performance de cada proyecto.",
    instagram: "https://www.instagram.com/franciscoaybarr/",
    handle: "@franciscoaybarr",
  },
  {
    name: "Joaquín Puga",
    initials: "JP",
    role: "Desarrollo y soporte",
    focus: "Integraciones, mantenimiento y atención después del lanzamiento.",
    instagram: "https://www.instagram.com/joacopugaa/",
    handle: "@joacopugaa",
  },
  {
    name: "Joaquín Castellano",
    initials: "JC",
    role: "Marketing",
    focus: "Posicionamiento, contenido y campañas para que el sitio traiga gente.",
    instagram: "https://www.instagram.com/joacocastellanoo/",
    handle: "@joacocastellanoo",
  },
];

export const faqs = [
  {
    q: "¿Cuánto cuesta un sitio?",
    a: "Depende del alcance: no es lo mismo una landing de una página que una tienda con pagos y panel. Después de la primera charla te pasamos un presupuesto cerrado, con etapas y fechas, para que no haya sorpresas a mitad de camino.",
  },
  {
    q: "¿Cuánto tarda?",
    a: "Una landing suele estar lista en dos a tres semanas. Un sitio con catálogo o tienda, entre cuatro y ocho. El plazo real depende sobre todo de qué tan rápido lleguen las fotos, los textos y las aprobaciones de tu lado.",
  },
  {
    q: "¿Qué necesito tener antes de empezar?",
    a: "Con que tengas claro qué vendés y a quién, alcanza. Si ya tenés logotipo, fotos y textos, los usamos. Si no, los hacemos nosotros: es parte del trabajo y lo cotizamos aparte para que veas cada cosa.",
  },
  {
    q: "¿El dominio y el hosting van por separado?",
    a: "El dominio se compra a tu nombre y queda tuyo, siempre. La publicación la resolvemos en infraestructura moderna con costo bajo o nulo según el proyecto, y te explicamos exactamente qué se paga y a quién.",
  },
  {
    q: "¿Puedo cambiar cosas después?",
    a: "Sí. Dejamos el contenido editable donde tiene sentido y, si preferís no tocar nada, el plan de mantenimiento incluye los cambios del mes. Nunca vas a quedar atado a nosotros para modificar un texto.",
  },
  {
    q: "¿Hacen automatizaciones sin rehacer mi web?",
    a: "Sí. Muchas veces el sitio está bien y lo que falta es conectar el formulario con la planilla, el correo o WhatsApp. Podemos trabajar solo sobre eso, sin tocar el diseño existente.",
  },
] as const;

export const projectTypes = [
  "Sitio web nuevo",
  "Rediseño de mi sitio",
  "Tienda online o reservas",
  "Automatización de procesos",
  "Marca y contenido",
  "Todavía no lo tengo claro",
] as const;
