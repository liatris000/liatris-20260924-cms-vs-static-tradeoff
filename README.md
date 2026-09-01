# cms-vs-static-tradeoff

小規模サイトで「CMSは本当に要るか」を検証するための最小サンプルです。

同一の Next.js static export プロジェクトに、コンテンツ取得元だけが違う実装を
2 通り用意しています。`CONTENT_SOURCE` 環境変数で切り替えます。

| モード | コマンド | コンテンツソース |
|---|---|---|
| パターンC(CMSなし) | `npm run build:local` | `content/posts/*.md` (Markdown + frontmatter) |
| パターンB(ヘッドレスCMS) | `npm run build:cms` | `data/cms-response.sample.json` |

## パターンBについての注記

`lib/get-posts-cms.js` は本来ヘッドレスCMSのREST APIを `fetch` する想定の実装です。
このリポジトリにはCMSアカウントの認証情報がないため、実際のAPIと同じレスポンス形
(`contents` / `totalCount` / `offset` / `limit`)のローカル fixture
(`data/cms-response.sample.json`)を代わりに読んでいます。`fetch` 呼び出しに
差し替えれば実APIに繋ぎ替えられる形にしてあります。

## 実行

```bash
npm install
npm run build:local   # or build:cms
npx serve out
```

## 計測結果

| モード | ビルド時間 | 生成ページ数 |
|---|---|---|
| local | 18.7秒 | 3 (index + posts 2件) |
| cms | 16.8秒 | 3 (index + posts 2件) |

計測環境: Node.js 22.22.2 / Next.js 14.2.35。ローカルファイル読み込みの
オーバーヘッド差はビルド全体の所要時間に対して誤差の範囲。
