"use client";

import { useParams } from "next/navigation";
import PostDetails from "@/app/components/PostDetails";

const PostPage = () => {
  const { uri } = useParams();

  if (!uri) {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <div>
      <h1>Postdetails</h1>
      <PostDetails uri={uri as string} />
    </div>
  );
};

export default PostPage;
