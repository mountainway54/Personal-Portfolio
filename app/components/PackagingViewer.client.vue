<script setup lang="ts">
import type { Packaging, PackagingFace } from '~/types/portfolio'
import { packagingImageUrl, packagingSurfaces, packagingDimensions } from '~/utils/packaging'
import { createCartonModel } from '~/lib/cartonGeometry'
import type { PerspectiveCamera, Scene, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Texture } from 'three'
import type { OrbitControls as Controls } from 'three/addons/controls/OrbitControls.js'

const props = defineProps<{ packaging: Packaging }>()
const stage = ref<HTMLElement>()
const state = ref<'loading' | 'ready' | 'unavailable'>('loading')
const config = useRuntimeConfig()
let dead = false
let renderer: WebGLRenderer | undefined
let camera: PerspectiveCamera | undefined
let scene: Scene | undefined
let controls: Controls | undefined
let geometry: BoxGeometry | undefined
let observer: ResizeObserver | undefined
const textures = new Set<Texture>()
const materials: MeshBasicMaterial[] = []
const cancelLoads = new Set<() => void>()
let viewDistance = 1
let rotateView: ((horizontal: number, vertical: number) => void) | undefined
let initTimeout: ReturnType<typeof setTimeout> | undefined
let disposeCarton: (() => void) | undefined

function render() {
  if (!dead && state.value !== 'unavailable' && renderer && scene && camera) {
    try { renderer.render(scene, camera) } catch { unavailable() }
  }
}
function reset() {
  if (!camera || !controls) return
  camera.position.set(viewDistance * 0.65, viewDistance * (props.packaging.shape === 'carton' ? 0.85 : 0.4), viewDistance * 0.8)
  camera.position.setLength(viewDistance)
  controls.target.set(0, 0, 0)
  controls.update()
  render()
}
function keyRotate(event: KeyboardEvent) {
  const angles: Record<string, [number, number]> = {
    ArrowLeft: [-Math.PI / 8, 0], ArrowRight: [Math.PI / 8, 0],
    ArrowUp: [0, -Math.PI / 8], ArrowDown: [0, Math.PI / 8],
  }
  const angle = angles[event.key]
  if (!angle) return
  event.preventDefault()
  rotateView?.(...angle)
}
function cleanup() {
  clearTimeout(initTimeout)
  for (const cancel of [...cancelLoads]) cancel()
  observer?.disconnect()
  controls?.dispose()
  geometry?.dispose()
  disposeCarton?.()
  for (const material of materials) material.dispose()
  for (const texture of textures) texture.dispose()
  textures.clear()
  if (renderer) {
    renderer.domElement.removeEventListener('webglcontextlost', lost)
    renderer.domElement.removeEventListener('keydown', keyRotate)
    renderer.dispose()
    renderer.forceContextLoss()
    renderer.domElement.remove()
    renderer = undefined
  }
}
function unavailable() {
  if (dead || state.value === 'unavailable') return
  state.value = 'unavailable'
  cleanup()
}
function lost(event: Event) { event.preventDefault(); unavailable() }

