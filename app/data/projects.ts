import type {
  Bilingual,
  Category,
  Media,
  Project,
} from "../types/portfolio.ts";
import { cloudinaryAssets } from "./media.ts";
import {
  ointmentShowcase,
  ointmentPackaging,
  getProduceCarton,
} from "./packaging.ts";

const alt: Bilingual[] = [
  {
    en: "Day care centre reception and brand signage",
    zhTw: "日間照顧中心接待空間與品牌標示",
  },
  {
    en: "Business cards with geometric brand graphics",
    zhTw: "名片與幾何品牌圖形",
  },
  {
    en: "Printed leaflets with brand colours and patterns",
    zhTw: "文宣與品牌色彩、圖樣應用",
  },
  { en: "Branded envelope and stationery", zhTw: "品牌信封與信紙" },
  {
    en: "Canvas tote bag with character illustrations",
    zhTw: "帆布提袋與角色插畫",
  },
  {
    en: "Two tote bag designs featuring geometric characters",
    zhTw: "兩款幾何角色帆布提袋設計",
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
  ["1", "1791795466"],
  ["2", "1791795467"],
  ["4", "1791795469"],
  ["3", "1791795468"],
  ["12", "1791795465"],
].map(([number, version]) => {
  const publicId = `quyi工作區域_${number}_2x-20`;
  return {
    id: `quyi-design-${number}`,
    sourcePath: `https://res.cloudinary.com/akx9y9c8/image/upload/v${version}/${encodeURIComponent(publicId)}.webp`,
    cloudinaryPublicId: publicId,
    version,
    width: 3840,
    height: 2160,
    alt: {
      en: `Brand identity design ${number}`,
      zhTw: `品牌識別設計 ${number}`,
    },
  };
});
function dadiMedia(
  id: string,
  filename: string,
  version: string,
  width = 1920,
  height = 1080,
): Media {
  return {
    id,
    sourcePath: `https://res.cloudinary.com/akx9y9c8/image/upload/v${version}/${filename}`,
    cloudinaryPublicId: filename.replace(/\.[^.]+$/, ""),
    version,
    ...(filename.endsWith(".gif") ? { format: "gif" as const } : {}),
    width,
    height,
    alt: {
      en: `Construction company brand identity and website design — ${id}`,
      zhTw: `建設公司識別與官網設計 — ${id}`,
    },
  };
}
const dadiHomeHero = dadiMedia(
  "dadi-home-hero",
  "EarthConstruction_hero.webp",
  "1791786646",
  2560,
  1441,
);
function dadiVideo(index: number, version: string, time: string): Media {
  return {
    id: `dadi-video-${index}`,
    kind: "video",
    sourcePath: `https://res.cloudinary.com/akx9y9c8/video/upload/v${version}/${encodeURIComponent(`錄製內容_2026-10-12_${time}`)}.mp4`,
    width: 1920,
    height: 1080,
    alt: {
      en: `Construction company website demo ${index}`,
      zhTw: `建設公司官網操作展示 ${index}`,
    },
  };
}
export const dadiGallery: Media[] = [
  dadiMedia("dadi-work-hero", "hnuj03fd.q5j.jpg", "1791789208"),
  dadiMedia("dadi-1", "nifiukea.ic1.png", "1791786593"),
  dadiMedia("dadi-2", "kyo1vyce.jox.png", "1791786592"),
  dadiMedia("dadi-3", "jszbjjnu.ec1.jpg", "1791786585"),
  dadiVideo(1, "1791791968", "154649"),
  dadiVideo(2, "1791791967", "155343"),
  dadiVideo(3, "1791791966", "155113"),
  dadiMedia("dadi-5", "xakpnjfo.zc4.webp", "1791787044"),
  dadiMedia("dadi-6", "rosvs0is.4gt.webp", "1791787043"),
  dadiMedia("dadi-8", "id5102og.i1c.webp", "1791787042"),
  dadiMedia("dadi-9", "i2u5r5em.azd.webp", "1791787041"),
  dadiMedia("dadi-11", "xmildldv.buv.webp", "1791787040"),
  dadiMedia("dadi-10", "0phrt1uh.bcv.webp", "1791787040", 4000, 2500),
];
function erectusMedia(
  id: string,
  publicId: string,
  version: string,
  alt: Bilingual,
  width: number,
  height: number,
): Media {
  return {
    id,
    cloudinaryPublicId: publicId,
    version,
    width,
    height,
    alt,
    sourcePath: `https://res.cloudinary.com/akx9y9c8/image/upload/v${version}/${encodeURIComponent(publicId)}.webp`,
  };
}
export const erectusGallery: Media[] = [
  erectusMedia(
    "erectus-main",
    "Gemini_Generated_Image_a7tsyfa7tsyfa7ts",
    "1791799913",
    { en: "erectus face-washing faucet", zhTw: "erectus 洗臉水龍頭" },
    1257,
    832,
  ),
  erectusMedia(
    "erectus-1",
    "M110400003林立崴_作品集4",
    "1791799913",
    {
      en: "erectus faucet concept and use",
      zhTw: "erectus 水龍頭概念與使用方式",
    },
    3508,
    2481,
  ),
  erectusMedia(
    "erectus-2",
    "螢幕擷取畫面_2026-10-12_175255",
    "1791799914",
    { en: "erectus faucet design detail", zhTw: "erectus 水龍頭設計細節" },
    1112,
    807,
  ),
  erectusMedia(
    "erectus-3",
    "faucet_hero",
    "1791799912",
    { en: "erectus faucet product view", zhTw: "erectus 水龍頭產品展示" },
    1678,
    937,
  ),
  erectusMedia(
    "erectus-4",
    "螢幕擷取畫面_2026-10-12_175323",
    "1791799915",
    { en: "erectus faucet operation detail", zhTw: "erectus 水龍頭操作細節" },
    1095,
    620,
  ),
];
const erectusDescription: Bilingual = {
  zhTw: "藉由改變出水口的高度和角度，讓使用者洗臉時不用再費力彎腰。\n\n龍頭結合開關，拉動龍頭即可出水，使操作更直覺，顯而易懂的水溫標示避免了燙傷的風險。透過簡單的幾何形狀去暗示使用者如何去使用產品，極簡且好用。",
  en: "By changing the height and angle of the water outlet, users no longer have to bend over when washing their faces.\n\nThe faucet is combined with the switch, and water can be discharged by pulling the faucet, making operation more intuitive. The easy-to-understand water temperature indication also avoids the risk of burns. Simple geometric shapes suggest how to use the product, making it minimalist and easy to use.",
};
const erectusHeightDescription: Bilingual = {
  zhTw: "一般家中洗手台的高度為 80–85 cm，通常都是為了洗手設計的，但一般我們使用洗手台不只會洗手。刷牙、洗臉時避免過度彎腰，需要更高的高度，大概介於 110–120 cm。藉由能夠調整出水高度、方向的水龍頭，能夠避免在洗臉時過度前傾，壓迫到神經，同時也能夠更省力。",
  en: "Home washbasins are generally 80–85 cm high and designed for washing hands, but we use them for more than that. To avoid excessive bending when brushing teeth or washing the face, the water outlet should be higher, at around 110–120 cm. A faucet with adjustable water height and direction can help avoid leaning too far forward and compressing nerves while washing the face, while also reducing effort.",
};
const gangxinCover: Media = {
  id: "gangxin-cover",
  sourcePath:
    "https://res.cloudinary.com/akx9y9c8/image/upload/v1791800748/gangxin_hero_2.webp",
  cloudinaryPublicId: "gangxin_hero_2",
  version: "1791800748",
  width: 2022,
  height: 778,
  alt: {
    en: "Day care centre brand identity",
    zhTw: "日間照顧中心品牌識別",
  },
};
const gangxinGallery: Media[] = [
  ["main", "gangxin_hero_2", "1791858898", 1621, 778],
  ["1", "gangxin_1_1", "1792052323", 4000, 2250],
  ["2", "gangxin_1_2", "1792052323", 4001, 2250],
  ["3", "gangxin_1_3", "1792052323", 4001, 2250],
  ["print", "gangxin_print", "1792052505", 1459, 1078],
  ["hero-2", "gangXin_hero", "1792052323", 1536, 1024],
].map(([id, publicId, version, width, height]) => ({
  id: `gangxin-${id}`,
  sourcePath: `https://res.cloudinary.com/akx9y9c8/image/upload/v${version}/${publicId}.webp`,
  cloudinaryPublicId: String(publicId),
  version: String(version),
  width: Number(width),
  height: Number(height),
  alt: {
    en: `Day care centre brand identity — ${id}`,
    zhTw: `日間照顧中心品牌識別 — ${id}`,
  },
}));
const realEstateGallery: Media[] = [
  [9, "1791860960", 2200, 1237],
  [6, "1791860961", 3656, 2057],
  [7, "1791860960", 2200, 1238],
  [10, "1791860961", 2200, 1237],
  [8, "1791860960", 2200, 1238],
].map(([number, version, width, height]) => {
  const publicId = `圖片${number}`;
  return {
    id: `real-estate-${number}`,
    sourcePath: `https://res.cloudinary.com/akx9y9c8/image/upload/v${version}/${encodeURIComponent(publicId)}.webp`,
    cloudinaryPublicId: publicId,
    version: String(version),
    width: Number(width),
    height: Number(height),
    alt: {
      en: `Real estate key visual design proposal ${number}`,
      zhTw: `房地產主視覺設計提案 ${number}`,
    },
  };
});
const sketchBugDescription: Bilingual = {
  zhTw: "《繪畫蟲 SketchBug》是一件結合人工智慧與仿生設計的互動裝置藝術作品。裝置透過聆聽周遭人類的對話，將聲音轉化為文字提示，利用 AI 生成圖像，並透過熱敏印表機即時輸出，模擬生物透過感官感知世界、進而進行創作的行為。作品以原生生物為造型靈感，賦予機器彷彿具有生命與創作慾望的形象，藉此模糊工具與創作者之間的界線，邀請觀眾重新思考機器的自主性、創作的本質，以及人與物件之間可能形成的共生關係。",
  en: "SketchBug is an interactive art installation that combines artificial intelligence with biomimetic design. By listening to nearby human conversations, the installation converts speech into text prompts, generates images with AI, and prints them in real time using a thermal printer. This process echoes how living organisms perceive the world through their senses and respond through creation. Inspired by protists, its form gives the machine the appearance of life and a desire to create. The work blurs the boundary between tool and creator, inviting viewers to reconsider machine autonomy, the nature of creativity, and the symbiotic relationships that may emerge between people and objects.",
};
const sketchBugGallery: Media[] = [
  [
    "main",
    "Gemini_Generated_Image_",
    "1791882291",
    1264,
    842,
    "SketchBug interactive art installation",
    "繪畫蟲互動裝置藝術作品",
  ],
  [
    "hero",
    "SketchBug_hero",
    "1791800604",
    1536,
    1024,
    "SketchBug installation overview",
    "繪畫蟲裝置全貌",
  ],
  [
    "side",
    "sketchBug_side",
    "1791882191",
    1536,
    1024,
    "SketchBug installation side view",
    "繪畫蟲裝置側面",
  ],
  [
    "01",
    "copy_of_sketchbug_01",
    "1791884741",
    1920,
    720,
    "SketchBug design presentation",
    "繪畫蟲設計展示",
  ],
  [
    "05",
    "sketchBug-05",
    "1791883634",
    2501,
    1407,
    "SketchBug work detail 05",
    "繪畫蟲作品細節 05",
  ],
  [
    "06",
    "sketchBug-06",
    "1791883633",
    2500,
    1407,
    "SketchBug work detail 06",
    "繪畫蟲作品細節 06",
  ],
  [
    "02",
    "sketchBug-02",
    "1791883632",
    4000,
    2251,
    "SketchBug design presentation 02",
    "繪畫蟲設計展示 02",
  ],
].map(([id, publicId, version, width, height, en, zhTw]) => ({
  id: `sketchbug-${id}`,
  cloudinaryPublicId: String(publicId),
  version: String(version),
  sourcePath: `https://res.cloudinary.com/akx9y9c8/image/upload/v${version}/${publicId}.webp`,
  width: Number(width),
  height: Number(height),
  alt: { en: String(en), zhTw: String(zhTw) },
}));
sketchBugGallery.splice(1, 0, {
  id: "sketchbug-video",
  kind: "youtube",
  sourcePath: "https://www.youtube.com/embed/P9aTP-52y5o?si=4Bpaa6gSJO17CFNB",
  width: 560,
  height: 315,
  alt: { en: "SketchBug installation video", zhTw: "繪畫蟲裝置展示影片" },
});
const slowDownDescription: Bilingual = {
  zhTw: "本系列以都市自行車騎行需求為出發點，探索彈力繩索與模組化配件結合的可能性。透過簡潔的結構設計與靈活的固定方式，發展出快拆上管包、密碼鋼纜鎖、矽膠固定束帶及輕量化咖啡杯架四款配件。利用繩索的彈性、纏繞與束縛特性，讓配件能快速安裝、拆卸並適應不同車架結構，在實用機能與視覺一致性之間取得平衡，為日常城市騎行提供更自由、輕便且便利的使用體驗。",
  en: "This series explores the integration of elastic paracord and modular accessories for urban cycling. Featuring four products—a detachable frame bag, combination cable lock, silicone buckle strap, and lightweight cup holder—the collection uses the flexibility and binding properties of cords to create adaptable attachment systems. Through minimal structures and intuitive installation, each accessory can be easily attached, removed, and adjusted to different bicycle frames. Balancing functionality with a cohesive visual identity, the series aims to make everyday urban cycling more flexible, lightweight, and convenient.",
};
const slowDownAssets: [string, string, string, number, number][] = [
  ["main", "ttbike-01", "1791950680", 4001, 2668],
  ["presentation-1", "TTBIKE_工作區域_1", "1791950680", 6364, 4501],
  ["presentation-2", "TTBIKE-2", "1791950680", 6364, 4500],
  ["02", "ttbike-02", "1791950681", 2593, 1729],
  ["05", "ttbike-05", "1791950680", 2593, 1729],
  ["07", "ttbike-07", "1791950682", 2593, 1729],
  ["06", "ttbike-06", "1791950680", 2593, 1729],
  ["04", "ttbike-04", "1791950680", 2593, 1729],
];
const slowDownGallery: Media[] = slowDownAssets.map(
  ([id, publicId, version, width, height]) => ({
    id: `slowdown-${id}`,
    cloudinaryPublicId: publicId,
    version,
    sourcePath: `https://res.cloudinary.com/akx9y9c8/image/upload/v${version}/${encodeURIComponent(publicId)}.webp`,
    width,
    height,
    alt: {
      en: `SlowDown urban cycling accessories — ${id}`,
      zhTw: `SlowDown 自行車綁繩套件系列設計 — ${id}`,
    },
  }),
);
const officePoliticsGallery: Media[] = [
  {
    id: "office-politics-main",
    sourcePath:
      "https://res.cloudinary.com/akx9y9c8/image/upload/v1791967253/office-politics-banner.webp",
    cloudinaryPublicId: "office-politics-banner",
    version: "1791967253",
    width: 1920,
    height: 1080,
    alt: {
      en: "OFFICE Politics game banner",
      zhTw: "OFFICE Politics：職場風雲主視覺",
    },
  },
  {
    id: "office-politics-video",
    kind: "youtube",
    sourcePath: "https://www.youtube.com/embed/cHRxUWMFjWc?si=YFNue6TY4vDMvFhX",
    width: 560,
    height: 315,
    alt: {
      en: "OFFICE Politics gameplay video",
      zhTw: "OFFICE Politics：職場風雲遊戲影片",
    },
  },
  ...["game-table-screenshot", "card-effect-screenshot"].map(
    (publicId, index): Media => ({
      id: `office-politics-${publicId}`,
      sourcePath: `https://res.cloudinary.com/akx9y9c8/image/upload/v1791967253/${publicId}.webp`,
      cloudinaryPublicId: publicId,
      version: "1791967253",
      width: 1920,
      height: 1080,
      alt:
        index === 0
          ? {
              en: "OFFICE Politics game table",
              zhTw: "OFFICE Politics：職場風雲遊戲桌面",
            }
          : {
              en: "OFFICE Politics card effect",
              zhTw: "OFFICE Politics：職場風雲卡牌效果",
            },
    }),
  ),
];
function socialMediaImage(publicId: string, version: string, width: number, height: number, alt: Bilingual): Media {
  return {
    id: publicId,
    sourcePath: `https://res.cloudinary.com/akx9y9c8/image/upload/v${version}/${publicId}.webp`,
    cloudinaryPublicId: publicId,
    version,
    width,
    height,
    alt,
  };
}
const memoryAlt: Bilingual = { en: "Memory product social media design", zhTw: "記憶體社群素材" };
const realEstateSocialAlt: Bilingual = { en: "Real estate social media design", zhTw: "房地產社群素材" };
const memorySocialGallery = [1, 2, 3, 4, 5].map(number =>
  socialMediaImage(`memory${number}`, "1791973342", number <= 3 ? 680 : 2048, number <= 3 ? 680 : 2048, {
    en: `${memoryAlt.en} ${number}`,
    zhTw: `${memoryAlt.zhTw} ${number}`,
  }),
);
const realEstateSocialGallery = [
  [5, 1138, 1138],
  [6, 1536, 1531],
  [4, 1150, 1150],
  [3, 1021, 1015],
  [2, 1023, 1020],
  [1, 1332, 1334],
].map(([number, width, height]) => socialMediaImage(
  `constructionSocialMedia${number}`, number! <= 2 ? "1791973360" : "1791973361", width!, height!, {
    en: `${realEstateSocialAlt.en} ${number}`,
    zhTw: `${realEstateSocialAlt.zhTw} ${number}`,
  },
));
const associationMedia: Media[] = [
  [1, "1792047263", 2000, 2000],
  [5, "1792047262", 3840, 2160],
  [2, "1792047263", 3840, 2160],
  [4, "1792047263", 3841, 2160],
  [3, "1792047263", 3840, 2160],
].map(([number, version, width, height]) => ({
  id: `association-${number}`,
  sourcePath: `https://res.cloudinary.com/akx9y9c8/image/upload/v${version}/TLIA${number}.webp`,
  cloudinaryPublicId: `TLIA${number}`,
  version: String(version),
  width: Number(width),
  height: Number(height),
  alt: {
    en: `Association brand identity design ${number}`,
    zhTw: `協會品牌識別設計 ${number}`,
  },
}));
const entries: [string, Category, string, string][] = [
  [
    "day-care-brand-identity-01",
    "VI",
    "Day care centre brand identity",
    "日間照顧中心品牌識別",
  ],
  [
    "day-care-brand-identity-02",
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
  ["cucumber-carton", "PACKAGE", "Cucumber carton design", "胡瓜紙箱設計"],
  [
    "green-pepper-carton",
    "PACKAGE",
    "Green pepper carton design",
    "青椒紙箱設計",
  ],
  [
    "sweet-pepper-carton",
    "PACKAGE",
    "Sweet pepper carton design",
    "甜椒紙箱設計",
  ],
  ["interactive-installation", "CONCEPT", "SketchBug", "繪畫蟲"],
  ["bicycle-accessories", "CONCEPT", "SlowDown", "自行車綁繩套件系列設計"],
  [
    "erectus-faucet",
    "CONCEPT",
    "erectus face-washing faucet",
    "erectus 洗臉水龍頭",
  ],
  [
    "dadi-website",
    "WEB",
    "Construction company brand identity & website design",
    "建設公司 識別設計 官網設計",
  ],
  ["office-politics-game", "WEB", "Office Politics Game", "職場風雲"],
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
    status:
      slug === "interactive-installation" ||
      slug === "erectus-faucet" ||
      slug === "real-estate-key-visual"
        ? "ready"
        : "pending",
    packaging:
      slug === "ointment-packaging"
        ? ointmentPackaging
        : getProduceCarton(slug)?.packaging,
    description:
      slug === "interactive-installation"
        ? sketchBugDescription
        : slug === "real-estate-key-visual"
          ? { en: "This project is a design proposal.", zhTw: "此案為提案。" }
          : slug === "erectus-faucet"
            ? erectusDescription
            : undefined,
    cover:
      slug === "ointment-packaging"
        ? ointmentShowcase
        : slug === "real-estate-key-visual"
          ? realEstateGallery[0]
          : slug === "day-care-brand-identity-02"
            ? gangxinCover
            : slug === "erectus-faucet"
              ? erectusGallery[0]
              : slug === "dadi-website"
                ? dadiGallery[0]
                : order === 0
                  ? quyiGallery[0]
                  : undefined,
    homeHero:
      slug === "erectus-faucet"
        ? erectusGallery[0]
        : slug === "dadi-website"
          ? dadiHomeHero
          : undefined,
    additionalCategories: slug === "dadi-website" ? ["VI"] : undefined,
    gallery:
      slug === "real-estate-key-visual"
        ? [...realEstateGallery.slice(1), realEstateGallery[0]!]
        : slug === "day-care-brand-identity-02"
          ? gangxinGallery
          : slug === "erectus-faucet"
            ? erectusGallery
            : slug === "dadi-website"
              ? dadiGallery
              : order === 0
                ? [...quyiGallery, ...quyiAdditionalImages]
                : [],
    galleryRowDescriptions:
      slug === "erectus-faucet"
        ? { "erectus-1": erectusHeightDescription }
        : undefined,
    galleryRows:
      slug === "real-estate-key-visual"
        ? [
            ["real-estate-7"],
            ["real-estate-10", "real-estate-8"],
            ["real-estate-9"],
          ]
        : slug === "erectus-faucet"
          ? [["erectus-1"], ["erectus-2", "erectus-3"], ["erectus-4"]]
          : slug === "dadi-website"
            ? [
                ["dadi-1"],
                ["dadi-2", "dadi-3"],
                ["dadi-6"],
                ["dadi-video-1"],
                ["dadi-video-2", "dadi-video-3"],
              ]
            : order === 0
              ? [
                  ["quyi-design-1"],
                  ["quyi-design-2", "quyi-design-4"],
                  ["quyi-design-3", "quyi-design-12"],
                  ["quyi-2"],
                  ["quyi-3"],
                  ["quyi-4"],
                  ["quyi-5", "quyi-6"],
                ]
              : undefined,
    ...(slug === "day-care-brand-identity-02"
      ? {
          galleryRows: [
            ["gangxin-1"],
            ["gangxin-2", "gangxin-3"],
            ["gangxin-print", "gangxin-hero-2"],
          ],
        }
      : {}),
    ...(slug === "association-brand-identity"
      ? {
          status: "ready" as const,
          description: {
            en: "Brand identity design for an association.",
            zhTw: "協會品牌識別設計。",
          },
          cover: associationMedia[0],
          gallery: associationMedia.slice(1),
          galleryRows: [["association-2"], ["association-4", "association-3"]],
        }
      : {}),
    ...(slug === "bicycle-accessories"
      ? {
          status: "ready" as const,
          description: slowDownDescription,
          cover: slowDownGallery.find((media) => media.id === "slowdown-05"),
          gallery: slowDownGallery,
          galleryRows: [
            ["slowdown-presentation-1"],
            ["slowdown-presentation-2"],
            ["slowdown-02", "slowdown-05"],
            ["slowdown-07", "slowdown-06"],
            ["slowdown-04"],
          ],
        }
      : {}),
    ...(getProduceCarton(slug)
      ? {
          cover: getProduceCarton(slug)!.cover,
          gallery: getProduceCarton(slug)!.gallery,
        }
      : {}),
    ...(slug === "interactive-installation"
      ? {
          cover: sketchBugGallery[0],
          gallery: sketchBugGallery,
          galleryRows: [
            ["sketchbug-01"],
            ["sketchbug-video"],
            ["sketchbug-hero", "sketchbug-side"],
            ["sketchbug-05", "sketchbug-06"],
            ["sketchbug-02"],
          ],
        }
      : {}),
    ...(slug === "memory-social-media" || slug === "real-estate-social-media"
      ? {
          status: "ready" as const,
          showMainImage: false,
          galleryColumns: 2,
          description: slug === "memory-social-media"
            ? { en: "Social media visual design for memory products.", zhTw: "記憶體產品社群視覺設計。" }
            : { en: "Social media visual design for real estate.", zhTw: "房地產社群視覺設計。" },
          cover: slug === "memory-social-media"
            ? socialMediaImage("memory", "1791973343", 2084, 2084, memoryAlt)
            : socialMediaImage("constructionSocialMedia", "1791973362", 2084, 2084, realEstateSocialAlt),
          gallery: slug === "memory-social-media" ? memorySocialGallery : realEstateSocialGallery,
          galleryRows: slug === "memory-social-media"
            ? [["memory1", "memory2"], ["memory3", "memory4"], ["memory5"]]
            : [
                ["constructionSocialMedia5", "constructionSocialMedia6"],
                ["constructionSocialMedia4", "constructionSocialMedia3"],
                ["constructionSocialMedia2", "constructionSocialMedia1"],
              ],
        }
      : {}),
    ...(slug === "office-politics-game"
      ? {
          status: "ready" as const,
          description: {
            zhTw: "《OFFICE Politics：職場風雲》是一款充滿爾虞我詐、快節奏的職場生存卡牌桌遊（改編自經典遊戲《情書》）。玩家將扮演身處風暴中心的各階層員工，在年終將至的考核修羅場中，利用派系調動、八卦爆料與績效評比，不擇手段地淘汰競爭對手，爭奪唯一的終極年終分紅！",
            en: "OFFICE Politics is a fast-paced card game of workplace survival, deception, and intrigue, adapted from the classic game Love Letter. Players take on the roles of employees at every level, caught in the storm of year-end performance reviews. Through faction shifts, gossip, and performance evaluations, they eliminate rivals by any means necessary to compete for the one ultimate year-end bonus!",
          },
          externalUrl:
            "https://github.com/Office-Politics-Game/Office-Politics-Game",
          gallery: officePoliticsGallery,
          galleryRows: [
            ["office-politics-video"],
            [
              "office-politics-game-table-screenshot",
              "office-politics-card-effect-screenshot",
            ],
          ],
          cover: {
            id: "office-politics-game-cover",
            sourcePath:
              "https://res.cloudinary.com/akx9y9c8/image/upload/v1791957469/OPG_small.webp",
            cloudinaryPublicId: "OPG_small",
            version: "1791957469",
            width: 1920,
            height: 1080,
            alt: {
              en: "Office Politics Game",
              zhTw: "網頁遊戲 Office Politics Game",
            },
          },
        }
      : {}),
  }),
);

export function filterProjects(category: Category | "ALL", list = projects) {
  return list.filter(
    (project) =>
      category === "ALL" ||
      project.category === category ||
      project.additionalCategories?.includes(category),
  );
}
