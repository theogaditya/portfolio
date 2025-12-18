"use client";

import { Works } from "@/components/works"
import { TechMarquee } from "@/components/tech-marquee"
import { Footer } from "@/components/footer"
import { CustomCursor } from "@/components/custom-cursor"
import { SmoothScroll } from "@/components/smooth-scroll"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Twitter, Menu } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import TechStack from "./components/tech-stack"
import { ThemeToggle } from "@/components/theme-toggle"
import { useState } from "react"
import { ConnectModal } from "@/components/connect-modal"
import { FloatingConnectButton } from "@/components/floating-connect-button"
import { motion, AnimatePresence } from "framer-motion"
import { AnimatedSection, AnimatedDivider, StaggerContainer, StaggerItem, GlowingBorder } from "@/components/animated-components"
import { BlurIn } from "@/components/animated-text"
import { ScrollProgress } from "@/components/scroll-progress"
import { FloatingShapes, MouseFollower, Sparkles } from "@/components/effects"

export default function Page() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [connectModalOpen, setConnectModalOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <MouseFollower />
      <FloatingShapes />
      <div className="w-full max-w-6xl mx-auto px-4 md:px-6 relative z-10">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-14 items-center justify-between">
            {/* Logo/Name - visible on all screens */}
            <Link className="flex items-center space-x-2 group" href="/">
              <motion.span 
                className="font-bold"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                Aditya Hota
              </motion.span>
              <motion.span 
                className="w-2 h-2 rounded-full bg-accent"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
              {[
                { label: "About Me", id: "about-me" },
                { label: "Experience", id: "experience" },
                { label: "Projects", id: "projects" },
              ].map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Link 
                    href={`#${item.id}`} 
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.id);
                    }}
                    className="relative transition-colors hover:text-foreground/80 group"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
                  </Link>
                </motion.div>
              ))}
              <motion.button 
                onClick={() => setConnectModalOpen(true)} 
                className="relative transition-colors hover:text-foreground/80 group"
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
              </motion.button>
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
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div 
                className="md:hidden py-4 bg-background border-t"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <nav className="flex flex-col space-y-3 text-sm font-medium">
                  {[
                    { label: "About Me", id: "about-me" },
                    { label: "Experience", id: "experience" },
                    { label: "Projects", id: "projects" },
                  ].map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={`#${item.id}`}
                        className="block transition-colors hover:text-foreground/80 hover:translate-x-2 duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.button
                    className="text-left transition-colors hover:text-foreground/80"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setConnectModalOpen(true);
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Contact
                  </motion.button>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        <main>
          {/* Hero Section */}
          <section className="py-12 md:py-24 relative">
            <Sparkles count={30} />
            <div className="text-center relative z-10">
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.h1 
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="inline-block"
                  >
                    Full Stack Developer
                  </motion.span>
                  <br />
                  <motion.span 
                    className="text-foreground/80 inline-block"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  > and </motion.span>
                  <br />
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="inline-block"
                  >
                    Devops Engineer
                  </motion.span>
                </motion.h1>
                <motion.p 
                  className="mx-auto max-w-[700px] text-muted-foreground md:text-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                >
                  Designing products that scale, ship, and last
                </motion.p>
              </motion.div>

              {/* Social Links */}
              <motion.div 
                className="flex items-center justify-center gap-4 mt-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
              >
                {[
                  { 
                    href: "https://github.com/theogaditya", 
                    icon: Github, 
                    label: "GitHub",
                    bgHover: "group-hover:bg-[#333] dark:group-hover:bg-white",
                    iconHover: "group-hover:text-white dark:group-hover:text-[#333]"
                  },
                  { 
                    href: "https://www.linkedin.com/in/aditya-hota-6b1167276", 
                    icon: Linkedin, 
                    label: "LinkedIn",
                    bgHover: "group-hover:bg-[#0077B5]",
                    iconHover: "group-hover:text-white"
                  },
                  { 
                    href: "https://x.com/adityahota01", 
                    icon: Twitter, 
                    label: "Twitter/X",
                    bgHover: "group-hover:bg-[#000] dark:group-hover:bg-white",
                    iconHover: "group-hover:text-white dark:group-hover:text-[#000]"
                  },
                  { 
                    href: "mailto:adityahota99@gmail.com", 
                    icon: Mail, 
                    label: "Email",
                    bgHover: "group-hover:bg-accent",
                    iconHover: "group-hover:text-white"
                  },
                ].map((social, index) => (
                  <motion.div
                    key={social.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 1.2 + index * 0.1,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    whileHover={{ y: -4 }}
                  >
                    <Link
                      href={social.href}
                      target={social.label !== "Email" ? "_blank" : undefined}
                      className="group relative flex items-center justify-center"
                    >
                      {/* Background circle */}
                      <span className={`absolute inset-0 rounded-xl bg-foreground/5 transition-all duration-300 ${social.bgHover}`} />
                      
                      {/* Icon container */}
                      <span className="relative p-3.5">
                        <social.icon className={`w-5 h-5 text-foreground/70 transition-all duration-300 ${social.iconHover}`} />
                      </span>
                      
                      {/* Tooltip */}
                      <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-2.5 py-1 text-[10px] font-medium tracking-wider uppercase bg-foreground text-background rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none scale-90 group-hover:scale-100">
                        {social.label}
                        {/* Arrow */}
                        <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-foreground rotate-45" />
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          <div className="h-24" />

          {/* About Me Section */}
          <section id="about-me" className="py-0 md:py-24 relative">
            {/* Gradient mesh background */}
            <div className="absolute inset-0 gradient-mesh-1 opacity-40 pointer-events-none -z-10" />
            
            <AnimatedSection className="mx-auto max-w-4xl">
              <BlurIn delay={0.1}>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center">
                  About Me
                </h2>
              </BlurIn>

              <div className="flex flex-col md:flex-row gap-8 items-center">
                <motion.div 
                  className="w-full max-w-64 md:w-1/3 mx-auto md:mx-0"
                  initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  {/* Using Next.js Image component with responsive styling */}
                  <motion.div 
                    className="relative w-full pb-[100%] overflow-hidden rounded-full border-4 border-gray-200 dark:border-gray-800 bg-white"
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Image
                      src="https://pub-cfcd623b266645fc8425f95678d192d7.r2.dev/pfp.png"
                      alt="Aditya Hota"
                      fill
                      className="object-cover"
                      style={{ filter: 'none' }}
                    />
                  </motion.div>
                </motion.div>
                <StaggerContainer className="w-full md:w-2/3 space-y-4 text-lg" staggerDelay={0.15}>
                  <StaggerItem>
                    <p>
                      I&apos;m Aditya, a Full Stack Engineer focused on building systems that scale from prototype to production.
                      I approach software with a strong emphasis on clean architecture and reliability across the entire stack from frontend to infrastructure.
                    </p>
                  </StaggerItem>
                  <StaggerItem>
                    <p>
                      Beyond development, I actively explore emerging technologies compete in hackathons and contribute back to the community.
                    </p>
                  </StaggerItem>
                </StaggerContainer>
              </div>
            </AnimatedSection>
          </section>
          
          <AnimatedDivider />
          {/* Experience Section */}
          <section id="experience" className="py-22 md:py-26 relative">
            {/* Gradient mesh background */}
            <div className="absolute inset-0 gradient-mesh-2 opacity-30 pointer-events-none -z-10" />
            
            <AnimatedSection className="mx-auto max-w-4xl">
              <BlurIn delay={0.1}>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center">
                  Experience
                </h2>
              </BlurIn>
              <br></br>
              <div className="relative">
                {/* Timeline line */}
                <motion.div 
                  className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{ originY: 0 }}
                />

                {/* Experience Item */}
                <motion.div 
                  className="relative pl-8 md:pl-0 md:grid md:grid-cols-2 md:gap-8"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  {/* Left side - Date */}
                  <div className="hidden md:flex md:justify-end md:pr-8">
                    <motion.div 
                      className="text-right"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    >
                      <span className="font-mono text-sm text-muted-foreground tracking-wider">
                        OCTOBER 2025 - PRESENT
                      </span>
                    </motion.div>
                  </div>

                  {/* Timeline dot */}
                  <motion.div 
                    className="absolute left-0 md:left-1/2 top-0 w-3 h-3 rounded-full bg-accent border-2 border-background md:-translate-x-1/2 -translate-x-1/2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.6, type: "spring", stiffness: 200 }}
                  >
                    <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-30" />
                  </motion.div>

                  {/* Right side - Content */}
                  <motion.div 
                    className="md:pl-8"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    {/* Mobile date */}
                    <span className="md:hidden font-mono text-xs text-muted-foreground tracking-wider mb-2 block">
                      OCTOBER 2025 — PRESENT
                    </span>

                    <GlowingBorder>
                      <motion.div 
                        className="group p-6 rounded-xl glass-card hover:shadow-xl transition-all duration-300"
                        whileHover={{ y: -5 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div>
                            <h3 className="text-lg md:text-xl font-semibold tracking-tight">
                              Project Lead - Web Development
                            </h3>
                            <p className="text-muted-foreground font-medium mt-1">
                              Google Developer Groups (GDG)
                            </p>
                            <p className="text-sm text-muted-foreground">
                              C.V. Raman Global University
                            </p>
                          </div>
                          <motion.div 
                            className="shrink-0 p-2 rounded-lg bg-muted/50"
                            whileHover={{ rotate: 10, scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <Image
                              src="/google-developers-svgrepo-com.svg"
                              alt="GDG Logo"
                              width={30}
                              height={30}
                            />
                          </motion.div>
                        </div>

                        <p className="text-muted-foreground leading-relaxed">
                          Contributing to the Web Development domain at GDG and mentoring fellow developers.
                          Conducted multiple hands-on workshops for a cumulative total of <span className="text-foreground font-medium">300+ participants</span>.
                        </p>

                        <StaggerContainer className="flex flex-wrap gap-2 mt-4" staggerDelay={0.05}>
                          {["Leadership", "Mentoring", "Workshops", "Web Development"].map((tag) => (
                            <StaggerItem key={tag}>
                              <motion.span 
                                className="px-2 py-1 text-xs font-mono rounded-md bg-muted text-muted-foreground"
                                whileHover={{ scale: 1.05, backgroundColor: "var(--accent)", color: "white" }}
                                transition={{ duration: 0.2 }}
                              >
                                {tag}
                              </motion.span>
                            </StaggerItem>
                          ))}
                        </StaggerContainer>
                      </motion.div>
                    </GlowingBorder>
                  </motion.div>
                </motion.div>
              </div>
            </AnimatedSection>
          </section>

          <AnimatedDivider />

          <div id="projects">
            <Works />
          </div>

          <AnimatedDivider />

          {/* Tech Stack Section */}
          <section className="py-12 md:py-12">
            <AnimatedSection>
              <BlurIn delay={0.1}>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center">
                  Stack
                </h2>
              </BlurIn>
              <br></br>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <TechMarquee />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <TechStack />
              </motion.div>
            </AnimatedSection>
          </section>

          {/* Contact Section */}
          {/* <section id="contact" className="py-12 md:py-24">
            <div className="mx-auto max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center">
                Get in Touch
              </h2>
              <div className="flex items-center justify-center mt-4 px-4">
                <CopyEmailButton />
              </div>
            </div>
          </section> */}
        </main>

        {/* <footer className="border-t">
          <div className="border-t border-gray-100 py-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              &copy; {new Date().getFullYear()} Aditya Hota. All rights reserved.
            </p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">
              Built with passion and too much coffee ☕
            </p>
          </div>
        </footer> */}
      </div>
      <div>
        <SmoothScroll>
          <CustomCursor />
          {/* <Navbar /> */}
          <main>
            {/* <Hero /> */}
            {/* <SectionBlend /> */}
            {/* <About /> */}
            <br></br>
            <br></br>
            <Footer />
          </main>
        </SmoothScroll>
      </div>

      {/* Floating Connect Button */}
      <FloatingConnectButton />

      {/* Connect Modal for header navigation */}
      <ConnectModal isOpen={connectModalOpen} onClose={() => setConnectModalOpen(false)} />
    </div>
  )
}

