// Shared data for portfolio - used by both visual components and terminal

export const projects = [
  {
    title: "SwarajDesk: Civic engagement and resolution system",
    description: "A platform for citizens to report and track civic issues with government resolution tracking",
    tags: ["Next.js", "TailwindCSS", "Capacitor.js", "Bun", "Express", "Prisma", "PostgreSQL", "Redis", "Pub/Sub", "S3", "Docker", "Kubernetes", "ArgoCD", "CI/CD"],
    image: "https://sih-swaraj.s3.ap-south-2.amazonaws.com/public-media/Screenshot+From+2025-12-18+10-17-55.png",
    year: "2025",
    liveUrl: "https://sih-user-fe-sd.adityahota.online/",
    githubUrl: "https://github.com/theogaditya/sih-swarajdesk-2025.git",
  },
  {
    title: "SwarajDesk: Admin Portal",
    description: "Administrative dashboard for managing civic complaints and government responses",
    tags: ["Next.js", "TailwindCSS", "Capacitor.js", "Bun", "Express", "Prisma", "PostgreSQL", "Redis", "S3", "Docker", "Kubernetes", "ArgoCD", "CI/CD"],
    image: "https://sih-swaraj.s3.ap-south-2.amazonaws.com/public-media/Screenshot+From+2025-12-18+10-22-25.png",
    year: "2025",
    liveUrl: "https://sih-admin-fe-sd.adityahota.online/",
    githubUrl: "https://github.com/theogaditya/sih-swarajdesk-2025.git",
  },
  {
    title: "Inkwell: A dev first blogging platform",
    description: "A developer-first blogging platform with real-time collaboration features",
    tags: ["React", "TailwindCSS", "Clerk", "Express", "Prisma", "PostgreSQL", "Redis", "WebSocket", "Swagger UI", "Docker", "Kubernetes", "NGINX"],
    image: "https://pub-cfcd623b266645fc8425f95678d192d7.r2.dev/inkwell.svg",
    year: "2025",
    liveUrl: "https://inkwell.adityahota.online/",
    githubUrl: "https://github.com/Bytewise-Consulting-Product/inkwell",
  },
];

export const technologies = [
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
    skills: ["Docker", "CI/CD", "Kubernetes", "Helm", "Ingress", "ArgoCD", "GCP", "AWS", "Cloudflare", "Terraform"],
  },
  {
    category: "Databases",
    skills: ["MongoDB", "PostgreSQL", "Prisma"],
  },
  {
    category: "Others",
    skills: ["Git", "GitHub", "Turborepo", "Linux", "Unit Testing", "Integration Testing"],
  },
];

export const personalInfo = {
  name: "Aditya Hota",
  role: "Full Stack Developer & DevOps Enthusiast",
  location: "India",
  university: "C.V. Raman Global University",
  status: "Open to Opportunities",
  bio: `I'm a System Architect and Interface Designer who builds products that think alongside humans. I design systems that adapt and evolve—because every interaction is a conversation, and code is just crystallized thought.`,
};

export const education = {
  degree: "B.Tech in Computer Science and Engineering",
  institution: "C.V. Raman Global University",
  cgpa: "8.01",
  duration: "2023 - 2027",
  location: "Bhubaneswar, India",
};

export const contact = {
  email: "adityahota.work@gmail.com",
  location: "India",
};

export const socials = {
  github: "https://github.com/theogaditya",
  linkedin: "https://linkedin.com/in/adityahota",
  twitter: "https://x.com/theogaditya",
  website: "https://adityahota.online",
};
