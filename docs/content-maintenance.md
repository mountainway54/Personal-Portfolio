# 內容與媒體維護

## 資料來源

本次依 Notion 架構及使用者後續確認的調整實作。介面以英文為主，作品與個人介紹同頁中英文呈現；學歷與經歷內容只顯示中文，區塊標題保持英文。`app/data/projects.ts` 管理作品、`profile.ts` 管理個人資料，`media.ts` 記錄公開 Cloudinary public ID。英文公司譯名 Fanyi、Riran 及 Dadi 為描述性翻譯，待提供官方名稱後可直接替換。

## 作品

每個作品設定唯一 slug、五分類之一、`title: { en, zhTw }`、order、status 與有序 gallery。封面引用該作品自己的 Media。新增素材填入雙語 alt、原始寬高與來源檔案；未提供的日期、角色及外部網址不填。`description` 必須依真實文案翻譯；沒有文案就保留空值，頁面會標示內容待補。

目前 quyi 六張為真實可預覽圖片，所有十一件作品敘述待提供，其餘十件作品影像也待提供。`status: 'ready'` 只能在文案與媒體均核對後設定，不能只因頁面可以開啟而標記就緒。

詳情頁將 `gallery[0]` 作為主圖，其下顯示作品資訊，其他圖片再依 `galleryRows` 排列。以圖片 ID 分組，同一組在桌面同排平均分配寬度；手機改為單欄。未列入分組的其他圖片會接在最後，主圖不在下方重複。目前設定如下：

```ts
galleryRows: [['quyi-2'], ['quyi-3'], ['quyi-4'], ['quyi-5', 'quyi-6']]
```

技能文案在 `profile.ts` 的 `skills.zhTw`，使用「、」分隔，每項會呈現為獨立膠囊標籤。

```sh
npm test
npm run check:content
npm run check:release
```

預覽檢核允許明示待補資料，仍驗證標題雙語、唯一 slug、分類、來源與 quyi 圖片順序；發布檢核額外要求內容就緒、雙語敘述與 Cloudinary 對應。失敗會輸出具體作品與缺漏欄位，返回非零狀態。

## Cloudinary

將 `.env.example` 複製成 `.env`，填入 `NUXT_PUBLIC_CLOUDINARY_CLOUD_NAME`。在 `app/data/media.ts` 填入各圖片實際 public ID，可另填數字 version（不含 v）。不要放 API secret 或上傳金鑰；此網站只提供圖片傳遞，不提供上傳後台。

| 本地来源 | public ID 設定鍵 |
| --- | --- |
| work/quyi/quyi-1.webp | quyi-1 |
| work/quyi/quyi-2.webp | quyi-2 |
| work/quyi/quyi-3.webp | quyi-3 |
| work/quyi/quyi-4.webp | quyi-4 |
| work/quyi/quyi-5.webp | quyi-5 |
| work/quyi/quyi-6.webp | quyi-6 |

cloud name／public ID 未填時，只在允許預覽的模式使用已提供的本地圖片，圖片上不顯示 Local preview 標籤。設定 `NUXT_PUBLIC_MEDIA_PREVIEW=false` 可關閉本地預覽；不要在發布環境開啟預覽替代正式 Cloudinary 接入。靜態網站修改設定後需重新 `npm run generate`，再部署產物。

圖片由共用工具提供 `f_auto,q_auto` 與 480／768／1024／1440／1920 的 srcset。詳情圖庫使用 c_limit 保留完整畫面，封面與 hero 可用 c_fill。遠端失敗呈現 Image unavailable，不無限重試。

## 路由與字型

首頁 `/`、分類作品頁 `/work`、詳情 `/work/{slug}` 與 `/about` 共用導覽／頁尾。未知 slug 返回 404。新增完整作品內容只需修改共用資料；動態詳情會在靜態生成時依作品清單预渲染。靜態主機需支援目錄 index.html 與 404.html。

品牌 SVG 與 Syncopate、Sora、源石黑體由 public/ 提供，來源素材與授權保留。沒有語言切換路由、ARTICLE、CMS 或前端上傳。
