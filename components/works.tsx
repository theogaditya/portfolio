"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { Github, ExternalLink } from "lucide-react"
import { projects as projectsData } from "@/lib/data"

// Map the shared data to the format needed for this component
const projects = projectsData.map(p => ({
  title: p.title,
  tags: p.tags,
  image: p.image,
  year: p.year,
  liveUrl: p.liveUrl,
  githubUrl: p.githubUrl,
}))

export function Works() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [hasMouseMoved, setHasMouseMoved] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!hasMouseMoved) setHasMouseMoved(true)
    mouseX.set(e.clientX)
    mouseY.set(e.clientY)
  }

  return (
    <section className="relative py-18 overflow-hidden md:py-26">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="px-8 md:px-12 mb-16"
      >
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center">Projects</h2>
      </motion.div>

      {/* Projects List */}
      <div ref={containerRef} onMouseMove={handleMouseMove} className="relative px-8 md:px-12">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="relative border-t border-foreground/10 py-8 md:py-12"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="group flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Year */}
              <span className="font-mono text-xs text-muted-foreground tracking-[0.3em] order-1 md:order-0">
                {project.year}
              </span>

              {/* Title - clickable to live demo */}
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="font-sans text-xl md:text-2xl lg:text-4xl font-semibold tracking-tight text-foreground/90 hover:text-foreground/70 active:text-foreground/60 transition-colors duration-300 flex-1 flex items-center gap-3"
                animate={{
                  x: hoveredIndex === index ? 20 : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {project.title}
                {/* <ExternalLink className="w-4 h-4 md:w-5 md:h-5 opacity-50 group-hover:opacity-100 transition-opacity" /> */}
              </motion.a>

              {/* Actions: GitHub button and Live link */}
              <div className="flex flex-col gap-5 order-2 md:order-0">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                  className="flex items-center gap-2 px-4 py-2 bg-foreground/85 text-background rounded-full font-bold hover:bg-foreground/70 active:bg-foreground/70 transition-all duration-300"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github className="w-4 h-4" />
                  <span className="text-[11px] tracking-[0.15em]">CODE</span>
                </a>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                  className="flex items-center gap-2 px-4 py-2 bg-foreground/85 text-background rounded-full font-bold hover:bg-foreground/80 active:bg-foreground/70 transition-all duration-300"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="text-[11px] tracking-[0.15em]">LIVE</span>
                </a>
              </div>

              {/* Tags */}
              <div className="flex gap-2 flex-wrap order-3 md:order-0 max-w-85">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] tracking-[0.2em] px-3 py-1 border border-foreground/20 rounded-full text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}

        {/* Floating Image - Desktop only, only show after mouse has moved */}
        <motion.div
          className="hidden md:block fixed pointer-events-none z-50 w-64 h-40 md:w-80 md:h-48 overflow-hidden rounded-lg"
          style={{
            left: springX,
            top: springY,
            translateX: "20px",
            translateY: "-50%",
          }}
          animate={{
            opacity: hoveredIndex !== null && hasMouseMoved ? 1 : 0,
            scale: hoveredIndex !== null && hasMouseMoved ? 1 : 0.8,
          }}
          transition={{ duration: 0.2 }}
        >
          {hoveredIndex !== null && (
            <motion.img
              src={projects[hoveredIndex].image}
              alt={projects[hoveredIndex].title}
              className="w-full h-full object-cover"
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4 }}
              style={{
                filter: "grayscale(50%) contrast(1.1)",
              }}
            />
          )}
          {/* Glitch overlay */}
          <div className="absolute inset-0 bg-accent/10 mix-blend-overlay" />
        </motion.div>
      </div>

      {/* Bottom Border */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="mt-16 mx-8 md:mx-12 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent origin-left"
      />
    </section>
  )
}
