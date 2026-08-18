export type Lang = 'fr' | 'es' | 'en'
export type TranslationKey = 'title' | 'placeholder' | 'send'

export interface Intent {
  intent: string
  keywords: Record<Lang, string[]>
  response: Record<Lang, string>
  followUp?: {
    question: Record<Lang, string>
    expectedIntent: string
  }
}

const link = (href: string, label: string, external = false) =>
  `<a href='${href}'${external ? " target='_blank'" : ''} class='text-blue-600 underline hover:text-blue-800'>${label}</a>`

export const useChatbotIntents = (): Intent[] => [
  {
    intent: 'cv',
    keywords: {
      fr: ['cv', 'curriculum'],
      es: ['cv', 'currículum', 'resumen'],
      en: ['resume', 'cv', 'curriculum'],
    },
    response: {
      fr: `📄 Tu peux ${link('/assets/antoinegourgue-cv.pdf', 'télécharger mon CV', true)} directement, ou voir toute ma fiche dans ${link('/about', 'Contacts')}.`,
      es: `📄 Puedes ${link('/assets/antoinegourgue-cv.pdf', 'descargar mi CV', true)} directamente, o ver mi ficha completa en ${link('/about', 'Contactos')}.`,
      en: `📄 You can ${link('/assets/antoinegourgue-cv.pdf', 'download my resume', true)} directly, or see my full profile in ${link('/about', 'Contacts')}.`,
    },
  },
  {
    intent: 'contact',
    keywords: {
      fr: ['contact', 'contacter', 'mail', 'formulaire', 'message', 'écrire'],
      es: ['contacto', 'contactar', 'correo', 'formulario', 'mensaje'],
      en: ['contact', 'email', 'form', 'message', 'reach'],
    },
    response: {
      fr: `📬 Le plus simple : le formulaire de la page ${link('/contact', 'Contact')} (façon app Mail 😉). Je réponds vite. Sinon ${link('https://linkedin.com/in/antoine-gourgue', 'LinkedIn', true)}.`,
      es: `📬 Lo más fácil: el formulario de la página ${link('/contact', 'Contacto')} (estilo app Mail 😉). Respondo rápido. Si no, ${link('https://linkedin.com/in/antoine-gourgue', 'LinkedIn', true)}.`,
      en: `📬 Easiest way: the form on the ${link('/contact', 'Contact')} page (Mail-app style 😉). I reply fast. Otherwise ${link('https://linkedin.com/in/antoine-gourgue', 'LinkedIn', true)}.`,
    },
  },
  {
    intent: 'dispo',
    keywords: {
      fr: [
        'disponible',
        'dispo',
        'embauche',
        'recrutement',
        'recruter',
        'opportunité',
        'poste',
        'cdi',
        'emploi',
        'job',
      ],
      es: [
        'disponible',
        'contratar',
        'oportunidad',
        'puesto',
        'empleo',
        'trabajo',
      ],
      en: [
        'available',
        'availability',
        'hire',
        'hiring',
        'opportunity',
        'position',
        'job',
      ],
    },
    response: {
      fr: `🟢 Oui ! Mon alternance chez Digitaleo se termine à l'été 2026, en même temps que mon Master — je suis ouvert aux opportunités pour la suite (basé à Anglet, télétravail bienvenu). Parlons-en via ${link('/contact', 'Contact')} !`,
      es: `🟢 ¡Sí! Mi alternancia en Digitaleo termina en verano de 2026, junto con mi Máster — estoy abierto a oportunidades (desde Anglet, teletrabajo bienvenido). ¡Hablemos vía ${link('/contact', 'Contacto')}!`,
      en: `🟢 Yes! My apprenticeship at Digitaleo ends in summer 2026, along with my Master's — I'm open to opportunities for what's next (based in Anglet, remote-friendly). Let's talk via ${link('/contact', 'Contact')}!`,
    },
  },
  {
    intent: 'localisation',
    keywords: {
      fr: [
        'où',
        'habites',
        'ville',
        'localisation',
        'anglet',
        'rennes',
        'basque',
        'biarritz',
        'région',
      ],
      es: ['dónde', 'vives', 'ciudad', 'ubicación', 'anglet', 'rennes'],
      en: ['where', 'live', 'located', 'location', 'city', 'anglet', 'rennes'],
    },
    response: {
      fr: `🌊 Je vis à Anglet, au Pays Basque. Mon école (Epitech) et mon alternance (Digitaleo) sont à Rennes — je jongle entre les deux, et le télétravail ne me fait pas peur.`,
      es: `🌊 Vivo en Anglet, en el País Vasco francés. Mi escuela (Epitech) y mi alternancia (Digitaleo) están en Rennes — el teletrabajo no me asusta.`,
      en: `🌊 I live in Anglet, in the French Basque Country. My school (Epitech) and apprenticeship (Digitaleo) are in Rennes — remote work is second nature.`,
    },
  },
  {
    intent: 'projets',
    keywords: {
      fr: ['projets', 'portfolio', 'travaux', 'réalisations'],
      es: ['proyectos', 'portafolio', 'trabajos', 'realizaciones'],
      en: ['projects', 'portfolio', 'work', 'project'],
    },
    response: {
      fr: `📁 Tout est dans l'${link('/projects', 'App Store')} : TailTCG, Trinity Shop, Mosaic, Sapia, EchoConnect, mon Design System, AuroraHome — et l'éditeur d'email Digitaleo côté pro.`,
      es: `📁 Todo está en el ${link('/projects', 'App Store')}: TailTCG, Trinity Shop, Mosaic, Sapia, EchoConnect, mi Design System, AuroraHome — y el editor de email de Digitaleo en la parte profesional.`,
      en: `📁 Everything is in the ${link('/projects', 'App Store')}: TailTCG, Trinity Shop, Mosaic, Sapia, EchoConnect, my Design System, AuroraHome — plus the Digitaleo email editor on the pro side.`,
    },
    followUp: {
      question: {
        fr: `Tu veux que je t'en recommande un à voir en premier ?`,
        es: `¿Quieres que te recomiende uno para ver primero?`,
        en: `Want me to recommend one to check first?`,
      },
      expectedIntent: 'project_recommendation',
    },
  },
  {
    intent: 'project_recommendation',
    keywords: {
      fr: ['oui', 'vas-y', 'volontiers', 'ok'],
      es: ['sí', 'adelante', 'ok'],
      en: ['yes', 'sure', 'go ahead', 'ok'],
    },
    response: {
      fr: `🚀 Commence par ${link('https://tailtcg.vercel.app', 'TailTCG', true)} : suivi de collection de cartes Pokémon avec pré-gradation sur photos, en Next.js/TypeScript. Et la fiche complète est dans l'${link('/projects', 'App Store')}.`,
      es: `🚀 Empieza por ${link('https://tailtcg.vercel.app', 'TailTCG', true)}: seguimiento de colecciones de cartas Pokémon con pre-gradación sobre fotos, en Next.js/TypeScript. La ficha completa está en el ${link('/projects', 'App Store')}.`,
      en: `🚀 Start with ${link('https://tailtcg.vercel.app', 'TailTCG', true)}: a Pokémon card collection tracker with photo-based pre-grading, built with Next.js/TypeScript. Full details in the ${link('/projects', 'App Store')}.`,
    },
  },
  {
    intent: 'tailtcg',
    keywords: {
      fr: ['tailtcg', 'pokemon', 'pokémon', 'cartes', 'tcg'],
      es: ['tailtcg', 'pokemon', 'pokémon', 'cartas', 'tcg'],
      en: ['tailtcg', 'pokemon', 'cards', 'tcg'],
    },
    response: {
      fr: `🎴 ${link('https://tailtcg.vercel.app', 'TailTCG', true)} : suis tes cartes Pokémon, leur état et leur valeur, pré-grade-les sur tes photos, range-les en classeurs et partage ta vitrine. Gratuit, sans pub. Next.js + TypeScript.`,
      es: `🎴 ${link('https://tailtcg.vercel.app', 'TailTCG', true)}: sigue tus cartas Pokémon, su estado y valor, pre-gradúalas sobre fotos, organízalas en archivadores y comparte tu vitrina. Gratis, sin anuncios. Next.js + TypeScript.`,
      en: `🎴 ${link('https://tailtcg.vercel.app', 'TailTCG', true)}: track your Pokémon cards, their condition and value, pre-grade them from photos, sort them into binders and share your showcase. Free, ad-free. Next.js + TypeScript.`,
    },
  },
  {
    intent: 'mosaic',
    keywords: {
      fr: ['mosaic', 'pinterest', 'images', 'boards'],
      es: ['mosaic', 'pinterest', 'imágenes'],
      en: ['mosaic', 'pinterest', 'images', 'boards'],
    },
    response: {
      fr: `🖼️ ${link('https://mosaic.antoinegourgue.dev/', 'Mosaic', true)} : un tableau d'images façon Pinterest — boards collaboratifs, recherche, back-office complet. Next.js, Prisma, Auth.js et Docker.`,
      es: `🖼️ ${link('https://mosaic.antoinegourgue.dev/', 'Mosaic', true)}: un tablero de imágenes estilo Pinterest — boards colaborativos, búsqueda, back-office completo. Next.js, Prisma, Auth.js y Docker.`,
      en: `🖼️ ${link('https://mosaic.antoinegourgue.dev/', 'Mosaic', true)}: a Pinterest-style image board — collaborative boards, search, full admin back-office. Next.js, Prisma, Auth.js and Docker.`,
    },
  },
  {
    intent: 'sapia',
    keywords: {
      fr: ['sapia', 'assistant', 'chatgpt'],
      es: ['sapia', 'asistente'],
      en: ['sapia', 'assistant'],
    },
    response: {
      fr: `🤖 ${link('https://sapia.antoinegourgue.dev/', 'Sapia', true)} : mon assistant IA maison, en Vue et Node.js. L'IA appliquée, pas juste théorique.`,
      es: `🤖 ${link('https://sapia.antoinegourgue.dev/', 'Sapia', true)}: mi asistente IA casero, en Vue y Node.js. IA aplicada, no solo teórica.`,
      en: `🤖 ${link('https://sapia.antoinegourgue.dev/', 'Sapia', true)}: my home-made AI assistant, built with Vue and Node.js. Applied AI, not just theory.`,
    },
  },
  {
    intent: 'aurora',
    keywords: {
      fr: ['aurora', 'aurorahome', 'domotique', 'esp32', 'maison'],
      es: ['aurora', 'aurorahome', 'domótica', 'esp32'],
      en: ['aurora', 'aurorahome', 'smart home', 'esp32', 'home automation'],
    },
    response: {
      fr: `🏠 AuroraHome, c'est mon écosystème domotique : app, dashboard, firmware ESP32 et une ${link('https://aurora-home-documentation.vercel.app/fr/docs', 'documentation complète', true)} en Nuxt Content. Du hardware au front !`,
      es: `🏠 AuroraHome es mi ecosistema domótico: app, dashboard, firmware ESP32 y una ${link('https://aurora-home-documentation.vercel.app/fr/docs', 'documentación completa', true)} en Nuxt Content. ¡Del hardware al front!`,
      en: `🏠 AuroraHome is my smart-home ecosystem: app, dashboard, ESP32 firmware and full ${link('https://aurora-home-documentation.vercel.app/fr/docs', 'documentation', true)} in Nuxt Content. From hardware to frontend!`,
    },
  },
  {
    intent: 'site',
    keywords: {
      fr: [
        'site',
        'macos',
        'design',
        'fenêtres',
        'dock',
        'comment',
        'fait',
        'construit',
      ],
      es: [
        'sitio',
        'web',
        'macos',
        'diseño',
        'ventanas',
        'construido',
        'hecho',
      ],
      en: [
        'site',
        'website',
        'macos',
        'design',
        'windows',
        'dock',
        'built',
        'made',
      ],
    },
    response: {
      fr: `💻 Ce site est un clone de macOS (et d'iOS sur mobile) codé main : Nuxt 3, GSAP, fenêtres déplaçables, Spotlight (⌘K), apps fonctionnelles, sons Web Audio… J'ai tout raconté dans une note : ${link('/blog', 'Comment ce site est fait')}.`,
      es: `💻 Este sitio es un clon de macOS (y de iOS en móvil) hecho a mano: Nuxt 3, GSAP, ventanas arrastrables, Spotlight (⌘K), apps funcionales, sonidos Web Audio… Lo cuento todo en una nota: ${link('/blog', 'Cómo está hecho este sitio')}.`,
      en: `💻 This site is a hand-coded macOS clone (iOS on mobile): Nuxt 3, GSAP, draggable windows, Spotlight (⌘K), working apps, Web Audio sounds… I wrote it all up in a note: ${link('/blog', 'How this site is built')}.`,
    },
  },
  {
    intent: 'tech',
    keywords: {
      fr: ['tech', 'technologies', 'stack', 'outils', 'compétences', 'skills'],
      es: ['tech', 'tecnologías', 'stack', 'herramientas', 'habilidades'],
      en: ['tech', 'technologies', 'stack', 'tools', 'skills'],
    },
    response: {
      fr: `🛠️ Front : Vue, Nuxt, TypeScript, Tailwind, GSAP. Back : Node.js, PHP, MongoDB, PostgreSQL, Prisma. Outils : Docker, GitLab CI/CD, Claude Code. Et du VML/Outlook chez Digitaleo — l'école de la patience 😄`,
      es: `🛠️ Front: Vue, Nuxt, TypeScript, Tailwind, GSAP. Back: Node.js, PHP, MongoDB, PostgreSQL, Prisma. Herramientas: Docker, GitLab CI/CD, Claude Code. Y VML/Outlook en Digitaleo — la escuela de la paciencia 😄`,
      en: `🛠️ Front: Vue, Nuxt, TypeScript, Tailwind, GSAP. Back: Node.js, PHP, MongoDB, PostgreSQL, Prisma. Tools: Docker, GitLab CI/CD, Claude Code. Plus VML/Outlook at Digitaleo — a lesson in patience 😄`,
    },
  },
  {
    intent: 'formation',
    keywords: {
      fr: [
        'formation',
        'études',
        'école',
        'epitech',
        'master',
        'bts',
        'lycée',
        'diplôme',
      ],
      es: [
        'formación',
        'estudios',
        'escuela',
        'epitech',
        'máster',
        'bts',
        'diploma',
      ],
      en: ['education', 'studies', 'school', 'epitech', 'master', 'degree'],
    },
    response: {
      fr: `🎓 Master IA & Data à Epitech Rennes (2023-2026), après un BTS SNIR au Lycée Saint Joseph d'Hasparren et des bacs S & STL au Lycée André Malraux de Biarritz. Tout le détail dans ${link('/about', 'Contacts')}.`,
      es: `🎓 Máster en IA & Data en Epitech Rennes (2023-2026), tras un BTS SNIR en el Lycée Saint Joseph de Hasparren y bachilleratos S & STL en el Lycée André Malraux de Biarritz. Todo el detalle en ${link('/about', 'Contactos')}.`,
      en: `🎓 Master's in AI & Data at Epitech Rennes (2023-2026), after a BTS SNIR (IT & networks) in Hasparren and science baccalaureates in Biarritz. Full details in ${link('/about', 'Contacts')}.`,
    },
    followUp: {
      question: {
        fr: `Tu veux savoir pourquoi j'ai choisi la spécialisation IA & Data ?`,
        es: `¿Quieres saber por qué elegí la especialización en IA & Data?`,
        en: `Want to know why I chose the AI & Data specialization?`,
      },
      expectedIntent: 'choix_ia',
    },
  },
  {
    intent: 'choix_ia',
    keywords: {
      fr: ['pourquoi', 'choix', 'ia', 'data', 'spécialisation', 'intelligence'],
      es: ['por qué', 'elección', 'ia', 'datos', 'especialización'],
      en: ['why', 'choice', 'ai', 'data', 'specialization'],
    },
    response: {
      fr: `🤖 Parce que l'IA transforme déjà ma façon de travailler (ce portfolio est co-construit avec Claude Code !) et que je veux la maîtriser côté ingénierie, pas seulement l'utiliser. Le machine learning, c'est la suite logique de mon parcours fullstack.`,
      es: `🤖 Porque la IA ya transforma mi forma de trabajar (¡este portfolio está co-construido con Claude Code!) y quiero dominarla del lado de la ingeniería, no solo usarla. El machine learning es la continuación lógica de mi recorrido fullstack.`,
      en: `🤖 Because AI is already transforming how I work (this portfolio was co-built with Claude Code!) and I want to master it from the engineering side, not just use it. Machine learning is the logical next step after fullstack.`,
    },
  },
  {
    intent: 'alternance',
    keywords: {
      fr: [
        'alternance',
        'digitaleo',
        'travail',
        'entreprise',
        'expérience',
        'éditeur',
        'email',
      ],
      es: [
        'alternancia',
        'digitaleo',
        'trabajo',
        'empresa',
        'experiencia',
        'editor',
      ],
      en: [
        'apprenticeship',
        'digitaleo',
        'work',
        'company',
        'experience',
        'editor',
        'email',
      ],
    },
    response: {
      fr: `💼 Développeur Full Stack en alternance chez Digitaleo (Rennes) depuis janvier 2024, sur un SaaS de marketing local. Mon terrain : l'éditeur d'email — blocs dynamiques, compatibilité Outlook/VML, Design System — plus l'archivage des campagnes et les stats Marketing Direct. La fiche complète est dans l'${link('/projects', 'App Store')}.`,
      es: `💼 Desarrollador Full Stack en alternancia en Digitaleo (Rennes) desde enero de 2024, en un SaaS de marketing local. Mi terreno: el editor de email — bloques dinámicos, compatibilidad Outlook/VML, Design System — más el archivado de campañas y las estadísticas de Marketing Directo. La ficha completa está en el ${link('/projects', 'App Store')}.`,
      en: `💼 Full Stack Developer apprentice at Digitaleo (Rennes) since January 2024, on a local-marketing SaaS. My playground: the email editor — dynamic blocks, Outlook/VML compatibility, Design System — plus campaign archiving and Direct Marketing statistics. Full case study in the ${link('/projects', 'App Store')}.`,
    },
  },
  {
    intent: 'kpme',
    keywords: {
      fr: ['kpme', 'boucau', 'première expérience'],
      es: ['kpme', 'boucau'],
      en: ['kpme', 'boucau', 'first experience'],
    },
    response: {
      fr: `🌱 KPME-Development, c'était ma première expérience pro (mai-juin 2022, à Boucau) : la création d'un site web de A à Z. Le déclic qui a confirmé la suite.`,
      es: `🌱 KPME-Development fue mi primera experiencia profesional (mayo-junio 2022, en Boucau): la creación de un sitio web de principio a fin. El clic que confirmó lo que vendría.`,
      en: `🌱 KPME-Development was my first professional experience (May-June 2022, in Boucau): building a website end to end. The spark that confirmed the path.`,
    },
  },
  {
    intent: 'montres',
    keywords: {
      fr: ['montres', 'montre', 'horlogerie', 'collection'],
      es: ['relojes', 'reloj', 'horología', 'colección'],
      en: ['watches', 'watch', 'horology', 'collection'],
    },
    response: {
      fr: `⌚️ Passionné d'horlogerie, j'ai une petite collection de montres. Le souci du détail, ça se cultive aussi hors de l'écran.`,
      es: `⌚️ Apasionado de la relojería, tengo una pequeña colección de relojes. La atención al detalle también se cultiva fuera de la pantalla.`,
      en: `⌚️ I'm a watch enthusiast with a small collection. Attention to detail is a habit you build off-screen too.`,
    },
  },
  {
    intent: 'foot',
    keywords: {
      fr: ['foot', 'football', 'ligue', 'om', 'marseille'],
      es: ['fútbol', 'football', 'liga', 'om', 'marsella'],
      en: ['foot', 'football', 'soccer', 'om', 'marseille'],
    },
    response: {
      fr: `⚽️ Fan de foot, et supporter de l'OM bien sûr 🔵⚪`,
      es: `⚽️ Fanático del fútbol y seguidor del OM por supuesto 🔵⚪`,
      en: `⚽️ Football fan and OM supporter of course 🔵⚪`,
    },
  },
  {
    intent: 'psg',
    keywords: {
      fr: ['psg', 'paris saint-germain'],
      es: ['psg', 'paris saint-germain'],
      en: ['psg', 'paris saint-germain'],
    },
    response: {
      fr: `🤐 Ce club ne fait pas partie de mes références footballistiques...`,
      es: `🤐 Ese club no forma parte de mis referencias futbolísticas...`,
      en: `🤐 That club doesn't ring a bell…`,
    },
  },
  {
    intent: 'langues',
    keywords: {
      fr: ['langues', 'parles', 'français', 'anglais', 'espagnol'],
      es: ['idiomas', 'hablas', 'francés', 'inglés', 'español'],
      en: ['languages', 'speak', 'french', 'english', 'spanish'],
    },
    response: {
      fr: `🗣️ Français (natif), anglais technique, et un peu d'espagnol — d'ailleurs ce site existe dans les trois langues !`,
      es: `🗣️ Francés (nativo), inglés técnico y un poco de español — ¡de hecho este sitio existe en los tres idiomas!`,
      en: `🗣️ French (native), technical English and some Spanish — this site actually exists in all three languages!`,
    },
  },
  {
    intent: 'blog',
    keywords: {
      fr: ['blog', 'notes', 'articles', 'lire', 'mentions'],
      es: ['blog', 'notas', 'artículos', 'leer', 'menciones'],
      en: ['blog', 'notes', 'articles', 'read', 'mentions'],
    },
    response: {
      fr: `📝 Mes ${link('/blog', 'Notes')} : comment ce site est fait, ce que j'apprends chez Digitaleo, ma stack — plus les mentions presse.`,
      es: `📝 Mis ${link('/blog', 'Notas')}: cómo está hecho este sitio, lo que aprendo en Digitaleo, mi stack — más las menciones de prensa.`,
      en: `📝 My ${link('/blog', 'Notes')}: how this site is built, what I'm learning at Digitaleo, my stack — plus press mentions.`,
    },
  },
  {
    intent: 'intérêts',
    keywords: {
      fr: ['intérêts', 'passions', 'hobbies', 'loisirs', 'aimes'],
      es: ['intereses', 'pasiones', 'hobbies', 'aficiones'],
      en: ['interests', 'passions', 'hobbies', 'like'],
    },
    response: {
      fr: `🎯 Le dev, l'IA, les montres, le foot (allez l'OM), les cartes Pokémon (d'où TailTCG !) et le Pays Basque. Un combo solide non ?`,
      es: `🎯 El desarrollo, la IA, los relojes, el fútbol (¡vamos OM!), las cartas Pokémon (¡de ahí TailTCG!) y el País Vasco. ¿Un combo sólido, no?`,
      en: `🎯 Dev, AI, watches, football (go OM), Pokémon cards (hence TailTCG!) and the Basque Country. Solid combo right?`,
    },
  },
  {
    intent: 'salutation',
    keywords: {
      fr: ['salut', 'bonjour', 'hello', 'hi', 'coucou', 'yo'],
      es: ['hola', 'buenas', 'hello', 'hi'],
      en: ['hello', 'hi', 'hey'],
    },
    response: {
      fr: `👋 Salut ! Pose-moi ce que tu veux : mon parcours, mes projets, ma stack, ma dispo… ou même l'OM.`,
      es: `👋 ¡Hola! Pregúntame lo que quieras: mi recorrido, mis proyectos, mi stack, mi disponibilidad… o incluso el OM.`,
      en: `👋 Hey! Ask me anything: my background, projects, stack, availability… or even OM.`,
    },
  },
  {
    intent: 'merci',
    keywords: {
      fr: ['merci'],
      es: ['gracias'],
      en: ['thanks', 'thank you'],
    },
    response: {
      fr: `🙏 Avec plaisir !`,
      es: `🙏 ¡De nada!`,
      en: `🙏 You're welcome!`,
    },
  },
  {
    intent: 'bye',
    keywords: {
      fr: ['au revoir', 'bye', 'ciao', 'à plus'],
      es: ['adiós', 'hasta luego', 'bye'],
      en: ['goodbye', 'bye', 'see you'],
    },
    response: {
      fr: `👋 À très vite ! Et si tu veux me laisser un mot, la page ${link('/contact', 'Contact')} est là.`,
      es: `👋 ¡Hasta pronto! Y si quieres dejarme un mensaje, la página ${link('/contact', 'Contacto')} está ahí.`,
      en: `👋 See you soon! And if you want to leave me a note, the ${link('/contact', 'Contact')} page is right there.`,
    },
  },
  {
    intent: 'age',
    keywords: {
      fr: ['âge', 'ans', 'naissance', 'né'],
      es: ['edad', 'años', 'nacimiento'],
      en: ['age', 'old', 'birth', 'born'],
    },
    response: {
      fr: `🎂 Je suis né en 2001 — fais le calcul 😄`,
      es: `🎂 Nací en 2001 — haz la cuenta 😄`,
      en: `🎂 I was born in 2001 — you do the math 😄`,
    },
  },
  {
    intent: 'qui',
    keywords: {
      fr: ['qui', 'es-tu', 'présente', 'créateur', 'développeur', 'antoine'],
      es: [
        'quién',
        'eres',
        'preséntate',
        'creador',
        'desarrollador',
        'antoine',
      ],
      en: ['who', 'are you', 'introduce', 'creator', 'developer', 'antoine'],
    },
    response: {
      fr: `
      <div class="space-y-2">
        <div class="flex items-center gap-3">
          <img src="/assets/profile.png" alt="Antoine Gourgue" class="w-12 h-12 rounded-full border object-cover object-top" />
          <div>
            <p class="font-semibold">Antoine Gourgue</p>
            <p class="text-[12px] text-black/50">Développeur Fullstack · Master IA & Data à Epitech</p>
          </div>
        </div>
        <p>👋 Salut ! Dev fullstack en alternance chez Digitaleo, basé à Anglet. Passionné de dev, d'IA, de montres et de foot ⚽️ — et c'est moi qui ai codé ce Mac.</p>
        <div class="flex gap-3 mt-1">
          <a href="https://github.com/antoine-gourgue" target="_blank" class="text-[12px] text-blue-600 hover:underline">GitHub</a>
          <a href="https://linkedin.com/in/antoine-gourgue" target="_blank" class="text-[12px] text-blue-600 hover:underline">LinkedIn</a>
          <a href="/about" class="text-[12px] text-blue-600 hover:underline">Contacts</a>
        </div>
      </div>
    `,
      es: `
      <div class="space-y-2">
        <div class="flex items-center gap-3">
          <img src="/assets/profile.png" alt="Antoine Gourgue" class="w-12 h-12 rounded-full border object-cover object-top" />
          <div>
            <p class="font-semibold">Antoine Gourgue</p>
            <p class="text-[12px] text-black/50">Desarrollador Fullstack · Máster IA & Data en Epitech</p>
          </div>
        </div>
        <p>👋 ¡Hola! Dev fullstack en alternancia en Digitaleo, desde Anglet. Apasionado del desarrollo, la IA, los relojes y el fútbol ⚽️ — y fui yo quien programó este Mac.</p>
        <div class="flex gap-3 mt-1">
          <a href="https://github.com/antoine-gourgue" target="_blank" class="text-[12px] text-blue-600 hover:underline">GitHub</a>
          <a href="https://linkedin.com/in/antoine-gourgue" target="_blank" class="text-[12px] text-blue-600 hover:underline">LinkedIn</a>
          <a href="/about" class="text-[12px] text-blue-600 hover:underline">Contactos</a>
        </div>
      </div>
    `,
      en: `
      <div class="space-y-2">
        <div class="flex items-center gap-3">
          <img src="/assets/profile.png" alt="Antoine Gourgue" class="w-12 h-12 rounded-full border object-cover object-top" />
          <div>
            <p class="font-semibold">Antoine Gourgue</p>
            <p class="text-[12px] text-black/50">Fullstack Developer · AI & Data Master's at Epitech</p>
          </div>
        </div>
        <p>👋 Hey! Fullstack dev apprentice at Digitaleo, based in Anglet. Passionate about dev, AI, watches and football ⚽️ — and yes, I coded this Mac.</p>
        <div class="flex gap-3 mt-1">
          <a href="https://github.com/antoine-gourgue" target="_blank" class="text-[12px] text-blue-600 hover:underline">GitHub</a>
          <a href="https://linkedin.com/in/antoine-gourgue" target="_blank" class="text-[12px] text-blue-600 hover:underline">LinkedIn</a>
          <a href="/about" class="text-[12px] text-blue-600 hover:underline">Contacts</a>
        </div>
      </div>
    `,
    },
  },
  {
    intent: 'default',
    keywords: {
      fr: [],
      es: [],
      en: [],
    },
    response: {
      fr: `🤔 Pas sûr d'avoir compris ! Essaie : « projets », « stack », « alternance », « formation », « dispo », « contact »… ou « OM » 😉`,
      es: `🤔 ¡No estoy seguro de haber entendido! Prueba: « proyectos », « stack », « alternancia », « formación », « disponible », « contacto »… o « OM » 😉`,
      en: `🤔 Not sure I got that! Try: "projects", "stack", "apprenticeship", "education", "available", "contact"… or "OM" 😉`,
    },
  },
]
