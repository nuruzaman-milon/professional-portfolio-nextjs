import Link from "next/link"
import { Github, Linkedin, Mail, Heart } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Alex Johnson</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
              Full Stack Developer passionate about creating innovative web solutions using modern technologies and best
              practices.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Github, href: "#", label: "GitHub" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Mail, href: "#", label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="p-2 rounded-full bg-gray-200 hover:bg-emerald-600 text-gray-600 hover:text-white dark:bg-slate-800 dark:hover:bg-emerald-600 dark:text-gray-400 dark:hover:text-white transition-all duration-300"
                  aria-label={label}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["About", "Skills", "Projects", "Blog", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-600 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Services</h4>
            <ul className="space-y-2">
              {["Web Development", "Full Stack Solutions", "API Development", "Consulting", "Code Review"].map(
                (service) => (
                  <li key={service}>
                    <span className="text-gray-600 dark:text-gray-400">{service}</span>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} Alex Johnson. All rights reserved.
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center mt-4 md:mt-0">
            Made with <Heart className="mx-1 text-red-500" size={16} /> and lots of coffee
          </p>
        </div>
      </div>
    </footer>
  )
}
