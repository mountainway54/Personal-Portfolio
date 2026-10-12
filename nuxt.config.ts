import { projects } from './app/data/projects'

export default defineNuxtConfig({
  compatibilityDate: '2026-10-07',
  devtools: { enabled: true },
  ssr: true,
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: { cloudinaryCloudName: 'akx9y9c8', mediaPreview: true },
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'WILLLIN — Design portfolio',
      meta: [{ name: 'description', content: 'Brand, visual and interaction design by Will Lin. 林立偉的品牌、視覺與互動設計作品集。' }],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },
  nitro: {
    prerender: { routes: ['/', '/work', '/about', ...projects.map(project => `/work/${project.slug}`)] },
  },
})
