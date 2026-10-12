# portfolio-motion Specification

## Purpose

透過品牌 LOGO 互動與圖片短距離進場延續既有 WILLLIN 視覺語言，讓滑鼠、觸控及鍵盤訪客都能體驗一致的操作，並在減少動態效果或載入失敗時維持內容可用。

## Requirements

### Requirement: 導覽互動 LOGO

左上 LOGO SHALL 使用白色互動字形及 120px 等比寬度，並提供返回首頁操作。桌面移入字形 SHALL 伸展，移出後回復；點擊或鍵盤 Enter SHALL 返回首頁。手機點擊 SHALL 由左至右依序展開，完成首頁跳轉後收回。LOGO MUST 不顯示點擊後字母外框，也不遮擋導覽。

#### Scenario: 滑鼠互動
- **WHEN** 訪客移入可互動字形後移出 LOGO
- **THEN** 字形或間距依原型伸展後回復，導覽仍可操作

#### Scenario: 返回首頁
- **WHEN** 訪客在桌面點擊 navbar LOGO 或以鍵盤 Enter 啟動連結
- **THEN** 返回首頁，字母不顯示焦點外框，滑鼠伸縮效果仍可使用
- **WHEN** 訪客在手機點擊 navbar LOGO
- **THEN** LOGO 依序展開、跳轉首頁後收回，動畫期間不重複啟動跳轉

### Requirement: 載入 LOGO 可結束

首次進入網站 SHALL 顯示既有 LoadingLogo 的展開與回復效果，完成主要畫面就緒後退出。載入層 MUST 有英文狀態說明，MUST 不等待所有螢幕外圖片；圖片失敗、JavaScript 停用或動態效果停用時 MUST 不永久遮擋內容。一般模式的載入層 SHALL 最遲於 5 秒內解除。

#### Scenario: 首頁完成載入
- **WHEN** 首頁主要內容與第一張影像已完成載入或影像回報失敗
- **THEN** LOGO 完成回復並解除載入層，WORK／ABOUT 與內容可以操作

#### Scenario: 慢速或停用 JavaScript
- **WHEN** 第一張遠端影像持續未回應或 JavaScript 被停用
- **THEN** 慢速情境不超過 5 秒持續遮擋；停用 JavaScript 時仍可看到伺服器輸出的內容及導覽

### Requirement: 圖片短距離淡入進場

一般動態模式下，作品卡片及作品內頁圖片 SHALL 在影像載入完成且首次進入可視區域時，由下方 48px 移入並淡入，持續約 0.7 秒。首頁輪播 SHALL 由左側 48px 移入並淡入，切換圖片時重新播放。首次載入遮罩存在時 MUST 等待遮罩結束再進場；已進場的卡片及圖庫 MUST 不因反覆滾動重播；停用 JavaScript 時 MUST 保持影像可見。

#### Scenario: 向下瀏覽作品
- **WHEN** 訪客首次向下滾動至作品卡片或圖庫圖片
- **THEN** 圖片由下方 48px 淡入至原位，沒有滾動鎖定
- **THEN** 滾回相同圖片時不重新隱藏或重播進場

#### Scenario: 輪播載入與切換
- **WHEN** 首頁輪播影像載入完成，或訪客手動切換至另一張圖片
- **THEN** 對應圖片由左向右移入並淡入，載入遮罩不遮蔽進場效果

### Requirement: 減少動態效果

網站 SHALL 尊重 prefers-reduced-motion，停用字形伸展、載入伸縮與圖片位移；內容及輪播手動操作 MUST 維持可用。訪客於頁面開啟期間改變偏好時 SHALL 即時停止相關動畫並回到可見、可操作狀態。

#### Scenario: 開啟減少動態效果
- **WHEN** 訪客裝置在進站前或進站後啟用減少動態效果
- **THEN** LOGO 回到靜態字形、圖片直接顯示、載入層可立即結束，導覽與輪播仍正常

### Requirement: 導覽後動畫一致性

在頁面離開或重新進入時，網站 SHALL 清除舊頁面的動畫及滾動監聽，避免殘留效果影響新頁面。返回作品列表 MUST 不產生重複進場、空白影像或失效 LOGO。

#### Scenario: 反覆切換頁面
- **WHEN** 訪客依序瀏覽 WORK、作品詳情、ABOUT 並返回 WORK
- **THEN** 各頁動態及 LOGO 正常運作，沒有重複監聽造成的抖動或已離開頁面持續執行的動畫
