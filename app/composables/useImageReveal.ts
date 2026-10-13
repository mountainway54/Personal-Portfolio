import type { Ref, ComputedRef } from 'vue'
import { gsap } from 'gsap'
export function useImageReveal(element: Ref<HTMLElement | undefined>, enabled: ComputedRef<boolean>, direction: 'right' | 'up' = 'right', duration = 0.7) {
  let media: gsap.MatchMedia | undefined
  let disposed = false
  onMounted(async () => {
    await nextTick()
    if (disposed || !enabled.value || !element.value) return
    const target = element.value
    media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      if (target.dataset.revealed) return
      let inView = false
      let started = false
      let tween: gsap.core.Tween | undefined
      const images = Array.from(target.querySelectorAll('img'))
      gsap.set(target, { opacity: 0, x: direction === 'right' ? -48 : 0, y: direction === 'up' ? 48 : 0 })
      function reveal() {
        if (started || !inView || images.some(image => !image.complete) || document.querySelector('.loading-screen')) return
        started = true
        viewport.disconnect()
        loadingObserver.disconnect()
        tween = gsap.to(target, {
          opacity: 1, x: 0, y: 0, duration, ease: 'power3.out',
          onComplete: () => {
            target.dataset.revealed = 'true'
            gsap.set(target, { clearProps: 'opacity,transform' })
          },
        })
      }
      const viewport = new IntersectionObserver(entries => {
        inView = entries.some(entry => entry.isIntersecting)
        reveal()
      }, { threshold: 0, rootMargin: '0px 0px -5% 0px' })
      const loadingObserver = new MutationObserver(reveal)
      if (document.querySelector('.loading-screen')) loadingObserver.observe(document.body, { childList: true, subtree: true })
      images.forEach(image => {
        image.addEventListener('load', reveal)
        image.addEventListener('error', reveal)
      })
      viewport.observe(target)
      return () => {
        viewport.disconnect()
        loadingObserver.disconnect()
        images.forEach(image => {
          image.removeEventListener('load', reveal)
          image.removeEventListener('error', reveal)
        })
        tween?.kill()
      }
    })
  })
  onBeforeUnmount(() => { disposed = true; media?.revert() })
}
