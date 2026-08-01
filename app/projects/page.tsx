import ProjectsListClient from "@/components/ProjectsListClient";
import { getAllProjects } from "@/lib/content";

export const revalidate = 300;

export const metadata = {
  title: "Projects | Nuruzaman Milon",
  description:
    "Production projects by Nuruzaman Milon — real users, real problems, real constraints.",
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();
  return <ProjectsListClient projects={projects} />;
}
