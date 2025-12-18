"use client"

import { motion } from "framer-motion"

const techItems = [
  "Clerk",
  "NextAUTH",
  "JWT",
  "BUN",
  "UBUNTU",
  "ARCH",
  "NODE.JS",
  "YARN",
  "TURBOREPO",
  "POSTMAN",
  "JSON"
]

const concepts = [
  "ARCHITECTURE",
  "DNS",
  "EC2",
  "COMPUTE ENGINE",
  "GKE",
  "PIPELINES",
  "CI/CD",
  "EC2",
  "JENKINS",
  "YAML",
  "AXIOM",
  "S3",
  "CDN"
]

function MarqueeRow({ items, direction = "left" }: { items: string[]; direction?: "left" | "right" }) {
  const duplicatedItems = [...items, ...items, ...items, ...items]

  return (
    <div className="relative overflow-hidden py-4">
      <motion.div
        className={`flex gap-8 ${direction === "left" ? "animate-marquee-left" : "animate-marquee-right"}`}
        style={{ width: "fit-content" }}
      >
        {duplicatedItems.map((item, index) => (
          <span
            key={index}
            className="group font-sans text-2xl md:text-3xl lg:text-5xl font-light tracking-tight whitespace-nowrap cursor-default text-foreground/30 hover:text-foreground transition-colors duration-300"
          >
            {item}
            <span className="mx-8 text-foreground/20">•</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export function TechMarquee() {
  return (
    <section className="relative py-0 overflow-hidden md:py-0">
      {/* Marquee Rows */}
      <div className="space-y-4">
        <MarqueeRow items={techItems} direction="left" />
        <MarqueeRow items={concepts} direction="right" />
      </div>
    </section>
  )
}
