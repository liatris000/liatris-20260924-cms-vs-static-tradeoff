const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { marked } = require("marked");

const POSTS_DIR = path.join(process.cwd(), "content/posts");

function getAllPosts() {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
  return files
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf-8");
      const { data, content } = matter(raw);
      return {
        slug,
        title: data.title,
        date: data.date,
        html: marked.parse(content),
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

module.exports = { getAllPosts };
