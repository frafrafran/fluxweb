import type { Dictionary } from "./es";

/**
 * English dictionary.
 * Same keys as `es.ts`; TypeScript fails the build if one goes missing.
 * The voice stays the same as the Spanish original: short, concrete, warm,
 * no jargon.
 */
export const en: Dictionary = {
  meta: {
    title: "FluxWeb · Custom websites for small businesses",
    description:
      "Web design and development studio. We build custom websites for small businesses and automate the repetitive work behind them.",
    tagline: "Design, development and automation for small businesses.",
    keywords: [
      "web design",
      "web development",
      "websites for small businesses",
      "process automation",
      "online store",
      "Argentina",
    ],
    serviceTypes: [
      "Web design",
      "Web development",
      "Online stores",
      "Process automation",
    ],
    brandTitle: "Brand identity",
    brandDescription:
      "The FluxWeb visual system: symbol, logo, palette, typography and tone of voice, with the files ready to download.",
  },

  nav: {
    links: {
      servicios: "Services",
      trabajos: "Work",
      proceso: "Process",
      equipo: "Team",
    },
    contact: "Contact",
    cta: "Start my project",
    skip: "Skip to content",
    home: "FluxWeb, go to the top",
    sections: "Site sections",
    menu: "Menu",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    contactShortcut: "See contact details",
    writeUs: "Write to us directly",
    theme: "Switch between light and dark theme",
    switchLanguage: "Cambiar a español",
    switchShort: "ES",
    switchLang: "es",
  },

  hero: {
    eyebrow: "Design and development studio",
    titleStart: "The website your",
    titleMid: "business",
    titleEm: "deserves",
    subtitle:
      "Custom websites, stores and automations for businesses that no longer fit in a template.",
    cta: "Start my project",
    secondary: "See our work",
  },

  showreel: {
    eyebrow: "What it looks like",
    titleStart: "Thirty seconds",
    titleEnd: "of the studio in motion.",
    hint: "Keep scrolling",
    play: "Play the video",
    pause: "Pause the video",
    videoLabel:
      "FluxWeb presentation video, with the studio's identity and sample screens.",
  },

  manifesto: {
    headline:
      "Almost nobody writes to you on the first try. They compare, hesitate, and go with whoever looks more serious.",
  },

  services: {
    eyebrow: "What we do",
    title: "Everything your business needs on screen.",
    note: "Every project is coded from scratch: no page builders, no inherited code nobody understands.",
    items: {
      sitios: {
        title: "Custom websites",
        body: "We design and build every site from scratch, with your brand's identity and no templates in between.",
        points: [
          "Landing pages and company sites",
          "Catalogs",
          "Blogs and content",
        ],
      },
      tiendas: {
        title: "Stores and bookings",
        body: "Sell or take appointments without answering messages one by one.",
        points: ["Cart and payments", "Online bookings", "Admin dashboard"],
      },
      automatizacion: {
        title: "Automation",
        body: "We connect your forms, spreadsheet, email and WhatsApp so the repetitive work does itself.",
        points: ["Automatic replies", "Weekly reports", "AI integrations"],
      },
      mantenimiento: {
        title: "Maintenance",
        body: "The site stays alive: changes, backups and monitoring, month after month.",
        points: ["Content changes", "Backups", "Monitoring and speed"],
      },
      marca: {
        title: "Brand and content",
        body: "If the identity doesn't exist yet, we build it: logo, palette, tone and copy that sounds like you.",
        points: ["Visual identity", "Website copy", "Social media content"],
      },
    },
  },

  work: {
    title: "The latest things we built.",
    seeSite: "Visit site",
    openAria: "Visit the {name} website in a new tab",
    status: { preview: "Preview", live: "Live" },
    projects: {
      "mirande-aybar": {
        sector: "Real estate · Calamuchita Valley",
        summary:
          "A real estate agency with fifteen years in the valley that worked by phone and word of mouth. We built the property catalog and a clear path to get in touch.",
        contributions: [
          "Identity and art direction",
          "Property catalog",
          "WhatsApp inquiries",
        ],
        imageAlt:
          "Mirande Aybar homepage: the agency's name in large letters over a photograph of Villa General Belgrano, with the church tower and rooftops among the trees.",
      },
      beclean: {
        sector: "Cleaning laboratory · PYAM",
        summary:
          "A technical product that had to explain itself in thirty seconds. We built the argument on screen: mechanism, evidence and quote.",
        contributions: [
          "Argument structure",
          "Product website",
          "Quote request",
        ],
        imageAlt:
          "BeClean homepage: a dark background with the headline Clean today, caring for tomorrow, and an effervescent tablet surrounded by bubbles.",
      },
    },
  },

  showcase: {
    title: "The next one could be yours.",
    body: "Everything you see above is live and can be browsed. These aren't mockups or sample templates.",
    cta: "Start my project",
  },

  stack: {
    eyebrow: "What we build with",
    title: "Well-known tools, not our own inventions.",
    body: "Everything we use is standard and documented. If tomorrow you want to take the project to another team, anyone who builds for the web will understand the code.",
    roles: {
      "Next.js": "site structure",
      React: "interface",
      TypeScript: "types and errors",
      "Tailwind CSS": "styles",
      Motion: "animation",
      GSAP: "scroll",
      "Three.js": "3D",
      Vercel: "hosting",
      Resend: "email",
      Figma: "design",
    },
  },

  process: {
    eyebrow: "How we work",
    title: "Four stages, no surprises in between.",
    stage: "Stage",
    of: "of",
    steps: {
      entender: {
        title: "Understand",
        body: "A half-hour conversation to learn what you sell, to whom, and what's holding you back today.",
        detail: [
          "Business goals",
          "Audience and competition",
          "Scope and budget",
        ],
      },
      disenar: {
        title: "Design",
        body: "Before writing code we show how it will look and how it will work, screen by screen.",
        detail: [
          "Information structure",
          "Desktop and mobile design",
          "Website copy",
        ],
      },
      construir: {
        title: "Build",
        body: "Custom development, fast and accessible. You see real progress, not screenshots.",
        detail: [
          "Our own code, no templates",
          "Speed and technical SEO",
          "Permanent preview link",
        ],
      },
      sostener: {
        title: "Launch and support",
        body: "We publish, measure and stay by your side so the site keeps up with the business.",
        detail: [
          "Domain and publishing",
          "Traffic measurement",
          "Changes and support",
        ],
      },
    },
  },

  parallax: {
    aria: "The brand's flow",
    title: "One flow, end to end.",
    body: "Design, development, publishing and support are done by the same team. No handoffs, and nobody to blame for what someone else did.",
  },

  automation: {
    title: "What's eating your day?",
    body: "Pick the one that sounds most like you. On the other side is the automation we'd build for your business.",
    tablist: "Tasks to automate",
    labels: ["In", "Happens", "Out"],
    cta: "Start my project",
    cases: {
      consultas: {
        pain: "I answer the same questions all day",
        title: "Automatic replies and routing",
        flow: [
          "Someone asks from the site or Instagram",
          "The system replies instantly and sorts the request",
          "Only what needs a human answer reaches you",
        ],
        result: "Fewer repeated messages and no inquiry lost at 3 a.m.",
      },
      presupuestos: {
        pain: "I build every quote by hand",
        title: "Quotes that generate themselves",
        flow: [
          "The client fills in a form with their request",
          "The price is calculated with your rules and your current price list",
          "A signed PDF goes to their inbox and gets logged",
        ],
        result: "From quotes built by hand to a quick review.",
      },
      turnos: {
        pain: "I schedule appointments over WhatsApp",
        title: "A calendar that fills itself",
        flow: [
          "The person picks an available day and time",
          "It's blocked on your calendar and the deposit is charged",
          "They get a reminder before the appointment",
        ],
        result: "Fewer no-shows and a calendar that always tells the truth.",
      },
      reportes: {
        pain: "I don't know what's working",
        title: "A weekly report in your inbox",
        flow: [
          "Visits, inquiries and sales from the site are gathered",
          "They're compared with the previous week",
          "A short summary arrives every Monday",
        ],
        result:
          "Decisions with data, without opening five different dashboards.",
      },
    },
  },

  reach: {
    eyebrow: "Reach",
    title: "We work remotely, and you won't notice.",
    body: "The studio is in Argentina and the whole process runs remotely: the first conversation, the reviews and the support afterwards.",
  },

  gallery: {
    eyebrow: "References",
    title: "The bar we set ourselves.",
    body: "Sketches, wireframes, palettes and screens: the craft behind a well-made site. These aren't our projects — ours are further up — they're reference images.",
    expand: "Enlarge",
    close: "Close",
    prev: "Previous image",
    next: "Next image",
    goTo: "Go to image",
    alts: {
      "panel-analitica":
        "Dark-mode analytics dashboard with session and load-time charts.",
      "landing-conversion":
        "Monitor, tablet and phone showing a landing page design.",
      "portada-oscura":
        "Dark-mode course website homepage, open in a design editor.",
      "app-viajes":
        "Travel app on a phone, with destination cards on the screen behind it.",
      "tablero-metricas": "Metrics dashboard with area charts, open on a laptop.",
      "esquema-tablet":
        "Page wireframe drawn on a tablet: header, blocks and footer.",
      "paleta-color": "Design desk with colour swatches and a graphics tablet.",
      "escritorio-estudio":
        "Studio desk with printed layouts, phones and a laptop.",
      "boceto-equipo":
        "A team sketching screen layouts on paper, with coloured notes.",
      "boceto-mano": "A hand sketching the structure of a screen in pencil.",
      "esquemas-tablero":
        "Screen wireframes pinned to a board to lay out the journey.",
    },
  },

  team: {
    title: "Three people, not an anonymous agency.",
    body: "You'll always talk to the person doing the work. No middlemen, no tickets nobody answers.",
    aria: "{name}, {role}. Instagram {handle}",
    members: {
      franciscoaybarr: {
        role: "Full-stack development",
        focus: "Architecture, interface and performance of every project.",
      },
      joacopugaa: {
        role: "Development and support",
        focus: "Integrations, maintenance and care after launch.",
      },
      joacocastellanoo: {
        role: "Marketing",
        focus:
          "Positioning, content and campaigns so the site brings people in.",
      },
    },
  },

  promise: {
    aria: "Our commitment",
    title: "No fine print.",
    body: "A fixed price before we start, stages with dates, and the domain always in your name. If something changes along the way, we talk about it before touching anything.",
  },

  faq: {
    title: "Questions we always get asked.",
    items: [
      {
        q: "How much does a website cost?",
        a: "It depends on the scope: a one-page landing isn't the same as a store with payments and a dashboard. After the first conversation we send you a fixed quote, with stages and dates, so there are no surprises halfway through.",
      },
      {
        q: "How long does it take?",
        a: "A landing page is usually ready in two to three weeks. A site with a catalog or store, between four and eight. The real timeline depends mostly on how fast the photos, copy and approvals arrive from your side.",
      },
      {
        q: "What do I need before we start?",
        a: "Knowing what you sell and to whom is enough. If you already have a logo, photos and copy, we use them. If not, we make them: it's part of the work and we quote it separately so you can see each item.",
      },
      {
        q: "Are the domain and hosting separate?",
        a: "The domain is bought in your name and stays yours, always. We handle publishing on modern infrastructure at low or no cost depending on the project, and we explain exactly what is paid and to whom.",
      },
      {
        q: "Can I change things later?",
        a: "Yes. We leave the content editable where it makes sense and, if you'd rather not touch anything, the maintenance plan covers the month's changes. You'll never be tied to us to change a line of text.",
      },
      {
        q: "Do you build automations without redoing my website?",
        a: "Yes. Often the site is fine and what's missing is connecting the form to the spreadsheet, email or WhatsApp. We can work on that alone, without touching the existing design.",
      },
    ],
  },

  contact: {
    eyebrow: "Let's start",
    title: "Tell us what you want to build.",
    steps: [
      "We read your message and reply with concrete questions.",
      "We talk for half an hour on a video call, or wherever suits you.",
      "We send you a fixed quote, with stages and dates.",
    ],
    form: {
      name: "Name",
      namePlaceholder: "Your name",
      email: "Email",
      emailPlaceholder: "name@email.com",
      type: "What you need",
      project: "Your project",
      projectPlaceholder:
        "What you sell, to whom, and what you'd like the site to achieve.",
      projectHint: "Two or three lines are enough for a first reply.",
      honeypot: "Leave empty",
      submit: "Send inquiry",
      sending: "Sending",
      privacy: "We only use your details to reply to this inquiry.",
      successTitle: "Message sent.",
      types: [
        "New website",
        "Redesign of my website",
        "Online store or bookings",
        "Process automation",
        "Brand and content",
        "I'm not sure yet",
      ],
    },
    action: {
      honeypot: "Thanks, we received your message.",
      nameError: "Tell us your name.",
      emailError: "Check the email, it doesn't look valid.",
      typeError: "Pick an option from the list.",
      messageError: "Write at least one line about your project.",
      missing: "Some details are missing before we can reply.",
      rateLimited:
        "We received several messages from this device. Write to us at {email}.",
      notConnected:
        "The form isn't connected yet. Write to us at {email} and we'll reply today.",
      sendFailed:
        "We couldn't send the message. Try again or write to us at {email}.",
      success: "Done. We'll reply within the next 24 business hours.",
      subject: "Website inquiry",
      mailName: "Name",
      mailEmail: "Email",
      mailType: "Project type",
    },
  },

  footer: {
    aria: "Footer",
    site: "Site",
    team: "Team",
    brand: "Brand",
    identity: "FluxWeb identity",
    contact: "Contact",
    backToTop: "Back to top",
    code: "Site source code",
  },

  notFound: {
    code: "Error 404",
    title: "This page doesn't exist.",
    body: "The link may have changed or the address may have a typo. From the home page you can reach everything.",
    back: "Back to home",
  },

  error: {
    title: "Something broke on our side.",
    before: "Try again. If it happens again, write to us at",
    after: "and we'll look into it.",
    retry: "Retry",
  },

  brand: {
    back: "Back to home",
    title: "The FluxWeb identity.",
    intro:
      "One symbol, two colors and two type families. This is the system we sign everything we do with, and the same one we build for the brands that trust us.",
    symbolTitle: "The symbol",
    symbolBody:
      "Two loops that cross and never end. It's a flow: the people who arrive, the order that comes in, the task that resolves itself and starts again. It's drawn with a stroke of constant weight, no tips, no shadows.",
    clearSpace:
      "Around the logo we always leave clear space equal to the height of the letter F. It's never used below 24 pixels tall on screen.",
    colorTitle: "Color",
    colorNote:
      "Olive and cream are the only brand colors. Everything else is a neutral derived from those two. Every text and background combination on the site meets the WCAG AA minimum contrast.",
    palette: {
      olive: {
        name: "FluxWeb olive",
        use: "The single accent: buttons, links and color blocks.",
      },
      cream: {
        name: "Cream",
        use: "Main background of the light theme. It's the brand's paper.",
      },
      creamDeep: {
        name: "Deep cream",
        use: "Surfaces that separate one section from the next.",
      },
      ink: { name: "Ink", use: "Main text on cream." },
      night: { name: "Night olive", use: "Dark theme background." },
      oliveLight: {
        name: "Light olive",
        use: "The accent in dark mode, to keep the contrast.",
      },
    },
    typeTitle: "Typography",
    typeBody:
      "The logo is a high-contrast serif, so headings follow it. Body text uses a neutral grotesque so reading stays comfortable on small screens.",
    typeDisplay: "Playfair Display · headings",
    typeText: "Geist · text and interface",
    typeMono: "Geist Mono · labels",
    sampleDisplay: "The website your business deserves.",
    sampleText: "Custom websites, stores and automations.",
    sampleMono: "What we do",
    voiceTitle: "Tone of voice",
    voice: [
      {
        title: "Direct",
        body: "Short sentences, no detours. If something can be said in five words, it's said in five.",
      },
      {
        title: "Concrete",
        body: "We talk about what we do and what it costs. No promises we can't keep.",
      },
      {
        title: "Warm",
        body: "Like a work conversation between people who get along. Neither solemn nor forcedly funny.",
      },
      {
        title: "No jargon",
        body: "If a technical word adds nothing, it gets replaced. The client has no reason to know what a framework is.",
      },
    ],
    misuseTitle: "What not to do",
    misuses: [
      "Stretch or squash the symbol: it always scales proportionally.",
      "Rotate or tilt it. The knot reads in one position only.",
      "Apply shadows, glows or gradients to the stroke.",
      "Place it over low-contrast photos without a layer to separate it.",
      "Change the color outside the palette: olive, cream or ink.",
    ],
    filesTitle: "Files",
    filesBody:
      "The SVG is vector: it works for print and for any size. The PNGs have a transparent background and work well on social media and documents. We'll prepare any other format, write to us at",
    downloads: {
      "lockup.svg": "Full logo",
      "mark.svg": "Symbol",
      "lockup-olive.png": "Olive logo",
      "lockup-cream.png": "Cream logo",
      "mark-olive.png": "Olive symbol",
      "mark-cream.png": "Cream symbol",
    },
  },
};
