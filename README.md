# cms-vs-static-tradeoff

小規模サイトで「CMS は本当に要るか」を検証するための最小サンプル。

記事: https://zenn.dev/liatris/articles/20260924-cms-vs-static-tradeoff

同一の Next.js static export プロジェクトに、コンテンツ取得元だけが違う実装を 2 通り用意している。`CONTENT_SOURCE` 環境変数で切り替える。

| モード | コマンド | コンテンツソース |
|---|---|---|
| パターンC(CMSなし) | `npm run build:local` | `content/posts/*.md` (Markdown + frontmatter) |
| パターンB(ヘッドレスCMS) | `npm run build:cms` | `data/cms-response.sample.json` |

## 前提

- Node.js(22.22.2 と 24.22.1 で確認)
- 依存は `package-lock.json` のとおり(Next.js 14.2.35)
- CMS のアカウントや API キーは不要

## 動かし方

```bash
git clone https://github.com/liatris000/liatris-20260924-cms-vs-static-tradeoff.git
cd liatris-20260924-cms-vs-static-tradeoff
npm ci
npm run build:local   # または npm run build:cms
npx serve out
```

## 期待される出力

どちらのモードでも、`out/` に次の 4 ファイルができる。

```text
out/404.html
out/index.html
out/posts/company-profile.html
out/posts/news-20260901.html
```

ビルドのログの最後には、次の 2 行が出る。

```text
○  (Static)  prerendered as static content
●  (SSG)     prerendered as static HTML (uses getStaticProps)
```

## 計測結果

| モード | ビルド時間 | 生成ページ数 |
|---|---|---|
| local | 18.7秒 | 3 (index + posts 2件) |
| cms | 16.8秒 | 3 (index + posts 2件) |

計測環境: Node.js 22.22.2 / Next.js 14.2.35。ローカルファイル読み込みのオーバーヘッド差は、ビルド全体の所要時間に対して誤差の範囲。ビルド時間は環境で大きく変わる(Node.js 24.22.1 の別の環境では local が約 11 秒だった)。

## 確かめていない範囲

- パターンB は、実際のヘッドレス CMS には繋いでいない。`lib/get-posts-cms.js` は本来ヘッドレス CMS の REST API を `fetch` する想定の実装で、実際の API と同じレスポンス形(`contents` / `totalCount` / `offset` / `limit`)のローカル fixture(`data/cms-response.sample.json`)を代わりに読んでいる。`fetch` 呼び出しに差し替えれば実 API に繋ぎ替えられる
- 記事の結論である「更新の流れ」の比較(手順の数)は、実際の運用で測ったものではない

## 記事

https://zenn.dev/liatris/articles/20260924-cms-vs-static-tradeoff

## ライセンス

MIT
