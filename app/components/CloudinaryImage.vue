<script setup lang="ts">
import type { Media } from '~/types/portfolio'
import { cloudinaryUrl, cloudinarySrcset } from '~/utils/cloudinary'
const props = withDefaults(defineProps<{ media: Media; priority?: boolean; crop?: boolean; sizes?: string; reveal?: boolean; revealDirection?: 'right' | 'up'; revealDuration?: number }>(), {
  priority: false, crop: false, sizes: '100vw', reveal: true, revealDirection: 'right', revealDuration: 0.7,
})
const emit = defineEmits<{ settled: [] }>()
const config = useRuntimeConfig()
const frame = ref<HTMLElement>()
const image = ref<HTMLImageElement>()
const failed = ref(false)
const remote = computed(() => cloudinaryUrl(String(config.public.cloudinaryCloudName), props.media, 1440, props.crop))
const local = computed(() => !remote.value && (props.media.delivery === 'local' || String(config.public.mediaPreview) !== 'false') ? props.media.localSrc : undefined)
const src = computed(() => remote.value || local.value)
const srcset = computed(() => remote.value ? cloudinarySrcset(String(config.public.cloudinaryCloudName), props.media, props.crop) : undefined)
watch(src, () => { failed.value = false })
function fail() { failed.value = true; emit('settled') }
useImageReveal(frame, computed(() => props.reveal), props.revealDirection, props.revealDuration)
onMounted(() => { if (!src.value || image.value?.complete) emit('settled') })
</script>
<template>
  <div ref="frame" class="media-frame" :class="{ 'media-frame--crop': crop }" :style="{ aspectRatio: crop ? '16 / 9' : `${media.width} / ${media.height}` }">
    <img v-if="src && !failed" ref="image" :src="src" :srcset="srcset" :sizes="sizes" :width="media.width" :height="media.height" :alt="media.alt.en" :loading="priority ? 'eager' : 'lazy'" :fetchpriority="priority ? 'high' : 'auto'" :data-priority="priority || undefined" @load="emit('settled')" @error="fail" />
    <div v-else class="media-placeholder" role="img" :aria-label="media.alt.en"><span>{{ failed ? 'Image unavailable' : 'Image coming soon' }}</span><span>{{ media.alt.en }}</span><span lang="zh-Hant">{{ media.alt.zhTw }}</span></div>
  </div>
</template>
