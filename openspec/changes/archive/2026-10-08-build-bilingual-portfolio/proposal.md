# Proposal

## Why

目前 WILLLIN 網站只有 Nuxt 初始化占位頁，無法展示品牌、視覺設計與前端作品。依 Notion 內容、現有品牌視覺與線框稿建立可瀏覽的個人作品集，讓訪客了解 Will Lin 的作品、背景與聯絡方式。

## What Changes

- 建立首頁、WORK 作品瀏覽、作品詳情與 ABOUT 頁面；不建立 ARTICLE。
- 介面以英文為主，作品與個人介紹的中英文內容在同一頁同時呈現，不使用語言切換或分語言路由。
- 首頁採固定頂部互動 LOGO 導覽、全寬作品輪播、桌面三欄圖片作品網格及緊密聯絡頁尾；以純黑背景、純白文字與依區塊設定的白色細線建立品牌視覺。
- 支援 VI、PACKAGE、CONCEPT、WEB、SOCIAL MEDIA 五類作品，保留 Notion 的十一個作品項目與順序。
- 呈現雙語介紹、中文學歷與經歷及英文區塊標題；依最後確認的文案與排版，主標為 Will Lin 林立崴，技能為膠囊標籤，email／電話不帶斜箭頭。
- 使用 Cloudinary 提供作品影像的響應式尺寸與格式最佳化；品牌 SVG 與字型維持本地資產。
- 移植 InteractiveLogo、LoadingLogo 與幾何依賴；navbar LOGO 可返回首頁，手機點擊展開後跳轉並收回；GSAP 控制輪播由左側、卡片及內頁圖片由下方淡入，支援減少動態效果。
- 作品詳情以第一張照片為主圖，資訊放在主圖下方，分類為中文標題右側細白線膠囊；圖集支援分組，quyi-5／quyi-6 桌面同排、手機上下排列。
- 將未提供的作品圖片、文案與 Cloudinary 設定列為待補項目，預覽可顯示明確的待補狀態，正式發布前必須完成內容檢核。

## Capabilities

### New Capabilities

- `portfolio-navigation`: 英文導覽、同頁雙語規則、響應式首頁與頁尾。
- `portfolio-work`: 五類作品目錄、輪播、篩選、作品詳情與內容就緒狀態。
- `portfolio-profile`: ABOUT 雙語介紹、學歷、工作經歷與聯絡資訊。
- `portfolio-media`: Cloudinary 圖片傳遞、響應式影像及失敗處理。
- `portfolio-motion`: 互動 LOGO、載入 LOGO、GSAP 滾動進場與動態偏好處理。

### Modified Capabilities

無。專案尚未建立既有功能規格。

## Impact

- 延伸既有 Nuxt 4.5.1、Vue 3 與 TypeScript，預計修改 `app/app.vue`、`nuxt.config.ts`，新增頁面、元件、內容資料、樣式與媒體工具。
- 新增 GSAP；Cloudinary 採公開 cloud name 與 public ID 的圖片傳遞 URL，網站不提供上傳後台，瀏覽器不需要 API secret。
- 使用專案內 `VI.pdf`、`wireframe.pdf`、LOGO SVG、`font/` 與 `work/quyi/`；移植來源為相鄰 WILLLIN Prototype 專案的 LOGO 元件，實作不得修改來源專案。
- 規格來源：[Notion 架構](https://app.notion.com/p/3f29977be1ea80a4a2aedd1d9450e61a)，以及使用者確認「不用 ARTICLE、中英文同時出現、UI 以英文為主、使用 Cloudinary」。
- 不納入文章系統、語言切換、CMS、登入、聯絡表單後端、訪客上傳、網站部署或額外 CI 建置。README 提到的 Markdown、Tailwind 等項目不是本次既定需求。
