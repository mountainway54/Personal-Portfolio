# Design

## Context

動機見 proposal.md。專案使用 Nuxt 4、Vue 3、SSR 與 Nitro 預渲染；尚未安裝 three.js。`ProjectCard`、`ProjectHero` 一律產生 `/work/{slug}`，首頁與 WORK 共用卡片；`[slug].vue` 產生一般圖集詳情。`nuxt.config.ts` 預渲染所有作品詳情，內容檢核以一般 cover／gallery 及 Cloudinary 為主。

目前 `ointment-packaging` 與 `produce-carton` 皆為 pending。藥膏資料夾已有五張 WebP，經視覺確認包含四張約 127:35 的橫式長面及一張正方形端面；使用者提供 127、35、35 mm，並確認第一版只做長方體外盒／紙箱。既有主規格仍記載十一個作品，實際程式與測試已為十三個；本變更保留現況目錄，不順便修訂目錄數量。

## Goals / Non-Goals

**Goals:**
- 將 dialog、URL 狀態與 GPU 渲染分離，首頁與 WORK 使用同一展示實例與生命週期。
- 使用可驗證的面名稱及毫米資料建立盒體，後續補圖僅需更新作品設定。
- 保留 SSR 頁面內容，3D 在客戶端按需建立，關閉後沒有殘留渲染。

**Non-Goals:**
- 不引入 Vue 3D 框架、GLB 建模管線或管理後台。
- 不將尺寸視為螢幕上的實際物理大小；只保留比例及毫米標示。
- 不模擬折蓋、紙厚、接縫、印刷光澤或軟管。

## Decisions

### 1. 以顯式盒面資料驅動模型

`Project` 增加選用的 packaging 設定：`shape: 'box'`、`dimensionsMm: { width, height, depth }` 與 `faces`。faces 以 front、back、top、bottom、left、right 為鍵，每面含 Media 圖片引用與必要的 0／90／180／270 度旋轉。主分類 PACKAGE 決定入口，不以是否存在完整模型決定是否開 dialog，因此蔬果紙箱仍可顯示待補狀態。

以 X 為寬、Y 為高、Z 為深；front = +Z、back = -Z、top = +Y、bottom = -Y、right = +X、left = -X。藥膏的寬 127、高 35、深 35 mm 是依橫式稿件做出的可調資料假設，不是額外向使用者宣稱的製造規格。

初始面對應如下，保留原始檔、不修改圖片內容：

| 面 | `public/work/藥膏/` 檔名 | 內容 |
| --- | --- | --- |
| front | ointment-front.webp | 品名主視覺 |
| back | ointment-back.webp | 用法與條碼 |
| top | ointment-top.webp | 圖解 |
| bottom | ointment-bottom.webp | 成分與廠商 |
| left、right | ointment-end.webp | 品名端面，明確共用 |

長面及端面方向以從盒外看向各面的文字正向為基準，在實作時逐面驗證 UV 方向，不能僅因材質索引正確就宣告完成。前後／上下相鄰關係尚無刀模佐證，上表為展示預設，可不改架構而調換。圖片 URL 使用 `/work/藥膏/...` 靜態路徑並正確處理空白／中文，不將 Windows 路徑傳入瀏覽器；可擴充既有 Media 引用遠端圖片但要求 CORS。

相較六個索引直接散落程式，面名稱設定讓替換圖片及驗證方向更清楚；相較單張刀模自動拆分，本資料可直接使用五張已提供圖片。

### 2. Three.js 客戶端懶載入

新增 `PackagingViewer.client.vue`，只有 dialog 開啟且資料有效時才動態 import `three` 與 OrbitControls，建立 `BoxGeometry(width, height, depth)`、六面材質、相機及 renderer。材質陣列依 +X、-X、+Y、-Y、+Z、-Z 明確轉換自語意面名稱，配合 UV 旋轉。

使用完整圖片、sRGB 色彩與溫和中性照明的紙面材質；不使用 cover 裁切轉換。依盒體包圍尺寸及容器 aspect 計算相機距離，初始採可見正面、上方及右端的三分之四視角，留足邊界。ResizeObserver 更新 renderer 大小與相機，初始化時框住完整盒體。像素比最高 2，以控制手機 GPU 成本。

OrbitControls 僅開啟旋轉，停用縮放、平移與自動旋轉，允許查看底面。預設不開阻尼，使用 controls change 事件按需渲染，避免無操作時持續動畫；若後續加入短暫阻尼，必須限制更新週期。依使用者最新指示移除整排控制列及盒面選單；模型 canvas 可聚焦並以方向鍵旋轉，提示使用「拖曳旋轉查看包裝」。透過同一 controls 狀態更新相機，不以拖曳才能達成的操作作為唯一入口。

