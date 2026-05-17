// Shared data for portfolio - used by both visual components and terminal

export const projects = [
  {
    title: "Swaraj Desk: Intelligent Civic Operations Platform",
    description: "A platform for citizens to report and track civic issues with government resolution tracking",
    tags: ["Next.js", "Bun", "Express", "Prisma", "PostgreSQL", "Redis", "Pub/Sub", "LangChain", "WebSockets", "Kubernetes", "CI/CD"],
    image: "/swarajUser.png",
    year: "2026",
    liveUrl: "https://gsc-user-fe.abhasbehera.in/",
    githubUrl: "https://github.com/theogaditya/GSC-2026-Primeagen",
  },
  {
    title: "SwarajDesk: Admin Portal",
    description: "Administrative dashboard for managing civic complaints and government responses",
    tags: ["Next.js", "Bun", "Express", "Prisma", "PostgreSQL", "Redis", "Kubernetes", "ArgoCD", "CI/CD"],
    image: "/swarajAdmin.png",
    year: "2026",
    liveUrl: "https://gsc-admin-fe.abhasbehera.in/",
    githubUrl: "https://github.com/theogaditya/GSC-2026-Primeagen",
  },
  {
    title: "PixalPlot: AI Powered Application Generation Platform",
    description: "AI powered browser based development environment, enabling users to generate and live preview full stack applications from natural language prompts",
    tags: ["Next.js", "Bun", "Express", "Open AI", "Prisma", "PostgreSQL", "WebSockets", "CI/CD"],
    image: "/2026-05-17_16-43.png",
    year: "2025",
    liveUrl: "https://pixelploy.avenis999.online/",
    githubUrl: "https://github.com/theogaditya/PixalPlot",
  },
  {
    title: "BlinkPay: Wallet and Payments Platform",
    description: "digital wallet and payments platform with secure peer-to-peer transfers, simulated on-ramp/off-ramp flows",
    tags: ["Next.js", "Bun", "Express", "Prisma", "PostgreSQL", "CI/CD"],
    image: "/2026-05-15_20-43.png",
    year: "2025",
    liveUrl: "https://blinkpay.avenis999.online/",
    githubUrl: "https://github.com/theogaditya/blinkpay",
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
    skills: ["TypeScript", "JavaScript", "Python"],
  },
  {
    category: "Frontend",
    skills: ["HTML", "React", "Next.js", "TailwindCSS", "Capacitor.js"],
  },
  {
    category: "Backend",
    skills: ["Node.js", "Bun", "Express", "WebSocket", "Pub/Sub", "Redis", "gRPC", "LangChain"],
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
    skills: ["Git", "GitHub", "Linux", "Unit Testing", "Integration Testing"],
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
