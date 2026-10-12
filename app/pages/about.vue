<script setup lang="ts">
import { contact, introduction, education, experiences } from '~/data/profile'
import { gsap } from 'gsap'
const content = ref<HTMLElement>()
let motion: gsap.MatchMedia | undefined
onMounted(() => {
  if (!content.value) return
  motion = gsap.matchMedia()
  motion.add('(prefers-reduced-motion: no-preference)', () => {
    const groups = Array.from(content.value!.querySelectorAll<HTMLElement>('.about-intro, .profile-section')).map(element => ({
      element,
      headings: Array.from(element.querySelectorAll<HTMLElement>(':scope > .utility, :scope > .about-name, :scope > h2')),
      bodies: Array.from(element.querySelectorAll<HTMLElement>(element.matches('.about-intro') ? '.about-lead > p' : ':scope > div')),
      visible: false,
      started: false,
    }))
    const timelines: gsap.core.Timeline[] = []
    gsap.set(groups.flatMap(group => [...group.headings, ...group.bodies]), { opacity: 0, x: -64 })
    function reveal() {
      if (document.querySelector('.loading-screen')) return
      groups.forEach(group => {
        if (!group.visible || group.started) return
        group.started = true
        viewport.unobserve(group.element)
        const timeline = gsap.timeline()
          .to(group.headings, { opacity: 1, x: 0, duration: 0.75, stagger: 0.08, ease: 'power3.out', clearProps: 'opacity,transform' })
          .to(group.bodies, { opacity: 1, x: 0, duration: 0.75, stagger: 0.12, ease: 'power3.out', clearProps: 'opacity,transform' }, 0.18)
        timelines.push(timeline)
      })
    }
    const viewport = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const group = groups.find(group => group.element === entry.target)
        if (group) group.visible = entry.isIntersecting
      })
      reveal()
    }, { rootMargin: '0px 0px -5% 0px' })
    // Wait for the initial loading overlay so the entrance remains visible.
    const loadingObserver = new MutationObserver(() => {
      reveal()
      if (!document.querySelector('.loading-screen')) loadingObserver.disconnect()
    })
    if (document.querySelector('.loading-screen')) loadingObserver.observe(document.body, { childList: true, subtree: true })
    groups.forEach(group => viewport.observe(group.element))
    return () => { viewport.disconnect(); loadingObserver.disconnect(); timelines.forEach(timeline => timeline.revert()) }
  }, content.value)
})
onBeforeUnmount(() => motion?.revert())
useSeoMeta({ title: 'About — WILLLIN', description: 'Will Lin’s background in brand and visual design, and front-end development. 品牌與視覺設計背景、學歷與工作經歷。' })
</script>
<template>
  <div ref="content" class="content">
    <header class="about-intro"><p class="utility" style="margin-bottom:25px">ABOUT</p><div class="about-name"><h1 class="page-title">Will Lin <span lang="zh-Hant">林立崴</span></h1><p lang="zh-Hant">關於我</p></div><div class="about-lead"><p>{{ introduction.en }}</p><p lang="zh-Hant">{{ introduction.zhTw }}</p></div></header>
    <section class="profile-section" aria-labelledby="education">
      <h2 id="education">EDUCATION</h2>
      <div><article v-for="item in education" :key="item.period" class="education-item">
        <p class="period">{{ item.period }}</p>
        <h3 lang="zh-Hant">{{ item.school.zhTw }}｜{{ item.degree.zhTw }}</h3>
      </article></div>
    </section>
    <section class="profile-section" aria-labelledby="experience">
      <h2 id="experience">EXPERIENCE</h2>
      <div><article v-for="item in experiences" :key="item.period" class="experience-item">
        <p class="period" lang="zh-Hant">{{ item.occupation.zhTw }}｜{{ item.period }} · {{ item.duration.zhTw }}</p>
        <h3 lang="zh-Hant">{{ item.title.zhTw }}</h3>
        <p class="company" lang="zh-Hant">{{ item.company.zhTw }}<template v-if="item.industry">｜{{ item.industry.zhTw }}</template></p>
        <ul class="responsibilities"><li v-for="bullet in item.responsibilities" :key="bullet.zhTw"><p lang="zh-Hant">{{ bullet.zhTw }}</p></li></ul>
        <div class="skills">
          <p class="utility">SKILLS</p>
          <ul class="skill-tags" aria-label="Skills" lang="zh-Hant">
            <li v-for="(skill, index) in item.skills.zhTw.split('、').map(text => text.trim()).filter(Boolean)" :key="index" class="skill-tag">{{ skill }}</li>
          </ul>
        </div>
      </article></div>
    </section>
    <section class="profile-section contact-section" aria-labelledby="contact"><h2 id="contact">CONTACT</h2><div><a class="text-link" :href="`mailto:${contact.email}`">{{ contact.email }}</a><br /><a class="text-link" :href="contact.phoneHref">{{ contact.phone }}</a></div></section>
  </div>
</template>
