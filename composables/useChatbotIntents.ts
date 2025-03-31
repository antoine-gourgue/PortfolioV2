export type Lang = 'fr' | 'en'
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
      en: ['resume', 'cv', 'curriculum'],
    },
    response: {
      fr: `📄 Mon CV est disponible dans la section <a href='/about' class='text-blue-600 underline hover:text-blue-800'>À propos</a>.`,
      en: `📄 You can find my resume in the <a href='/about' class='text-blue-600 underline hover:text-blue-800'>About</a> section.`,
    },
  },
  {
    intent: 'contact',
    keywords: {
      fr: ['contact', 'mail', 'formulaire', 'message'],
      en: ['contact', 'email', 'form', 'message'],
    },
    response: {
      fr: `📬 Tu veux me contacter ?`,
      en: `📬 You want to contact me?`,
    },
    followUp: {
      question: {
        fr: `🔍 Préfères-tu m’envoyer un mail ou utiliser le formulaire ?`,
        en: `🔍 Would you prefer to email me or use the contact form?`,
      },
      expectedIntent: 'contact_method',
    },
  },
  {
    intent: 'contact_method',
    keywords: {
      fr: ['mail', 'email', 'e-mail'],
      en: ['email', 'mail'],
    },
    response: {
      fr: `📧 Super, tu peux utiliser le formulaire dans la section <a href='/contact' class='text-blue-600 underline hover:text-blue-800'>Contact</a> !`,
      en: `📧 Great! You can use the form in the <a href='/contact' class='text-blue-600 underline hover:text-blue-800'>Contact</a> section.`,
    },
  },
  {
    intent: 'projets',
    keywords: {
      fr: ['projets', 'portfolio', 'travaux', 'réalisations'],
      en: ['projects', 'portfolio', 'work', 'project'],
    },
    response: {
      fr: `📁 Tu peux voir mes projets dans la section <a href='/projects' class='text-blue-600 underline hover:text-blue-800'>Projets</a>.`,
      en: `📁 You can see my work in the <a href='/projects' class='text-blue-600 underline hover:text-blue-800'>Projects</a> section.`,
    },
    followUp: {
      question: {
        fr: `Souhaites-tu que je te recommande un projet à voir en priorité ?`,
        en: `Would you like me to recommend a project to check first?`,
      },
      expectedIntent: 'project_recommendation',
    },
  },
  {
    intent: 'project_recommendation',
    keywords: {
      fr: ['oui', 'yes', 'vas-y'],
      en: ['yes', 'go ahead'],
    },
    response: {
      fr: `🚀 Regarde <a href='/projects#flashfootball' class='text-blue-600 underline hover:text-blue-800'>FlashFootball</a>, un projet complet avec Nuxt 3, Tailwind et API-Football.`,
      en: `🚀 Check out <a href='/projects#flashfootball' class='text-blue-600 underline hover:text-blue-800'>FlashFootball</a>, a full project with Nuxt 3, Tailwind, and the API-Football.`,
    },
  },
  {
    intent: 'tech',
    keywords: {
      fr: ['tech', 'technologies', 'stack', 'outils', 'skills'],
      en: ['tech', 'technologies', 'stack', 'tools', 'skills'],
    },
    response: {
      fr: `🛠️ J'utilise Vue 3, Nuxt 3, Tailwind CSS, TypeScript, AngularJS, Node.js, PostgreSQL, Prisma, Docker et Git.`,
      en: `🛠️ I use Vue 3, Nuxt 3, Tailwind CSS, TypeScript, AngularJS, Node.js, PostgreSQL, Prisma, Docker and Git.`,
    },
  },
  {
    intent: 'formation',
    keywords: {
      fr: ['formation', 'études', 'école', 'epitech', 'master', 'ia', 'data'],
      en: ['education', 'studies', 'school', 'epitech', 'master', 'ai', 'data'],
    },
    response: {
      fr: `🎓 Je suis étudiant à Epitech Rennes en Master IA & Data.`,
      en: `🎓 I'm a student at Epitech Rennes in the AI & Data Master's program.`,
    },
    followUp: {
      question: {
        fr: `Tu veux savoir pourquoi j’ai choisi cette spécialisation ?`,
        en: `Would you like to know why I chose this specialization?`,
      },
      expectedIntent: 'choix_ia',
    },
  },
  {
    intent: 'choix_ia',
    keywords: {
      fr: ['pourquoi', 'choix', 'ia', 'data', 'spécialisation', 'master'],
      en: ['why', 'choice', 'ai', 'data', 'specialization', 'master'],
    },
    response: {
      fr: `🤖 L’IA me passionne car elle est au cœur des innovations futures, et je veux en faire partie.`,
      en: `🤖 AI fascinates me because it's at the core of future innovations, and I want to be part of it.`,
    },
  },
  {
    intent: 'alternance',
    keywords: {
      fr: ['alternance', 'digitaleo', 'travail', 'stage', 'entreprise'],
      en: ['apprenticeship', 'digitaleo', 'work', 'internship', 'company'],
    },
    response: {
      fr: `💼 Je suis en alternance chez Digitaleo où je travaille avec AngularJS et Vue.js.`,
      en: `💼 I'm doing my apprenticeship at Digitaleo, working with AngularJS and Vue.js.`,
    },
  },
  {
    intent: 'montres',
    keywords: {
      fr: ['montres', 'horlogerie', 'collection', 'watch', 'watches'],
      en: ['watches', 'watch', 'horology', 'collection'],
    },
    response: {
      fr: `⌚️ Passionné d’horlogerie, j'ai une petite collection de montres.`,
      en: `⌚️ I'm a watch enthusiast and I have a small collection.`,
    },
  },
  {
    intent: 'foot',
    keywords: {
      fr: ['foot', 'football', 'ligue 1'],
      en: ['foot', 'football', 'ligue 1'],
    },
    response: {
      fr: `⚽️ Fan de foot, et supporter de l'OM bien sûr 🔵⚪`,
      en: `⚽️ Football fan and OM supporter of course 🔵⚪`,
    },
  },
  {
    intent: 'psg',
    keywords: {
      fr: ['psg', 'paris', 'paris saint-germain'],
      en: ['psg', 'paris', 'paris saint-germain'],
    },
    response: {
      fr: `🤐 Ce club ne fait pas partie de mes références footballistiques...`,
      en: `🤐 That club doesn’t ring a bell…`,
    },
  },
  {
    intent: 'langues',
    keywords: {
      fr: ['langues', 'parler', 'français', 'anglais', 'espagnol'],
      en: ['languages', 'speak', 'french', 'english', 'spanish'],
    },
    response: {
      fr: `🗣️ Je parle français (natif), anglais technique et un peu d’espagnol.`,
      en: `🗣️ I speak French (native), technical English and some Spanish.`,
    },
  },
  {
    intent: 'blog',
    keywords: {
      fr: ['blog', 'articles', 'écrits', 'lire'],
      en: ['blog', 'articles', 'posts', 'read'],
    },
    response: {
      fr: `📝 Tu peux lire mes articles dans la section <a href='/blog' class='text-blue-600 underline hover:text-blue-800'>Blog</a>.`,
      en: `📝 You can read my articles in the <a href='/blog' class='text-blue-600 underline hover:text-blue-800'>Blog</a> section.`,
    },
  },
  {
    intent: 'intérêts',
    keywords: {
      fr: ['intérêts', 'passions', 'hobbies', 'loisirs'],
      en: ['interests', 'passions', 'hobbies'],
    },
    response: {
      fr: `🎯 J'aime le dev, l’IA, les montres et le foot. Un combo solide non ?`,
      en: `🎯 I love dev, AI, watches and football. Solid combo right?`,
    },
  },
  {
    intent: 'salutation',
    keywords: {
      fr: ['salut', 'bonjour', 'hello', 'hi'],
      en: ['hello', 'hi'],
    },
    response: {
      fr: `👋 Salut à toi !`,
      en: `👋 Hello there!`,
    },
  },
  {
    intent: 'merci',
    keywords: {
      fr: ['merci'],
      en: ['thanks', 'thank you'],
    },
    response: {
      fr: `🙏 Avec plaisir !`,
      en: `🙏 You're welcome!`,
    },
  },
  {
    intent: 'bye',
    keywords: {
      fr: ['au revoir', 'bye', 'ciao'],
      en: ['goodbye', 'bye', 'see you'],
    },
    response: {
      fr: `👋 À très vite !`,
      en: `👋 See you soon!`,
    },
  },
  {
    intent: 'age',
    keywords: {
      fr: ['âge', 'naissance', 'date'],
      en: ['age', 'birth', 'date'],
    },
    response: {
      fr: `🎂 Je suis né en 2001, j'ai 23 ans.`,
      en: `🎂 I was born in 2001, I'm 23 years old.`,
    },
  },
  {
    intent: 'qui',
    keywords: {
      fr: ['qui', 'créateur', 'développeur', 'assistant'],
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
      en: `
      <div class="space-y-2">
        <div class="flex items-center gap-3">
          <img src="/assets/profile.png" alt="Antoine Gourgue" class="w-12 h-12 rounded-full border" />
          <div>
            <p class="font-semibold">Antoine Gourgue</p>
            <p class="text-sm text-gray-600">Epitech student & Fullstack developer</p>
          </div>
        </div>
        <p>👋 Hey! I’m the developer behind this assistant. Passionate about dev, AI, watches and football ⚽️</p>
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
      en: [],
    },
    response: {
      fr: `🤖 Je suis encore en apprentissage, mais je ferai de mon mieux pour t'aider.`,
      en: `🤖 I'm still learning, but I'll do my best to help you.`,
    },
  },
]
