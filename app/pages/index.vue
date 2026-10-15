<script setup lang="ts">
import { projects } from '~/data/projects'
import { homeSlides } from '~/data/home-slides'
import outwardIcon from '~/assets/icon/arrow_outward_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg'
const homeProjects = [
  'day-care-brand-identity-01',
  'interactive-installation',
  'dadi-website',
  'office-politics-game',
  'erectus-faucet',
  'real-estate-key-visual',
].map(slug => projects.find(project => project.slug === slug)!)
useSeoMeta({ title: 'WILLLIN — Design portfolio', description: 'Brand, visual and interaction design by Will Lin. 品牌、視覺與互動設計作品集。' })
</script>
<template>
  <div>
    <h1 class="sr-only">WILLLIN — Design portfolio</h1>
    <ProjectHero :slides="homeSlides" />
    <section class="home-intro content" aria-label="關於林立崴">
      <NuxtLink to="/about" class="text-link utility home-intro-link">more <img :src="outwardIcon" class="explore-work-icon" width="24" height="24" alt="" aria-hidden="true" /></NuxtLink>
      <div class="home-intro-copy">
        <p lang="zh-Hant">我是林立崴，來自新北市的設計師、開發者與創作者，專注於品牌設計。</p>
        <p lang="en">I'm Will Lin, a designer, developer, and creator based in New Taipei City, specializing in brand design.</p>
      </div>
    </section>
    <section class="works-section content" aria-labelledby="work-heading">
      <div class="section-bar"><h2 id="work-heading" data-work-heading tabindex="-1" class="section-heading">WORK</h2><NuxtLink to="/work" class="text-link utility explore-work" aria-label="Explore work">Explore <img :src="outwardIcon" class="explore-work-icon" width="24" height="24" alt="" aria-hidden="true" /></NuxtLink></div>
      <div class="work-grid"><ProjectCard v-for="project in homeProjects" :key="project.slug" :project="project" /></div>
    </section>
  </div>
</template>

<style scoped>
.home-intro {
  display: grid;
  gap: 24px;
  padding-block: clamp(56px, 8vw, 112px) 0;
}
.home-intro-copy {
  max-width: 960px;
  display: grid;
  gap: 16px;
}
.home-intro-copy p {
  font-size: clamp(18px, 2vw, 26px);
}
.home-intro-link {
  justify-self: end;
}
</style>
