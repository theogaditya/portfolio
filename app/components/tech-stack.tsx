import { Card } from "@/components/ui/card"

const technologies = [
    {
    category: "Languages",
    skills: ["TypeScript", "JavaScript", "C", "C++"],
  },
  {
    category: "Frontend",
    skills: ["HTML", "React", "Next.js", "TailwindCSS", "Capacitor.js"],
  },
  {
    category: "Backend",
    skills: ["Node.js", "Bun", "Express", "WebSocket", "Pub/Sub", "Redis", "gRPC"],
  },
  {
    category: "Cloud & DevOps",
    skills: ["Docker", "CI/CD", "Kubernetes", "Helm", "Ingress","ArgoCD", "GCP", "AWS", "Cloudflare", "Terraform"],
  },
  {
    category: "Databases",
    skills: ["MongoDB", "PostgreSQL", "Prisma"],
  },
  {
    category: "Others",
    skills: ["Git", "GitHub", "Turborepo", "Linux", "Unit Testing", "Integration Testing",],
  },
]

export default function TechStack() {
  return (
    <div className="grid gap-6 py-18 md:grid-cols-2">
      {technologies.map((tech) => (
        <Card key={tech.category} className="p-6">
          <h3 className="text-lg font-semibold mb-4">{tech.category}</h3>
          <div className="flex flex-wrap gap-2">
            {tech.skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20"
              >
                {skill}
              </span>
            ))}
          </div>
        </Card>
      ))}
    </div>
  )
}
