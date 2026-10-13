<script setup lang="ts">
import { packagingFaces, type Packaging } from '~/types/portfolio'
import { packagingImageUrl, packagingSurfaces } from '~/utils/packaging'
const props = defineProps<{ packaging: Packaging }>()
const config = useRuntimeConfig()
const failed = ref<string[]>([])
const images = computed(() => [...new Map(packagingFaces.flatMap(face => {
  const media = packagingSurfaces(props.packaging)[face]?.media
  if (!media) return []
  const src = packagingImageUrl(media, String(config.public.cloudinaryCloudName))
  return src ? [[media.id, { media, src }] as const] : []
})).values()].filter(item => !failed.value.includes(item.media.id)))
</script>
<template>
  <div class="packaging-static-images">
    <img v-for="item in images" :key="item.media.id" :src="item.src" :width="item.media.width" :height="item.media.height" :alt="item.media.alt.en" @error="failed.push(item.media.id)" />
    <p v-if="!images.length">Images unavailable</p>
  </div>
</template>
