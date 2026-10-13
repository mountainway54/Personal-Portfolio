import { projects } from '~/data/projects'
import type { Project } from '~/types/portfolio'

// Client-only DOM references never enter Nuxt's serialised state.
let trigger: HTMLElement | null = null
let session = ''

export function usePackagingModal() {
  const route = useRoute()
  const router = useRouter()
  const project = computed(() => {
    const path = route.path.replace(/\/$/, '') || '/'
    if (path !== '/' && path !== '/work') return undefined
    const slug = route.query.package
    return typeof slug === 'string' ? projects.find(item => item.category === 'PACKAGE' && item.slug === slug) : undefined
  })
  function open(item: Project, event?: Event) {
    if (item.category !== 'PACKAGE' || !import.meta.client) return
    trigger = event?.currentTarget instanceof HTMLElement ? event.currentTarget : null
    session ||= crypto.randomUUID()
    return router.push({ path: route.path, query: { ...route.query, package: item.slug }, hash: route.hash,
      state: { packagingSession: session, packagingSource: route.fullPath } })
  }
  function close() {
    if (!import.meta.client) return
    if (session && window.history.state?.packagingSession === session && window.history.state?.back === window.history.state?.packagingSource) {
      router.back()
    } else {
      const { package: _package, ...query } = route.query
      return router.replace({ path: route.path, query, hash: route.hash, state: { packagingSession: null, packagingSource: null } })
    }
  }
  function restoreFocus() {
    const fallback = document.querySelector<HTMLElement>('[data-work-heading]') ?? document.getElementById('main')
    const element = trigger?.isConnected ? trigger : fallback
    element?.focus({ preventScroll: true })
  }
  return { project, isOpen: computed(() => !!project.value), open, close, restoreFocus }
}
