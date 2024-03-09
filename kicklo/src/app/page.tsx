import Link from "next/link";
import { Image } from "react-bootstrap";
import { Suspense } from "react";

async function getPosts() {
  const query = `
  {
    posts(first: 5) {
      nodes {
        title
        content
        uri
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
  
  `;

  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_WORDPRESS_API_ENDPOINT
    }?query=${encodeURIComponent(query)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // ... any other headers you need to include (like authentication tokens)
      },
      cache: "no-store",
    }
  );

  const { data } = await res.json();

  return data.posts.nodes;
}

export default async function PostList() {
  const posts = await getPosts();

  return (
    <div>
      {posts.map((post: any) => (
        <div key={post.uri} className="card">
          <Link href={`/post/${post.uri}`}>
            <h3>{post.title}</h3>
            <div
              dangerouslySetInnerHTML={{
                __html: post.content.slice(0, 200) + "...",
              }}
            />
            {post.featuredImage && (
              <Image src={post.featuredImage.node.sourceUrl} alt={post.title} />
            )}
          </Link>
        </div>
      ))}
    </div>
  );
}
