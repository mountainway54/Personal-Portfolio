<script setup lang="ts">
const route = useRoute()
const open = ref(false)
const menuButton = ref<HTMLButtonElement>()
const menuPanel = ref<HTMLElement>()
const mobileLogo = ref<{ animateHome: (expanded: boolean) => Promise<void> }>()
const returningHome = ref(false)
let disposed = false
async function returnHome() {
  if (returningHome.value) return
  returningHome.value = true
  close(false)
  try {
    await mobileLogo.value?.animateHome(true)
    if (disposed) return
    await navigateTo('/')
  } finally {
    if (!disposed) {
      await mobileLogo.value?.animateHome(false)
      returningHome.value = false
    }
  }
}
async function toggle() {
  if (open.value) { close(); return }
  open.value = true
  await nextTick()
  menuPanel.value?.querySelector<HTMLAnchorElement>('a')?.focus({ preventScroll: true })
}
function close(restore = true) { open.value = false; if (restore) menuButton.value?.focus() }
function menuKey(event: KeyboardEvent) {
  if (!open.value) return
  if (event.key === 'Escape') { event.preventDefault(); close() }
  if (event.key !== 'Tab') return
  const links = menuPanel.value?.querySelectorAll<HTMLAnchorElement>('a')
  if (!links?.length || !menuButton.value) return
  const first = menuButton.value, last = links[links.length - 1]!
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
}
watch(() => route.path, () => close(false))
let media: MediaQueryList | undefined
function onResize() { if (media?.matches) close(false) }
onMounted(() => { media = window.matchMedia('(min-width: 768px)'); media.addEventListener('change', onResize) })
onBeforeUnmount(() => { disposed = true; media?.removeEventListener('change', onResize) })
const current = (path: string) => route.path.startsWith(path) ? 'page' as const : undefined
</script>
<template>
  <header class="site-header-bar" @keydown="menuKey">
    <div class="site-header content">
    <div class="brand-area">
      <div class="logo-space">
        <NuxtLink to="/" class="navbar-logo-desktop" aria-label="Home"><InteractiveLogo width="100%" color="#fff" link-mode :stretch="2.4" :v-stretch="1.35" :gap-expand="2.4" /></NuxtLink>
        <button class="navbar-logo-mobile" aria-label="Home" :aria-busy="returningHome" :disabled="returningHome" @click="returnHome">
          <InteractiveLogo ref="mobileLogo" width="100%" color="#fff" :interactive="false" :stretch="2.4" :v-stretch="1.35" :gap-expand="2.4" />
        </button>
      </div>
    </div>
    <nav class="desktop-nav utility" aria-label="Main navigation">
      <NuxtLink to="/about" data-label="ABOUT" :aria-current="current('/about')"><span>ABOUT</span></NuxtLink>
      <NuxtLink to="/work" data-label="WORK" :aria-current="current('/work')"><span>WORK</span></NuxtLink>
    </nav>
    <button ref="menuButton" class="menu-toggle" :aria-label="open ? 'Close menu' : 'Open menu'" aria-controls="mobile-menu" :aria-expanded="open" @click="toggle">
      <MenuIcon :open="open" />
    </button>
    <nav v-if="open" id="mobile-menu" ref="menuPanel" class="mobile-menu" aria-label="Mobile navigation">
      <NuxtLink to="/about" data-label="ABOUT" :aria-current="current('/about')" @click="close(false)"><span>ABOUT</span></NuxtLink>
      <NuxtLink to="/work" data-label="WORK" :aria-current="current('/work')" @click="close(false)"><span>WORK</span></NuxtLink>
    </nav>
    </div>
  </header>
</template>
