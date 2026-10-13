import { packagingFaces, type Media, type Packaging } from '../types/portfolio.ts'
import { cloudinaryUrl } from './cloudinary.ts'

export function packagingSurfaces(packaging: Packaging): Partial<Record<typeof packagingFaces[number], { media: Media; rotation?: 0 | 90 | 180 | 270 }>> {
  return packaging.faces
}
export function packagingDimensions(packaging: Packaging) {
  return packaging.shape === 'carton' ? packaging.dimensionsRatio : packaging.dimensionsMm
}

export function isLocalPackagingPath(path: string | undefined): path is string {
  if (!path?.startsWith('/work/') || /[?#\\]/.test(path)) return false
  try { return !decodeURIComponent(path).split('/').some(segment => segment === '..' || segment === '.') }
  catch { return false }
}

export function packagingImageUrl(media: Media, cloudName: string): string | undefined {
  if (isLocalPackagingPath(media.localSrc)) return encodeURI(decodeURI(media.localSrc))
  return cloudinaryUrl(cloudName, media, 1920)
}

export function packagingErrors(packaging: Packaging | undefined, cloudName = '', localExists?: (path: string) => boolean): string[] {
  if (!packaging) return ['missing packaging configuration']
  const errors: string[] = []
  if (packaging.shape !== 'box' && packaging.shape !== 'carton') errors.push('unsupported packaging shape')
  const dimensions = packagingDimensions(packaging)
  for (const dimension of ['width', 'height', 'depth'] as const) {
    const value = dimensions?.[dimension]
    if (!Number.isFinite(value) || value <= 0) errors.push(`invalid ${dimension} in ${packaging.shape === 'carton' ? 'ratio' : 'mm'}`)
  }
  if (packaging.shape === 'carton' && !/^#[a-f\d]{6}$/i.test(packaging.paperColor)) errors.push('invalid paper color')
  const surfaces = packagingSurfaces(packaging)
  const requiredFaces = packaging.shape === 'carton' ? ['front', 'back', 'left', 'right'] as const : packagingFaces
  for (const face of requiredFaces) {
    const setting = surfaces?.[face]
    const media = setting?.media
    if (!media) { errors.push(`${face}: missing texture`); continue }
    if (![0, 90, 180, 270].includes(setting?.rotation ?? 0)) errors.push(`${face}: invalid rotation`)
    if (media.kind === 'video' || !media.id || !media.sourcePath || !media.alt?.en?.trim() || !media.alt?.zhTw?.trim() ||
      !Number.isFinite(media.width) || media.width <= 0 || !Number.isFinite(media.height) || media.height <= 0) errors.push(`${face}: invalid texture metadata`)
    if (!packagingImageUrl(media, cloudName)) errors.push(`${face}: invalid texture source`)
    if (localExists && isLocalPackagingPath(media.localSrc) && !localExists(media.localSrc)) errors.push(`${face}: missing local texture file`)
  }
  return errors
}