onMounted(async () => {
  initTimeout = setTimeout(unavailable, 15000)
  try {
    const [THREE, { OrbitControls }] = await Promise.all([
      import('three'), import('three/addons/controls/OrbitControls.js'),
    ])
    if (dead || state.value === 'unavailable' || !stage.value) return
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.NoToneMapping
    renderer.domElement.setAttribute('aria-label', '包裝 3D 模型；拖曳或使用方向鍵旋轉查看')
    renderer.domElement.setAttribute('lang', 'zh-Hant')
    renderer.domElement.setAttribute('tabindex', '0')
    renderer.domElement.setAttribute('role', 'img')
    renderer.domElement.addEventListener('webglcontextlost', lost)
    renderer.domElement.addEventListener('keydown', keyRotate)
    stage.value.appendChild(renderer.domElement)
    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(38, 1, 0.1, 10000)
    controls = new OrbitControls(camera, renderer.domElement)
    controls.enablePan = false
    controls.enableZoom = false
    controls.enableDamping = false
    controls.autoRotate = false
    controls.addEventListener('change', render)
    rotateView = (horizontal, vertical) => {
      if (!camera || !controls) return
      const spherical = new THREE.Spherical().setFromVector3(camera.position)
      spherical.theta += horizontal
      spherical.phi += vertical
      spherical.makeSafe()
      camera.position.setFromSpherical(spherical)
      controls.update()
      render()
    }
    const loader = new THREE.TextureLoader()
    loader.setCrossOrigin('anonymous')
    const cache = new Map<string, Promise<Texture>>()
    function load(url: string): Promise<Texture> {
      if (cache.has(url)) return cache.get(url)!
      const pending = new Promise<Texture>((resolve, reject) => {
        let settled = false
        const finish = (error?: Error) => {
          if (settled) return
          settled = true
          clearTimeout(timer)
          cancelLoads.delete(cancel)
          if (error) reject(error)
        }
        const cancel = () => finish(new Error('Preview closed'))
        const timer = setTimeout(() => finish(new Error('Texture load timed out')), 12000)
        cancelLoads.add(cancel)
        const texture = loader.load(url, result => {
          if (settled || dead || state.value === 'unavailable') { result.dispose(); return }
          result.colorSpace = THREE.SRGBColorSpace
          result.anisotropy = Math.min(renderer?.capabilities.getMaxAnisotropy() ?? 1, 8)
          finish()
          resolve(result)
        }, undefined, () => finish(new Error('Texture unavailable')))
        textures.add(texture)
      })
      cache.set(url, pending)
      return pending
    }
    // BoxGeometry groups: +X, -X, +Y, -Y, +Z, -Z.
    const order: PackagingFace[] = ['right', 'left', 'top', 'bottom', 'front', 'back']
    const surfaces = packagingSurfaces(props.packaging)
    const textureFaces = order.filter(face => surfaces[face])
    const maps = await Promise.all(textureFaces.map(face => {
      const url = packagingImageUrl(surfaces[face]!.media, String(config.public.cloudinaryCloudName))
      if (!url) throw new Error('Texture source unavailable')
      return load(url)
    }))
    if (dead || !renderer) return
    const faceMaps = Object.fromEntries(textureFaces.map((face, index) => [face, maps[index]])) as Partial<Record<PackagingFace, Texture>>
    let { width, height, depth } = packagingDimensions(props.packaging)
    if (props.packaging.shape === 'carton') {
      const carton = createCartonModel(THREE, props.packaging, faceMaps)
      scene.add(carton.group)
      disposeCarton = carton.dispose
      scene.add(new THREE.HemisphereLight(0xffffff, 0xa6a09a, 1.6))
      const light = new THREE.DirectionalLight(0xffffff, 2)
      light.position.set(3, 5, 4)
      scene.add(light)
      ;({ width, height, depth } = carton.bounds)
    } else {
      geometry = new THREE.BoxGeometry(width, height, depth)
      const uv = geometry.getAttribute('uv')
      order.forEach((face, index) => {
        const angle = (surfaces[face]!.rotation ?? 0) * Math.PI / 180
        for (let vertex = index * 4; vertex < index * 4 + 4; vertex++) {
          const x = uv.getX(vertex) - 0.5
          const y = uv.getY(vertex) - 0.5
          uv.setXY(vertex, 0.5 + x * Math.cos(angle) - y * Math.sin(angle), 0.5 + x * Math.sin(angle) + y * Math.cos(angle))
        }
        materials.push(new THREE.MeshBasicMaterial({ map: faceMaps[face], toneMapped: false }))
      })
      uv.needsUpdate = true
      scene.add(new THREE.Mesh(geometry, materials))
    }
    const radius = Math.hypot(width, height, depth) / 2
    const resize = () => {
      if (dead || !stage.value || !renderer || !camera || !controls) return
      const bounds = stage.value.getBoundingClientRect()
      const w = Math.max(bounds.width, 1), h = Math.max(bounds.height, 1)
      const previous = viewDistance
      renderer.setSize(w, h)
      camera.aspect = w / h
      const verticalFov = camera.fov * Math.PI / 360
      // Fit the actual corners rather than a sphere: long cartons should fill the stage.
      const direction = new THREE.Vector3(0.65, props.packaging.shape === 'carton' ? 0.85 : 0.4, 0.8).normalize()
      const right = new THREE.Vector3().crossVectors(camera.up, direction).normalize()
      const up = new THREE.Vector3().crossVectors(direction, right).normalize()
      let fittingDistance = 0
      for (const x of [-width / 2, width / 2]) for (const y of [-height / 2, height / 2]) for (const z of [-depth / 2, depth / 2]) {
        const corner = new THREE.Vector3(x, y, z)
        fittingDistance = Math.max(fittingDistance, corner.dot(direction) + Math.abs(corner.dot(up)) / Math.tan(verticalFov), corner.dot(direction) + Math.abs(corner.dot(right)) / (Math.tan(verticalFov) * camera.aspect))
      }
      const framingMargin = props.packaging.shape === 'carton' ? 1 : 1.15
      viewDistance = Math.max(fittingDistance * framingMargin, radius * 1.2)
      camera.near = Math.max(radius / 100, 0.001)
      camera.far = viewDistance * 20
      camera.updateProjectionMatrix()
      controls.minDistance = radius * 1.12
      controls.maxDistance = viewDistance * 2.5
      if (state.value === 'ready') camera.position.multiplyScalar(viewDistance / previous)
      else reset()
      controls.update()
      render()
    }
    resize()
    observer = new ResizeObserver(resize)
    observer.observe(stage.value)
    state.value = 'ready'
    clearTimeout(initTimeout)
    render()
  } catch { unavailable() }
})
onBeforeUnmount(() => { dead = true; cleanup() })
</script>

<template>
  <div class="packaging-viewer" :data-state="state">
    <div v-show="state !== 'unavailable'" ref="stage" class="packaging-stage">
      <p v-if="state === 'loading'" class="packaging-loading" role="status">Loading 3D preview</p>
    </div>
    <div v-if="state === 'unavailable'" class="packaging-fallback">
      <p role="status">3D preview unavailable</p>
      <PackagingImages :packaging="packaging" />
    </div>
    <div v-if="state === 'ready'" class="packaging-controls">
      <p class="packaging-hint" lang="zh-Hant">拖曳旋轉查看包裝</p>
    </div>
  </div>
</template>
