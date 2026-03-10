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

export const useChatbotIntents = (): Intent[] => [
  {
    intent: 'cv',
    keywords: {
      fr: ['cv', 'curriculum'],
      es: ['cv', 'currÃ­culum', 'resumen'],
      en: ['resume', 'cv', 'curriculum'],
    },
    response: {
      fr: `ðŸ“„ Mon CV est disponible dans la section <a href='/about' class='text-blue-600 underline hover:text-blue-800'>Ã€ propos</a>.`,
      es: `ðŸ“„ Mi CV estÃ¡ disponible en la secciÃ³n <a href='/about' class='text-blue-600 underline hover:text-blue-800'>Sobre mÃ­</a>.`,
      en: `ðŸ“„ You can find my resume in the <a href='/about' class='text-blue-600 underline hover:text-blue-800'>About</a> section.`,
    },
  },
  {
    intent: 'contact',
    keywords: {
      fr: ['contact', 'mail', 'formulaire', 'message'],
      es: ['contacto', 'correo', 'formulario', 'mensaje'],
      en: ['contact', 'email', 'form', 'message'],
    },
    response: {
      fr: `ðŸ“¬ Tu veux me contacter ?`,
      es: `ðŸ“¬ Â¿Quieres contactarme?`,
      en: `ðŸ“¬ You want to contact me?`,
    },
    followUp: {
      question: {
        fr: `ðŸ” PrÃ©fÃ¨res-tu m'envoyer un mail ou utiliser le formulaire ?`,
        es: `ðŸ” Â¿Prefieres enviarme un correo o usar el formulario?`,
        en: `ðŸ” Would you prefer to email me or use the contact form?`,
      },
      expectedIntent: 'contact_method',
    },
  },
  {
    intent: 'contact_method',
    keywords: {
      fr: ['mail', 'email', 'e-mail'],
      es: ['correo', 'email', 'e-mail'],
      en: ['email', 'mail'],
    },
    response: {
      fr: `ðŸ“§ Super, tu peux utiliser le formulaire dans la section <a href='/contact' class='text-blue-600 underline hover:text-blue-800'>Contact</a> !`,
      es: `ðŸ“§ Â¡Genial! Puedes usar el formulario en la secciÃ³n <a href='/contact' class='text-blue-600 underline hover:text-blue-800'>Contacto</a>.`,
      en: `ðŸ“§ Great! You can use the form in the <a href='/contact' class='text-blue-600 underline hover:text-blue-800'>Contact</a> section.`,
    },
  },
  {
    intent: 'projets',
    keywords: {
      fr: ['projets', 'portfolio', 'travaux', 'rÃ©alisations'],
      es: ['proyectos', 'portafolio', 'trabajos', 'realizaciones'],
      en: ['projects', 'portfolio', 'work', 'project'],
    },
    response: {
      fr: `ðŸ“ Tu peux voir mes projets dans la section <a href='/projects' class='text-blue-600 underline hover:text-blue-800'>Projets</a>.`,
      es: `ðŸ“ Puedes ver mis proyectos en la secciÃ³n <a href='/projects' class='text-blue-600 underline hover:text-blue-800'>Proyectos</a>.`,
      en: `ðŸ“ You can see my work in the <a href='/projects' class='text-blue-600 underline hover:text-blue-800'>Projects</a> section.`,
    },
    followUp: {
      question: {
        fr: `Souhaites-tu que je te recommande un projet Ã  voir en prioritÃ© ?`,
        es: `Â¿Te gustarÃ­a que te recomiende un proyecto para ver primero?`,
        en: `Would you like me to recommend a project to check first?`,
      },
      expectedIntent: 'project_recommendation',
    },
  },
  {
    intent: 'project_recommendation',
    keywords: {
      fr: ['oui', 'yes', 'vas-y'],
      es: ['sÃ­', 'yes', 'adelante'],
      en: ['yes', 'go ahead'],
    },
    response: {
      fr: `ðŸš€ Regarde <a href='/projects#flashfootball' class='text-blue-600 underline hover:text-blue-800'>FlashFootball</a>, un projet complet avec Nuxt 3, Tailwind et API-Football.`,
      es: `ðŸš€ Echa un vistazo a <a href='/projects#flashfootball' class='text-blue-600 underline hover:text-blue-800'>FlashFootball</a>, un proyecto completo con Nuxt 3, Tailwind y API-Football.`,
      en: `ðŸš€ Check out <a href='/projects#flashfootball' class='text-blue-600 underline hover:text-blue-800'>FlashFootball</a>, a full project with Nuxt 3, Tailwind, and the API-Football.`,
    },
  },
  {
    intent: 'tech',
    keywords: {
      fr: ['tech', 'technologies', 'stack', 'outils', 'skills'],
      es: ['tech', 'tecnologÃ­as', 'stack', 'herramientas', 'habilidades'],
      en: ['tech', 'technologies', 'stack', 'tools', 'skills'],
    },
    response: {
      fr: `ðŸ› ï¸ J'utilise Vue 3, Nuxt 3, Tailwind CSS, TypeScript, AngularJS, Node.js, PostgreSQL, Prisma, Docker et Git.`,
      es: `ðŸ› ï¸ Uso Vue 3, Nuxt 3, Tailwind CSS, TypeScript, AngularJS, Node.js, PostgreSQL, Prisma, Docker y Git.`,
      en: `ðŸ› ï¸ I use Vue 3, Nuxt 3, Tailwind CSS, TypeScript, AngularJS, Node.js, PostgreSQL, Prisma, Docker and Git.`,
    },
  },
  {
    intent: 'formation',
    keywords: {
      fr: [
        'formation',
        'Ã©tudes',
        'Ã©cole',
        'epitech',
        'master',
        'ia',
        'data',
      ],
      es: [
        'formaciÃ³n',
        'estudios',
        'escuela',
        'epitech',
        'mÃ¡ster',
        'ia',
        'datos',
      ],
      en: ['education', 'studies', 'school', 'epitech', 'master', 'ai', 'data'],
    },
    response: {
      fr: `ðŸŽ“ Je suis Ã©tudiant Ã  Epitech Rennes en Master IA & Data.`,
      es: `ðŸŽ“ Soy estudiante en Epitech Rennes en el MÃ¡ster de IA y Datos.`,
      en: `ðŸŽ“ I'm a student at Epitech Rennes in the AI & Data Master's program.`,
    },
    followUp: {
      question: {
        fr: `Tu veux savoir pourquoi j'ai choisi cette spÃ©cialisation ?`,
        es: `Â¿Quieres saber por quÃ© elegÃ­ esta especializaciÃ³n?`,
        en: `Would you like to know why I chose this specialization?`,
      },
      expectedIntent: 'choix_ia',
    },
  },
  {
    intent: 'choix_ia',
    keywords: {
      fr: ['pourquoi', 'choix', 'ia', 'data', 'spÃ©cialisation', 'master'],
      es: [
        'por quÃ©',
        'elecciÃ³n',
        'ia',
        'datos',
        'especializaciÃ³n',
        'mÃ¡ster',
      ],
      en: ['why', 'choice', 'ai', 'data', 'specialization', 'master'],
    },
    response: {
      fr: `ðŸ¤– L'IA me passionne car elle est au cÅ“ur des innovations futures, et je veux en faire partie.`,
      es: `ðŸ¤– La IA me apasiona porque estÃ¡ en el corazÃ³n de las innovaciones futuras, y quiero ser parte de ello.`,
      en: `ðŸ¤– AI fascinates me because it's at the core of future innovations, and I want to be part of it.`,
    },
  },
  {
    intent: 'alternance',
    keywords: {
      fr: ['alternance', 'digitaleo', 'travail', 'stage', 'entreprise'],
      es: ['aprendizaje', 'digitaleo', 'trabajo', 'prÃ¡cticas', 'empresa'],
      en: ['apprenticeship', 'digitaleo', 'work', 'internship', 'company'],
    },
    response: {
      fr: `ðŸ’¼ Je suis en alternance chez Digitaleo oÃ¹ je travaille avec AngularJS et Vue.js.`,
      es: `ðŸ’¼ Estoy haciendo mi aprendizaje en Digitaleo, trabajando con AngularJS y Vue.js.`,
      en: `ðŸ’¼ I'm doing my apprenticeship at Digitaleo, working with AngularJS and Vue.js.`,
    },
  },
  {
    intent: 'montres',
    keywords: {
      fr: ['montres', 'horlogerie', 'collection', 'watch', 'watches'],
      es: ['relojes', 'reloj', 'horologÃ­a', 'colecciÃ³n'],
      en: ['watches', 'watch', 'horology', 'collection'],
    },
    response: {
      fr: `âŒšï¸ PassionnÃ© d'horlogerie, j'ai une petite collection de montres.`,
      es: `âŒšï¸ Apasionado de la relojerÃ­a, tengo una pequeÃ±a colecciÃ³n de relojes.`,
      en: `âŒšï¸ I'm a watch enthusiast and I have a small collection.`,
    },
  },
  {
    intent: 'foot',
    keywords: {
      fr: ['foot', 'football', 'ligue 1'],
      es: ['fÃºtbol', 'football', 'liga 1'],
      en: ['foot', 'football', 'ligue 1'],
    },
    response: {
      fr: `âš½ï¸ Fan de foot, et supporter de l'OM bien sÃ»r ðŸ”µâšª`,
      es: `âš½ï¸ FanÃ¡tico del fÃºtbol y seguidor del OM por supuesto ðŸ”µâšª`,
      en: `âš½ï¸ Football fan and OM supporter of course ðŸ”µâšª`,
    },
  },
  {
    intent: 'psg',
    keywords: {
      fr: ['psg', 'paris', 'paris saint-germain'],
      es: ['psg', 'parÃ­s', 'paris saint-germain'],
      en: ['psg', 'paris', 'paris saint-germain'],
    },
    response: {
      fr: `ðŸ¤ Ce club ne fait pas partie de mes rÃ©fÃ©rences footballistiques...`,
      es: `ðŸ¤ Ese club no forma parte de mis referencias futbolÃ­sticas...`,
      en: `ðŸ¤ That club doesn't ring a bellâ€¦`,
    },
  },
  {
    intent: 'langues',
    keywords: {
      fr: ['langues', 'parler', 'franÃ§ais', 'anglais', 'espagnol'],
      es: ['idiomas', 'hablar', 'francÃ©s', 'inglÃ©s', 'espaÃ±ol'],
      en: ['languages', 'speak', 'french', 'english', 'spanish'],
    },
    response: {
      fr: `ðŸ—£ï¸ Je parle franÃ§ais (natif), anglais technique et un peu d'espagnol.`,
      es: `ðŸ—£ï¸ Hablo francÃ©s (nativo), inglÃ©s tÃ©cnico y un poco de espaÃ±ol.`,
      en: `ðŸ—£ï¸ I speak French (native), technical English and some Spanish.`,
    },
  },
  {
    intent: 'blog',
    keywords: {
      fr: ['blog', 'articles', 'Ã©crits', 'lire'],
      es: ['blog', 'artÃ­culos', 'escritos', 'leer'],
      en: ['blog', 'articles', 'posts', 'read'],
    },
    response: {
      fr: `ðŸ“ Tu peux lire mes articles dans la section <a href='/articles' class='text-blue-600 underline hover:text-blue-800'>Articles</a>.`,
      es: `ðŸ“ Puedes leer mis artÃ­culos en la secciÃ³n <a href='/articles' class='text-blue-600 underline hover:text-blue-800'>Articles</a>.`,
      en: `ðŸ“ You can read my articles in the <a href='/articles' class='text-blue-600 underline hover:text-blue-800'>Articles</a> section.`,
    },
  },
  {
    intent: 'intÃ©rÃªts',
    keywords: {
      fr: ['intÃ©rÃªts', 'passions', 'hobbies', 'loisirs'],
      es: ['intereses', 'pasiones', 'hobbies', 'aficiones'],
      en: ['interests', 'passions', 'hobbies'],
    },
    response: {
      fr: `ðŸŽ¯ J'aime le dev, l'IA, les montres et le foot. Un combo solide non ?`,
      es: `ðŸŽ¯ Me encanta el desarrollo, la IA, los relojes y el fÃºtbol. Â¿Un combo sÃ³lido, no?`,
      en: `ðŸŽ¯ I love dev, AI, watches and football. Solid combo right?`,
    },
  },
  {
    intent: 'salutation',
    keywords: {
      fr: ['salut', 'bonjour', 'hello', 'hi'],
      es: ['hola', 'salut', 'hello', 'hi'],
      en: ['hello', 'hi'],
    },
    response: {
      fr: `ðŸ‘‹ Salut Ã  toi !`,
      es: `ðŸ‘‹ Â¡Hola!`,
      en: `ðŸ‘‹ Hello there!`,
    },
  },
  {
    intent: 'merci',
    keywords: {
      fr: ['merci'],
      es: ['gracias', 'thank you'],
      en: ['thanks', 'thank you'],
    },
    response: {
      fr: `ðŸ™ Avec plaisir !`,
      es: `ðŸ™ Â¡De nada!`,
      en: `ðŸ™ You're welcome!`,
    },
  },
  {
    intent: 'bye',
    keywords: {
      fr: ['au revoir', 'bye', 'ciao'],
      es: ['adiÃ³s', 'hasta luego', 'bye'],
      en: ['goodbye', 'bye', 'see you'],
    },
    response: {
      fr: `ðŸ‘‹ Ã€ trÃ¨s vite !`,
      es: `ðŸ‘‹ Â¡Hasta pronto!`,
      en: `ðŸ‘‹ See you soon!`,
    },
  },
  {
    intent: 'age',
    keywords: {
      fr: ['Ã¢ge', 'naissance', 'date'],
      es: ['edad', 'nacimiento', 'fecha'],
      en: ['age', 'birth', 'date'],
    },
    response: {
      fr: `ðŸŽ‚ Je suis nÃ© en 2001, j'ai 23 ans.`,
      es: `ðŸŽ‚ NacÃ­ en 2001, tengo 23 aÃ±os.`,
      en: `ðŸŽ‚ I was born in 2001, I'm 23 years old.`,
    },
  },
  {
    intent: 'qui',
    keywords: {
      fr: ['qui', 'crÃ©ateur', 'dÃ©veloppeur', 'assistant'],
      es: ['quiÃ©n', 'creador', 'desarrollador', 'asistente'],
      en: ['who', 'creator', 'developer', 'assistant'],
    },
    response: {
      fr: `
      <div class="space-y-2">
        <div class="flex items-center gap-3">
          <img src="/assets/profile.png" alt="Antoine Gourgue" class="w-14 h-14 rounded-full border object-cover shadow-sm" />
          <div>
            <p class="font-semibold">Antoine Gourgue</p>
            <p class="text-sm text-gray-600">Ã‰tudiant Ã  Epitech & DÃ©veloppeur Fullstack</p>
          </div>
        </div>
        <p>ðŸ‘‹ Salut ! C'est moi qui ai codÃ© cet assistant virtuel. PassionnÃ© par le dev, l'IA, les montres et le foot âš½ï¸</p>
        <div class="flex gap-3 mt-2">
          <a href="https://github.com/AntoineGourgue" target="_blank" class="text-sm text-blue-600 hover:underline">GitHub</a>
          <a href="https://linkedin.com/in/antoine-gourgue" target="_blank" class="text-sm text-blue-600 hover:underline">LinkedIn</a>
          <a href="/about" class="text-sm text-blue-600 hover:underline">Ã€ propos</a>
        </div>
      </div>
    `,
      es: `
      <div class="space-y-2">
        <div class="flex items-center gap-3">
          <img src="/assets/profile.png" alt="Antoine Gourgue" class="w-14 h-14 rounded-full border object-cover shadow-sm" />
          <div>
            <p class="font-semibold">Antoine Gourgue</p>
            <p class="text-sm text-gray-600">Estudiante en Epitech & Desarrollador Fullstack</p>
          </div>
        </div>
        <p>ðŸ‘‹ Â¡Hola! Soy yo quien programÃ³ este asistente virtual. Apasionado por el desarrollo, la IA, los relojes y el fÃºtbol âš½ï¸</p>
        <div class="flex gap-3 mt-2">
          <a href="https://github.com/AntoineGourgue" target="_blank" class="text-sm text-blue-600 hover:underline">GitHub</a>
          <a href="https://linkedin.com/in/antoine-gourgue" target="_blank" class="text-sm text-blue-600 hover:underline">LinkedIn</a>
          <a href="/about" class="text-sm text-blue-600 hover:underline">Sobre mÃ­</a>
        </div>
      </div>
    `,
      en: `
      <div class="space-y-2">
        <div class="flex items-center gap-3">
          <img src="/assets/profile.png" alt="Antoine Gourgue" class="w-12 h-12 rounded-full border" />
          <div>
            <p class="font-semibold">Antoine Gourgue</p>
            <p class="text-sm text-gray-600">Epitech student & Fullstack developer</p>
          </div>
        </div>
        <p>ðŸ‘‹ Hey! I'm the developer behind this assistant. Passionate about dev, AI, watches and football âš½ï¸</p>
        <div class="flex gap-3 mt-2">
          <a href="https://github.com/AntoineGourgue" target="_blank" class="text-sm text-blue-600 hover:underline">GitHub</a>
          <a href="https://linkedin.com/in/antoine-gourgue" target="_blank" class="text-sm text-blue-600 hover:underline">LinkedIn</a>
          <a href="/about" class="text-sm text-blue-600 hover:underline">About me</a>
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
      fr: `ðŸ¤– Je suis encore en apprentissage, mais je ferai de mon mieux pour t'aider.`,
      es: `ðŸ¤– TodavÃ­a estoy aprendiendo, pero harÃ© todo lo posible para ayudarte.`,
      en: `ðŸ¤– I'm still learning, but I'll do my best to help you.`,
    },
  },
]
