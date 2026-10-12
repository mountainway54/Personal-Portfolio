# 依賴安全查核

查核日期：2026-10-07。

## 已處理

Nuxt 由 `4.5.0` 更新至 `4.5.1`，修正 audit 所列框架直接漏洞，包括 server island 資源耗盡、元件與模板注入、路由權限繞過、SSR 資料快取洩漏，以及開發環境資訊洩漏。更新後的 audit 已不再列出 Nuxt 自身的 advisory，但仍因間接依賴標記 Nuxt。

官方修補公告範例：https://github.com/advisories/GHSA-hxcr-hm88-mpq6

## 剩餘警示

更新後 `npm audit` 回報 15 個受影響套件（9 high、6 critical）。套件的相依關係會將同一個底層漏洞向上傳播，因此這不是 15 個獨立漏洞。嚴重度計數亦會隨 npm 的相依關係判定改變，不應只以總數衡量修補效果。

| 底層套件 | 來源與影響 | 處理狀態 |
| --- | --- | --- |
| `braces` | OpenSpec 與建置工具透過 fast-glob／micromatch 引用；惡意深層巢狀 glob 可耗盡呼叫堆疊 | 官方公告尚無修補版；目前只處理專案內的可信路徑與模式 |
| `node-forge` | Nuxt CLI／Nitro 透過 listhen 引用；RSA 簽章驗證漏洞 | 官方公告尚無修補版；目前專案沒有自行使用其簽章驗證功能 |
| `simple-git`、`@simple-git/argv-parser` | Nuxt DevTools 引用；不可信 Git 設定／參數可繞過安全檢查並觸發命令執行 | 有跨主要版本的修補版；尚未強制覆寫上游依賴，避免造成 DevTools 相容性問題 |

公告：

- https://github.com/advisories/GHSA-vfj7-8cjw-p6xm
- https://github.com/advisories/GHSA-86w9-cpqp-85rv
- https://github.com/advisories/GHSA-x6jw-m9v5-85vh
- https://github.com/advisories/GHSA-v5rq-49vh-5v5c

本專案正式部署預期僅使用 `npm run generate` 產生的 `.output/public`。上述 Node.js 開發／建置工具不作為正式網站的常駐服務部署；這降低正式網站的直接暴露範圍，但不代表開發機與 CI 沒有風險。不要向外公開開發伺服器，或讓不可信輸入控制工具的 glob 模式、Git 設定及命令參數。

未使用 `npm audit fix --force`。本次報告建議的某些「修正」實際是將 Nuxt 降回 `3.7.4` 或 OpenSpec 降回 `0.17.2`，不適合作為此專案的自動修補方案。後續應追蹤上游相容更新，並在變更依賴後重新執行 audit、型別檢查與靜態生成。
