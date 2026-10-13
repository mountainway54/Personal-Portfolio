# Spec Delta

## MODIFIED Requirements

### Requirement: 可直接存取的頁面

網站 SHALL 提供首頁 `/`、作品列表 `/work`、非 PACKAGE 作品詳情 `/work/{slug}` 與 ABOUT `/about`，各頁 SHALL 支援直接開啟與重新整理，並提供有意義的頁面標題及描述。PACKAGE SHALL 透過 `/work?package={slug}` 直接開啟 WORK modal；舊 PACKAGE 詳情路徑 SHALL 導向此 URL。不存在的路徑 MUST 顯示可返回作品列表的 404 狀態。未定義或非 PACKAGE 的 package 查詢 SHALL 顯示正常 WORK、不開啟 modal。

#### Scenario: 導覽與直接開啟
- **WHEN** 訪客透過導覽選擇 WORK 或 ABOUT，或直接輸入其 URL
- **THEN** 對應內容正常顯示，導覽可辨識當前頁面，頁面有主要標題

#### Scenario: 不存在的作品
- **WHEN** 訪客開啟未定義的作品 slug
- **THEN** 顯示 404 與英文返回 WORK 的連結，不顯示其他作品冒充該頁

#### Scenario: 舊包裝路徑與重新整理
- **WHEN** 訪客直接開啟 `/work/ointment-packaging` 或 `/work/produce-carton`
- **THEN** 導向 `/work?package={對應 slug}` 並顯示該包裝 modal，重新整理後仍開啟正確作品
- **THEN** 關閉 modal 後停留 WORK 並移除 package 查詢

#### Scenario: 未知查詢
- **WHEN** 訪客開啟 `/work?package=unknown` 或以非 PACKAGE slug 作為 package 查詢
- **THEN** 顯示 WORK，不開啟其他作品或失效 dialog

## ADDED Requirements

### Requirement: 包裝 Modal 的瀏覽歷史

從首頁或 WORK 開啟包裝 SHALL 保留原頁及既有查詢並新增 package 查詢的歷史狀態。瀏覽器返回 SHALL 關閉 modal，向前 SHALL 重開正確作品；以 Close 或 Escape 關閉 SHALL 回到原頁狀態。直接分享入口無本次開啟歷史時，關閉 SHALL 僅移除 package 查詢，不將訪客送往外部來源。

#### Scenario: 原頁開關與歷史導航
- **WHEN** 訪客從首頁開啟包裝，再按瀏覽器返回及向前
- **THEN** 返回時在首頁關閉 modal，向前時在首頁重開同一包裝

#### Scenario: 直接分享入口關閉
- **WHEN** 訪客直接開啟分享 URL 後選擇 Close
- **THEN** 留在 WORK 並移除 package 查詢，其他既有查詢保留
