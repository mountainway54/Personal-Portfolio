import type { Media, BoxPackaging, CartonPackaging } from '../types/portfolio.ts'

function ointmentMedia(id: string, file: string, en: string, zhTw: string, width: number, height: number): Media {
  const localSrc = `/work/藥膏/${file}`
  return { id, sourcePath: localSrc, localSrc, delivery: 'local', width, height, alt: { en, zhTw } }
}
export const ointmentFront = ointmentMedia('ointment-front', 'ointment-front.webp', 'Ointment box front design', '藥膏外盒正面設計', 1502, 415)
export const ointmentShowcase = ointmentMedia('ointment-showcase', 'ointment-product-showcase.webp', 'Ointment packaging product showcase', '藥膏包裝產品展示', 1536, 1024)
const back = ointmentMedia('ointment-back', 'ointment-back.webp', 'Ointment box usage and barcode panel', '藥膏外盒用法與條碼面', 1501, 404)
const top = ointmentMedia('ointment-top', 'ointment-top.webp', 'Ointment box illustrated panel', '藥膏外盒圖解面', 1503, 416)
const bottom = ointmentMedia('ointment-bottom', 'ointment-bottom.webp', 'Ointment box ingredients panel', '藥膏外盒成分與廠商面', 1503, 417)
const end = ointmentMedia('ointment-end', 'ointment-end.webp', 'Ointment box end design', '藥膏外盒端面設計', 416, 417)

export const ointmentPackaging: BoxPackaging = {
  shape: 'box',
  dimensionsMm: { width: 127, height: 35, depth: 35 },
  faces: {
    front: { media: ointmentFront }, back: { media: back },
    top: { media: top }, bottom: { media: bottom },
    left: { media: end }, right: { media: end },
  },
}

function cartonMedia(folder: string, file: string, face: 'front' | 'side', title: string, chineseTitle: string, width: number): Media {
  const localSrc = `/work/${folder}/${file}`
  return { id: `${folder}-${face}`, sourcePath: localSrc, localSrc, delivery: 'local', width, height: 3662,
    alt: { en: `${title} carton ${face} design`, zhTw: `${chineseTitle}紙箱${face === 'front' ? '正面' : '側面'}設計` } }
}
function carton(folder: string, frontFile: string, sideFile: string, title: string, chineseTitle: string, frontWidth: number, sideWidth: number, paperColor: string, coverWidth: number, coverHeight: number) {
  const front = cartonMedia(folder, frontFile, 'front', title, chineseTitle, frontWidth)
  const side = cartonMedia(folder, sideFile, 'side', title, chineseTitle, sideWidth)
  const packaging: CartonPackaging = { shape: 'carton', paperColor,
    dimensionsRatio: { width: frontWidth / 3662, height: 1, depth: sideWidth / 3662 },
    faces: { front: { media: front }, back: { media: front }, left: { media: side }, right: { media: side } },
  }
  const coverSrc = `/work/${folder}/${folder}.webp`
  const cover: Media = { id: `${folder}-showcase`, sourcePath: coverSrc, localSrc: coverSrc, delivery: 'local', width: coverWidth, height: coverHeight,
    alt: { en: `${title} carton product showcase`, zhTw: `${chineseTitle}紙箱產品展示` } }
  return { packaging, cover, gallery: [front, side] }
}
export const produceCartons = {
  'cucumber-carton': carton('cucumber', 'cucumber_front.webp', 'cucumber_side.webp', 'Cucumber', '胡瓜', 4961, 3710, '#ceb18a', 1114, 836),
  'green-pepper-carton': carton('greenPepper', 'greenPepper_front.webp', 'greenPepper_side.webp', 'Green pepper', '青椒', 5316, 3603, '#ffffff', 1448, 1086),
  'sweet-pepper-carton': carton('sweetPepper', 'sweetPepperfront.webp', 'sweetPepper_side.webp', 'Sweet pepper', '甜椒', 5316, 3603, '#ffffff', 1448, 1086),
} satisfies Record<string, { packaging: CartonPackaging; cover: Media; gallery: Media[] }>
export function getProduceCarton(slug: string) {
  return produceCartons[slug as keyof typeof produceCartons]
}
