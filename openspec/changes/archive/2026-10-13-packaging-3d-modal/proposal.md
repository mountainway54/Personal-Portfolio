# Proposal

## Why

包裝作品需要讓訪客直接查看各盒面的設計及尺寸比例。目前作品卡片一律開啟獨立詳情頁，無法拖曳查看包裝立體外觀；改以互動 3D modal 展示，能在原瀏覽位置完成觀看。

## What Changes

- PACKAGE 作品在首頁與 WORK 卡片上開啟共用 modal，以 three.js 展示可拖曳旋轉的長方體紙盒／紙箱。依最新決定移除整排控制列，停用縮放，提示使用繁體中文「拖曳旋轉查看包裝」。
- 以作品資料設定毫米尺寸及六面圖片，不需要訪客上傳或編輯。第一個實例為藥膏外盒，尺寸 127 × 35 × 35 mm，使用 `public/work/藥膏` 五張既有 WebP。
- 保留雙語作品名稱、繁體中文操作提示、鍵盤操作、焦點管理及行動裝置觸控操作。
- 缺少資料或 3D 載入失敗時提供真實待補／降級狀態。
- **BREAKING**：PACKAGE 不再提供獨立詳情頁；舊 `/work/{slug}` 導向 WORK 對應 modal，改用 `/work?package={slug}` 分享。
- 不包含軟管、圓罐、開盒動畫、刀模自動解析、訪客上傳工具或擬真印刷加工模擬。

## Capabilities

### New Capabilities

- `portfolio-packaging-viewer`：長方體尺寸、六面貼圖、3D 互動、modal 生命週期與降級呈現。

### Modified Capabilities

- `portfolio-work`：PACKAGE 作品入口改為 modal，調整作品詳情及發布素材檢核的包裝例外。
- `portfolio-navigation`：包裝作品分享 URL、舊路徑相容與直接開啟行為。

## Impact

涉及 `Project` 型別、作品資料、`ProjectCard`、首頁／WORK、`ProjectHero` 的作品入口、動態詳情路由、`nuxt.config.ts` 預渲染路徑與內容檢核；新增共用 dialog 與客戶端 3D 元件，導入 `three` 及必要型別。延續黑白介面與圖片原色，不修改其他作品內容。本次僅產出規劃文件；既有未提交的 UI 修改與原始素材保留。
