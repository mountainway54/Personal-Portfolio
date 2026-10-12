import { categories, type Bilingual, type Project } from '../types/portfolio.ts'
import { cloudinaryUrl } from './cloudinary.ts'
export function checkContent(projects: Project[], mode: 'preview' | 'release', cloudName = '') {
  const errors: string[] = []
  const bilingual = (text: Bilingual | undefined) => Boolean(text?.en.trim() && text?.zhTw.trim())
  const slugs = new Set<string>()
  if (projects.length !== 13) errors.push('catalog: expected 13 projects')
  if (mode === 'release' && !/^[a-zA-Z0-9_-]+$/.test(cloudName)) errors.push('media: missing or invalid Cloudinary cloud name')
  for (const project of projects) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.slug) || slugs.has(project.slug)) errors.push(`${project.slug}: invalid or duplicate slug`)
    slugs.add(project.slug)
    if (!categories.includes(project.category)) errors.push(`${project.slug}: invalid category`)
    if (!bilingual(project.title)) errors.push(`${project.slug}: missing bilingual title`)
    if (mode === 'release') {
      if (project.status !== 'ready') errors.push(`${project.slug}: content pending`)
      if (!bilingual(project.description)) errors.push(`${project.slug}: missing bilingual description`)
      if (!project.cover || !project.gallery.length) errors.push(`${project.slug}: missing cover or gallery`)
    }
    const mediaIds = new Set<string>()
    for (const media of project.gallery) {
      if (mediaIds.has(media.id)) errors.push(`${project.slug}/${media.id}: duplicate gallery image`)
      mediaIds.add(media.id)
      if (!bilingual(media.alt) || !media.sourcePath || media.width <= 0 || media.height <= 0) errors.push(`${project.slug}/${media.id}: invalid image metadata`)
      if (media.kind === 'video') {
        if (!/^https:\/\/res\.cloudinary\.com\/[a-zA-Z0-9_-]+\/video\/upload\/.+\.mp4$/.test(media.sourcePath)) errors.push(`${project.slug}/${media.id}: invalid video URL`)
      } else if (mode === 'release' && !cloudinaryUrl(cloudName, media, 768)) errors.push(`${project.slug}/${media.id}: missing or invalid Cloudinary mapping`)
    }
    if (mode === 'release' && project.cover && !cloudinaryUrl(cloudName, project.cover, 768)) errors.push(`${project.slug}: missing cover Cloudinary mapping`)
  }
  for (const category of categories) if (!projects.some(project => project.category === category)) errors.push(`${category}: missing category`)
  const quyi = projects.find(project => project.slug === 'quyi-brand-identity')
  if (quyi?.gallery.filter(media => /^quyi-\d+$/.test(media.id)).map(media => media.id).join(',') !== 'quyi-1,quyi-2,quyi-3,quyi-4,quyi-5,quyi-6') errors.push('quyi-brand-identity: expected six source images in order')
  return errors
}
