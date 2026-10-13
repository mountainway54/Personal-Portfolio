import type { BufferGeometry, Material, Texture } from 'three'
import type { CartonPackaging, PackagingFace } from '../types/portfolio'

/** Four walls, a floor and four hinged flaps; no opaque lid across the opening. */
export function createCartonModel(THREE: typeof import('three'), packaging: CartonPackaging, maps: Partial<Record<PackagingFace, Texture>>) {
  const { width, height, depth } = packaging.dimensionsRatio
  const thickness = Math.min(width, height, depth) * 0.012
  const geometries: BufferGeometry[] = []
  const materials: Material[] = []
  const group = new THREE.Group()
  const paper = new THREE.MeshStandardMaterial({ color: packaging.paperColor, roughness: 1, metalness: 0 })
  materials.push(paper)
  function panel(w: number, h: number, d: number) {
    const geometry = new THREE.BoxGeometry(w, h, d)
    geometries.push(geometry)
    return new THREE.Mesh(geometry, paper)
  }
  function wall(w: number, h: number, d: number, x: number, y: number, z: number) {
    const mesh = panel(w, h, d)
    mesh.position.set(x, y, z)
    group.add(mesh)
  }
  wall(width, height, thickness, 0, 0, (depth - thickness) / 2)
  wall(width, height, thickness, 0, 0, -(depth - thickness) / 2)
  wall(thickness, height, depth, (width - thickness) / 2, 0, 0)
  wall(thickness, height, depth, -(width - thickness) / 2, 0, 0)
  wall(width, thickness, depth, 0, -(height - thickness) / 2, 0)

  const faces = [
    { name: 'front', w: width, x: 0, z: depth / 2, rotation: 0 },
    { name: 'back', w: width, x: 0, z: -depth / 2, rotation: Math.PI },
    { name: 'right', w: depth, x: width / 2, z: 0, rotation: Math.PI / 2 },
    { name: 'left', w: depth, x: -width / 2, z: 0, rotation: -Math.PI / 2 },
  ] as const
  for (const face of faces) {
    const geometry = new THREE.PlaneGeometry(face.w, height)
    const angle = (packaging.faces[face.name].rotation ?? 0) * Math.PI / 180
    const uv = geometry.getAttribute('uv')
    for (let vertex = 0; vertex < uv.count; vertex++) {
      const x = uv.getX(vertex) - 0.5, y = uv.getY(vertex) - 0.5
      uv.setXY(vertex, 0.5 + x * Math.cos(angle) - y * Math.sin(angle), 0.5 + x * Math.sin(angle) + y * Math.cos(angle))
    }
    geometries.push(geometry)
    // Transparent artwork reveals the actual paper beneath it, including kraft stock.
    const material = new THREE.MeshBasicMaterial({ map: maps[face.name], transparent: true, depthWrite: false, toneMapped: false,
      polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1 })
    materials.push(material)
    const print = new THREE.Mesh(geometry, material)
    print.rotation.y = face.rotation
    print.position.set(face.x, 0, face.z)
    group.add(print)

    const hinge = new THREE.Group()
    hinge.position.set(face.x, height / 2, face.z)
    hinge.rotation.y = face.rotation
    const isSide = face.name === 'left' || face.name === 'right'
    const flapLength = isSide ? width * 0.3 : depth / 2
    const flap = panel(face.w, flapLength, thickness)
    flap.position.y = flapLength / 2
    const folding = new THREE.Group()
    // Short side flaps fold inward; front and back flaps remain raised outward.
    folding.rotation.x = (isSide ? -70 : 30) * Math.PI / 180
    folding.add(flap)
    hinge.add(folding)
    group.add(hinge)
  }
  group.updateMatrixWorld(true)
  const bounds = new THREE.Box3().setFromObject(group)
  const center = bounds.getCenter(new THREE.Vector3())
  group.position.sub(center)
  const size = bounds.getSize(new THREE.Vector3())
  return { group, bounds: { width: size.x, height: size.y, depth: size.z },
    dispose() { for (const geometry of geometries) geometry.dispose(); for (const material of materials) material.dispose() },
  }
}
