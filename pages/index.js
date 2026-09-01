import Link from "next/link";
import { getAllPosts, source } from "../lib/get-posts";

export async function getStaticProps() {
  return { props: { posts: getAllPosts(), source } };
}

export default function Home({ posts, source }) {
  return (
    <main style={{ maxWidth: 640, margin: "0 auto", padding: "2rem 1rem" }}>
      <h1>小規模サイト サンプル</h1>
      <p>
        コンテンツ取得元: <code>{source}</code>{" "}
        (<code>CONTENT_SOURCE</code> 環境変数で切り替え)
      </p>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`}>{post.title}</Link>{" "}
            <small>({post.date})</small>
          </li>
        ))}
      </ul>
    </main>
  );
}
