<script setup lang="ts">
import type { Project, Media } from '~/types/portfolio'
import { NuxtLink } from '#components'
import previousIcon from '~/assets/icon/arrow_back_ios_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg'
import nextIcon from '~/assets/icon/arrow_forward_ios_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg'
import downIcon from '~/assets/icon/keyboard_double_arrow_down_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg'
const props = defineProps<{ slides: { project?: Project; media: Media }[] }>()
const active = ref(0)
const slide = computed(() => props.slides[active.value])
const { open: openPackaging, isOpen: packagingOpen } = usePackagingModal()
let autoplayTimer: ReturnType<typeof setTimeout> | undefined
let mounted = false
function restartAutoplay() {
  clearTimeout(autoplayTimer)
  autoplayTimer = undefined
  if (!mounted || props.slides.length <= 1 || packagingOpen.value) return
  autoplayTimer = setTimeout(() => { step(1) }, 3000)
}
function selectSlide(index: number) {
  active.value = index
  restartAutoplay()
}
function step(offset: number) {
  if (props.slides.length > 1) selectSlide((active.value + offset + props.slides.length) % props.slides.length)
}
watch(() => props.slides.length, () => { selectSlide(0) })
watch(packagingOpen, restartAutoplay)
onMounted(() => {
  mounted = true
  restartAutoplay()
})
onBeforeUnmount(() => {
  mounted = false
  clearTimeout(autoplayTimer)
})
</script>
<template>
  <section class="hero" aria-label="Featured work" aria-roledescription="carousel">
    <template v-if="slide">
      <div class="hero-stage">
      <component :is="slide.project?.category === 'PACKAGE' ? 'button' : NuxtLink" class="hero-visual" :to="slide.project?.category === 'PACKAGE' ? undefined : slide.project ? `/work/${slide.project.slug}` : '/work'" :type="slide.project?.category === 'PACKAGE' ? 'button' : undefined" :aria-haspopup="slide.project?.category === 'PACKAGE' ? 'dialog' : undefined" :aria-label="`View ${slide.project?.title.en ?? slide.media.alt.en}`" @click="slide.project?.category === 'PACKAGE' && openPackaging(slide.project, $event)">
        <CloudinaryImage :key="slide.media.id" :media="slide.media" :reveal-duration="1.5" priority sizes="100vw" />
      </component>
      <div v-if="slides.length > 1" class="hero-navigation">
        <button class="hero-previous" aria-label="Previous" @click="step(-1)"><span class="hero-arrow" aria-hidden="true"><img :src="previousIcon" width="24" height="24" alt="" /></span></button>
        <button class="hero-next" aria-label="Next" @click="step(1)"><span class="hero-arrow" aria-hidden="true"><img :src="nextIcon" width="24" height="24" alt="" /></span></button>
      </div>
      <div v-if="slides.length > 1" class="hero-pagination" role="group" aria-label="Choose featured image">
        <button v-for="(item, index) in slides" :key="item.media.id" :aria-label="`Show image ${index + 1}: ${item.project?.title.en ?? item.media.alt.en}`" :aria-pressed="active === index" @click="selectSlide(index)"><span aria-hidden="true" /></button>
      </div>
      </div>
      <a class="hero-scroll" href="#work-heading" aria-label="Scroll to work"><img :src="downIcon" width="24" height="24" alt="" /></a>
      <span class="sr-only" aria-live="polite" aria-atomic="true">{{ slide.project?.title.en ?? slide.media.alt.en }} — {{ active + 1 }} / {{ slides.length }}</span>
    </template>
    <div v-else class="hero-empty"><p>Featured work coming soon</p></div>
  </section>
</template>
