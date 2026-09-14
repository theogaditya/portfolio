"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const skillIcons: Record<string, string> = {
  // Languages
  "TypeScript": "/tech-icons/typescript.svg",
  "JavaScript": "/tech-icons/javascript.svg",
  "Python": "/tech-icons/python.svg",
  // Frontend
  "HTML": "/tech-icons/html5.svg",
  "React": "/tech-icons/react.svg",
  "Next.js": "/tech-icons/nextjs.svg",
  "TailwindCSS": "/tech-icons/tailwindcss.svg",
  "Capacitor.js": "/tech-icons/capacitor.svg",
  // Backend
  "Node.js": "/tech-icons/nodejs.svg",
  "Bun": "/tech-icons/bun.svg",
  "Express": "/tech-icons/express.svg",
  "WebSocket": "/tech-icons/socketio.svg",
  "Pub/Sub": "/tech-icons/googlecloud.svg",
  "Redis": "/tech-icons/redis.svg",
  "gRPC": "/tech-icons/grpc.svg",
  "LangChain": "/tech-icons/langchain.svg",
  // Cloud & DevOps
  "Docker": "/tech-icons/docker.svg",
  "CI/CD": "/tech-icons/githubactions.svg",
  "Kubernetes": "/tech-icons/kubernetes.svg",
  "Helm": "/tech-icons/helm.svg",
  "Ingress": "/tech-icons/kubernetes.svg",
  "ArgoCD": "/tech-icons/argocd.svg",
  "GCP": "/tech-icons/googlecloud.svg",
  "AWS": "/tech-icons/aws.svg",
  "Cloudflare": "/tech-icons/cloudflare.svg",
  "Terraform": "/tech-icons/terraform.svg",
  // Databases
  "MongoDB": "/tech-icons/mongodb.svg",
  "PostgreSQL": "/tech-icons/postgresql.svg",
  "Prisma": "/tech-icons/prisma.svg",
  // Others
  "Git": "/tech-icons/git.svg",
  "GitHub": "/tech-icons/github.svg",
  "Linux": "/tech-icons/linux.svg",
  "Unit Testing": "/tech-icons/vitest.svg",
  "Integration Testing": "/tech-icons/jest.svg",
}

import { technologies } from "@/lib/data"

function SkillBadge({ skill, index }: { skill: string; index: number }) {
  const iconUrl = skillIcons[skill]

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.3,
        delay: index * 0.03,
      }}
      className="group"
    >
      <span className="inline-flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-2 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20 cursor-default transition-all duration-200 group-hover:bg-primary/15 group-hover:ring-primary/30">
        {iconUrl && (
          <Image
            src={iconUrl}
            alt={skill}
            width={18}
            height={18}
            loading="lazy"
            className="opacity-70 group-hover:opacity-100 transition-opacity duration-200"
          />
        )}
        {skill}
      </span>
    </motion.div>
  )
}

function CategoryCard({ tech, index }: { tech: typeof technologies[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300"
    >
      <h3 className="text-lg font-semibold mb-4">{tech.category}</h3>

      {/* Skills grid */}
      <div className="flex flex-wrap gap-2">
        {tech.skills.map((skill, skillIndex) => (
          <SkillBadge key={skill} skill={skill} index={skillIndex} />
        ))}
      </div>
    </motion.div>
  )
}

export default function TechStack() {
  return (
    <div className="relative py-18">
      {/* Gradient mesh background */}
      <div className="absolute inset-0 gradient-mesh-2 opacity-50 pointer-events-none" />

      <div className="relative grid gap-6 md:grid-cols-2">
        {technologies.map((tech, index) => (
          <CategoryCard key={tech.category} tech={tech} index={index} />
        ))}
      </div>
    </div>
  )
}
