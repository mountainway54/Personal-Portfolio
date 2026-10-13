import type {
  Bilingual,
  Category,
  Media,
  Project,
} from "../types/portfolio.ts";
import { cloudinaryAssets } from "./media.ts";
import { ointmentShowcase, ointmentPackaging, getProduceCarton } from './packaging.ts';

const alt: Bilingual[] = [
  {
    en: "Quyi day care centre reception and brand signage",
    zhTw: "耆寓日間照顧中心接待空間與品牌標示",
  },
  {
    en: "Quyi business cards with geometric brand graphics",
    zhTw: "耆寓名片與幾何品牌圖形",
  },
  {
    en: "Quyi printed leaflets with brand colours and patterns",
    zhTw: "耆寓文宣與品牌色彩、圖樣應用",
  },
  { en: "Quyi branded envelope and stationery", zhTw: "耆寓品牌信封與信紙" },
  {
    en: "Quyi canvas tote bag with character illustrations",
    zhTw: "耆寓帆布提袋與角色插畫",
  },
  {
    en: "Two Quyi tote bag designs featuring geometric characters",
    zhTw: "兩款耆寓幾何角色帆布提袋設計",
  },
];
export const quyiGallery: Media[] = alt.map((text, index) => {
  const id = `quyi-${index + 1}`;
  const dimensions =
    index === 3 ? [3201, 2400] : [3840, index > 3 ? 2161 : 2160];
  return {
    id,
    sourcePath: `work/quyi/${id}.webp`,
    localSrc: `/work/quyi/${id}.webp`,
    cloudinaryPublicId: cloudinaryAssets[id]?.publicId,
    version: cloudinaryAssets[id]?.version,
    width: dimensions[0]!,
    height: dimensions[1]!,
    alt: text,
  };
});
const quyiAdditionalImages: Media[] = [
  ['1', '1791795466'],
  ['2', '1791795467'],
  ['4', '1791795469'],
  ['3', '1791795468'],
  ['12', '1791795465'],
].map(([number, version]) => {
  const publicId = `quyi工作區域_${number}_2x-20`;
  return {
    id: `quyi-design-${number}`,
    sourcePath: `https://res.cloudinary.com/akx9y9c8/image/upload/v${version}/${encodeURIComponent(publicId)}.webp`,
    cloudinaryPublicId: publicId,
    version,
    width: 3840,
    height: 2160,
    alt: { en: `Quyi brand identity design ${number}`, zhTw: `耆寓品牌識別設計 ${number}` },
  };
});
function dadiMedia(id: string, filename: string, version: string, width = 1920, height = 1080): Media {
  return {
    id,
    sourcePath: `https://res.cloudinary.com/akx9y9c8/image/upload/v${version}/${filename}`,
    cloudinaryPublicId: filename.replace(/\.[^.]+$/, ''),
    version,
    ...(filename.endsWith('.gif') ? { format: 'gif' as const } : {}),
    width,
    height,
    alt: { en: `Construction company brand identity and website design — ${id}`, zhTw: `建設公司識別與官網設計 — ${id}` },
  };
}
const dadiHomeHero = dadiMedia('dadi-home-hero', 'EarthConstruction_hero.webp', '1791786646', 2560, 1441);
function dadiVideo(index: number, version: string, time: string): Media {
  return {
    id: `dadi-video-${index}`,
    kind: 'video',
    sourcePath: `https://res.cloudinary.com/akx9y9c8/video/upload/v${version}/${encodeURIComponent(`錄製內容_2026-10-12_${time}`)}.mp4`,
    width: 1920,
    height: 1080,
    alt: { en: `Construction company website demo ${index}`, zhTw: `建設公司官網操作展示 ${index}` },
  };
}
export const dadiGallery: Media[] = [
  dadiMedia('dadi-work-hero', 'hnuj03fd.q5j.jpg', '1791789208'),
  dadiMedia('dadi-1', 'nifiukea.ic1.png', '1791786593'),
  dadiMedia('dadi-2', 'kyo1vyce.jox.png', '1791786592'),
  dadiMedia('dadi-3', 'jszbjjnu.ec1.jpg', '1791786585'),
  dadiVideo(1, '1791791968', '154649'),
  dadiVideo(2, '1791791967', '155343'),
  dadiVideo(3, '1791791966', '155113'),
  dadiMedia('dadi-5', 'xakpnjfo.zc4.webp', '1791787044'),
  dadiMedia('dadi-6', 'rosvs0is.4gt.webp', '1791787043'),
  dadiMedia('dadi-8', 'id5102og.i1c.webp', '1791787042'),
  dadiMedia('dadi-9', 'i2u5r5em.azd.webp', '1791787041'),
  dadiMedia('dadi-11', 'xmildldv.buv.webp', '1791787040'),
  dadiMedia('dadi-10', '0phrt1uh.bcv.webp', '1791787040', 4000, 2500),
];
function erectusMedia(id: string, publicId: string, version: string, alt: Bilingual, width: number, height: number): Media {
  return {
    id, cloudinaryPublicId: publicId, version, width, height, alt,
    sourcePath: `https://res.cloudinary.com/akx9y9c8/image/upload/v${version}/${encodeURIComponent(publicId)}.webp`,
  };
}
export const erectusGallery: Media[] = [
  erectusMedia('erectus-main', 'Gemini_Generated_Image_a7tsyfa7tsyfa7ts', '1791799913', { en: 'erectus face-washing faucet', zhTw: 'erectus 洗臉水龍頭' }, 1257, 832),
  erectusMedia('erectus-1', 'M110400003林立崴_作品集4', '1791799913', { en: 'erectus faucet concept and use', zhTw: 'erectus 水龍頭概念與使用方式' }, 3508, 2481),
  erectusMedia('erectus-2', '螢幕擷取畫面_2026-10-12_175255', '1791799914', { en: 'erectus faucet design detail', zhTw: 'erectus 水龍頭設計細節' }, 1112, 807),
  erectusMedia('erectus-3', 'faucet_hero', '1791799912', { en: 'erectus faucet product view', zhTw: 'erectus 水龍頭產品展示' }, 1678, 937),
  erectusMedia('erectus-4', '螢幕擷取畫面_2026-10-12_175323', '1791799915', { en: 'erectus faucet operation detail', zhTw: 'erectus 水龍頭操作細節' }, 1095, 620),
];
const erectusDescription: Bilingual = {
  zhTw: '藉由改變出水口的高度和角度，讓使用者洗臉時不用再費力彎腰。\n\n龍頭結合開關，拉動龍頭即可出水，使操作更直覺，顯而易懂的水溫標示避免了燙傷的風險。透過簡單的幾何形狀去暗示使用者如何去使用產品，極簡且好用。',
  en: 'By changing the height and angle of the water outlet, users no longer have to bend over when washing their faces.\n\nThe faucet is combined with the switch, and water can be discharged by pulling the faucet, making operation more intuitive. The easy-to-understand water temperature indication also avoids the risk of burns. Simple geometric shapes suggest how to use the product, making it minimalist and easy to use.',
};
const erectusHeightDescription: Bilingual = {
  zhTw: '一般家中洗手台的高度為 80–85 cm，通常都是為了洗手設計的，但一般我們使用洗手台不只會洗手。刷牙、洗臉時避免過度彎腰，需要更高的高度，大概介於 110–120 cm。藉由能夠調整出水高度、方向的水龍頭，能夠避免在洗臉時過度前傾，壓迫到神經，同時也能夠更省力。',
  en: 'Home washbasins are generally 80–85 cm high and designed for washing hands, but we use them for more than that. To avoid excessive bending when brushing teeth or washing the face, the water outlet should be higher, at around 110–120 cm. A faucet with adjustable water height and direction can help avoid leaning too far forward and compressing nerves while washing the face, while also reducing effort.',
};
const gangxinGallery: Media[] = [{
  id: 'gangxin-main',
  sourcePath: 'https://res.cloudinary.com/akx9y9c8/image/upload/v1791800748/gangxin_hero_2.webp',
  cloudinaryPublicId: 'gangxin_hero_2',
  version: '1791800748',
  width: 2022,
  height: 778,
  alt: { en: 'Gangxin day care centre brand identity', zhTw: 'Gangxin 日間照顧中心品牌識別' },
}];
const realEstateGallery: Media[] = [
  [9, '1791860960', 2200, 1237],
  [6, '1791860961', 3656, 2057],
  [7, '1791860960', 2200, 1238],
  [10, '1791860961', 2200, 1237],
  [8, '1791860960', 2200, 1238],
].map(([number, version, width, height]) => {
  const publicId = `圖片${number}`;
  return {
    id: `real-estate-${number}`,
    sourcePath: `https://res.cloudinary.com/akx9y9c8/image/upload/v${version}/${encodeURIComponent(publicId)}.webp`,
    cloudinaryPublicId: publicId,
    version: String(version),
    width: Number(width),
    height: Number(height),
    alt: { en: `Real estate key visual design proposal ${number}`, zhTw: `房地產主視覺設計提案 ${number}` },
  };
});
const entries: [string, Category, string, string][] = [
  [
    "quyi-brand-identity",
    "VI",
    "Day care centre brand identity",
    "日間照顧中心品牌識別",
  ],
  ['gangxin-brand-identity', 'VI', 'Gangxin day care centre brand identity', '日間照顧中心品牌識別'],
  [
    "association-brand-identity",
    "VI",
    "Association brand identity",
    "協會品牌識別",
  ],
  ["real-estate-key-visual", "VI", "Real estate key visual", "房地產主視覺"],
  ["ointment-packaging", "PACKAGE", "Ointment packaging", "藥膏包裝設計"],
  ['cucumber-carton', 'PACKAGE', 'Cucumber carton design', '胡瓜紙箱設計'],
  ['green-pepper-carton', 'PACKAGE', 'Green pepper carton design', '青椒紙箱設計'],
  ['sweet-pepper-carton', 'PACKAGE', 'Sweet pepper carton design', '甜椒紙箱設計'],
  [
    "interactive-installation",
    "CONCEPT",
    "Interactive installation",
    "互動裝置設計",
  ],
  ["bicycle-accessories", "CONCEPT", "Bicycle accessories", "自行車配件設計"],
  ['erectus-faucet', 'CONCEPT', 'erectus face-washing faucet', 'erectus 洗臉水龍頭'],
  ["dadi-website", "WEB", "Construction company brand identity & website design", "建設公司 識別設計 官網設計"],
  [
    "office-politics-game",
    "WEB",
    "Office Politics Game",
    "網頁遊戲 Office Politics Game",
  ],
  [
    "memory-social-media",
    "SOCIAL MEDIA",
    "Memory product social media",
    "記憶體社群素材",
  ],
  [
    "real-estate-social-media",
    "SOCIAL MEDIA",
    "Real estate social media",
    "房地產社群素材",
  ],
];
export const projects: Project[] = entries.map(
  ([slug, category, en, zhTw], order) => ({
    slug,
    category,
    order,
    title: { en, zhTw },
    status: slug === 'erectus-faucet' || slug === 'real-estate-key-visual' ? 'ready' : 'pending',
    packaging: slug === 'ointment-packaging' ? ointmentPackaging : getProduceCarton(slug)?.packaging,
    description: slug === 'real-estate-key-visual' ? { en: 'This project is a design proposal.', zhTw: '此案為提案。' } : slug === 'erectus-faucet' ? erectusDescription : undefined,
    cover: slug === 'ointment-packaging' ? ointmentShowcase : slug === 'real-estate-key-visual' ? realEstateGallery[0] : slug === 'gangxin-brand-identity' ? gangxinGallery[0] : slug === 'erectus-faucet' ? erectusGallery[0] : slug === 'dadi-website' ? dadiGallery[0] : order === 0 ? quyiGallery[0] : undefined,
    homeHero: slug === 'erectus-faucet' ? erectusGallery[0] : slug === 'dadi-website' ? dadiHomeHero : undefined,
    additionalCategories: slug === 'dadi-website' ? ['VI'] : undefined,
    gallery: slug === 'real-estate-key-visual' ? [...realEstateGallery.slice(1), realEstateGallery[0]!] : slug === 'gangxin-brand-identity' ? gangxinGallery : slug === 'erectus-faucet' ? erectusGallery : slug === 'dadi-website' ? dadiGallery : order === 0 ? [...quyiGallery, ...quyiAdditionalImages] : [],
    galleryRowDescriptions: slug === 'erectus-faucet' ? { 'erectus-1': erectusHeightDescription } : undefined,
    galleryRows: slug === 'real-estate-key-visual' ? [['real-estate-7'], ['real-estate-10', 'real-estate-8'], ['real-estate-9']] : slug === 'erectus-faucet' ? [['erectus-1'], ['erectus-2', 'erectus-3'], ['erectus-4']] : slug === 'dadi-website'
      ? [['dadi-1'], ['dadi-2', 'dadi-3'], ['dadi-6'], ['dadi-video-1'], ['dadi-video-2', 'dadi-video-3']]
      : order === 0 ? [['quyi-design-1'], ['quyi-design-2', 'quyi-design-4'], ['quyi-design-3', 'quyi-design-12'], ['quyi-2'], ['quyi-3'], ['quyi-4'], ['quyi-5', 'quyi-6']] : undefined,
    ...(getProduceCarton(slug) ? { cover: getProduceCarton(slug)!.cover, gallery: getProduceCarton(slug)!.gallery } : {}),
  }),
);

export function filterProjects(category: Category | "ALL", list = projects) {
  return list.filter(
    (project) => category === "ALL" || project.category === category || project.additionalCategories?.includes(category),
  );
}
