# Spec Delta

## Purpose

提供 WILLLIN 作品集一致的導覽與頁面結構，讓桌面與手機訪客能直接找到作品、個人背景及聯絡資訊，並在英文為主的介面中同時閱讀中英文內容。

## ADDED Requirements

### Requirement: 英文導覽與同頁雙語

網站 SHALL 以英文作為導覽、按鈕、分類與狀態文字的主要語言。作品卡片與詳情標題、已提供的作品敘述、ABOUT 介紹 SHALL 同頁呈現英文與繁體中文；學歷及經歷 SHALL 僅顯示繁體中文內容並保留英文區塊標題，不需要切換語言；中文片段 MUST 標示適當的語言屬性。

#### Scenario: 瀏覽導覽與內容
- **WHEN** 訪客開啟首頁或 ABOUT
- **THEN** 導覽包含 WORK 與 ABOUT，沒有 ARTICLE 或語言切換器
- **THEN** 雙語內容同時存在，英文在視覺順序與層級上優先，中文仍清楚可讀

### Requirement: 可直接存取的頁面

網站 SHALL 提供首頁 `/`、作品列表 `/work`、作品詳情 `/work/{slug}` 與 ABOUT `/about`，各頁 SHALL 支援直接開啟與重新整理，並提供有意義的頁面標題及描述。不存在的路徑 MUST 顯示可返回作品列表的 404 狀態。

#### Scenario: 導覽與直接開啟
- **WHEN** 訪客透過導覽選擇 WORK 或 ABOUT，或直接輸入其 URL
- **THEN** 對應內容正常顯示，導覽可辨識當前頁面，頁面有主要標題

#### Scenario: 不存在的作品
- **WHEN** 訪客開啟未定義的作品 slug
- **THEN** 顯示 404 與英文返回 WORK 的連結，不顯示其他作品冒充該頁

### Requirement: 首頁結構與品牌外觀

首頁 SHALL 依序包含左上品牌 LOGO 與導覽、全寬作品輪播、作品網格與頁尾。網站介面 SHALL 使用純黑背景、純白文字；分隔線 SHALL 依區塊使用 1px 或 0.5px 白線，navbar MUST 沒有底線。navbar SHALL 固定於視窗頂部，桌面高度 72px、手機 60px。首頁 WORK 與 Explore work SHALL 同為 13px，連結使用指定外向箭頭。作品影像 MUST 保留原始色彩。

#### Scenario: 桌面首頁
- **WHEN** 訪客以 1440px 寬度瀏覽首頁
- **THEN** 作品網格呈三欄、輪播圖片填滿視窗寬度，其餘內容有一致的最大寬度與留白，最大寬度邊界沒有垂直框線
- **THEN** 頁首主要 LOGO 使用可互動字形，favicon.svg 僅用於瀏覽器 favicon
- **THEN** 畫面結構遵循 wireframe.pdf，黑白介面遵循 VI.pdf

#### Scenario: 手機首頁
- **WHEN** 訪客以 375px 寬度瀏覽首頁
- **THEN** 作品網格呈單欄，圖片、雙語文字與導覽不造成水平溢出
- **THEN** 正文不直接套用 VI 稿的 9px 範例尺寸而導致難以閱讀

### Requirement: 手機選單可操作性

手機導覽 SHALL 提供具有英文可及名稱的動態圖示控制，不顯示 MENU 文字或額外 Close 按鈕。點擊展開後圖示 SHALL 變成關閉狀態，收起後回復；ABOUT／WORK SHALL 從右側移入。開啟時 MUST 公告展開狀態並將焦點移入選單；Escape、再次點擊控制或選擇目的頁 SHALL 關閉選單；Escape 及關閉控制 SHALL 將焦點還給控制。

#### Scenario: 鍵盤選單操作
- **WHEN** 訪客用鍵盤開啟手機選單並按 Escape
- **THEN** 選單關閉，焦點回到 Menu，沒有留在隱藏內容

### Requirement: 共用聯絡頁尾

每個正常內容頁 SHALL 提供緊密排列的共用頁尾：左側為 120px 互動 LOGO、`linliwei54@gmail.com` 與 `0981630690`，右側為 copyright。頁尾 MUST 不顯示 CONTACT、聯絡標語或靜態 WILLLIN 名稱；聯絡連結 MUST 不帶右上斜箭頭。email 與電話 MUST 分別使用 `mailto:linliwei54@gmail.com` 與 `tel:+886981630690`。使用免費選單圖示 SHALL 保留來源署名。

#### Scenario: 使用聯絡連結
- **WHEN** 訪客在首頁、WORK、作品詳情或 ABOUT 選擇 email 或電話
- **THEN** 連結交給裝置的郵件或撥號處理器，地址與號碼和 Notion 一致
