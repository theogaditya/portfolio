"use client"; 
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Twitter, Menu } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import ProjectCard from "./components/project-card"
import TechStack from "./components/tech-stack"
import { ThemeToggle } from "@/components/theme-toggle"
import CopyEmailButton from "./components/email"
import { useState } from "react"
import { motion,useScroll, useSpring  } from 'framer-motion';
import pfp from "../public/pfp.png"

export default function Page() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  }
};

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full max-w-6xl mx-auto px-4 md:px-6">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-14 items-center justify-between">
            {/* Logo/Name - visible on all screens */}
            <Link className="flex items-center space-x-2" href="/">
              <span className="font-bold">Aditya Hota</span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
              <Link href="#about-me" onClick={(e) => {
                e.preventDefault();
                scrollToSection('about-me');}} 
                className="transition-colors hover:text-foreground/80">
                About Me
              </Link>
              <Link href="#projects" onClick={(e)=>{
                e.preventDefault();
                scrollToSection('projects');
              }} className="transition-colors hover:text-foreground/80">
                Projects
              </Link>
              <Link href="#contact" onClick={
                (e) => {
                  e.preventDefault();
                  scrollToSection('contact');
                }
              } className="transition-colors hover:text-foreground/80">
                Contact
              </Link>
            </nav>
            
            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-4">
              {/* Theme toggle - visible on all screens */}
              <ThemeToggle />
              
              {/* Resume button with PDF link */}
              <Link href="https://pub-cfcd623b266645fc8425f95678d192d7.r2.dev/Resume-jul30.pdf" target="_blank" rel="noopener noreferrer">
                <Button variant="outline">
                  Resume
                </Button>
              </Link>
              
              {/* Mobile menu toggle */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-2 bg-background border-t">
              <nav className="flex flex-col space-y-3 text-sm font-medium">
                <Link 
                  href="#about-me" 
                  className="transition-colors hover:text-foreground/80"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About Me
                </Link>
                <Link 
                  href="#projects" 
                  className="transition-colors hover:text-foreground/80"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Projects
                </Link>
                <Link 
                  href="#contact" 
                  className="transition-colors hover:text-foreground/80"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </nav>
            </div>
          )}
        </header>

        <main>
          {/* Hero Section */}
          <section className="py-12 md:py-24">
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
                <Link href="mailto:connect@adityahota.online">
                  <Button variant="outline" size="icon">
                    <Mail className="h-4 w-4" />
                    <span className="sr-only">Email</span>
                  </Button>
                </Link>
              </div>
            </div>
          </section>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          
          {/* About Me Section */}
          <section id="about-me" className="py-12 md:py-24">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center">
                About Me
              </h2>
              
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-full max-w-[250px] md:w-1/3 mx-auto md:mx-0">
                  {/* Using Next.js Image component with responsive styling */}
                  <div className="relative w-full pb-[100%] overflow-hidden rounded-full border-4 border-gray-200 dark:border-gray-800 bg-white">
                    <Image 
                      src="https://pub-cfcd623b266645fc8425f95678d192d7.r2.dev/pfp.png"
                      alt="Aditya Hota" 
                      fill
                      className="object-cover"
                      style={{ filter: 'none' }} // Prevent theme/filter affecting image
                    />
                  </div>
                </div>
                <div className="w-full md:w-2/3 space-y-4 text-lg">
                  <p>
                    Hello! I&apos;m Aditya, a passionate Full Stack Developer and DevOps Engineer with a keen interest in building scalable applications and optimizing deployment pipelines.
                  </p>
                  <p>
                    When I&apos;m not coding, you&apos;ll find me diving into new tech stacks, working on hackathon projects, or sharing insights through writing and community engagement.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <br></br>
          <br></br>
          <br></br>
          <br></br>

          {/* Projects Section */}
          <section id="projects" className="py-12 md:py-24">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center">
                Projects
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <ProjectCard
                  title="Inkwell: A dev first blogging platform"
                  description="A full-stack blog platform with real-time notifications, authentication, and content management. With User-friendly code editor and a beautiful UI."
                  image="https://pub-cfcd623b266645fc8425f95678d192d7.r2.dev/inkwell.svg"
                  githubLink="https://github.com/Bytewise-Consulting-Product/inkwell"
                  liveDemoLink="https://inkwell.adityahota.online/"
                  tags={[
                    "React",
                    "Tailwind CSS",
                    "Clerk",
                    "Express",
                    "Prisma",
                    "PostgreSQL",
                    "Redis",
                    "WebSocket",
                    "Pub/Sub",
                    "Nodemailer",
                    "Swagger UI",
                    "Docker",
                    "Kubernetes",
                    "GCP (GKE)",
                    "NGINX"
                  ]}
                />
                <ProjectCard
                  title="SwarajDesk: A Public Grievance Portal"
                  description="
                  Citizens can file complaints with media attachments, auto-classified sub-categories (via Vertex AI), and track status in 
                  real-time. Community features include upvoting/resolving grievances in a social feed (For You, Trending, Recent), with 
                  multilingual UI powered by Google Translate API.
                  "
                  image="https://pub-cfcd623b266645fc8425f95678d192d7.r2.dev/swarajpfp.png"
                  githubLink="https://github.com/theogaditya/gms"
                  liveDemoLink="https://www.swarajdesk.co.in/"
                  tags={[
                    "Next.js",
                    "Tailwind CSS",
                    "Express",
                    "Prisma ORM",
                    "PostgreSQL",
                    "Redis",
                    "WebSocket",
                    "Nodemailer",
                    "R2 Storage",
                    "Python",
                    "Docker",
                    "GCP (Cloud Run & Vertex AI)",
                  ]}
                />
                <ProjectCard
                  title="SwarajDesk: Admin Portal"
                  description="Providing a structured a four-tier admin escalation hierarchy with distinct dashboards and granular control."
                  image="https://pub-cfcd623b266645fc8425f95678d192d7.r2.dev/Screenshot%20From%202025-07-31%2012-56-13.png"
                  githubLink="https://github.com/theogaditya/gms"
                  liveDemoLink="https://admin.swarajdesk.co.in/"
                  tags={[
                    "Next.js",
                    "Tailwind CSS",
                    "Express",
                    "Batoi Insight",
                    "Prisma ORM",
                    "PostgreSQL",
                    "Redis",
                    "WebSocket",
                    "R2 Storage",
                    "Docker",
                    "GCP (Cloud Run & Vertex AI)",
                  ]}
                />
              </div>
            </div>
          </section>

          {/* Tech Stack Section */}
          <section className="py-12 md:py-24">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center">
                Tech Stack
              </h2>
              <TechStack />
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-12 md:py-24">
            <div className="mx-auto max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center">
                Get in Touch
              </h2>
              <div className="flex items-center justify-center mt-4 px-4">
                <CopyEmailButton />
              </div>
            </div>
          </section>
        </main>

        <footer className="border-t">
          <div className="border-t border-gray-100 py-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              &copy; {new Date().getFullYear()} Aditya Hota. All rights reserved.
            </p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">
              Built with passion and too much coffee ☕
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}