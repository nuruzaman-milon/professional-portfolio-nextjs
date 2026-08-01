import BlogListClient from "@/components/BlogListClient";
import { getAllPosts } from "@/lib/content";

export const revalidate = 300;

export const metadata = {
  title: "Blog | Nuruzaman Milon",
  description:
    "Insights, tutorials, and thoughts on modern web development by Nuruzaman Milon.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  return <BlogListClient posts={posts} />;
}
