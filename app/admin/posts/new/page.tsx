"use client";

import PostForm from "@/components/admin/PostForm";

export default function NewPostPage() {
  return (
    <div>
      <h1 className="pf-serif text-3xl md:text-4xl font-normal text-gray-900 dark:text-white mb-8">
        New post
      </h1>
      <PostForm />
    </div>
  );
}
