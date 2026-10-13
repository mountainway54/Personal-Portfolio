<script setup lang="ts">
import { packagingErrors } from '~/utils/packaging'
const { project, close, restoreFocus } = usePackagingModal()
const dialog = ref<HTMLDialogElement>()
const closeButton = ref<HTMLButtonElement>()
const opened = ref(false)
const config = useRuntimeConfig()
const valid = computed(() => project.value?.packaging && !packagingErrors(project.value.packaging, String(config.public.cloudinaryCloudName)).length)
let scrollY = 0
let bodyStyles: { position: string; top: string; width: string; overflow: string; paddingRight: string } | undefined
let stopWatch: (() => void) | undefined
let startedOnBackdrop = false
function release() {
  if (!opened.value) return
  opened.value = false
  dialog.value?.close()
  if (bodyStyles) {
    Object.assign(document.body.style, bodyStyles)
    bodyStyles = undefined
    window.scrollTo({ top: scrollY, behavior: 'instant' })
  }
  restoreFocus()
}
function outside(event: PointerEvent) {
  const rect = dialog.value?.getBoundingClientRect()
  return rect && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)
}
function backdropStart(event: PointerEvent) { startedOnBackdrop = event.target === dialog.value && !!outside(event) }
function backdropEnd(event: PointerEvent) {
  if (startedOnBackdrop && event.target === dialog.value && outside(event)) close()
  startedOnBackdrop = false
}
function trapFocus(event: KeyboardEvent) {
  if (event.key !== 'Tab' || !dialog.value) return
  const elements = [...dialog.value.querySelectorAll<HTMLElement>('button:not([disabled]), select:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])')].filter(element => element.offsetParent !== null)
  const first = elements[0], last = elements.at(-1)
  if (!first || !last) return
  if (event.shiftKey && (document.activeElement === first || !elements.includes(document.activeElement as HTMLElement))) {
    event.preventDefault(); last.focus()
  } else if (!event.shiftKey && (document.activeElement === last || !elements.includes(document.activeElement as HTMLElement))) {
    event.preventDefault(); first.focus()
  }
}
onMounted(() => {
  stopWatch = watch(project, async item => {
    if (!item) { release(); return }
    await nextTick()
    if (!project.value || !dialog.value || opened.value) return
    scrollY = window.scrollY
    const body = document.body.style
    bodyStyles = { position: body.position, top: body.top, width: body.width, overflow: body.overflow, paddingRight: body.paddingRight }
    const gutter = window.innerWidth - document.documentElement.clientWidth
    body.position = 'fixed'
    body.top = `-${scrollY}px`
    body.width = '100%'
    body.overflow = 'hidden'
    if (gutter) body.paddingRight = `${gutter}px`
    dialog.value.showModal()
    opened.value = true
    closeButton.value?.focus()
  }, { immediate: true, flush: 'post' })
})
onBeforeUnmount(() => { stopWatch?.(); release() })
</script>

<template>
  <Teleport to="body">
    <dialog ref="dialog" class="packaging-dialog" aria-labelledby="packaging-title" aria-describedby="packaging-subtitle" @cancel.prevent="close" @keydown="trapFocus" @pointerdown="backdropStart" @pointerup="backdropEnd" @pointercancel="startedOnBackdrop = false">
      <template v-if="project">
        <header class="packaging-header">
          <div class="packaging-heading">
            <p class="utility">PACKAGE</p>
            <h2 id="packaging-title">{{ project.title.en }}</h2>
            <p id="packaging-subtitle" lang="zh-Hant">{{ project.title.zhTw }}</p>
          </div>
          <button ref="closeButton" type="button" class="packaging-close" aria-label="Close packaging preview" @click="close"><span>Close</span><span class="packaging-close-icon" aria-hidden="true">×</span></button>
        </header>
        <div v-if="valid && project.packaging?.shape === 'box'" class="packaging-dimensions utility">{{ project.packaging.dimensionsMm.width }} × {{ project.packaging.dimensionsMm.height }} × {{ project.packaging.dimensionsMm.depth }} mm <span>W × H × D</span></div>
        <PackagingViewer v-if="opened && valid && project.packaging" :key="project.slug" :packaging="project.packaging" />
        <div v-else-if="!valid" class="packaging-pending" role="status"><p>Content coming soon</p></div>
      </template>
    </dialog>
  </Teleport>
</template>

<style>
.packaging-dialog {
  --packaging-line: rgba(255, 255, 255, 0.28);
  width: min(1100px, calc(100vw - 64px)); max-width: none; max-height: calc(100dvh - 48px);
  margin: auto; padding: 30px 36px 24px; border: 0.5px solid #fff; background: #000; color: #fff;
  overflow: auto; overscroll-behavior: contain;
}
.packaging-dialog::backdrop { background: rgba(0, 0, 0, 0.82); }
.packaging-header { display: flex; justify-content: space-between; gap: 20px; align-items: flex-start; }
.packaging-heading { min-width: 0; }
.packaging-heading h2 { margin-top: 12px; font-size: clamp(22px, 3vw, 34px); font-weight: 400; line-height: 1.2; }
.packaging-heading > [lang] { margin-top: 6px; font-size: 15px; }
.packaging-close { display: flex; gap: 10px; align-items: center; padding: 4px 0 8px 8px; flex-shrink: 0; font-size: 12px; }
.packaging-close-icon { font-size: 28px; font-weight: 200; line-height: 1; }
.packaging-dimensions { display: flex; justify-content: space-between; gap: 12px; margin-top: 22px; padding-top: 14px; border-top: 0.5px solid var(--packaging-line); }
.packaging-dimensions > span { opacity: 0.55; }
.packaging-stage { position: relative; width: 100%; height: clamp(220px, 48dvh, 510px); touch-action: none; }
.packaging-stage canvas { display: block; width: 100%; height: 100%; cursor: grab; touch-action: none; }
.packaging-stage canvas:active { cursor: grabbing; }
.packaging-loading { position: absolute; inset: 0; display: grid; place-content: center; font-size: 13px; }
.packaging-hint { font-size: 12px; text-align: center; opacity: 0.65; margin-bottom: 16px; }
.packaging-close:focus-visible { outline-offset: 0; }
.packaging-stage canvas:focus-visible { outline: 1px solid var(--packaging-line); outline-offset: -1px; }
.packaging-pending { min-height: 280px; display: grid; place-content: center; }
.packaging-pending p, .packaging-fallback > p { font-size: 13px; }
.packaging-fallback { padding-block: 32px; }
.packaging-fallback > p { text-align: center; margin-bottom: 28px; }
.packaging-static-images { display: grid; gap: 20px; max-width: 680px; margin-inline: auto; }
.packaging-static-images img { width: 100%; height: auto; object-fit: contain; max-height: 220px; }
@media (max-width: 600px) {
  .packaging-dialog { width: calc(100vw - 24px); padding: 22px 18px 18px; max-height: calc(100dvh - 24px); }
  .packaging-heading h2 { font-size: 22px; }
  .packaging-close > span:first-child { display: none; }
  .packaging-stage { height: clamp(210px, 40dvh, 380px); }
  .packaging-hint { font-size: 11px; }
}
</style>
