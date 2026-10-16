export interface Bilingual { en: string; zhTw: string }
export const categories = ['VI', 'PACKAGE', 'CONCEPT', 'WEB', 'SOCIAL MEDIA'] as const
export type Category = typeof categories[number]
export interface Media {
  id: string
  kind?: 'image' | 'video' | 'youtube'
  sourcePath: string
  localSrc?: string
  delivery?: 'local'
  cloudinaryPublicId?: string
  version?: string
  format?: 'gif'
  width: number
  height: number
  alt: Bilingual
}
export interface Project {
  slug: string
  category: Category
  additionalCategories?: Category[]
  order: number
  title: Bilingual
  status: 'pending' | 'ready'
  description?: Bilingual
  note?: Bilingual & { url?: string }
  cover?: Media
  showMainImage?: boolean
  homeHero?: Media
  gallery: Media[]
  galleryRows?: string[][]
  galleryColumns?: number
  galleryRowDescriptions?: Record<string, Bilingual>
  date?: string
  role?: Bilingual
  externalUrl?: string
  externalNote?: string
  packaging?: Packaging
}
export const packagingFaces = ['front', 'back', 'top', 'bottom', 'left', 'right'] as const
export type PackagingFace = typeof packagingFaces[number]
export interface BoxPackaging {
  shape: 'box'
  dimensionsMm: { width: number; height: number; depth: number }
  faces: Record<PackagingFace, { media: Media; rotation?: 0 | 90 | 180 | 270 }>
}
export interface CartonPackaging {
  shape: 'carton'
  dimensionsRatio: { width: number; height: number; depth: number }
  paperColor: string
  faces: Record<'front' | 'back' | 'left' | 'right', { media: Media; rotation?: 0 | 90 | 180 | 270 }>
}
export type Packaging = BoxPackaging | CartonPackaging
export interface Experience {
  title: Bilingual
  company: Bilingual
  industry?: Bilingual
  occupation: Bilingual
  location: Bilingual
  period: string
  duration: Bilingual
  responsibilities: Bilingual[]
  skills: Bilingual
}
