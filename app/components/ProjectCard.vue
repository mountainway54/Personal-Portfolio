<script setup lang="ts">
import type { Project } from '~/types/portfolio'
import { NuxtLink } from '#components'
const props = defineProps<{ project: Project }>()
const { open } = usePackagingModal()
const packaging = computed(() => props.project.category === 'PACKAGE')
function activate(event: Event) { if (packaging.value) open(props.project, event) }
const visual = ref<HTMLElement>()
useImageReveal(visual, computed(() => true), 'up')
</script>
<template>
  <component :is="packaging ? 'button' : NuxtLink" :to="packaging ? undefined : `/work/${project.slug}`" :type="packaging ? 'button' : undefined" :aria-haspopup="packaging ? 'dialog' : undefined" class="project-card" :aria-label="`${project.title.en} · ${project.title.zhTw}`" @click="activate">
    <div ref="visual" class="card-visual" :class="{ 'card-visual-pending': !project.cover }" :style="project.packaging?.shape === 'carton' ? { backgroundColor: project.packaging.paperColor } : undefined">
      <CloudinaryImage v-if="project.cover" :media="project.cover" :reveal="false" sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 90vw" />
      <div v-else class="card-pending" aria-hidden="true" />
      <div class="card-overlay">
        <p class="card-category utility">{{ [project.category, ...(project.additionalCategories ?? [])].join(' / ') }}</p>
        <h3 class="card-title">{{ project.title.en }}</h3>
        <p class="card-zh" lang="zh-Hant">{{ project.title.zhTw }}</p>
        <p v-if="!project.cover" class="pending-label">Content coming soon</p>
      </div>
    </div>
  </component>
</template>
<style scoped>
button.project-card { width: 100%; padding: 0; text-align: left; }
</style>
