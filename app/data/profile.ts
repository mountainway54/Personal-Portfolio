import type { Bilingual, Experience } from "../types/portfolio.ts";
const pair = (en: string, zhTw: string): Bilingual => ({ en, zhTw });

export const contact = {
  name: "Will Lin",
  email: "linliwei54@gmail.com",
  phone: "0981630690",
  phoneHref: "tel:+886981630690",
};
export const introduction = pair(
  "With 2–3 years of experience in branding and visual design, I am interested in interaction design, aesthetics and user experience. I begin by observing and understanding needs, then explore how design can create intuitive, fluid and visually engaging experiences. Curious and eager to learn, I enjoy exploring ideas across disciplines. To better understand how digital products are built, I have also been studying front-end development, bringing design and technical implementation together. I hope to grow as a UI/UX Designer, combining visual sensitivity, interaction thinking and a front-end background to create digital products with thoughtful experiences and lasting value.",
  "擁有 2–3 年品牌與視覺設計經驗，對互動設計、美學與使用者體驗充滿興趣，喜歡從觀察與理解需求出發，思考如何透過設計創造直覺、流暢且具有美感的體驗。個性好奇、樂於探索與學習新事物，也喜歡跨領域接觸不同知識；為了更深入理解數位產品的實作方式，進一步投入前端開發學習，培養從設計到技術實現的整合思維。期望未來以 UI/UX Designer 為發展方向，結合視覺美感、互動思維與前端技術背景，持續創造兼具體驗與價值的數位產品。",
);
export const education = [
  {
    school: pair("Shih Chien University", "實踐大學"),
    degree: pair(
      "Master’s degree in Industrial Product Design",
      "工業產品設計碩士",
    ),
    period: "2021/09 – 2024/12",
  },
  {
    school: pair("National Central University", "國立中央大學"),
    degree: pair(
      "Bachelor’s degree in Mechanical Engineering",
      "機械工程學系學士",
    ),
    period: "2016/09 – 2020/12",
  },
];
export const experiences: Experience[] = [
  {
    title: pair(
      "Front-end application development bootcamp · Training",
      "前端應用開發工程師培訓",
    ),
    company: pair(
      "Commerce Development Research Institute",
      "商業發展研究院 × 新尖兵計畫",
    ),
    occupation: pair("Front-end developer", "前端工程師"),
    location: pair("Da’an District, Taipei", "台北市大安區"),
    period: "2026/04 – 2026/07",
    duration: pair("4 months", "4 個月"),
    responsibilities: [
      pair(
        "Studied the foundations and practical skills of full-stack development systematically.",
        "系統化學習全端開發所需的基礎知識與實務技能",
      ),
      pair(
        "Contributed to a team project, developing the front end, back-end APIs and database.",
        "參與團隊開發專案，負責前端、後端 API 與資料庫開發",
      ),
      pair(
        "Used Git and GitHub for collaboration, version control and branch management.",
        "使用 Git、GitHub 進行多人協作、版本控制與分支管理",
      ),
      pair(
        "Integrated RESTful APIs to connect the front and back ends.",
        "串接 RESTful API，完成前後端整合",
      ),
      pair(
        "Used AI tools to support development, debugging and technical research, improving efficiency and code quality.",
        "運用 AI 工具輔助開發、除錯與技術研究，提升開發效率與程式品質",
      ),
    ],
    skills: pair(
      "JavaScript, Vue.js, Node.js, Git, GitHub, PostgreSQL",
      "JavaScript、Vue.js、Node.js、Git、GitHub、PostgreSQL",
    ),
  },
  {
    title: pair("Brand marketing specialist", "品牌行銷專員"),
    company: pair("Fanyi Co., Ltd.", "凡易股份有限公司"),
    industry: pair("Healthcare services", "其他醫療保健服務業"),
    occupation: pair("Commercial design", "商業設計"),
    location: pair("Datong District, Taipei", "台北市大同區"),
    period: "2024/09 – 2026/03",
    duration: pair("1 year 7 months", "1 年 7 個月"),
    responsibilities: [
      pair(
        "Planned and designed visual identity systems for four group brands, including logos, colours, visual elements and applications.",
        "負責集團旗下四個品牌的企業識別系統（VI）規劃與設計，包含 Logo、品牌色彩、視覺元素及延伸應用",
      ),
      pair(
        "Created social media content, including posts, information graphics and digital advertising assets.",
        "社群營運與內容設計，包含貼文、資訊懶人包及數位廣告素材",
      ),
      pair(
        "Designed marketing materials and promotional gifts, handling quotations, production orders and supplier communication.",
        "行銷製作物與贈品設計，負責詢價、發包及供應商溝通",
      ),
      pair(
        "Planned opening visuals and materials for new locations, consolidating requirements and tracking production.",
        "規劃新據點開幕視覺與相關製作物，統整需求並追蹤製作進度",
      ),
      pair(
        "Designed and maintained brand presentations, consultation toolkits and training slides.",
        "設計與維護品牌簡介 PPT、諮詢工具包及教育訓練簡報",
      ),
      pair(
        "Set up LINE official accounts and maintained brand digital tools.",
        "建置 LINE 官方帳號及維護品牌數位工具",
      ),
      pair(
        "Provided cross-functional design support, including recruitment materials, seasonal cards and annual party key visuals.",
        "提供跨部門設計支援，包含徵才素材、節慶賀卡及尾牙主視覺",
      ),
      pair(
        "Managed everyday brand applications, including business cards, ID badges and printed materials.",
        "管理日常品牌識別應用，包含名片、識別證及各式印刷品",
      ),
    ],
    skills: pair(
      "Corporate identity planning, advertising, packaging, print design, multimedia presentations, video editing and post-production",
      "CIS 企劃設計、廣告設計、產品包裝設計、印刷設計、多媒體簡報、影片剪輯後製",
    ),
  },
  {
    title: pair("Graphic designer", "平面設計師"),
    company: pair("Riran Design & Marketing", "日然設計行銷有限公司"),
    industry: pair(
      "Advertising, marketing and public relations",
      "廣告行銷公關業",
    ),
    occupation: pair("Visual designer", "視覺設計師"),
    location: pair("Zhongzheng District, Taipei", "台北市中正區"),
    period: "2023/10 – 2024/08",
    duration: pair("11 months", "11 個月"),
    responsibilities: [
      pair(
        "Proposed real estate key visuals and brand identities.",
        "房地產主視覺與品牌識別設計提案",
      ),
      pair(
        "Extended key visual directions into promotional materials and advertising assets.",
        "依據主視覺風格延伸製作各式宣傳文宣與廣告素材",
      ),
      pair(
        "Created business cards and social media graphics.",
        "負責名片製作及社群圖文設計",
      ),
      pair(
        "Participated in brand projects and developed complete visual identity systems.",
        "參與品牌專案，建立完整視覺識別系統",
      ),
      pair(
        "Collaborated with a full-stack developer to plan and design a property developer’s brand website.",
        "與全端工程師協作，規劃並設計建商品牌官網頁面",
      ),
    ],
    skills: pair(
      "Visual identity, colour design, desktop publishing, print design and advertising design",
      "視覺識別設計、色彩設計、電腦排版、印刷設計、廣告設計",
    ),
  },
];
