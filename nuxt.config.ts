// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxtjs/i18n',
    'nuxt-studio'
  ],

  devtools: {
    enabled: true
  },

  devServer: {
    port: 3006
  },

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2026-06-30',

  nitro: {
    prerender: {
      routes: ['/'],
      crawlLinks: true
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  i18n: {
    baseUrl: 'http://localhost:3006',
    defaultLocale: 'fr',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: false,
    locales: [
      { code: 'fr', language: 'fr-CA', name: 'Français', dir: 'ltr', file: 'fr.json' },
      { code: 'en', language: 'en-CA', name: 'English', dir: 'ltr', file: 'en.json' }
    ]
  },

  studio: {
    // Auto-detected on Vercel, Netlify, GitHub Actions and GitLab CI.
    // Set these env vars (or edit the fallbacks) when publishing from another host.
    repository: {
      provider: 'github',
      owner: process.env.STUDIO_REPO_OWNER || 'your-org',
      repo: process.env.STUDIO_REPO_NAME || 'poc-nuxt-studio',
      branch: process.env.STUDIO_REPO_BRANCH || 'main'
    },
    i18n: {
      defaultLocale: 'fr'
    },
    git: {
      commit: {
        messagePrefix: 'content:'
      }
    }
  }
})
