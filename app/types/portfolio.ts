export interface Bilingual { en: string; zhTw: string }
export const categories = ['VI', 'PACKAGE', 'CONCEPT', 'WEB', 'SOCIAL MEDIA'] as const
export type Category = typeof categories[number]
export interface Media {
  id: string
  sourcePath: string
  localSrc?: string
  cloudinaryPublicId?: string
  version?: string
  width: number
  height: number
  alt: Bilingual
}
export interface Project {
  slug: string
  category: Category
  order: number
  title: Bilingual
  status: 'pending' | 'ready'
  description?: Bilingual
  cover?: Media
  gallery: Media[]
  galleryRows?: string[][]
  date?: string
  role?: Bilingual
  externalUrl?: string
}
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
