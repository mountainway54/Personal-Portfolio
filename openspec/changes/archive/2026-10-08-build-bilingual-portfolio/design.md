# Design

## Context

變更動機與範圍見 proposal.md。已確認的實作基礎為 Nuxt 4.5.1、Vue 3、TypeScript 與 SSR；`app/app.vue` 僅有初始化文字。`nuxt.config.ts` 尚未加入內容、媒體、樣式或動畫設定；目前沒有測試套件或主規格。

來源與已檢視素材：

- [Notion 架構](https://app.notion.com/p/3f29977be1ea80a4a2aedd1d9450e61a)：WORK、ABOUT、FOOTER 與其他備註；已於 2026-10-07 讀取。
- `VI.pdf`：一頁品牌視覺，純黑背景、白色 LOGO、Syncopate 導覽、Sora 英文、源石黑體中文。其 ARTICLE 標示由使用者明確排除，9px 正文為稿面示意，不適合作為網站可讀尺寸。
- `wireframe.pdf`：一頁首頁線框，左上互動 LOGO、右上 ABOUT／WORK、全寬輪播、三欄兩列示意卡片、頁尾與一致最大寬度。Notion 將視覺與首頁稿都寫成 VI.pdf；本案採 VI.pdf 管視覺、實際 wireframe.pdf 管結構，線框六格視為網格示意，保留完整十一項作品。
- `work/quyi/quyi-1.webp` 至 `quyi-6.webp`：唯一已提供的作品影像，quyi-1 可見「耆寓日間照顧」品牌。多數約 3840×2160，quyi-4 為 3201×2400，圖庫需要保留各自比例。
- `WILLLIN LOGO.svg`、`WILLLIN LOGO_square.svg`、`favicon.svg` 及 `font/` 已存在。
- 相鄰 `C:/Users/willy/OneDrive/桌面/WILLLIN Prototype/src/components/InteractiveLogo.vue`、`LoadingLogo.vue` 與 `src/lib/logoGeometry.js` 已讀取。互動元件已有觸控、鍵盤與動態偏好處理；依賴 GSAP，顏色預設為深色，需於本網站改用白色。LoadingLogo 已提供 loading prop 及完成事件，但整體遮罩、timeout 與 SSR 整合需由本網站新增。
- 工作目錄有既有未提交改動；本次僅新增 change 文件，實作時保留使用者已修改的檔案內容與素材。

## Goals / Non-Goals

**Goals:**

- 同一份雙語內容資料供首頁、WORK 與詳情共用，避免標題、分類或媒體對應不一致。
- HTML 先輸出可閱讀內容；Cloudinary 與動畫故障不影響導覽。
- 可先完成包含待補內容的開發預覽，再接入真實媒體；發布就緒與功能預覽分開核對。

**Non-Goals:**

- 本次不增加瀏覽器上傳、遠端內容編輯、CMS 或後端資料庫。
- 不新增語言切換與 `/en`、`/zh` 路由，不為英文介面文字逐一附中文副標。
- 不升級現有 Nuxt 版本或重建相鄰原型專案；部署不是本次工作。

## Decisions

### 1. Nuxt 頁面與共用元件

保留現有框架與版本，將 `app/app.vue` 改為共用外殼／NuxtPage，建立 `app/pages/index.vue`、`work/index.vue`、`work/[slug].vue`、`about.vue` 與對應 404。共用元件包括 SiteHeader、SiteFooter、ProjectCard、ProjectHero、ProjectGallery、CloudinaryImage 與雙語文字區塊，頁面標題／描述使用 Nuxt 原生 head 工具。

首頁網格顯示完整十一項，WORK 提供分類篩選；不引入分頁。輪播預設由訪客手動切換，單張隱藏切換控制，不需要強迫自動播放或額外輪播套件。作品卡片全卡可進入詳情，待補作品亦有真實的詳情殼與返回控制。

替代方案：單頁錨點網站可較快完成，但作品獨立 URL 有利分享；採多頁與共用內容。以語言分頁會違反同時呈現雙語的要求，因此排除。

### 2. 可核對的雙語內容模型

採 `app/data/projects.ts`、`profile.ts` 與 `app/types/portfolio.ts`。雙語欄位為 `{ en, zhTw }`，搭配穩定 slug、category、order、status、cover 與 gallery。Project 的日期、角色、摘要及外部 URL 可為空，僅顯示已提供內容；不能靠模板填寫虛構成果。公司官方英文名若未知，先使用忠實描述或明確的譯名，不聲稱是官方命名。

介面文字英文為主（WORK、ABOUT、ALL、Previous、Next、Back to work）；作品與 ABOUT 的英文先呈現、中文緊鄰或於寬螢幕並排，不將任一語言隱藏於展開控制。頁面主語言設定 en，中文區塊設 `lang="zh-Hant"`。資料必須有兩種語言，翻譯不使用執行期機器翻譯服務。

原始作品對應如下；英文標題於實作時忠實翻譯：

| 分類 | 預定 slug | 來源標題 | 已知媒體 |
| --- | --- | --- | --- |
| VI | quyi-brand-identity | 日間照顧中心品牌識別 | quyi-1 至 quyi-6 |
| VI | association-brand-identity | 協會品牌識別 | 待補 |
| VI | real-estate-key-visual | 房地產主視覺 | 待補 |
| PACKAGE | ointment-packaging | 藥膏包裝設計 | 待補 |
| PACKAGE | produce-carton | 蔬果紙箱設計 | 待補 |
| CONCEPT | interactive-installation | 互動裝置設計 | 待補 |
| CONCEPT | bicycle-accessories | 自行車配件設計 | 待補 |
| WEB | dadi-website | 大地建設 官網 | 待補 |
| WEB | office-politics-game | 網頁遊戲 Office Politics Game | 待補 |
| SOCIAL MEDIA | memory-social-media | 記憶體社群素材 | 待補 |
| SOCIAL MEDIA | real-estate-social-media | 房地產社群素材 | 待補 |

ABOUT 原始介紹保留以下文字，英文版本依此翻譯：

> 擁有 2–3 年品牌與視覺設計經驗，對互動設計、美學與使用者體驗充滿興趣，喜歡從觀察與理解需求出發，思考如何透過設計創造直覺、流暢且具有美感的體驗。個性好奇、樂於探索與學習新事物，也喜歡跨領域接觸不同知識；為了更深入理解數位產品的實作方式，進一步投入前端開發學習，培養從設計到技術實現的整合思維。期望未來以 UI/UX Designer 為發展方向，結合視覺美感、互動思維與前端技術背景，持續創造兼具體驗與價值的數位產品。

學歷、三筆經歷、原始日期、年資及職責契約見 `specs/portfolio-profile/spec.md`。實作時以 Notion 完整條目核對中文內容再翻譯，不以較短的摘要規格取代職責原文。頁尾資料為 Will Lin、linliwei54@gmail.com、0981630690。

替代方案：Markdown 適合長篇文章，但本次沒有 ARTICLE，資料以固定欄位及圖片為主；TypeScript 資料較容易核對雙語與媒體。若日後需要長篇 case study，再獨立提案導入 Markdown。

### 3. 品牌樣式與響應式配置

採全域 CSS 變數與元件樣式，不為尚未存在的工具鏈加入 Tailwind。介面色彩固定 `#000`／`#fff`、分隔線 1px；作品原色保留。頁面框架為視窗全寬，不在最大寬度邊界繪製垂直框線。輪播圖片延伸到視窗兩側；圖片下方不顯示標題與控制列，切換箭頭覆於圖片兩側；其餘內容受 1440px 最大寬度限制，桌面邊距以 clamp 控制。桌面 1024px 以上三欄、768–1023px 兩欄、767px 以下一欄。頁首主要 LOGO 使用可互動字形，favicon.svg 僅作瀏覽器 favicon，不放入頁首。

導覽用本地 Syncopate，英文正文用 Sora，中文用 GenYoGothic2TW（源樣式指定的源石黑體）。載入必要字重與 `font-display: swap`，保留字型授權。正文初始至少 16px／1.6 行高，導覽可採品牌稿 11px 視覺但點選區域至少 44px 高。這些尺寸是實作預設，視覺 QA 可調整間距，但不可降低正文可讀性或改變三欄／單欄契約。

保留原素材於原位，只將需公開的 SVG、字型及預覽圖複製至 `public/` 中對應資料夾。不改寫現有 SVG 幾何，不使用生成影像替代真實作品。

替代方案：直接沿用稿面 9px 正文無法滿足手機可讀性，故採品牌字型與比例但放大正文。將作品也轉為黑白會損失作品色彩，故黑白只控制介面。

### 4. Cloudinary 傳遞與素材接入

使用 `NUXT_PUBLIC_CLOUDINARY_CLOUD_NAME` 對應 Nuxt public runtime config。每張媒體記錄 cloudinaryPublicId、可選 version、width、height、雙語 alt、sourcePath 及開發預覽 localSrc。URL 工具統一建立 `https://res.cloudinary.com/{cloudName}/image/upload/{transformations}/{version?}/{publicId}`，安全處理 public ID 路徑段；不在每頁手寫 URL。

作品採 `f_auto,q_auto`，以 480、768、1024、1440、1920 寬度建立 srcset，sizes 對應卡片、輪播與圖庫版面。圖庫採 c_limit 保留比例與完整畫面，封面可採 c_fill 及已核對焦點。首張主視覺 eager／高優先級，其餘延遲載入，width／height 或 aspect-ratio 預留版面。SVG LOGO 與字型走本地，並非全部檔案上傳 Cloudinary。

公開網站只需要 cloud name／public ID，不建立上傳 endpoint，也不索取 API secret。實作階段由已授權的帳號素材流程或使用者提供已上傳 public ID，產出 quyi 六張的對應清單。Cloudinary 尚未設定時，開發預覽使用明示尚未接入的本地 quyi 影像；正式媒體檢核必須失敗，不能靜默將本地模式當成 Cloudinary 完成。

參考：[Cloudinary 圖片 URL 與轉換](https://cloudinary.com/documentation/image_transformations)、[響應式圖片](https://cloudinary.com/documentation/responsive_html)。

替代方案：Cloudinary SDK 可以產生 URL，但本案只有圖片傳遞且不需上傳元件，先採小型純函式工具降低依賴；純本地圖片不符合使用者要求，只作預覽。

### 5. LOGO 與 GSAP 生命週期

沿用 InteractiveLogo、LoadingLogo 與 logoGeometry 的品牌幾何及白色 currentColor。桌面 navbar LOGO 外層為首頁連結，內部使用 linkMode 取消個別字母的按鈕角色、tabindex 與點擊攔截，保留 hover 伸縮。手機外層為 Home 按鈕，依序 await 展開、navigateTo('/')、收回；所有互動 LOGO 字母不繪製焦點外框。頁尾維持獨立互動 LOGO。

GSAP 控制位移與淡入，IntersectionObserver 判斷進入可視區域，load/error 與載入遮罩狀態共同決定播放時機。輪播由左側 48px 移入；卡片與作品內頁由下方 48px 移入，持續 0.7 秒。卡片由外層負責進場，內部圖片停用重複動畫；輪播切換透過媒體 key 重建。SSR 圖片維持可见，初始化後才設定待進場；matchMedia 與離頁清理負責停止 tween 及 observer。

載入層只於首次進站啟用。以主要內容掛載與第一張 hero load/error 決定 ready，5 秒上限可跳過等待並清除遮罩，不等待所有圖庫與字型下載。載入層為 client mounted 後才啟用，無 JavaScript 的 SSR 內容仍顯示。減少動態效果時直接顯示靜態 LOGO 與內容，不等動畫完成事件才解除遮罩。

替代方案：重新畫 LOGO 會偏離原型；目前以 IntersectionObserver 判斷可見性，GSAP 共用於 LOGO 與圖片動畫，無須額外的 ScrollTrigger 監聽。

### 6. 內容檢核與驗證邊界

新增可重複執行的內容檢核：預覽模式檢查十一項唯一 slug、五分類、雙語必填欄位及真實來源；發布模式另要求已就緒的雙語作品敘述、實際 Cloudinary 配置與全部圖片對應。輸出具體缺漏項目，不把十件待補作品標記完整。本次規劃完成不等同網站內容已發布就緒。

測試採有意義的小範圍驗證：內容唯一性／分類、Cloudinary URL 與缺參數、404、減少動態與載入超時；視覺與互動採瀏覽器檢查 375px、768px、1440px、鍵盤／觸控操作與路由往返。沿用 npm run typecheck 與 npm run generate，額外增加 API、端對端框架或大範圍測試套件目前無必要。

替代方案：單靠截圖會漏掉內容與 URL 對應錯誤；全新大型 E2E 測試工具鏈對初始作品集成本偏高，因此純邏輯測試與手動瀏覽器驗證分工。

## Risks / Trade-offs

- [只有 quyi 六張圖片，其他十項作品無完整素材／敘述] → 保留真實目錄與待補狀態，正式就緒檢核列出缺漏，不用同一組影像填滿所有作品。
- [其餘作品 Cloudinary 對應待補] → quyi 已接入公開 cloud name akx9y9c8 與六張 public ID/version；其他作品收到真實素材後再接入，不索取 API secret。
- [英文譯名不一定是客戶官方名稱] → 使用忠實譯名或描述，交付時保留可核對的中文，不增加未提供事實。
- [中文字型檔可能較大] → 限制初期字重與提供 fallback；若實測載入過大，再進行保留授權的子集化，不先下載新字型服務。
- [LOGO 伸展溢出導覽] → 保留原型幾何，設定合理 LOGO 寬度及右側空間，於手機與伸展峰值核對。
- [SSR 動畫造成 hydration 錯誤或圖片永遠隱藏] → 瀏覽器 API 僅於掛載後呼叫，SSR 可見優先，離頁清除與 reduced-motion 動態測試。
- [Cloudinary 裁切損失設計內容] → 詳情圖庫保留原比例，只有封面採明確裁切。

## Migration Plan

1. 先建立共用樣式、路由與型別資料，再接入頁面內容、影像與動畫；保留既有來源素材。
2. 先展示開發預覽及待補清單，取得真實 Cloudinary 對應與剩餘作品內容後執行發布就緒檢核。
3. 執行型別、靜態生成、內容及瀏覽器檢查後交付可預覽網站；實際部署另依使用者指示進行。
4. 若需回退，僅回退本變更新增的實作與依賴，不修改使用者既有未提交改動、原素材或相鄰原型；不在本變更刪除遠端媒體。

## Open Questions

- quyi 的 Cloudinary cloud name 與六張 public ID／version 已提供並接入；剩餘作品媒體仍待提供。
- 剩餘十件作品的圖片、專案敘述與可提供的日期／角色／外部 URL 待補，依既定內容模型填入。
- 公司與客戶若有官方英文名稱，於內容校對時取代描述性翻譯；UI、路由及雙語顯示方式已決定。

### 最新顯示調整
navbar 不繪製底線或當前頁連結底線；當前頁仍以 aria-current 公告。學歷與經歷內容僅顯示繁體中文，EDUCATION、EXPERIENCE 與 SKILLS 保持英文。

作品卡片預設只顯示 cover 裁切圖片，分類與雙語標題於 hover 或鍵盤 focus-visible 時覆於圖片左下角，圖片放大至 1.04 倍。觸控裝置直接顯示覆疊文字；缺封面的作品保留待補狀態。頁尾左側為 120px 互動 LOGO、緊密聯絡方式，右側為 copyright 及 Icons8 署名，不顯示 CONTACT、標語、靜態 WILLLIN 或聯絡斜箭頭。navbar 固定頂部，桌面 72px、手機 60px，主要 LOGO 120px；手機動態選單圖示於開關後改變並停止，選單文字從右側移入。

作品詳情以 gallery 第一張為主圖，其下顯示資訊，分類位於中文標題同排右側，採 0.5px 白線膠囊。galleryRows 以圖片 ID 設定同排，quyi-5／quyi-6 在桌面並排，手機單欄；主圖不重複出現在剩餘圖集。

ABOUT 主標為 Will Lin 林立崴，與 WORK 主標共用 clamp(28px, 4.2vw, 60px)。介紹中英文皆為 16px。學校與科系學位合併，經歷職業類別與日期同排、不顯示地點。SKILLS 與技能同排分居兩側，技能採 0.5px 白線膠囊；上方分隔線為 0.5px、50% 透明度，下方留白 24px。首頁 WORK 與 Explore work 同為 13px 並使用指定 SVG 箭頭。WORK filter 上方無線，主標下留白桌面 24px、手機 16px；不顯示作品數量。

輪播控制使用 app/assets/icon 中提供的前後 SVG，按鈕 36px、黑色 15% 透明度，左箭頭依圖形實際範圍修正視覺置中。本地預覽不顯示 Local preview 按鈕或標籤。
