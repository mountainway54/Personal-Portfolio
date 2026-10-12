import test from 'node:test'
import assert from 'node:assert/strict'
import { quyiGallery } from '../app/data/projects.ts'
import { cloudinaryUrl, cloudinarySrcset } from '../app/utils/cloudinary.ts'
test('Cloudinary URLs preserve public ID segments and optional versions', () => {
  const media = { ...quyiGallery[0]!, cloudinaryPublicId: 'portfolio/my image', version: '123' }
  assert.equal(cloudinaryUrl('my-cloud', media, 768), 'https://res.cloudinary.com/my-cloud/image/upload/f_auto,q_auto/c_limit,w_768/v123/portfolio/my%20image')
  assert.match(cloudinaryUrl('my-cloud', media, 768, true)!, /c_fill,g_auto,w_768,h_432/)
  assert.equal(cloudinarySrcset('my-cloud', media)!.split(', ').length, 5)
})
test('missing and malformed configuration cannot produce a URL', () => {
  assert.equal(cloudinaryUrl('', quyiGallery[0]!, 768), undefined)
  assert.equal(cloudinarySrcset('demo', { ...quyiGallery[0]!, cloudinaryPublicId: '' }), undefined)
  assert.equal(cloudinaryUrl('demo', { ...quyiGallery[0]!, cloudinaryPublicId: '../asset' }, 768), undefined)
  assert.equal(cloudinaryUrl('demo', { ...quyiGallery[0]!, cloudinaryPublicId: 'asset', version: 'invalid' }, 768), undefined)
})
