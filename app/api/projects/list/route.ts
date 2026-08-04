import { NextResponse } from "next/server";
import { getProjectsPage, type ProjectSort } from "@/lib/content";

// Public paginated project listing for the /projects infinite scroll.
// Unlike GET /api/projects (admin CRUD, requires MongoDB), this goes through
// the content layer so it works with the static fallback too.

const SORTS: ProjectSort[] = ["default", "az", "za", "newest", "oldest"];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const sortParam = searchParams.get("sort") ?? "default";
  const sort = SORTS.includes(sortParam as ProjectSort)
    ? (sortParam as ProjectSort)
    : "default";
  const offset = Math.max(
    0,
    parseInt(searchParams.get("offset") ?? "0", 10) || 0,
  );
  const limit = Math.min(
    Math.max(parseInt(searchParams.get("limit") ?? "6", 10) || 6, 1),
    24,
  );

  const page = await getProjectsPage({
    q: searchParams.get("q") ?? "",
    stack: searchParams.get("stack") ?? "",
    sort,
    offset,
    limit,
  });

  return NextResponse.json(page);
}
