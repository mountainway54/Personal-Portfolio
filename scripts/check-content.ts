import { projects } from '../app/data/projects.ts'
import { checkContent } from '../app/utils/content-check.ts'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { resolve, sep } from 'node:path'
const mode = process.argv.includes('--release') ? 'release' : 'preview'
const publicRoot = fileURLToPath(new URL('../public/', import.meta.url))
const errors = checkContent(projects, mode, process.env.NUXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? 'akx9y9c8', path => {
  const target = resolve(publicRoot, decodeURIComponent(path).replace(/^\/+/, ''))
  return target.startsWith(resolve(publicRoot) + sep) && existsSync(target)
})
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1 }
else console.log(`Content check passed (${mode}): ${projects.length} projects`)
