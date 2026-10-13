# portfolio-work Specification

## Purpose

讓訪客依設計領域探索 WILLLIN 的十一個作品，透過首頁精選輪播、作品列表與詳情頁了解每個專案，並在素材尚未提供時保持資訊真實與瀏覽流程完整。

## Requirements

### Requirement: 完整作品分類與目錄

作品目錄 SHALL 保留 VI、PACKAGE、CONCEPT、WEB、SOCIAL MEDIA 五個英文分類，以及 Notion 提供的十一個作品。各作品 MUST 有穩定唯一的 slug、分類、英文標題、繁體中文標題及內容就緒狀態；英文翻譯 MUST 忠於原文，不增加未提供的成果或客戶資訊。

#### Scenario: 初始作品內容
- **WHEN** 訪客開啟 ALL 作品列表
- **THEN** 依來源分類及分類內順序呈現以下十一項：VI 的日間照顧中心品牌識別、協會品牌識別、房地產主視覺；PACKAGE 的藥膏包裝設計、蔬果紙箱設計；CONCEPT 的互動裝置設計、自行車配件設計；WEB 的大地建設 官網、Office Politics Game；SOCIAL MEDIA 的記憶體社群素材、房地產社群素材
- **THEN** Notion 的空白 CONCEPT 項目不產生額外作品

### Requirement: 作品分類篩選

WORK 頁面 SHALL 提供 ALL 及五個分類的英文控制，選擇後僅顯示該分類作品並標示選取狀態。主標 SHALL 與 ABOUT 姓名同為 28–60px 響應式字級；filter MUST 沒有上方分隔線，主標下方留白 SHALL 為桌面 24px、手機 16px。MUST 不顯示作品數量計算。分類控制 MUST 支援鍵盤操作；無作品時 SHALL 顯示英文空狀態。

#### Scenario: 篩選 WEB
- **WHEN** 訪客選擇 WEB
- **THEN** 僅顯示大地建設 官網與 Office Politics Game，選擇 ALL 後恢復十一個項目

### Requirement: 圖片作品卡片

作品卡片 SHALL 預設只顯示 cover 圖片，並使用 cover 裁切填滿正方形。滑鼠移入或鍵盤聚焦時 SHALL 在圖片左下角覆疊分類與雙語標題，圖片輕微放大至 1.04 倍；觸控裝置 SHALL 直接顯示覆疊文字。沒有封面的作品 SHALL 保留待補狀態，不挪用其他作品影像。主分類為 PACKAGE 的卡片 SHALL 開啟包裝 modal；其他作品 SHALL 連至作品詳情。首頁及 WORK SHALL 使用一致的入口行為。

#### Scenario: 瀏覽作品卡片
- **WHEN** 訪客移入作品卡片或以鍵盤聚焦
- **THEN** 圖片左下角顯示文字，圖片輕微放大，沒有圖片外的文字列

#### Scenario: 開啟包裝卡片
- **WHEN** 訪客在首頁或 WORK 點擊包裝卡片，或以鍵盤啟動入口
- **THEN** 於原頁面開啟該作品 modal，不導航至獨立詳情頁

### Requirement: 首頁作品輪播

首頁 SHALL 提供全寬輪播，僅使用具有真實可用影像的精選作品，圖片可進入作品詳情，不顯示圖片下方的標題、分類與控制列。多張輪播 SHALL 在圖片兩側提供具英文可及名稱的前後切換箭頭，並以輔助技術可讀文字公告目前作品與位置；不強制自動播放。單張輪播 MUST 不顯示無作用的切換控制；沒有可用影像時 SHALL 顯示明確待補狀態。

#### Scenario: 切換精選影像
- **WHEN** 至少有兩張可用精選影像且訪客選擇 Next 或 Previous
- **THEN** 顯示對應影像，透過輔助技術公告作品名稱與位置，切換不移動鍵盤焦點至不可見元素

#### Scenario: 只有一個具備素材的作品
- **WHEN** 初期僅日間照顧中心作品有完整影像
- **THEN** 首頁可只顯示該作品的一張精選封面，不挪用其影像冒充其他作品

### Requirement: 可分享的作品詳情

非 PACKAGE 作品 SHALL 有可直接開啟的詳情 URL，以第一張作品照片為主圖，其下呈現雙語標題、分類及已提供的作品資訊。分類 SHALL 與中文標題同排靠右，使用 0.5px 白色外框膠囊標籤。下方圖集 SHALL 從第二張開始並支援指定照片同排；手機 SHALL 改為上下排列。MUST 提供返回 WORK 連結，未提供的日期、角色、成果、外部網址 MUST 不虛構。PACKAGE 作品 SHALL 使用可分享的 WORK modal URL；首頁精選若包含 PACKAGE，啟動該作品 SHALL 開啟相同 modal。

#### Scenario: 開啟日間照顧作品
- **WHEN** 訪客開啟日間照顧中心品牌識別詳情
- **THEN** 預覽顯示對應六張已提供影像，順序為 quyi-1 至 quyi-6，影像有對應的文字替代內容
- **THEN** quyi-1 為主圖且不在下方圖集重複，quyi-5 與 quyi-6 於桌面同排各佔一半寬度，手機上下排列
- **THEN** 返回 WORK 可重新瀏覽全部作品

#### Scenario: 分享包裝作品
- **WHEN** 訪客直接開啟 `/work?package=ointment-packaging`
- **THEN** 顯示 WORK 並自動開啟藥膏外盒 modal，無獨立作品詳情頁

### Requirement: 待補內容狀態與發布檢核

缺少素材的作品 SHALL 在開發預覽中保留雙語標題與分類，並顯示英文 Content coming soon 狀態；MUST 不顯示破圖、捏造文案或不相關影像。正式發布檢核 MUST 列出缺少的雙語內容、Cloudinary 設定及圖片對應，未補齊前不得宣告完整內容交付。PACKAGE SHALL 以正數有限尺寸、完整六面貼圖與實際可用素材檢核替代一般圖集必填條件，接受本地靜態貼圖；仍 SHALL 檢核封面、雙語名稱、敘述及就緒狀態。其他作品的發布要求 SHALL 保留。

#### Scenario: 開啟尚未提供素材的作品
- **WHEN** 訪客於開發預覽中開啟協會品牌識別作品，而該作品尚無影像或敘述
- **THEN** 保留雙語標題、分類與返回控制，顯示明確待補狀態而非套用日間照顧中心圖片

#### Scenario: 發布前內容不足
- **WHEN** 執行正式發布檢核且存在缺少英文文案或圖片對應的作品
- **THEN** 檢核回報具體 slug 與缺漏欄位，不能回報全部內容已就緒

#### Scenario: 包裝貼圖檢核
- **WHEN** 包裝作品尺寸非正數、任一盒面無貼圖設定或本地素材不存在
- **THEN** 發布檢核指出作品 slug、缺漏尺寸或盒面，不因有一般 gallery 而放行

#### Scenario: 合法的本地包裝素材
- **WHEN** 包裝作品具備封面、雙語名稱與敘述、就緒狀態、有效尺寸及六面本地貼圖
- **THEN** 不因缺少一般 gallery 或這些本地貼圖未設定 Cloudinary 對應而拒絕該包裝作品
