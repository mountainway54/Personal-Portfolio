# Tasks

## 1. 包裝資料與素材檢核

- [x] 1.1 在 `app/types/portfolio.ts` 定義毫米尺寸、六個語意盒面及圖片方向的 packaging 設定；以型別檢查確認不影響其他作品。
- [x] 1.2 依 design.md 的對應表在作品資料設定藥膏寬 127、高 35、深 35 mm 與五張本地 WebP，左右端面明確共用；驗證六面均指向存在檔案，蔬果紙箱仍無虛構設定。
- [x] 1.3 更新 `app/utils/content-check.ts` 與發布腳本，區分 PACKAGE 的尺寸／六面貼圖與一般 gallery 要求，接受存在的本地貼圖及封面；在 `tests/content.test.ts` 驗證 NaN／零尺寸、缺面、缺檔與完整本地資料的檢核結果，原有作品檢核仍通過。
- [x] 1.4 在專案文件記錄尺寸單位、六面方向、靜態圖片路徑與端面共用方式；確認文件範例與實際藥膏設定一致。

## 2. 客戶端 3D Viewer

- [x] 2.1 安裝 `three` 與必要 TypeScript 型別並更新 lockfile；驗證依賴可解析且 SSR 不直接建立 renderer。
- [x] 2.2 建立 `PackagingViewer.client.vue`，按需載入 BoxGeometry、六面材質與相機，處理中文／空白路徑及 UV 旋轉；逐面查看藥膏真實素材，確認圖片完整、文字不鏡像、比例為 127:35:35。
- [x] 2.3 加入 OrbitControls 拖曳、觸控旋轉與聚焦模型後的方向鍵旋轉，移除整排控制列並停用滾輪／雙指縮放，提示改成「拖曳旋轉查看包裝」；於桌面及 375px 寬度驗證六面皆可查看、初始模型完整入鏡、無縮放、自動旋轉與水平溢出。
- [x] 2.4 實作 resize、按需渲染、像素比上限與卸載資源清理；在瀏覽器反覆開關、切作品及調整視窗，驗證關閉後沒有更新 callback、重複 canvas 或舊貼圖。
- [x] 2.5 加入 Loading、待補及失敗時的靜態圖片降級，處理失效載入結果與 context lost；模擬貼圖失敗、不支援 3D、載入未完成就關閉，確認不會永久 loading 或更新已卸載 viewer。

## 3. 共用 Modal 與作品入口

- [x] 3.1 在 `app.vue` 掛載共用 `PackagingModal.vue`，完成有名稱的 dialog、雙語標題、尺寸、中文操作提示、背景鎖定、焦點還原及 Close／Escape／遮罩關閉；鍵盤驗證 Tab 不離開 dialog，拖曳離開 canvas 不誤關閉。
- [x] 3.2 修改 `ProjectCard` 與 `ProjectHero` 的 PACKAGE 入口，對接首頁與 WORK 的共用 modal，開啟期間暫停背景輪播；確認非 PACKAGE 仍正常進入詳情，WORK 篩選與原捲動位置在關閉後保留。
- [x] 3.3 實作 query 驅動的 `usePackagingModal` 及原頁 history 標記，保留其他 query；從首頁、WORK、直接分享 URL 驗證開啟、關閉、刷新、返回與向前，無效／非 PACKAGE 查詢不開 modal，直接入口關閉不離開網站。

## 4. 路徑相容與整合驗證

- [x] 4.1 更新 `[slug].vue` 與 `nuxt.config.ts`，PACKAGE 舊網址轉至 WORK query 且不產生一般包裝詳情；檢查 SSR 與 generate 輸出，靜態主機不支援 redirect 時加入僅供轉向的相容頁，驗證兩個既有包裝網址可達正確 modal、未知 slug 仍為 404。
- [x] 4.2 執行 `npm test`、`npm run typecheck`、`npm run check:content` 及 `npm run generate`；記錄結果並修復此次引入的錯誤，release 缺漏按既有與此次新增分別列出。
- [x] 4.3 完成端到端人工驗收並記錄：首頁／WORK 入口、藥膏全部六面、蔬果待補、375px／桌面、鍵盤焦點、分享／歷史、靜態舊 URL、GPU 清理與錯誤降級；確認不影響其他作品詳情與未提交的既有 UI 修改。
