# AGENTS.md - 台灣各縣市歷史介紹網站開發規範

## 1. 專案目的 (Project Purpose)
本專案為「台灣各縣市歷史沿革與文化導覽網站」，旨在以清晰、結構化且具視覺質感的網頁介面，介紹台灣 22 個縣市的歷史發展脈絡（史前與原住民時期、荷西明鄭、清領時期、日治時期至戰後現代）、代表性歷史地標與文化特色。
本網站採用純前端靜態架構（HTML/CSS/JS），確保可直接部署於 GitHub Pages，並透過資料與視圖分離的設計，讓 AI 協作者能快速擴充新縣市內容。

## 2. 整體視覺風格與設計原則 (Design & Aesthetic)
- **視覺基調**：溫潤人文史料風（Warm Heritage & Editorial Style），結合現代響應式卡片排版。
- **色彩規範 (CSS Variables)**：
  - 主背景色 (`--bg-main`): `#F7F5F0`（宣紙米白，降低閱讀疲勞）
  - 卡片背景色 (`--bg-card`): `#FFFFFF`
  - 主強調色 (`--primary`): `#2C4A3E`（台灣山林墨綠，象徵歷史底蘊）
  - 次強調色 (`--accent`): `#B85D3B`（紅磚瓦色，象徵古蹟與人文）
  - 主要文字色 (`--text-main`): `#2B2B2B`
  - 次要文字色 (`--text-muted`): `#5E5E5E`
- **字體規範**：優先使用系統無襯線字體與思源黑體 (`'Noto Sans TC', sans-serif`)，標題可搭配襯線體 (`'Noto Serif TC', serif`) 增添歷史厚重感。
- **響應式設計 (RWD)**：必須同時支援桌面版（多欄網格）與手機版（單欄堆疊）。

## 3. 檔案結構與命名規則 (File Structure & Naming)
所有檔案必須嚴格遵守以下目錄與小寫英文命名規範（禁止使用中文檔名或空白）：

```text
taiwan-history-atlas/
├── AGENTS.md               # 本專案開發與擴充規範（AI 必讀）
├── index.html              # 網站首頁（總覽、區域篩選、縣市卡片入口）
├── city.html               # 縣市詳細歷史介紹頁（透過 URL 參數 ?id=xxx 動態載入）
├── css/
│   └── style.css           # 全站統一樣式表
└── js/
    ├── cities-data.js      # 所有縣市的歷史資料庫（核心資料檔）
    └── app.js              # 負責渲染首頁卡片、區域篩選與詳細頁內容的邏輯