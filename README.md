# Antoine Gourgue — Portfolio

Welcome to my personal portfolio! 🚀  
A clean, modern, and professional showcase of my projects, services, and experience as a Fullstack Developer.

## 🌐 Live Website

[https://antoine-gourgue.vercel.app](https://antoine-gourgue.vercel.app)

---

## 📄 Features

- 💻 Fully responsive design, inspired by Apple's minimal aesthetics
- 🚀 Animated navigation and smooth page transitions
- 📂 Dynamic Projects page fetching from GitHub API
- 📰 Blog section pulling external mentions using Google Custom Search API
- 📬 Contact form with email integration via SMTP
- ⚙️ Simple, modular component architecture with reusable UI elements
- 🎨 Built with modern technologies (Nuxt 3, TypeScript, Tailwind CSS)

---

## 🛠️ Tech Stack

- **Nuxt 3** (Vue 3 + Composition API + TypeScript)
- **Tailwind CSS** for styling
- **Font Awesome & Feather Icons**
- **Vercel** for deployment & hosting
- **Google Custom Search API** (Blog mentions)
- **Nodemailer** (Contact form email integration)

---

## 🚀 Local Setup

```bash
# Clone the repository
git clone https://github.com/antoine-gourgue/portfolio.git
cd portfolio

# Install dependencies
npm install

# Create your .env file
cp .env.example .env
# Fill in your environment variables (SMTP, GitHub token, Google API key, etc.)

# Start development server
npm run dev
```

# Environment variables

    GITHUB_TOKEN=your_github_token

# Email Contact (SMTP)

    MAIL_HOST=smtp.example.com
    MAIL_PORT=465
    MAIL_USER=youremail@example.com
    MAIL_PASS=yourpassword
    MAIL_FROM=youremail@example.com
    MAIL_TO=youremail@example.com

# Google Custom Search API

    GOOGLE_API_KEY=your_google_api_key
    GOOGLE_CX_ID=your_custom_search_engine_id
