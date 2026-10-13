# 包裝 3D 展示

主分類 `PACKAGE` 的作品由首頁／WORK 開啟互動 modal；一般作品仍使用詳情頁。分享使用 `/work?package=ointment-packaging`。資料位於 `app/data/packaging.ts`，`Project.packaging` 為選用欄位；未提供設定時展示待補狀態。

藥膏作品卡片封面使用 `public/work/藥膏/ointment-product-showcase.webp`（1536 × 1024），原檔名為「新喜痔瘡藥膏產品展示.webp」。六面貼圖仍依下表設定。

## 尺寸與六面

單位為 mm，X／Y／Z 分別為 width／height／depth。藥膏初始設定為寬 127、高 35、深 35，保持比例而非螢幕實際毫米大小。

| 面 | 軸 | 藥膏檔名 |
| --- | --- | --- |
| front | +Z | ointment-front.webp |
| back | -Z | ointment-back.webp |
| top | +Y | ointment-top.webp |
| bottom | -Y | ointment-bottom.webp |
| left | -X | ointment-end.webp |
| right | +X | ointment-end.webp |

素材實際位於 `public/work/藥膏`，瀏覽器使用 `/work/藥膏/檔名.webp`；Media 設定 `delivery: 'local'` 讓封面在正式模式仍使用本地檔案。兩端共用是顯式設定；上下／前後為尚無刀模時的展示預設，可直接調換設定。每面的 `rotation` 接受 0、90、180、270 度，以從盒外觀看的文字朝向驗證。模型不裁切圖片、不鏡像文字。

## 操作與檢核

蔬果紙箱分成三個作品：`cucumber-carton`（胡瓜）、`green-pepper-carton`（青椒）、`sweet-pepper-carton`（甜椒）。資料使用 `shape: 'carton'` 與 `dimensionsRatio`，依正面及側面圖片的寬高比建立模型，不宣稱毫米尺寸。各款正反面共用 front 圖，左右面共用 side 圖；胡瓜使用牛皮紙色，另外兩款使用白色紙板。模型包含四面內壁、底板與半開的四片翻蓋；左右側蓋縮短並往內摺，前後蓋向外半開，不貼未提供的上下印刷稿。舊 `/work/produce-carton` 回到 WORK 列表。

滑鼠／單指拖曳旋轉；聚焦模型後也可使用方向鍵旋轉。畫面提示為「拖曳旋轉查看包裝」，不顯示控制列、重設或盒面選單，滾輪及雙指縮放皆停用。Close、Escape、點擊遮罩或瀏覽器返回可關閉。分享入口關閉後留在 WORK。3D 載入失敗時改用可用的靜態圖片；關閉釋放 GPU 資源。

執行 `npm run check:content` 檢查已設定資料與本地檔案；`npm run check:release` 另要求 PACKAGE 有尺寸、六面、封面、雙語內容及 ready 狀態，不要求一般 gallery。藥膏雖有可用 3D 素材，敘述未提供前仍保留 pending。

## 驗收紀錄（2026-10-13）

- `npm test`：11 項通過；包含尺寸、缺面、缺檔、端面共用與發布檢核。
- `npm run typecheck`、`npm run check:content`、`npm run generate` 通過。型別檢查保留既有 vue-router／Volar 外掛警告；建置回報 three.js 懶載入 chunk 大於 500 KB 的提示。
- 瀏覽器驗證：首頁與 WORK 開啟、篩選與焦點還原、Close／Escape、返回／向前、直接分享、既有 query 保留、六面圖片方向、拖曳與方向鍵旋轉、滾輪不縮放、375px 版面無水平溢出。最新介面只有中文操作提示與模型，不含控制列。
- 故障驗證曾暫時使貼圖回傳失敗、使 renderer 建立拋錯、觸發 context lost、延後建立並於 loading 關閉；皆正常降級或清理，測試用故障設定已移除。關閉後 canvas 數量為零。
- 純靜態相容：輸出目錄首頁及 `.html` 兩種轉向檔，並為 WORK 輸出 `work.html`，支援以副檔名解析 extensionless URL 的靜態伺服器；已用瀏覽器確認藥膏舊網址開啟 ready 模型、紙箱舊網址開啟對應待補 modal。
- 正式發布內容仍待補：藥膏為 pending、缺雙語敘述；蔬果紙箱另缺尺寸／六面圖片。其他原有 pending 作品的發布缺漏仍由 release 檢核列出，未以本次功能完成取代全站內容就緒。
