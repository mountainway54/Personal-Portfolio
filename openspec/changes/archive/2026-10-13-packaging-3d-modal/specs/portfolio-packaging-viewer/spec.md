# Spec Delta

## Purpose

讓訪客在作品集原頁面以互動立體模型查看長方體包裝各面的設計與真實尺寸比例，並在桌面、觸控、鍵盤及不支援立體渲染的環境下維持可操作且資訊真實的觀看流程。

## ADDED Requirements

### Requirement: 長方體尺寸與六面圖片

包裝展示 SHALL 依作品設定的正數毫米寬、高、深維持模型比例，顯示尺寸與單位。六面 SHALL 有明確圖片及方向對應；圖片 MUST 保留完整設計、原色與可辨識文字，不任意裁切或鏡像。共用端面圖片 MUST 由作品設定明示。

#### Scenario: 藥膏外盒展示
- **WHEN** 開啟具有完整設定的藥膏外盒
- **THEN** 展示寬 127、高 35、深 35 mm 的橫式盒，四張長面稿分別對應前、後、上、下，一張端面稿明確共用於左、右
- **THEN** 每面圖片朝向依設定呈現，轉至該面時文字不鏡像

### Requirement: 旋轉操作

訪客 SHALL 可使用滑鼠拖曳或單指拖曳旋轉查看全部六面，聚焦模型後 SHALL 可使用方向鍵旋轉。MUST 不顯示整排控制列、縮放按鈕、Reset view 或盒面選單；滾輪及雙指縮放 MUST 停用。模型 MUST 不強制自動旋轉，提示 SHALL 使用繁體中文「拖曳旋轉查看包裝」。

#### Scenario: 桌面及手機觀看
- **WHEN** 訪客拖曳模型
- **THEN** 模型視角依操作變動，模型可從下方查看，頁面背景不隨手勢捲動
- **THEN** 滾輪或雙指縮放不改變模型觀看距離

#### Scenario: 僅使用鍵盤
- **WHEN** 訪客以 Tab 聚焦模型並按方向鍵
- **THEN** 產生與指標操作等效的視角調整，焦點可見且不離開 dialog

### Requirement: Modal 開關與焦點管理

展示 SHALL 使用有名稱的 modal dialog，顯示作品雙語名稱、PACKAGE、尺寸及繁體中文操作提示。開啟時 MUST 移入焦點、限制 Tab 焦點於 dialog、停用背景互動並鎖定背景捲動。Close、Escape 或點擊背景遮罩 SHALL 關閉；模型拖曳結束 MUST 不誤觸遮罩關閉。關閉後 SHALL 恢復背景捲動、原瀏覽位置及有效觸發元素焦點，無觸發元素時聚焦 WORK 主標。

#### Scenario: 從篩選結果開啟並關閉
- **WHEN** 訪客於 WORK 的 PACKAGE 篩選結果開啟藥膏並按 Escape
- **THEN** dialog 關閉，篩選及捲動位置保留，焦點回到該作品入口

### Requirement: 響應式與按需載入

展示 SHALL 在手機及桌面完整置入可用視窗，不造成水平溢出；模型初始視角 SHALL 配合容器尺寸顯示完整盒體。3D 執行與圖片載入 SHALL 僅在需要展示時啟動；關閉後 MUST 停止渲染並釋放此實例資源，重開不同作品 MUST 不顯示上一作品的貼圖。

#### Scenario: 調整視窗並重開
- **WHEN** 訪客調整視窗大小、關閉 dialog 並開啟另一包裝
- **THEN** 新模型比例、圖片與標題均對應新作品且初始視角顯示完整盒體，關閉期間沒有持續 3D 渲染

### Requirement: 待補及渲染失敗狀態

缺少或無效的尺寸、六面圖片設定 SHALL 顯示 Content coming soon，不捏造包裝。載入期間 SHALL 顯示 Loading 3D preview；圖片失敗、渲染不可用或渲染環境中斷 SHALL 顯示 3D preview unavailable，並提供該作品可用的靜態圖片。所有狀態 MUST 保留標題及關閉功能，不能永久停在載入畫面。

#### Scenario: 蔬果紙箱尚未提供素材
- **WHEN** 訪客開啟尚未有尺寸及貼圖的蔬果紙箱
- **THEN** dialog 顯示雙語作品名稱與 Content coming soon，不借用藥膏素材

#### Scenario: 圖片失敗或不支援渲染
- **WHEN** 某張貼圖載入失敗或環境無法執行 3D
- **THEN** 顯示英文不可用狀態及可用靜態圖片，訪客仍可正常關閉 dialog
