import type { Media, Project } from '../types/portfolio.ts'
import { projects } from './projects.ts'

const entries: [string | undefined, string, string, string, number, number, string, string][] = [
  ['interactive-installation', 'home-sketchbug', 'SketchBug_hero', '1791800604', 1536, 1024, 'SketchBug', 'SketchBug'],
  ['quyi-brand-identity', 'home-quyi', 'quyi-5', '1791362362', 3840, 2161, 'Quyi brand identity', '耆寓品牌識別'],
  ['gangxin-brand-identity', 'home-gangxin', 'gangxin_hero_2', '1791800748', 2022, 778, 'Gangxin day care centre brand identity', '日間照顧中心品牌識別'],
  ['dadi-website', 'home-construction', 'EarthConstruction_hero', '1791786646', 2560, 1441, 'Construction company brand identity and website', '建設公司識別與官網設計'],
  ['erectus-faucet', 'home-erectus', 'faucet_hero', '1791799912', 1678, 937, 'erectus face-washing faucet', 'erectus 洗臉水龍頭'],
]

export const homeSlides: { project?: Project; media: Media }[] = entries.map(
  ([slug, id, publicId, version, width, height, en, zhTw]) => ({
    project: projects.find(project => project.slug === slug),
    media: {
      id, cloudinaryPublicId: publicId, version, width, height,
      sourcePath: `https://res.cloudinary.com/akx9y9c8/image/upload/v${version}/${publicId}.webp`,
      alt: { en, zhTw },
    },
  }),
)
