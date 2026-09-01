// CONTENT_SOURCE=local (デフォルト) | cms でビルド時のコンテンツ取得元を切り替える。
// パターンC(Markdown直読み)とパターンB(ヘッドレスCMS API)の差分が
// このファイル1枚に閉じるように設計している。
const source = process.env.CONTENT_SOURCE === "cms" ? "cms" : "local";

function getAllPosts() {
  if (source === "cms") {
    return require("./get-posts-cms").getAllPosts();
  }
  return require("./get-posts-local").getAllPosts();
}

module.exports = { getAllPosts, source };
