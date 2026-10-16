<script setup lang="ts">
import { contact } from '~/data/profile'
const year = new Date().getFullYear()
</script>
<template>
  <footer class="site-footer content">
    <div class="footer-layout">
      <div class="footer-links">
        <div class="logo-space footer-brand"><InteractiveLogo width="100%" color="#fff" :stretch="2.4" :v-stretch="1.35" :gap-expand="2.4" /></div>
        <a class="text-link" :href="`mailto:${contact.email}`">{{ contact.email }}</a>
        <a class="text-link" :href="contact.phoneHref">{{ contact.phone }}</a>
      </div>
      <small class="footer-copyright">© {{ year }} WILLLIN. All rights reserved.</small>
    </div>
  </footer>
</template>
