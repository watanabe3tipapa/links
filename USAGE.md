# USAGE — 統合リンクサイト 利用・カスタマイズガイド

## 公開URL

```
https://watanabe3tipapa.github.io/links/
```

---

## 基本操作

### サイトを開く

各カードの **Visit** または **Open** ボタンから該当サブサイトへ移動します。
どちらも同一 URL ですが、2つの導線を用意しています。

### サイトを検索する

画面上部の検索バーにキーワードを入力すると、リアルタイムでカードが絞り込まれます。
検索対象は以下のフィールドです:

- サイト名（title）
- 説明文（desc）
- カテゴリ（category）

### カテゴリでフィルタする

検索バーの下にあるタグボタンでカテゴリを選択できます。

- **All**: 全サイト表示（デフォルト）
- **SITE**: サブサイト
- **TOOL**: ツール・アプリケーション

タグフィルタと検索バーは併用可能です。
例: タグを「Site」にした状態で検索すると、Site カテゴリ内からさらに絞り込みます。

### 結果件数を確認する

グリッド上部に `"3 / 4"` のような形式で表示されます。
左が絞り込み後の件数、右が全サイト数です。

---

## サイトデータの追加・編集

### ファイル構成

```
data/
└── sites.json      # 全サイトのデータ
```

### エントリの書式

```json
{
  "title": "サイト名（カードの見出し）",
  "url": "https://example.com",
  "desc": "1行の説明文",
  "category": "Site"
}
```

### 新しいサイトを追加する

`data/sites.json` の配列にオブジェクトを追加するだけです。

```json
[
  {
    "title": "main",
    "url": "https://watanabe3ti.com",
    "desc": "メインサイト（Mac OS 9 デスクトップ）",
    "category": "Site"
  },
  {
    "title": "blog",
    "url": "https://blog.watanabe3ti.com",
    "desc": "ブログ",
    "category": "Site"
  }
]
```

- カンマの有無に注意（末尾の要素の後ろには不要）
- ダブルクォートを正しく使う
- 追加後は Git にコミットして push するだけで反映されます

### サイトの並び順を変更する

`data/sites.json` の配列の順番がそのままカードの表示順になります。
要素を移動するだけで変更可能です。

### カテゴリを追加する

`category` の値に新しい名前を入れると、自動的にタグボタンが生成されます。
例:

```json
{
  "title": "my-project",
  "url": "https://example.com",
  "desc": "個人プロジェクト",
  "category": "Project"
}
```

→ タグバーに **ALL** | **SITE** | **PROJECT** と表示されるようになります。

---

## デザインのカスタマイズ

### カラー

`styles.css` の `:root` セクションで変数を変更できます。

```css
:root {
  --black: #111;
  --white: #FFFDF6;
  --yellow: #FFD700;
  --pink: #FF6B9D;
  --cyan: #00E5FF;
  --lime: #39FF14;
  --orange: #FF8C00;
  --muted: #555;
}
```

各カードの背景色は以下のクラスで定義されています（app.js で6色を順に適用）:

```css
.card-color-yellow { background: #FFF3B0; }
.card-color-pink { background: #FFD6E0; }
.card-color-cyan { background: #CCF5FF; }
.card-color-lime { background: #D4FFC8; }
.card-color-orange { background: #FFE0B2; }
.card-color-lavender { background: #E8D6FF; }
```

色を追加したい場合:

1. `styles.css` にクラスを追加
2. `app.js` の `palette` 配列にクラス名を追加

### カードの影の強さ

`box-shadow` の数値を変えると影の大きさが変わります。

```css
.card {
  box-shadow: 6px 6px 0 var(--black);   /* デフォルト */
}
.card:hover {
  box-shadow: 10px 10px 0 var(--black); /* ホバー時 */
}
```

### フォント

`styles.css` の `body` にある `font-family` を変更してください。
Google Fonts の読み込みは `index.html` の `<link>` タグで行っています。

---

## OGP（SNS共有）の設定

`index.html` の `<head>` 内:

```html
<meta property="og:title" content="watanabe3ti — Links">
<meta property="og:description" content="watanabe3ti のサブサイトリンク集">
<meta property="og:type" content="website">
<meta property="og:url" content="https://watanabe3tipapa.github.io/links/">
<meta name="theme-color" content="#FFD700">
```

カスタムドメインに変更した場合は `og:url` を書き換えてください。
必要に応じて `og:image` を追加することもできます:

```html
<meta property="og:image" content="https://watanabe3tipapa.github.io/links/assets/ogp.png">
```

---

## デプロイ・メンテナンス

### 変更を公開する

```bash
git add .
git commit -m "update: add blog site"
git push
```

push 後、数分で GitHub Pages に反映されます。

### ブランチ戦略

現状は `main` ブランチ直 push で運用。規模が大きくなった場合は `develop` ブランチで作業して PR → merge する運用も可能です。

### カスタムドメインを設定する（将来）

1. ドメイン管理画面で `links.watanabe3ti.com` の CNAME レコードを追加
   - ターゲット: `watanabe3tipapa.github.io`
2. リポジトリの Settings → Pages → Custom domain に `links.watanabe3ti.com` を入力
3. `index.html` の `og:url` を `https://links.watanabe3ti.com` に更新
4. commit & push

---

## カードの色パレットが足りない場合

現在6色が定義されています。7つ目のサイトが追加されると 1色目（黄色）に戻ります。
新しい色が必要な場合:

**styles.css** に追加:
```css
.card-color-coral { background: #FFC0B0; }
```

**app.js** の `palette` 配列に追加:
```js
const palette = [
  'card-color-yellow',
  'card-color-pink',
  'card-color-cyan',
  'card-color-lime',
  'card-color-orange',
  'card-color-lavender',
  'card-color-coral',   // ← 追加
];
```

---

## トラブルシューティング

### サイトが表示されない

1. ブラウザの開発者ツール (F12) → Console タブを開く
2. `fetch` エラーがないか確認
3. `data/sites.json` が正しい JSON 形式か確認（[JSONLint](https://jsonlint.com/) などで検証）

### GitHub Pages が更新されない

- push 後、数分待つ
- GitHub リポジトリの Actions タブでビルド状況を確認
- キャッシュが原因の場合: Settings → Pages → 一番下の "Clear cache" を試す

### カスタムドメインが反映されない

- CNAME レコードの設定後、DNS の伝搬に最大48時間かかることがあります
- GitHub の Settings → Pages → Custom domain に正しいドメインを入力し **Save**
- HTTPS のプロビジョニングには追加で数分〜数十分かかります

---

## ファイル一覧

```
links/
├── index.html          # メインページ
├── styles.css          # Neo Brutalism デザイン
├── app.js              # JavaScript ロジック
├── data/
│   └── sites.json      # サイト一覧データ
├── .nojekyll           # GitHub Pages 設定
├── .gitignore          # Git 除外設定
├── DEV-MEMO.md         # 開発メモ
└── USAGE.md            # このファイル
```
