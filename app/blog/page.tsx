import BlogListClient from "@/components/BlogListClient";
import { getPostsPage, getPostFilterOptions } from "@/lib/content";

export const revalidate = 300;

export const metadata = {
  title: "Blog | Nuruzaman Milon",
  description:
    "Insights, tutorials, and thoughts on modern web development by Nuruzaman Milon.",
};

export default async function BlogPage() {
  // First page only — the client fetches the rest from /api/blog on scroll.
  // limit matches POSTS_PER_PAGE in BlogListClient.
  const [page, filters] = await Promise.all([
    getPostsPage({ limit: 6 }),
    getPostFilterOptions(),
  ]);
  return (
    <BlogListClient
      initialPosts={page.posts}
      initialTotal={page.total}
      initialHasMore={page.hasMore}
      categories={filters.categories}
      allTags={filters.tags}
    />
  );
}
