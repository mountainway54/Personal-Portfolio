/// <reference types="node" />
import { projects } from './app/data/projects'
import { copyFile, mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
const packagingProjects = projects.filter(project => project.category === 'PACKAGE')
const legacyProduceRoute = { slug: 'produce-carton', destination: '/work' }

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
  routeRules: { ...Object.fromEntries(packagingProjects.map(project => [
    `/work/${project.slug}`, { redirect: { to: `/work?package=${project.slug}`, statusCode: 302 } },
  ])), '/work/produce-carton': { redirect: { to: legacyProduceRoute.destination, statusCode: 302 } } },
  hooks: {
    'nitro:init'(nitro) {
      // Pure static hosts also need usable legacy URLs, even without redirect rules.
      nitro.hooks.hook('prerender:done', async () => {
        // Some static servers resolve extensionless URLs through .html rather than directory indexes.
        await copyFile(join(nitro.options.output.publicDir, 'work', 'index.html'), join(nitro.options.output.publicDir, 'work.html'))
        for (const project of [...packagingProjects.map(project => ({ slug: project.slug, destination: `/work?package=${project.slug}` })), legacyProduceRoute]) {
          const destination = project.destination
          const directory = join(nitro.options.output.publicDir, 'work', project.slug)
          await mkdir(directory, { recursive: true })
          await writeFile(join(directory, 'index.html'), `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="refresh" content="0;url=${destination}"><title>Packaging preview — WILLLIN</title><link rel="canonical" href="${destination}"></head><body><a href="${destination}">Open packaging preview</a></body></html>`, 'utf8')
          await copyFile(join(directory, 'index.html'), join(nitro.options.output.publicDir, 'work', `${project.slug}.html`))
        }
      })
    },
  },
  nitro: {
    prerender: { routes: ['/', '/work', '/about', ...projects.filter(project => project.category !== 'PACKAGE').map(project => `/work/${project.slug}`)] },
  },
})
