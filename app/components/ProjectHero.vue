<script setup lang="ts">
import type { Project, Media } from '~/types/portfolio'
import previousIcon from '~/assets/icon/arrow_back_ios_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg'
import nextIcon from '~/assets/icon/arrow_forward_ios_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg'
import downIcon from '~/assets/icon/keyboard_double_arrow_down_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg'
const props = defineProps<{ slides: { project?: Project; media: Media }[] }>()
const active = ref(0)
const slide = computed(() => props.slides[active.value])
function step(offset: number) { active.value = (active.value + offset + props.slides.length) % props.slides.length }
watch(() => props.slides.length, () => { active.value = 0 })
</script>
<template>
  <section class="hero" aria-label="Featured work" aria-roledescription="carousel">
    <template v-if="slide">
      <div class="hero-stage">
      <NuxtLink class="hero-visual" :to="slide.project ? `/work/${slide.project.slug}` : '/work'" :aria-label="`View ${slide.project?.title.en ?? slide.media.alt.en}`"><CloudinaryImage :key="slide.media.id" :media="slide.media" priority sizes="100vw" /></NuxtLink>
      <div v-if="slides.length > 1" class="hero-navigation">
        <button class="hero-previous" aria-label="Previous" @click="step(-1)"><img :src="previousIcon" width="24" height="24" alt="" /></button>
        <button class="hero-next" aria-label="Next" @click="step(1)"><img :src="nextIcon" width="24" height="24" alt="" /></button>
      </div>
      <div v-if="slides.length > 1" class="hero-pagination" role="group" aria-label="Choose featured image">
        <button v-for="(item, index) in slides" :key="item.media.id" :aria-label="`Show image ${index + 1}: ${item.project?.title.en ?? item.media.alt.en}`" :aria-pressed="active === index" @click="active = index"><span aria-hidden="true" /></button>
      </div>
      </div>
      <a class="hero-scroll" href="#work-heading" aria-label="Scroll to work"><img :src="downIcon" width="24" height="24" alt="" /></a>
      <span class="sr-only" aria-live="polite" aria-atomic="true">{{ slide.project?.title.en ?? slide.media.alt.en }} — {{ active + 1 }} / {{ slides.length }}</span>
    </template>
    <div v-else class="hero-empty"><p>Featured work coming soon</p></div>
  </section>
</template>
