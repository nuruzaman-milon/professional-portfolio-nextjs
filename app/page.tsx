import Hero from "@/components/Hero"
import About from "@/components/About"
import Skills from "@/components/Skills"
import Projects from "@/components/Projects"
import Blog from "@/components/Blog"
import Contact from "@/components/Contact"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-100 dark:from-black dark:via-slate-950 dark:to-black">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Blog />
      <Contact />
    </main>
  )
}
