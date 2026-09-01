const fs = require("fs");
const path = require("path");

// 本来は headless CMS の REST API (例: GET /api/v1/posts) を fetch する。
// このリポジトリには CMS アカウントの認証情報がないため、実際の API と
// 同じレスポンス形(contents / totalCount / offset / limit) のローカル
// fixture を代わりに読む。fetch を fixture の読み込みに差し替えるだけで
// 実 API に繋ぎ替えられる作りにしてある。
const FIXTURE_PATH = path.join(process.cwd(), "data/cms-response.sample.json");

function getAllPosts() {
  const raw = fs.readFileSync(FIXTURE_PATH, "utf-8");
  const { contents } = JSON.parse(raw);
  return contents
    .map((item) => ({
      slug: item.id,
      title: item.title,
      date: item.publishedAt.slice(0, 10),
      html: item.body,
    }))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

module.exports = { getAllPosts };
