/**
 * Diccionario en español: el idioma base del sitio.
 * Acá vive todo el texto que se lee en pantalla. Los datos que no cambian con
 * el idioma (enlaces, imágenes, usuarios, colores) siguen en `src/lib/site.ts`.
 *
 * `en.ts` tiene que tener exactamente las mismas claves: el tipo `Dictionary`
 * se deriva de este archivo y TypeScript avisa si falta alguna.
 */
export const es = {
  meta: {
    title: "FluxWeb · Webs a medida para emprendimientos",
    description:
      "Estudio de diseño y desarrollo web. Creamos sitios a medida para emprendimientos y automatizamos las tareas repetitivas de tu negocio.",
    tagline: "Diseño, desarrollo y automatización para emprendimientos.",
    keywords: [
      "diseño web",
      "desarrollo web",
      "páginas web para emprendimientos",
      "automatización de procesos",
      "tienda online",
      "Argentina",
    ],
    serviceTypes: [
      "Diseño web",
      "Desarrollo web",
      "Tiendas online",
      "Automatización de procesos",
    ],
    brandTitle: "Identidad de marca",
    brandDescription:
      "Sistema visual de FluxWeb: símbolo, logotipo, paleta, tipografía y tono de voz, con los archivos listos para descargar.",
  },

  nav: {
    links: {
      servicios: "Servicios",
      trabajos: "Trabajos",
      proceso: "Proceso",
      equipo: "Equipo",
    },
    contact: "Contacto",
    cta: "Empezar mi proyecto",
    skip: "Saltar al contenido",
    home: "FluxWeb, ir al inicio",
    sections: "Secciones del sitio",
    menu: "Menú",
    menuOpen: "Abrir menú",
    menuClose: "Cerrar menú",
    contactShortcut: "Ver datos de contacto",
    writeUs: "Escribinos directo",
    theme: "Cambiar entre tema claro y oscuro",
    /** Rótulo del cambio de idioma: nombra el idioma al que se va. */
    switchLanguage: "Switch to English",
    switchShort: "EN",
    switchLang: "en",
  },

  hero: {
    eyebrow: "Estudio de diseño y desarrollo",
    titleStart: "La web que tu",
    titleMid: "emprendimiento",
    titleEm: "merece",
    subtitle:
      "Sitios a medida, tiendas y automatizaciones para negocios que ya no entran en una plantilla.",
    cta: "Empezar mi proyecto",
    secondary: "Ver trabajos",
  },

  showreel: {
    eyebrow: "Así se ve",
    titleStart: "Treinta segundos",
    titleEnd: "del estudio en movimiento.",
    hint: "Seguí bajando",
    play: "Reproducir el video",
    pause: "Pausar el video",
    videoLabel:
      "Video de presentación de FluxWeb, con la identidad del estudio y pantallas de ejemplo.",
  },

  manifesto: {
    headline:
      "Casi nadie te escribe en el primer intento. Compara, duda y se va con el que parece más serio.",
  },

  services: {
    eyebrow: "Qué hacemos",
    title: "Todo lo que tu negocio necesita en pantalla.",
    note: "Cada proyecto se programa desde cero: sin constructores visuales, sin código heredado que nadie entiende.",
    items: {
      sitios: {
        title: "Sitios a medida",
        body: "Diseñamos y programamos cada sitio desde cero, con la identidad de tu marca y sin plantillas de por medio.",
        points: [
          "Landing y sitios institucionales",
          "Catálogos",
          "Blogs y contenido",
        ],
      },
      tiendas: {
        title: "Tiendas y reservas",
        body: "Vendé o tomá turnos sin depender de responder mensajes uno por uno.",
        points: ["Carrito y pagos", "Turnos online", "Panel de administración"],
      },
      automatizacion: {
        title: "Automatización",
        body: "Conectamos los formularios, la planilla, el mail y WhatsApp para que el trabajo repetido se haga solo.",
        points: [
          "Respuestas automáticas",
          "Reportes semanales",
          "Integraciones con IA",
        ],
      },
      mantenimiento: {
        title: "Mantenimiento",
        body: "El sitio queda vivo: cambios, copias de seguridad y monitoreo mes a mes.",
        points: ["Cambios de contenido", "Backups", "Monitoreo y velocidad"],
      },
      marca: {
        title: "Marca y contenido",
        body: "Si la identidad todavía no existe, la construimos: logotipo, paleta, tono y textos que suenan a vos.",
        points: [
          "Identidad visual",
          "Textos del sitio",
          "Contenido para redes",
        ],
      },
    },
  },

  work: {
    title: "Lo último que construimos.",
    seeSite: "Ver sitio",
    openAria: "Ver el sitio de {name} en una pestaña nueva",
    status: { preview: "Preview", live: "En línea" },
    projects: {
      "mirande-aybar": {
        sector: "Inmobiliaria · Valle de Calamuchita",
        summary:
          "Una inmobiliaria con quince años en el valle que trabajaba por teléfono y recomendación. Armamos el catálogo de propiedades y un camino claro para consultar.",
        contributions: [
          "Identidad y dirección de arte",
          "Catálogo de propiedades",
          "Consultas por WhatsApp",
        ],
        imageAlt:
          "Portada del sitio de Mirande Aybar: el nombre de la inmobiliaria en letras grandes sobre una fotografía de Villa General Belgrano, con la torre de la iglesia y los techos entre los árboles.",
      },
      beclean: {
        sector: "Laboratorio de limpieza · PYAM",
        summary:
          "Un producto técnico que necesitaba explicarse en treinta segundos. Construimos el argumento en pantalla: mecanismo, evidencia y cotización.",
        contributions: [
          "Arquitectura del argumento",
          "Sitio de producto",
          "Pedido de cotización",
        ],
        imageAlt:
          "Portada del sitio de BeClean: fondo oscuro con el título Limpiemos hoy, cuidando el mañana y una tableta efervescente rodeada de burbujas.",
      },
    },
  },

  showcase: {
    title: "El próximo puede ser el tuyo.",
    body: "Todo lo que se ve acá arriba está en línea y se puede recorrer. No son maquetas ni plantillas de muestra.",
    cta: "Empezar mi proyecto",
  },

  stack: {
    eyebrow: "Con qué lo construimos",
    title: "Herramientas conocidas, no inventos nuestros.",
    body: "Todo lo que usamos es estándar y está documentado. Si mañana querés llevarte el proyecto a otro equipo, cualquier persona que programe para la web va a entender el código.",
    roles: {
      "Next.js": "estructura del sitio",
      React: "interfaz",
      TypeScript: "tipos y errores",
      "Tailwind CSS": "estilos",
      Motion: "animación",
      GSAP: "scroll",
      "Three.js": "3D",
      Vercel: "publicación",
      Resend: "correo",
      Figma: "diseño",
    },
  },

  process: {
    eyebrow: "Cómo trabajamos",
    title: "Cuatro etapas, sin sorpresas en el medio.",
    stage: "Etapa",
    of: "de",
    steps: {
      entender: {
        title: "Entender",
        body: "Media hora de charla para saber qué vendés, a quién y qué te está frenando hoy.",
        detail: [
          "Objetivos del negocio",
          "Público y competencia",
          "Alcance y presupuesto",
        ],
      },
      disenar: {
        title: "Diseñar",
        body: "Antes de programar mostramos cómo se va a ver y cómo se va a usar, pantalla por pantalla.",
        detail: [
          "Estructura de la información",
          "Diseño en escritorio y celular",
          "Textos del sitio",
        ],
      },
      construir: {
        title: "Construir",
        body: "Desarrollo a medida, rápido y accesible. Vas viendo avances reales, no capturas.",
        detail: [
          "Código propio, sin plantillas",
          "Velocidad y SEO técnico",
          "Enlace de prueba permanente",
        ],
      },
      sostener: {
        title: "Lanzar y sostener",
        body: "Publicamos, medimos y seguimos al lado tuyo para que el sitio acompañe al negocio.",
        detail: [
          "Dominio y publicación",
          "Medición de visitas",
          "Cambios y soporte",
        ],
      },
    },
  },

  parallax: {
    aria: "El flujo de la marca",
    title: "Un flujo, de punta a punta.",
    body: "Diseño, desarrollo, publicación y soporte los hace el mismo equipo. No hay traspasos ni nadie a quien reclamarle lo que hizo otro.",
  },

  automation: {
    title: "¿Qué te está comiendo el día?",
    body: "Elegí lo que más te suene. Del otro lado está la automatización que armaríamos para tu negocio.",
    tablist: "Tareas para automatizar",
    labels: ["Entra", "Sucede", "Sale"],
    cta: "Empezar mi proyecto",
    cases: {
      consultas: {
        pain: "Respondo las mismas preguntas todo el día",
        title: "Respuestas y derivación automática",
        flow: [
          "Alguien consulta desde el sitio o Instagram",
          "El sistema responde al instante y clasifica el pedido",
          "Te llega solo lo que necesita una respuesta humana",
        ],
        result:
          "Menos mensajes repetidos y ninguna consulta perdida a la madrugada.",
      },
      presupuestos: {
        pain: "Armo cada presupuesto a mano",
        title: "Presupuestos generados solos",
        flow: [
          "El cliente completa un formulario con su pedido",
          "Se calcula el precio con tus reglas y tu lista actualizada",
          "Sale el PDF firmado a su correo y queda registrado",
        ],
        result: "Del presupuesto armado a mano a una revisión rápida.",
      },
      turnos: {
        pain: "Coordino turnos por WhatsApp",
        title: "Agenda que se completa sola",
        flow: [
          "La persona elige día y horario disponible",
          "Se bloquea en tu calendario y se cobra la seña",
          "Recibe el recordatorio antes de la cita",
        ],
        result: "Menos ausencias y una agenda que siempre dice la verdad.",
      },
      reportes: {
        pain: "No sé qué está funcionando",
        title: "Reporte semanal en tu correo",
        flow: [
          "Se juntan visitas, consultas y ventas del sitio",
          "Se comparan con la semana anterior",
          "Llega un resumen corto todos los lunes",
        ],
        result: "Decisiones con datos, sin abrir cinco paneles distintos.",
      },
    },
  },

  reach: {
    eyebrow: "Alcance",
    title: "Trabajamos a distancia, sin que se note.",
    body: "El taller está en Argentina y todo el proceso funciona en remoto: la charla inicial, las revisiones y el soporte de después.",
  },

  gallery: {
    eyebrow: "Referencias",
    title: "La vara que nos ponemos.",
    body: "Bocetos, esquemas, paletas y pantallas: el oficio que hay detrás de un sitio bien hecho. No son trabajos nuestros —esos están más arriba—, son imágenes de referencia.",
    expand: "Ampliar",
    close: "Cerrar",
    prev: "Imagen anterior",
    next: "Imagen siguiente",
    goTo: "Ir a la imagen",
    alts: {
      "panel-analitica":
        "Panel de analítica en modo oscuro, con gráficos de sesiones y tiempos de carga.",
      "landing-conversion":
        "Monitor, tableta y teléfono mostrando el diseño de una página de aterrizaje.",
      "portada-oscura":
        "Portada de un sitio de cursos en modo oscuro, abierta en un editor de diseño.",
      "app-viajes":
        "Aplicación de viajes en un teléfono, con tarjetas de destinos en la pantalla de atrás.",
      "tablero-metricas":
        "Tablero de métricas con gráficos de área, abierto en una notebook.",
      "esquema-tablet":
        "Esquema de una página dibujado en una tableta: encabezado, bloques y pie.",
      "paleta-color":
        "Escritorio de diseño con muestras de color y una tableta gráfica.",
      "escritorio-estudio":
        "Escritorio de estudio con maquetas impresas, teléfonos y una notebook.",
      "boceto-equipo":
        "Equipo dibujando esquemas de pantalla sobre papel, con notas de colores.",
      "boceto-mano": "Mano dibujando a lápiz la estructura de una pantalla.",
      "esquemas-tablero":
        "Esquemas de pantallas colgados en un tablero para ordenar el recorrido.",
    },
  },

  team: {
    title: "Tres personas, no una agencia anónima.",
    body: "Vas a hablar siempre con quien hace el trabajo. Sin intermediarios ni tickets que nadie contesta.",
    aria: "{name}, {role}. Instagram {handle}",
    members: {
      franciscoaybarr: {
        role: "Desarrollo fullstack",
        focus: "Arquitectura, interfaz y performance de cada proyecto.",
      },
      joacopugaa: {
        role: "Desarrollo y soporte",
        focus:
          "Integraciones, mantenimiento y atención después del lanzamiento.",
      },
      joacocastellanoo: {
        role: "Marketing",
        focus:
          "Posicionamiento, contenido y campañas para que el sitio traiga gente.",
      },
    },
  },

  promise: {
    aria: "Nuestro compromiso",
    title: "Sin letra chica.",
    body: "Precio cerrado antes de empezar, etapas con fecha, y el dominio siempre a tu nombre. Si algo cambia en el camino, lo hablamos antes de tocarlo.",
  },

  faq: {
    title: "Preguntas que siempre nos hacen.",
    items: [
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
    ],
  },

  contact: {
    eyebrow: "Empecemos",
    title: "Contanos qué querés construir.",
    steps: [
      "Leemos tu mensaje y respondemos con preguntas concretas.",
      "Charlamos media hora por videollamada o por donde te quede cómodo.",
      "Te pasamos un presupuesto cerrado, con etapas y fechas.",
    ],
    form: {
      name: "Nombre",
      namePlaceholder: "Tu nombre",
      email: "Correo",
      emailPlaceholder: "nombre@correo.com",
      type: "Qué necesitás",
      project: "Tu proyecto",
      projectPlaceholder:
        "Qué vendés, a quién y qué te gustaría lograr con el sitio.",
      projectHint: "Con dos o tres líneas alcanza para la primera respuesta.",
      honeypot: "No completar",
      submit: "Enviar consulta",
      sending: "Enviando",
      privacy: "Usamos tus datos solo para responderte esta consulta.",
      successTitle: "Mensaje enviado.",
      types: [
        "Sitio web nuevo",
        "Rediseño de mi sitio",
        "Tienda online o reservas",
        "Automatización de procesos",
        "Marca y contenido",
        "Todavía no lo tengo claro",
      ],
    },
    /** Mensajes que devuelve la Server Action. `{email}` se reemplaza. */
    action: {
      honeypot: "Gracias, recibimos tu mensaje.",
      nameError: "Contanos cómo te llamás.",
      emailError: "Revisá el correo, no parece válido.",
      typeError: "Elegí una opción de la lista.",
      messageError: "Escribí al menos una línea sobre tu proyecto.",
      missing: "Faltan algunos datos para poder responderte.",
      rateLimited:
        "Recibimos varios mensajes desde este dispositivo. Escribinos a {email}.",
      notConnected:
        "El formulario todavía no está conectado. Escribinos a {email} y te respondemos hoy.",
      sendFailed:
        "No pudimos enviar el mensaje. Probá de nuevo o escribinos a {email}.",
      success: "Listo. Te respondemos dentro de las próximas 24 horas hábiles.",
      subject: "Consulta web",
      mailName: "Nombre",
      mailEmail: "Correo",
      mailType: "Tipo de proyecto",
    },
  },

  footer: {
    aria: "Pie de página",
    site: "Sitio",
    team: "Equipo",
    brand: "Marca",
    identity: "Identidad FluxWeb",
    contact: "Contacto",
    backToTop: "Volver arriba",
    code: "Código del sitio",
  },

  notFound: {
    code: "Error 404",
    title: "Esta página no existe.",
    body: "Puede que el enlace haya cambiado o que la dirección tenga un error. Desde el inicio llegás a todo.",
    back: "Volver al inicio",
  },

  error: {
    title: "Algo se rompió de nuestro lado.",
    before: "Probá de nuevo. Si vuelve a pasar, escribinos a",
    after: "y lo revisamos.",
    retry: "Reintentar",
  },

  brand: {
    back: "Volver al inicio",
    title: "La identidad de FluxWeb.",
    intro:
      "Un símbolo, dos colores y dos familias tipográficas. Este es el sistema con el que firmamos todo lo que hacemos, y el mismo que construimos para las marcas que confían en nosotros.",
    symbolTitle: "El símbolo",
    symbolBody:
      "Dos lazos que se cruzan y no terminan nunca. Es un flujo: la gente que llega, el pedido que entra, la tarea que se resuelve sola y vuelve a empezar. Se dibuja con un trazo de grosor constante, sin puntas ni sombras.",
    clearSpace:
      "Alrededor del logotipo dejamos siempre un aire equivalente a la altura de la letra F. Nunca se usa por debajo de 24 píxeles de alto en pantalla.",
    colorTitle: "Color",
    colorNote:
      "El oliva y la crema son los únicos colores de marca. Todo lo demás son neutros derivados de esos dos. Cada combinación de texto y fondo del sitio cumple el contraste mínimo AA de las pautas WCAG.",
    palette: {
      olive: {
        name: "Oliva FluxWeb",
        use: "Acento único: botones, enlaces y bloques de color.",
      },
      cream: {
        name: "Crema",
        use: "Fondo principal del modo claro. Es el papel de la marca.",
      },
      creamDeep: {
        name: "Crema profunda",
        use: "Superficies que separan una sección de la siguiente.",
      },
      ink: { name: "Tinta", use: "Texto principal sobre crema." },
      night: { name: "Oliva noche", use: "Fondo del modo oscuro." },
      oliveLight: {
        name: "Oliva claro",
        use: "El acento en modo oscuro, para sostener el contraste.",
      },
    },
    typeTitle: "Tipografía",
    typeBody:
      "El logotipo es una serif de alto contraste, así que los títulos la acompañan. El texto corriente usa una grotesca neutra para que la lectura sea cómoda en pantallas chicas.",
    typeDisplay: "Playfair Display · títulos",
    typeText: "Geist · texto e interfaz",
    typeMono: "Geist Mono · etiquetas",
    sampleDisplay: "La web que tu emprendimiento merece.",
    sampleText: "Sitios a medida, tiendas y automatizaciones.",
    sampleMono: "Qué hacemos",
    voiceTitle: "Tono de voz",
    voice: [
      {
        title: "Directo",
        body: "Frases cortas, sin vueltas. Si algo se puede decir en cinco palabras, se dice en cinco.",
      },
      {
        title: "Concreto",
        body: "Hablamos de lo que hacemos y de lo que cuesta. Nada de promesas que no podamos sostener.",
      },
      {
        title: "Cercano",
        body: "Tuteo argentino, como en una charla de trabajo. Ni solemnes ni forzadamente graciosos.",
      },
      {
        title: "Sin jerga",
        body: "Si una palabra técnica no aporta, se reemplaza. El cliente no tiene por qué saber qué es un framework.",
      },
    ],
    misuseTitle: "Qué no hacer",
    misuses: [
      "Estirar o comprimir el símbolo: siempre escala proporcional.",
      "Rotarlo o inclinarlo. El nudo se lee en una sola posición.",
      "Aplicar sombras, brillos o degradados sobre el trazo.",
      "Colocarlo sobre fotos con poco contraste sin una capa que lo separe.",
      "Cambiar el color por fuera de la paleta: oliva, crema o tinta.",
    ],
    filesTitle: "Archivos",
    filesBody:
      "El SVG es vectorial: sirve para imprenta y para cualquier tamaño. Los PNG tienen fondo transparente y van bien en redes y documentos. Cualquier otro formato lo preparamos, escribinos a",
    downloads: {
      "lockup.svg": "Logotipo completo",
      "mark.svg": "Símbolo",
      "lockup-olive.png": "Logotipo oliva",
      "lockup-cream.png": "Logotipo crema",
      "mark-olive.png": "Símbolo oliva",
      "mark-cream.png": "Símbolo crema",
    },
  },
};

export type Dictionary = typeof es;
