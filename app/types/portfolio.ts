export interface Bilingual { en: string; zhTw: string }
export const categories = ['VI', 'PACKAGE', 'CONCEPT', 'WEB', 'SOCIAL MEDIA'] as const
export type Category = typeof categories[number]
export interface Media {
  id: string
  kind?: 'image' | 'video'
  sourcePath: string
  localSrc?: string
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
  cover?: Media
  homeHero?: Media
  gallery: Media[]
  galleryRows?: string[][]
  galleryRowDescriptions?: Record<string, Bilingual>
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
