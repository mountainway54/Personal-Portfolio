import type { Media } from '../types/portfolio.ts'
export const imageWidths = [480, 768, 1024, 1440, 1920]
export function cloudinaryUrl(cloudName: string, media: Media, width: number, crop = false): string | undefined {
  const id = media.cloudinaryPublicId?.trim()
  if (!/^[a-zA-Z0-9_-]+$/.test(cloudName) || !id || !Number.isInteger(width) || width < 1) return undefined
  const segments = id.split('/')
  if (segments.some(segment => !segment || segment === '.' || segment === '..')) return undefined
  if (media.version && !/^\d+$/.test(media.version)) return undefined
  const assetPath = `${media.version ? `v${media.version}/` : ''}${segments.map(encodeURIComponent).join('/')}`
  // Deliver every frame of the original GIF without generating responsive derivatives.
  if (media.format === 'gif') return `https://res.cloudinary.com/${cloudName}/image/upload/${assetPath.replace(/\.gif$/i, '')}.gif`
  const transform = crop ? `c_fill,g_auto,w_${width},h_${Math.round(width * 9 / 16)}` : `c_limit,w_${width}`
  return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/${transform}/${assetPath}`
}
export function cloudinarySrcset(cloudName: string, media: Media, crop = false): string | undefined {
  if (media.format === 'gif') return undefined
  const candidates = imageWidths.map(width => {
    const url = cloudinaryUrl(cloudName, media, width, crop)
    return url ? `${url} ${width}w` : ''
  }).filter(Boolean)
  return candidates.length ? candidates.join(', ') : undefined
}
