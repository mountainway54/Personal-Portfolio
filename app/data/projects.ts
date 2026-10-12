import type {
  Bilingual,
  Category,
  Media,
  Project,
} from "../types/portfolio.ts";
import { cloudinaryAssets } from "./media.ts";

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
const entries: [string, Category, string, string][] = [
  [
    "quyi-brand-identity",
    "VI",
    "Day care centre brand identity",
    "日間照顧中心品牌識別",
  ],
  [
    "association-brand-identity",
    "VI",
    "Association brand identity",
    "協會品牌識別",
  ],
  ["real-estate-key-visual", "VI", "Real estate key visual", "房地產主視覺"],
  ["ointment-packaging", "PACKAGE", "Ointment packaging", "藥膏包裝設計"],
  ["produce-carton", "PACKAGE", "Produce carton design", "蔬果紙箱設計"],
  [
    "interactive-installation",
    "CONCEPT",
    "Interactive installation",
    "互動裝置設計",
  ],
  ["bicycle-accessories", "CONCEPT", "Bicycle accessories", "自行車配件設計"],
  ["dadi-website", "WEB", "Dadi Construction website", "大地建設 官網"],
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
    status: "pending",
    cover: order === 0 ? quyiGallery[0] : undefined,
    gallery: order === 0 ? quyiGallery : [],
    galleryRows: order === 0 ? [['quyi-2'], ['quyi-3'], ['quyi-4'], ['quyi-5', 'quyi-6']] : undefined,
  }),
);

export function filterProjects(category: Category | "ALL", list = projects) {
  return list.filter(
    (project) => category === "ALL" || project.category === category,
  );
}
