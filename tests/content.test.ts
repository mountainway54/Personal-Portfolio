import test from 'node:test'
import assert from 'node:assert/strict'
import { projects, filterProjects } from '../app/data/projects.ts'
import { checkContent } from '../app/utils/content-check.ts'
test('source catalog is complete, bilingual and previewable', () => {
  assert.deepEqual(checkContent(projects, 'preview'), [])
  assert.equal(filterProjects('WEB').length, 2)
  assert.equal(filterProjects('ALL').length, 11)
  assert.equal(projects[0]!.gallery.length, 6)
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
test('incomplete assets cannot be declared ready for release', () => {
  const errors = checkContent(projects, 'release')
  assert(errors.some(error => error.includes('cloud name')))
  assert(errors.some(error => error.includes('association-brand-identity: missing cover')))
  assert(errors.some(error => error.includes('quyi-brand-identity: missing bilingual description')))
})
