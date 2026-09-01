import { getAllPosts } from "../../lib/get-posts";

export async function getStaticPaths() {
  const posts = getAllPosts();
  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const posts = getAllPosts();
  const post = posts.find((p) => p.slug === params.slug);
  return { props: { post } };
}

export default function Post({ post }) {
  return (
    <main style={{ maxWidth: 640, margin: "0 auto", padding: "2rem 1rem" }}>
      <h1>{post.title}</h1>
      <p>
        <small>{post.date}</small>
      </p>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </main>
  );
}
