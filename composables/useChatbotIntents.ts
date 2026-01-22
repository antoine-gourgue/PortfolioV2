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
      es: ['cv', 'currículum', 'resumen'],
      en: ['resume', 'cv', 'curriculum'],
    },
    response: {
      fr: `📄 Mon CV est disponible dans la section <a href='/about' class='text-blue-600 underline hover:text-blue-800'>À propos</a>.`,
      es: `📄 Mi CV está disponible en la sección <a href='/about' class='text-blue-600 underline hover:text-blue-800'>Sobre mí</a>.`,
      en: `📄 You can find my resume in the <a href='/about' class='text-blue-600 underline hover:text-blue-800'>About</a> section.`,
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
      fr: `📬 Tu veux me contacter ?`,
      es: `📬 ¿Quieres contactarme?`,
      en: `📬 You want to contact me?`,
    },
    followUp: {
      question: {
        fr: `🔍 Préfères-tu m'envoyer un mail ou utiliser le formulaire ?`,
        es: `🔍 ¿Prefieres enviarme un correo o usar el formulario?`,
        en: `🔍 Would you prefer to email me or use the contact form?`,
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
      fr: `📧 Super, tu peux utiliser le formulaire dans la section <a href='/contact' class='text-blue-600 underline hover:text-blue-800'>Contact</a> !`,
      es: `📧 ¡Genial! Puedes usar el formulario en la sección <a href='/contact' class='text-blue-600 underline hover:text-blue-800'>Contacto</a>.`,
      en: `📧 Great! You can use the form in the <a href='/contact' class='text-blue-600 underline hover:text-blue-800'>Contact</a> section.`,
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
      fr: `📁 Tu peux voir mes projets dans la section <a href='/projects' class='text-blue-600 underline hover:text-blue-800'>Projets</a>.`,
      es: `📁 Puedes ver mis proyectos en la sección <a href='/projects' class='text-blue-600 underline hover:text-blue-800'>Proyectos</a>.`,
      en: `📁 You can see my work in the <a href='/projects' class='text-blue-600 underline hover:text-blue-800'>Projects</a> section.`,
    },
    followUp: {
      question: {
        fr: `Souhaites-tu que je te recommande un projet à voir en priorité ?`,
        es: `¿Te gustaría que te recomiende un proyecto para ver primero?`,
        en: `Would you like me to recommend a project to check first?`,
      },
      expectedIntent: 'project_recommendation',
    },
  },
  {
    intent: 'project_recommendation',
    keywords: {
      fr: ['oui', 'yes', 'vas-y'],
      es: ['sí', 'yes', 'adelante'],
      en: ['yes', 'go ahead'],
    },
    response: {
      fr: `🚀 Regarde <a href='/projects#flashfootball' class='text-blue-600 underline hover:text-blue-800'>FlashFootball</a>, un projet complet avec Nuxt 3, Tailwind et API-Football.`,
      es: `🚀 Echa un vistazo a <a href='/projects#flashfootball' class='text-blue-600 underline hover:text-blue-800'>FlashFootball</a>, un proyecto completo con Nuxt 3, Tailwind y API-Football.`,
      en: `🚀 Check out <a href='/projects#flashfootball' class='text-blue-600 underline hover:text-blue-800'>FlashFootball</a>, a full project with Nuxt 3, Tailwind, and the API-Football.`,
    },
  },
  {
    intent: 'tech',
    keywords: {
      fr: ['tech', 'technologies', 'stack', 'outils', 'skills'],
      es: ['tech', 'tecnologías', 'stack', 'herramientas', 'habilidades'],
      en: ['tech', 'technologies', 'stack', 'tools', 'skills'],
    },
    response: {
      fr: `🛠️ J'utilise Vue 3, Nuxt 3, Tailwind CSS, TypeScript, AngularJS, Node.js, PostgreSQL, Prisma, Docker et Git.`,
      es: `🛠️ Uso Vue 3, Nuxt 3, Tailwind CSS, TypeScript, AngularJS, Node.js, PostgreSQL, Prisma, Docker y Git.`,
      en: `🛠️ I use Vue 3, Nuxt 3, Tailwind CSS, TypeScript, AngularJS, Node.js, PostgreSQL, Prisma, Docker and Git.`,
    },
  },
  {
    intent: 'formation',
    keywords: {
      fr: ['formation', 'études', 'école', 'epitech', 'master', 'ia', 'data'],
      es: [
        'formación',
        'estudios',
        'escuela',
        'epitech',
        'máster',
        'ia',
        'datos',
      ],
      en: ['education', 'studies', 'school', 'epitech', 'master', 'ai', 'data'],
    },
    response: {
      fr: `🎓 Je suis étudiant à Epitech Rennes en Master IA & Data.`,
      es: `🎓 Soy estudiante en Epitech Rennes en el Máster de IA y Datos.`,
      en: `🎓 I'm a student at Epitech Rennes in the AI & Data Master's program.`,
    },
    followUp: {
      question: {
        fr: `Tu veux savoir pourquoi j'ai choisi cette spécialisation ?`,
        es: `¿Quieres saber por qué elegí esta especialización?`,
        en: `Would you like to know why I chose this specialization?`,
      },
      expectedIntent: 'choix_ia',
    },
  },
  {
    intent: 'choix_ia',
    keywords: {
      fr: ['pourquoi', 'choix', 'ia', 'data', 'spécialisation', 'master'],
      es: ['por qué', 'elección', 'ia', 'datos', 'especialización', 'máster'],
      en: ['why', 'choice', 'ai', 'data', 'specialization', 'master'],
    },
    response: {
      fr: `🤖 L'IA me passionne car elle est au cœur des innovations futures, et je veux en faire partie.`,
      es: `🤖 La IA me apasiona porque está en el corazón de las innovaciones futuras, y quiero ser parte de ello.`,
      en: `🤖 AI fascinates me because it's at the core of future innovations, and I want to be part of it.`,
    },
  },
  {
    intent: 'alternance',
    keywords: {
      fr: ['alternance', 'digitaleo', 'travail', 'stage', 'entreprise'],
      es: ['aprendizaje', 'digitaleo', 'trabajo', 'prácticas', 'empresa'],
      en: ['apprenticeship', 'digitaleo', 'work', 'internship', 'company'],
    },
    response: {
      fr: `💼 Je suis en alternance chez Digitaleo où je travaille avec AngularJS et Vue.js.`,
      es: `💼 Estoy haciendo mi aprendizaje en Digitaleo, trabajando con AngularJS y Vue.js.`,
      en: `💼 I'm doing my apprenticeship at Digitaleo, working with AngularJS and Vue.js.`,
    },
  },
  {
    intent: 'montres',
    keywords: {
      fr: ['montres', 'horlogerie', 'collection', 'watch', 'watches'],
      es: ['relojes', 'reloj', 'horología', 'colección'],
      en: ['watches', 'watch', 'horology', 'collection'],
    },
    response: {
      fr: `⌚️ Passionné d'horlogerie, j'ai une petite collection de montres.`,
      es: `⌚️ Apasionado de la relojería, tengo una pequeña colección de relojes.`,
      en: `⌚️ I'm a watch enthusiast and I have a small collection.`,
    },
  },
  {
    intent: 'foot',
    keywords: {
      fr: ['foot', 'football', 'ligue 1'],
      es: ['fútbol', 'football', 'liga 1'],
      en: ['foot', 'football', 'ligue 1'],
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
      fr: ['psg', 'paris', 'paris saint-germain'],
      es: ['psg', 'parís', 'paris saint-germain'],
      en: ['psg', 'paris', 'paris saint-germain'],
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
      fr: ['langues', 'parler', 'français', 'anglais', 'espagnol'],
      es: ['idiomas', 'hablar', 'francés', 'inglés', 'español'],
      en: ['languages', 'speak', 'french', 'english', 'spanish'],
    },
    response: {
      fr: `🗣️ Je parle français (natif), anglais technique et un peu d'espagnol.`,
      es: `🗣️ Hablo francés (nativo), inglés técnico y un poco de español.`,
      en: `🗣️ I speak French (native), technical English and some Spanish.`,
    },
  },
  {
    intent: 'blog',
    keywords: {
      fr: ['blog', 'articles', 'écrits', 'lire'],
      es: ['blog', 'artículos', 'escritos', 'leer'],
      en: ['blog', 'articles', 'posts', 'read'],
    },
    response: {
      fr: `📝 Tu peux lire mes articles dans la section <a href='/blog' class='text-blue-600 underline hover:text-blue-800'>Blog</a>.`,
      es: `📝 Puedes leer mis artículos en la sección <a href='/blog' class='text-blue-600 underline hover:text-blue-800'>Blog</a>.`,
      en: `📝 You can read my articles in the <a href='/blog' class='text-blue-600 underline hover:text-blue-800'>Blog</a> section.`,
    },
  },
  {
    intent: 'intérêts',
    keywords: {
      fr: ['intérêts', 'passions', 'hobbies', 'loisirs'],
      es: ['intereses', 'pasiones', 'hobbies', 'aficiones'],
      en: ['interests', 'passions', 'hobbies'],
    },
    response: {
      fr: `🎯 J'aime le dev, l'IA, les montres et le foot. Un combo solide non ?`,
      es: `🎯 Me encanta el desarrollo, la IA, los relojes y el fútbol. ¿Un combo sólido, no?`,
      en: `🎯 I love dev, AI, watches and football. Solid combo right?`,
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
      fr: `👋 Salut à toi !`,
      es: `👋 ¡Hola!`,
      en: `👋 Hello there!`,
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
      fr: `🙏 Avec plaisir !`,
      es: `🙏 ¡De nada!`,
      en: `🙏 You're welcome!`,
    },
  },
  {
    intent: 'bye',
    keywords: {
      fr: ['au revoir', 'bye', 'ciao'],
      es: ['adiós', 'hasta luego', 'bye'],
      en: ['goodbye', 'bye', 'see you'],
    },
    response: {
      fr: `👋 À très vite !`,
      es: `👋 ¡Hasta pronto!`,
      en: `👋 See you soon!`,
    },
  },
  {
    intent: 'age',
    keywords: {
      fr: ['âge', 'naissance', 'date'],
      es: ['edad', 'nacimiento', 'fecha'],
      en: ['age', 'birth', 'date'],
    },
    response: {
      fr: `🎂 Je suis né en 2001, j'ai 23 ans.`,
      es: `🎂 Nací en 2001, tengo 23 años.`,
      en: `🎂 I was born in 2001, I'm 23 years old.`,
    },
  },
  {
    intent: 'qui',
    keywords: {
      fr: ['qui', 'créateur', 'développeur', 'assistant'],
      es: ['quién', 'creador', 'desarrollador', 'asistente'],
      en: ['who', 'creator', 'developer', 'assistant'],
    },
    response: {
      fr: `
      <div class="space-y-2">
        <div class="flex items-center gap-3">
          <img src="/assets/profile.png" alt="Antoine Gourgue" class="w-14 h-14 rounded-full border object-cover shadow-sm" />
          <div>
            <p class="font-semibold">Antoine Gourgue</p>
            <p class="text-sm text-gray-600">Étudiant à Epitech & Développeur Fullstack</p>
          </div>
        </div>
        <p>👋 Salut ! C'est moi qui ai codé cet assistant virtuel. Passionné par le dev, l'IA, les montres et le foot ⚽️</p>
        <div class="flex gap-3 mt-2">
          <a href="https://github.com/AntoineGourgue" target="_blank" class="text-sm text-blue-600 hover:underline">GitHub</a>
          <a href="https://linkedin.com/in/antoine-gourgue" target="_blank" class="text-sm text-blue-600 hover:underline">LinkedIn</a>
          <a href="/about" class="text-sm text-blue-600 hover:underline">À propos</a>
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
        <p>👋 ¡Hola! Soy yo quien programó este asistente virtual. Apasionado por el desarrollo, la IA, los relojes y el fútbol ⚽️</p>
        <div class="flex gap-3 mt-2">
          <a href="https://github.com/AntoineGourgue" target="_blank" class="text-sm text-blue-600 hover:underline">GitHub</a>
          <a href="https://linkedin.com/in/antoine-gourgue" target="_blank" class="text-sm text-blue-600 hover:underline">LinkedIn</a>
          <a href="/about" class="text-sm text-blue-600 hover:underline">Sobre mí</a>
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
        <p>👋 Hey! I'm the developer behind this assistant. Passionate about dev, AI, watches and football ⚽️</p>
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
      fr: `🤖 Je suis encore en apprentissage, mais je ferai de mon mieux pour t'aider.`,
      es: `🤖 Todavía estoy aprendiendo, pero haré todo lo posible para ayudarte.`,
      en: `🤖 I'm still learning, but I'll do my best to help you.`,
    },
  },
]
