<script setup lang="ts">
import { filterProjects } from "~/data/projects";
import { categories, type Category } from "~/types/portfolio";
const selected = ref<Category | "ALL">("ALL");
const workCategories = [...categories.filter(category => category !== "PACKAGE"), "PACKAGE"] as const;
const visible = computed(() => filterProjects(selected.value).sort(
  (a, b) => Number(a.category === "PACKAGE") - Number(b.category === "PACKAGE"),
));
useSeoMeta({
  title: "Work — WILLLIN",
  description:
    "Explore brand identities, packaging, concepts, websites and social media design. 瀏覽品牌識別、包裝、概念、網站與社群設計。",
});
</script>
<template>
  <div class="content">
    <header class="page-intro">
      <p class="utility">Design portfolio</p>
      <h1 data-work-heading tabindex="-1" class="page-title work-page-title">WORK</h1>
    </header>
    <div class="filters" role="group" aria-label="Filter work">
      <button
        v-for="category in ['ALL', ...workCategories] as const"
        :key="category"
        class="utility"
        :data-label="category"
        :aria-pressed="selected === category"
        @click="selected = category"
      >
        <span>{{ category }}</span>
      </button>
    </div>
    <div v-if="visible.length" class="work-grid">
      <ProjectCard
        v-for="project in visible"
        :key="project.slug"
        :project="project"
      />
    </div>
    <p v-else class="empty-message">No projects in this category.</p>
  </div>
</template>
