import test from 'node:test'
import assert from 'node:assert/strict'
import { projects, filterProjects } from '../app/data/projects.ts'
import { checkContent } from '../app/utils/content-check.ts'
import { homeSlides } from '../app/data/home-slides.ts'
test('source catalog is complete, bilingual and previewable', () => {
  assert.deepEqual(checkContent(projects, 'preview'), [])
  assert.equal(filterProjects('WEB').length, 2)
  assert.equal(filterProjects('ALL').length, 13)
  assert.equal(projects[0]!.gallery.length, 11)
  assert.equal(projects[0]!.gallery[3]!.height, 2400)
})
test('content defects fail preview checks', () => {
  const copy = structuredClone(projects)
  copy[1]!.slug = copy[0]!.slug
  copy[2]!.title.en = ''
  // Deliberately emulate invalid external content.
  Object.assign(copy[3]!, { category: 'OTHER' })
  const errors = checkContent(copy, 'preview')
  assert(errors.some(error => error.includes('duplicate slug')))
  assert(errors.some(error => error.includes('bilingual title')))
  assert(errors.some(error => error.includes('invalid category')))
})

test('home carousel uses the five requested images and matching project links', () => {
  assert.deepEqual(homeSlides.map(slide => slide.media.cloudinaryPublicId), ['SketchBug_hero', 'quyi-5', 'gangxin_hero_2', 'EarthConstruction_hero', 'faucet_hero'])
  assert.deepEqual(homeSlides.map(slide => slide.project?.slug), ['interactive-installation', 'quyi-brand-identity', 'gangxin-brand-identity', 'dadi-website', 'erectus-faucet'])
  const gangxin = projects.find(project => project.slug === 'gangxin-brand-identity')!
  assert.equal(gangxin.category, 'VI')
  assert.equal(gangxin.title.zhTw, '日間照顧中心品牌識別')
  assert.equal(gangxin.cover?.cloudinaryPublicId, 'gangxin_hero_2')
})

test('construction videos replace GIFs in the fourth and fifth gallery rows', () => {
  const project = projects.find(project => project.slug === 'dadi-website')!
  assert.equal(project.gallery.some(media => media.format === 'gif'), false)
  const videos = project.gallery.filter(media => media.kind === 'video')
  assert.equal(videos.length, 3)
  assert.deepEqual(project.galleryRows?.[1], ['dadi-2', 'dadi-3'])
  assert.deepEqual(project.galleryRows?.[2], ['dadi-6'])
  assert.deepEqual(videos.map(media => decodeURIComponent(media.sourcePath).match(/_(\d+)\.mp4$/)?.[1]), ['154649', '155343', '155113'])
  assert.deepEqual(project.galleryRows?.[3], ['dadi-video-1'])
  assert.deepEqual(project.galleryRows?.[4], ['dadi-video-2', 'dadi-video-3'])
  assert.equal(project.gallery.slice(1).filter(media => media.kind !== 'video').length, 9)
})
test('incomplete assets cannot be declared ready for release', () => {
  const errors = checkContent(projects, 'release')
  assert(errors.some(error => error.includes('cloud name')))
  assert(errors.some(error => error.includes('association-brand-identity: missing cover')))
  assert(errors.some(error => error.includes('quyi-brand-identity: missing bilingual description')))
})

test('erectus has complete bilingual content and the requested gallery layout', () => {
  const project = projects.find(project => project.slug === 'erectus-faucet')!
  assert(filterProjects('CONCEPT').includes(project))
  assert.equal(project.status, 'ready')
  assert.equal(project.gallery.length, 5)
  assert.equal(project.cover?.id, 'erectus-main')
  assert.equal(project.cover?.width, 1257)
  assert.equal(project.cover?.height, 832)
  assert.deepEqual(project.galleryRows, [['erectus-1'], ['erectus-2', 'erectus-3'], ['erectus-4']])
  assert(project.description?.en.includes('water outlet'))
  assert(project.description?.zhTw.includes('拉動龍頭即可出水'))
  assert(project.galleryRowDescriptions?.['erectus-1']?.zhTw.includes('110–120 cm'))
  assert.equal(checkContent(projects, 'release', 'akx9y9c8').filter(error => error.startsWith('erectus-faucet')).length, 0)
})
