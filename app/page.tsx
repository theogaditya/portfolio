import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"
import Link from "next/link"
import ProjectCard from "./components/project-card"
import TechStack from "./components/tech-stack"
import { ThemeToggle } from "@/components/theme-toggle"
import CopyEmailButton from "./components/email"

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <div className="w-full max-w-6xl mx-auto"> {/* New wrapper to center the page */}
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-14 items-center px-4 md:px-6">
            <div className="mr-4 hidden md:flex">
              <Link className="mr-6 flex items-center space-x-2" href="/">
                <span className="hidden font-bold sm:inline-block">Aditya Hota</span>
              </Link>
              <nav className="flex items-center space-x-6 text-sm font-medium">
                <Link href="#about" className="transition-colors hover:text-foreground/80">
                  About
                </Link>
                <Link href="#projects" className="transition-colors hover:text-foreground/80">
                  Projects
                </Link>
                <Link href="#contact" className="transition-colors hover:text-foreground/80">
                  Contact
                </Link>
                <ThemeToggle />
              </nav>
            </div>
            <Button variant="outline" className="ml-auto">
              Resume
            </Button>
          </div>
        </header>

        <main className="px-4 md:px-6">
          <section id="about" className="py-12 md:py-24 lg:py-32">
            <div className="text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Full Stack Developer
                  <br />
                  <span className="text-foreground/80"> and </span>
                  <br />
                  Devops Engineer
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Building digital experiences with modern technologies. Focused on creating elegant solutions to
                  complex problems
                </p>
              </div>
              <div className="space-x-4 mt-4">
                <Link href="https://github.com/theogaditya" target="_blank">
                  <Button variant="outline" size="icon">
                    <Github className="h-4 w-4" />
                    <span className="sr-only">GitHub</span>
                  </Button>
                </Link>
                <Link href="https://www.linkedin.com/in/aditya-hota-6b1167276" target="_blank">
                  <Button variant="outline" size="icon">
                    <Linkedin className="h-4 w-4" />
                    <span className="sr-only">LinkedIn</span>
                  </Button>
                </Link>
                <Link href="https://x.com/adityahota01" target="_blank">
                  <Button variant="outline" size="icon">
                    <Twitter className="h-4 w-4" />
                    <span className="sr-only">Twitter</span>
                  </Button>
                </Link>
                <Link href="mailto:adityahota99@gmail.com">
                  <Button variant="outline" size="icon">
                    <Mail className="h-4 w-4" />
                    <span className="sr-only">Email</span>
                  </Button>
                </Link>

              </div>
            </div>
          </section>

          <section id="projects" className="py-12 md:py-24 lg:py-32">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center">
                Projects
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <ProjectCard
                  title="Inkwell: A New Age Blogging Platform"
                  description="A full-stack blog platform with real-time notifications, authentication, and content management"
                  image="/inkwell.svg?height=400&width=600"
                  githubLink="https://github.com/Bytewise-Consulting-Product/inkwell"
                  liveDemoLink="https://inkwell.adityahota.online/"
                  tags={[
                    "React 19",
                    "Vite",
                    "Tailwind CSS",
                    "Clerk",
                    "Express.js",
                    "Prisma ORM",
                    "Redis",
                    "WebSocket",
                    "Pub/Sub",
                    "Nodemailer",
                    "Swagger UI",
                    "Docker",
                    "Kubernetes",
                    "Google Cloud (GKE)",
                    "NGINX"
                  ]}

                />

              </div>
            </div>
          </section>

          <section className="py-12 md:py-24 lg:py-32">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center">
                Tech Stack
              </h2>
              <TechStack />
            </div>
          </section>

          <section id="contact" className="py-12 md:py-24 lg:py-32">
            <div className="mx-auto max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center">
                Get in Touch
              </h2>
              <div className="flex items-center mt-4">
                <CopyEmailButton />
              </div>
            </div>
          </section>
        </main>

        <footer className="border-t">
            <div className="border-t border-gray-100 py-6 text-center">
                <p className="text-sm text-gray-600">
                    &copy; {new Date().getFullYear()} InkWell. All rights reserved.
                </p>
                <p className="mt-1 text-sm text-gray-500">
                    Built with passion and too much coffee ☕
                </p>
            </div>
        </footer>
      </div>
    </div>
  )
}