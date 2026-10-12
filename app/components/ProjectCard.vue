<script setup lang="ts">
import type { Project } from '~/types/portfolio'
defineProps<{ project: Project }>()
const visual = ref<HTMLElement>()
useImageReveal(visual, computed(() => true), 'up')
</script>
<template>
  <NuxtLink :to="`/work/${project.slug}`" class="project-card" :aria-label="`${project.title.en} · ${project.title.zhTw}`">
    <div ref="visual" class="card-visual" :class="{ 'card-visual-pending': !project.cover }">
      <CloudinaryImage v-if="project.cover" :media="project.cover" :reveal="false" sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 90vw" />
      <div v-else class="card-pending" aria-hidden="true" />
      <div class="card-overlay">
        <p class="card-category utility">{{ project.category }}</p>
        <h3 class="card-title">{{ project.title.en }}</h3>
        <p class="card-zh" lang="zh-Hant">{{ project.title.zhTw }}</p>
        <p v-if="!project.cover" class="pending-label">Content coming soon</p>
      </div>
    </div>
  </NuxtLink>
</template>
