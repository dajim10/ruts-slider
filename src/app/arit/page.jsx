// pages/posts/[id].jsx
"use client"
import { useRouter } from 'next/router';

export default function PostPage() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div>
      <h1>Post ID: {slug}</h1>
      {/* Render your post content here */}
    </div>
  );
}
