import ProjectsListClient from "@/components/ProjectsListClient";
import { getProjectsPage, getProjectStacks } from "@/lib/content";

export const revalidate = 300;

export const metadata = {
  title: "Projects | Nuruzaman Milon",
  description:
    "Production projects by Nuruzaman Milon — real users, real problems, real constraints.",
};

export default async function ProjectsPage() {
  // First page only — the client fetches the rest from /api/projects/list on
  // scroll. limit matches PROJECTS_PER_PAGE in ProjectsListClient.
  const [page, stacks] = await Promise.all([
    getProjectsPage({ limit: 6 }),
    getProjectStacks(),
  ]);
  return (
    <ProjectsListClient
      initialProjects={page.projects}
      initialTotal={page.total}
      initialHasMore={page.hasMore}
      stacks={stacks}
    />
  );
}
