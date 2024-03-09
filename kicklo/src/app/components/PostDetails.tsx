"use client";

import { fetchPostByUri } from "../../../utils/wordpress";
import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";

interface Post {
  title: string;
  content: string;
  uri: string;
  featuredImage: any;
}

export default function PostDetails({ uri }: { uri: string }) {
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const fetchedPost = await fetchPostByUri(uri);
        setPost(fetchedPost);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [uri]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
      {post.featuredImage && (
        <Image src={post.featuredImage.node.sourceUrl} alt={post.title} />
      )}
    </div>
  );
}
