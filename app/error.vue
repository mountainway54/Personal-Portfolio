<script setup lang="ts">
import type { NuxtError } from '#app'
const props = defineProps<{ error: NuxtError }>()
useSeoMeta({ title: `${props.error.statusCode} — WILLLIN` })
</script>
<template>
  <div class="site-shell"><SiteHeader /><main id="main" class="error-page content"><p class="utility">{{ error.statusCode }}</p><h1 class="page-title" style="margin-top:24px">{{ error.statusCode === 404 ? 'Not found.' : 'Unable to load.' }}</h1><p>{{ error.statusCode === 404 ? 'This page is not in the portfolio.' : 'Please try opening the portfolio again.' }}</p><a href="/work" class="text-link utility">← Back to work</a></main><SiteFooter /></div>
</template>
