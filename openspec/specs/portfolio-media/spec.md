# portfolio-media Specification

## Purpose

透過 Cloudinary 傳遞作品影像並提供符合裝置尺寸的圖片，兼顧作品品質、頁面載入與版面穩定；當設定缺漏或影像失敗時，也讓訪客保持可讀的內容與可操作的導覽。

## Requirements

### Requirement: Cloudinary 作品影像傳遞

正式就緒的作品影像 SHALL 使用 Cloudinary HTTPS 傳遞 URL，依設定的 cloud name 與該作品 public ID 取得，並提供自動品質與格式最佳化。品牌 SVG 及字型 SHALL 可由本地提供。網站前端及公開產物 MUST 不包含 Cloudinary API secret 或上傳憑證。

#### Scenario: 存取作品影像
- **WHEN** 已設定 Cloudinary cloud name 與作品 public ID，訪客開啟作品列表或詳情
- **THEN** 作品影像從指定 Cloudinary 環境取得，URL 有最佳化參數，沒有上傳秘密資訊

### Requirement: 響應式尺寸與版面穩定

作品影像 SHALL 提供適合不同版面寬度的候選尺寸與尺寸提示，保留寬高比及文字替代內容。第一張首頁主視覺 MUST 優先載入，螢幕外圖庫影像 SHALL 延遲載入；圖片載入前後 MUST 保留顯示區域以避免明顯版面位移。

#### Scenario: 手機載入圖庫
- **WHEN** 訪客以 375px 寬度開啟作品詳情
- **THEN** 瀏覽器可選取適合該版面的圖片候選，螢幕外影像延遲載入，不必將所有原始 3840px 圖片作為唯一選項
- **THEN** 圖片出現前後，標題與相鄰文字位置維持穩定

### Requirement: 設定缺漏與影像失敗

缺少 Cloudinary cloud name 或圖片 public ID 時，網站 MUST 不生成含 undefined 或空 ID 的遠端 URL；允許本地預覽時 SHALL 使用已提供的對應影像，不顯示 Local preview 按鈕或標籤；沒有可用影像時 SHALL 顯示英文待補狀態。遠端影像失敗時 MUST 提供替代狀態並保留標題、替代文字與導覽，且不無限重試。

#### Scenario: 尚未接入 Cloudinary
- **WHEN** 開發者未設定 cloud name
- **THEN** 允許本地預覽時顯示對應 quyi 圖片，介面不顯示 Local preview，正式發布檢核不得將本地模式視為 Cloudinary 接入完成

#### Scenario: 遠端圖片無法載入
- **WHEN** Cloudinary URL 回傳失敗或瀏覽器無法取得影像
- **THEN** 顯示英文 Image unavailable 狀態與保留的圖片區域，訪客仍可閱讀內容及返回 WORK，載入遮罩不持續阻擋頁面

### Requirement: 素材對應可核對

作品媒體設定 SHALL 保留原始素材與 Cloudinary public ID 的可核對對應，以及排序、尺寸、替代文字與裁切方式。來源圖庫 MUST 保留完整畫面，僅封面及首頁主視覺可採版面裁切；正式發布檢核 SHALL 驗證六張 quyi 影像皆有對應。

#### Scenario: 日間照顧作品圖庫
- **WHEN** 開啟已完成 Cloudinary 接入的日間照顧作品
- **THEN** 圖庫按 quyi-1 至 quyi-6 的順序呈現對應影像，包含不同寬高比的 quyi-4，沒有將圖庫統一裁成正方形
