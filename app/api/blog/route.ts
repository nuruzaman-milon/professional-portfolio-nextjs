import { NextResponse } from "next/server";
import { getPostsPage, type PostSort } from "@/lib/content";

// Public paginated post listing for the /blog infinite scroll.
// Unlike /api/posts (admin CRUD, requires MongoDB), this goes through the
// content layer so it works with the static fallback too.

const SORTS: PostSort[] = ["newest", "oldest", "shortest", "longest"];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const sortParam = searchParams.get("sort") ?? "newest";
  const sort = SORTS.includes(sortParam as PostSort)
    ? (sortParam as PostSort)
    : "newest";
  const offset = Math.max(
    0,
    parseInt(searchParams.get("offset") ?? "0", 10) || 0,
  );
  const limit = Math.min(
    Math.max(parseInt(searchParams.get("limit") ?? "6", 10) || 6, 1),
    24,
  );

  const page = await getPostsPage({
    q: searchParams.get("q") ?? "",
    category: searchParams.get("category") ?? "",
    tag: searchParams.get("tag") ?? "",
    sort,
    offset,
    limit,
  });

  return NextResponse.json(page);
}
