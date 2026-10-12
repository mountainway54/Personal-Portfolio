import { projects } from '../app/data/projects.ts'
import { checkContent } from '../app/utils/content-check.ts'
const mode = process.argv.includes('--release') ? 'release' : 'preview'
const errors = checkContent(projects, mode, process.env.NUXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? 'akx9y9c8')
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1 }
else console.log(`Content check passed (${mode}): ${projects.length} projects`)
