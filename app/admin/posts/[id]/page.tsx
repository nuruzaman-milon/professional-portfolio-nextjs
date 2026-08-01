"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PostForm, { type PostFormData } from "@/components/admin/PostForm";

export default function EditPostPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<PostFormData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/posts/${id}`).then(async (res) => {
      if (res.ok) setPost(await res.json());
      else setError("Post not found.");
    });
  }, [id]);

  return (
    <div>
      <h1 className="pf-serif text-3xl md:text-4xl font-normal text-gray-900 dark:text-white mb-8">
        Edit post
      </h1>
      {error ? (
        <p className="text-sm text-red-500">{error}</p>
      ) : post ? (
        <PostForm initial={post} />
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400">Loading…</p>
      )}
    </div>
  );
}
