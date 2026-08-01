import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import {
  getFeaturedProjects,
  getLatestPosts,
  getAllExperiences,
} from "@/lib/content";

export const revalidate = 300;

export default async function Home() {
  const [projects, posts, experiences] = await Promise.all([
    getFeaturedProjects(3),
    getLatestPosts(3),
    getAllExperiences(),
  ]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-100 dark:from-black dark:via-slate-950 dark:to-black">
      <Hero />
      <About experiences={experiences} />
      <Skills />
      <Projects projects={projects} />
      <Blog posts={posts} />
      <Contact />
    </main>
  );
}