直接使用 three.js 符合使用者要求，額外 3D Vue 框架會增加依賴但本次只有單一盒體。官方參考：[BoxGeometry](https://threejs.org/docs/pages/BoxGeometry.html)、[OrbitControls](https://threejs.org/docs/pages/OrbitControls.html)。

### 3. 共用 dialog 與 query 狀態

在 `app.vue` 掛載唯一 `PackagingModal.vue`，以原生 `<dialog>.showModal()` 提供背景 inert 與焦點限制，配合焦點還原、scroll lock 與 Teleport 避免層級問題。外框黑白、內容圖片保留原色，尺寸／操作工具置於 viewer 周邊；375px 寬度也能看完整盒體，必要時僅 dialog 內容捲動。

共用 `usePackagingModal` 由 route.query.package 解析有效 PACKAGE；ProjectCard 的包裝入口使用語意 button，其他作品保留 NuxtLink。首頁／WORK 及未來 PACKAGE 輪播均呼叫相同開啟方法；modal 開啟期間暫停背景輪播，保留觸發元素與篩選／捲動狀態。

開啟時 router.push 至原路徑及既有 query 加 package。以 history.state 的本次開啟標記辨別 dialog 的新增歷史：Close／Escape 回退此筆；直接 query 入口使用 replace 移除 package，避免離開網站。route 變更統一驅動 dialog 開關；返回／向前不另建重複記錄。package-only 路由變更維持 scroll，跨頁導航則清理 dialog。若觸發元素不在 DOM，焦點退回原頁 WORK 主標。分享 URL 使用 `/work?package={slug}`，即使原本由首頁開啟仍可分享統一入口。

採 query 可支援分享／刷新；純本地 modal 狀態無法還原分享入口。無效 query 不開 dialog且不挪用其他作品。

### 4. 舊路徑與靜態部署相容

`[slug].vue` 對有效 PACKAGE 僅提供 redirect 至 WORK query，不建立一般詳情。`nuxt.config.ts` 排除其一般詳情預渲染；為既有兩個 slug 設定 Nitro redirect 規則，並驗證 `generate` 的部署輸出。純靜態主機若不支援 redirect 規則，輸出最小 redirect 相容頁（含目的連結），其功能僅轉向、不顯示獨立作品內容。不可直接刪除舊檔而造成舊網址 404。

### 5. 素材檢核與生命週期

新增純資料檢核：有限正數毫米、六面完整、合法方向、圖片元資料及路徑。發布腳本另確認本地檔案存在；遠端貼圖須有有效映射。PACKAGE 不要求一般 gallery，但仍保留雙語內容、cover 與 status 要求；本地 cover 同樣確認實際檔案，避免誤要求此作品所有媒體都上 Cloudinary。藥膏可由 front 稿作為封面，尚無已提供敘述時維持 pending，不自行撰寫製造或療效敘述。pending 作品只要 3D 資料完整仍可預覽模型。

以有限時間載入及錯誤捕捉結束 loading；無 WebGL、貼圖錯誤或 context lost 時切至可用靜態圖片和不可用狀態。每次開啟／切作品帶實例 token，關閉後到達的載入結果不得更新畫面並須 dispose。卸載時解除 controls、ResizeObserver、事件、更新 callback，釋放 geometry、materials、去重後的 textures 及 renderer。相同端面圖片可在單次實例內共用，但不跨作品永久保留 GPU 素材。

## Risks / Trade-offs

- [盒面相鄰順序未由刀模確認] → 以明確資料表記錄預設，逐面視覺驗證；後續只調設定。
- [僅提供一張端面] → 明示兩端共用，不產生不存在的第二版設計。
- [手機 GPU／context lost] → 限制像素比、按需渲染、完整清理及靜態降級。
- [SSR 與瀏覽歷史互相觸發] → 客戶端 viewer、route 作為單一開關來源，驗證刷新及前進返回。
- [靜態主機 redirect 差異] → 驗證實際 generate 輸出並提供最小轉向相容頁。

## Migration Plan

先加入資料及檢核，再建立 viewer／dialog，最後切換入口、分享 query 與舊路徑。以藥膏真實圖片作為首個整合實例，蔬果紙箱保留待補。跑現有測試、型別檢查、內容 preview 與 generate，人工驗證全部六面、手機與鍵盤、分享／歷史、關閉重開及降級。release 檢核若仍報既有缺漏，區分此次包裝資料與原有 pending，不宣稱全站發布完成。

回復時撤回包裝入口、query 與 redirect 改動，即恢復一般詳情流程；保留原始圖片，不需資料遷移或破壞性操作。

## Open Questions

- 各盒面最終相鄰順序與兩端是否完全相同：目前按上表預設，可由使用者之後的刀模或照片調整面設定。
- 蔬果紙箱的尺寸與六面圖片尚未提供，沿用相同模型設定即可，不阻擋藥膏預覽。
