# DEV-MEMO — 統合リンクサイト

## プロジェクト概要

watanabe3tipapa の複数サブサイトを一元管理するリンク集。
`watanabe3tipapa/links` リポジトリの GitHub Pages で公開。

- **公開URL**: `https://watanabe3tipapa.github.io/links/`
- **デザイン**: Neo Brutalism
- **ベース**: PLAN.md の GPT テンプレートを改変

---

## 決定事項

| 項目 | 内容 |
|---|---|
| Notion INDEX | 含めない |
| watanabe3ti.com ルート | Mac OS 9 デスクトップ維持（触らない） |
| URL | `watanabe3tipapa.github.io/links/`（後日カスタムドメイン変更可） |
| デザイン | Neo Brutalism |
| ホスティング | GitHub Pages (`watanabe3tipapa/links`) |
| サイトデータ | 外部 JSON (`data/sites.json`) で管理 |

---

## 掲載サイト一覧

| title | url | desc | category |
|---|---|---|---|
| main | https://watanabe3ti.com | メインサイト（Mac OS 9 デスクトップ） | Site |
| next | https://next.watanabe3ti.com | 次世代パブリッシング（Quarto） | Site |
| toolsmith | https://toolsmith.watanabe3ti.com | Toolsmith プロジェクト | Site |
| log | https://log.watanabe3ti.com | ブログ・ログ | Site |
| neo | https://watanabe3ti.com/neo/ | Mac OS 9 デスクトップ（サブパス版） | Site |
| beos | https://watanabe3ti.com/beos/ | BeOS デスクトップ環境 | Site |
| osx | https://watanabe3ti-osx.vercel.app | macOS Web デスクトップ | Site |
| wiki | https://wiki.watanabe3ti.com/wiki3/ | 個人Wiki・備忘録 | Site |
| next-path | https://watanabe3ti.com/next/ | Takeoff to Wonder ランディング | Site |

---

## 作業フェーズ

### Phase 1: ファイル構成・デザイン設計 ✅

- 以下のファイル構成を決定
  ```
  links/
  ├── index.html         # エントリポイント
  ├── styles.css         # Neo Brutalism デザイン
  ├── app.js             # データ＋レンダリング＋検索
  ├── data/
  │   └── sites.json     # サイト一覧（編集しやすいよう外部分離）
  └── .nojekyll          # GitHub Pages 用
  ```

### Phase 2: 実装 ✅

- **Neo Brutalism デザイン**:
  - 太い黒枠（3-4px solid #000）
  - 重い box-shadow（影を強調、オフセット大、hover 時 10px）
  - 高コントラストなパステル背景色（6色のカードパレット）
  - 直角基調
  - 太字タイポグラフィ（weight 800-900）
  - 明るいテーマ基調
  - カード hover 時に translate(-4px, -4px)
- **機能実装済み**:
  - カードグリッド（カードごとに異なる Neo Brutalism カラー）
  - カテゴリタグフィルタ（All / Site）
  - インクリメンタルサーチ（タイトル・説明・カテゴリ対象）
  - 外部リンクは `target="_blank" rel="noopener"`
  - レスポンシブ（モバイル対応ブレークポイント 640px）
  - OGP/SEO 最小限設定（og:title, og:description, og:type, og:url, theme-color）
  - データカウンター表示（"2 / 4" 形式）
  - sites.json から fetch で動的読み込み

### Phase 3: デプロイ ✅

```bash
git init
git add .
git commit -m "Initial commit: unified links site with Neo Brutalism"
git remote add origin https://github.com/watanabe3tipapa/links
git push -u origin main
```

- ✅ リモート `origin` を `https://github.com/watanabe3tipapa/links` に設定
- ✅ `main` ブランチにプッシュ完了
- 公開 URL: `https://watanabe3tipapa.github.io/links/`

**GitHub Pages 有効化（手動操作が必要）**:
1. GitHub リポジトリ https://github.com/watanabe3tipapa/links を開く
2. Settings → Pages
3. Source: `Deploy from branch`
4. Branch: `main`, folder: `/ (root)` → Save
5. 数分待つと公開される

### Phase 3.5: ドキュメント整備 ✅

- `USAGE.md` を作成
  - 基本操作（検索/フィルタ/カテゴリ）
  - サイト追加・編集手順（sites.json の書式）
  - デザインカスタマイズ方法（色・影・フォント）
  - OGP 設定
  - デプロイ・メンテナンス手順
  - トラブルシューティング

### Phase 4: 後日可能な拡張

- カスタムドメイン（links.watanabe3ti.com）の CNAME 設定
- サイト追加（blog, shop, docs が生えたとき → sites.json に追記するだけ）
- ファビコン自動取得
- サイトステータス（稼働/停止）表示
- アクセシビリティ改善（aria 属性の追加）
