<script setup lang="ts">
import { projects } from '~/data/projects'
import replyIcon from '~/assets/icon/reply_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg'
const route = useRoute()
const project = projects.find(item => item.slug === route.params.slug)
if (!project) throw createError({ statusCode: 404, statusMessage: 'Project not found' })
const mainImage = project.gallery[0] ?? project.cover
const galleryImages = project.gallery.slice(1)
const configuredRows = (project.galleryRows ?? []).map(row =>
  row.flatMap(id => {
    const media = galleryImages.find(image => image.id === id)
    return media ? [media] : []
  }),
).filter(row => row.length)
const groupedIds = new Set(configuredRows.flat().map(media => media.id))
const galleryRows = [...configuredRows, ...galleryImages.filter(media => !groupedIds.has(media.id)).map(media => [media])]
useSeoMeta({ title: `${project.title.en} — WILLLIN`, description: `${project.title.en} · ${project.title.zhTw}` })
</script>
<template>
  <div v-if="project" class="content">
    <NuxtLink to="/work" class="text-link utility project-top-link"><img :src="replyIcon" width="24" height="24" alt="" aria-hidden="true" /> Back to work</NuxtLink>
    <div v-if="mainImage" class="project-main-image">
      <CloudinaryImage :media="mainImage" priority reveal-direction="up" sizes="(min-width: 1440px) 1280px, 90vw" />
    </div>
    <header class="project-intro">
      <h1 class="project-title">{{ project.title.en }}</h1>
      <div class="project-title-row">
        <p class="project-title-zh" lang="zh-Hant">{{ project.title.zhTw }}</p>
        <span class="project-category">{{ project.category }}</span>
      </div>
      <div v-if="project.description" class="project-description"><p>{{ project.description.en }}</p><p lang="zh-Hant">{{ project.description.zhTw }}</p></div>
      <dl v-if="project.date || project.role" class="project-description"><div v-if="project.date"><dt class="utility">Date</dt><dd>{{ project.date }}</dd></div><div v-if="project.role"><dt class="utility">Role</dt><dd>{{ project.role.en }}<span lang="zh-Hant">{{ project.role.zhTw }}</span></dd></div></dl>
      <a v-if="project.externalUrl" :href="project.externalUrl" class="text-link" target="_blank" rel="noopener noreferrer">Visit website ↗</a>
      <div v-if="project.status === 'pending'" class="project-pending"><span>Content coming soon{{ project.gallery.length ? ' · Project story to follow' : '' }}</span><span lang="zh-Hant">{{ project.gallery.length ? '作品介紹待補，以下為實際作品影像。' : '作品內容待補。' }}</span></div>
    </header>
    <div v-if="galleryRows.length" class="project-gallery">
      <div v-for="row in galleryRows" :key="row.map(media => media.id).join('-')" class="project-gallery-row" :style="{ '--gallery-columns': row.length }">
        <figure v-for="media in row" :key="media.id" style="margin:0; min-width:0">
          <CloudinaryImage :media="media" reveal-direction="up" :sizes="row.length > 1 ? '(min-width: 1440px) 625px, (min-width: 768px) 45vw, 90vw' : '(min-width: 1440px) 1280px, 90vw'" />
          <figcaption class="gallery-caption">{{ media.alt.en }}<span lang="zh-Hant"> · {{ media.alt.zhTw }}</span></figcaption>
        </figure>
      </div>
    </div>
    <div class="project-back"><NuxtLink to="/work" class="text-link utility"><img :src="replyIcon" width="24" height="24" alt="" aria-hidden="true" /> Back to work</NuxtLink><NuxtLink to="/about" class="text-link utility">About Will ↗</NuxtLink></div>
  </div>
</template>
