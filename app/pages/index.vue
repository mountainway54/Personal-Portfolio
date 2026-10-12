<script setup lang="ts">
import { projects } from '~/data/projects'
import { homeSlides } from '~/data/home-slides'
import outwardIcon from '~/assets/icon/arrow_outward_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg'
useSeoMeta({ title: 'WILLLIN — Design portfolio', description: 'Brand, visual and interaction design by Will Lin. 品牌、視覺與互動設計作品集。' })
</script>
<template>
  <div>
    <h1 class="sr-only">WILLLIN — Design portfolio</h1>
    <ProjectHero :slides="homeSlides" />
    <section class="works-section content" aria-labelledby="work-heading">
      <div class="section-bar"><h2 id="work-heading" class="section-heading">WORK</h2><NuxtLink to="/work" class="text-link utility explore-work" aria-label="Explore work">Explore <img :src="outwardIcon" class="explore-work-icon" width="24" height="24" alt="" aria-hidden="true" /></NuxtLink></div>
      <div class="work-grid"><ProjectCard v-for="project in projects" :key="project.slug" :project="project" /></div>
    </section>
  </div>
</template>
