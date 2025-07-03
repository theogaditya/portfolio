import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import type React from "react" // Import React
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Aditya Hota | Full Stack Developer & DevOps Engineer",
  description: "Portfolio of Aditya Hota - Full Stack Developer and DevOps Engineer specializing in React, Node.js, Docker, and Kubernetes. Explore my projects and technical expertise.",
  keywords: [
    "Aditya Hota",
    "Full Stack Developer",
    "Developer",
    "DevOps Engineer",
    "Portfolio",
    "portfolio",
    "portfolio website",
    "adityahota.online",
    "web development",
    "software development",
    "full stack developer",
    "devops engineer",
    "devops",
    "React",
    "Node.js",
    "Docker",
    "Kubernetes"
  ],
  alternates: {
    canonical: 'https://adityahota.online',
  },
  authors: [{ name: "Aditya Hota" }],
  creator: "Aditya Hota",
  publisher: "Aditya Hota",
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL('https://adityahota.online'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Person Schema markup for better SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Aditya Hota",
    "url": "https://adityahota.online",
    "image": "https://adityahota.online/pfp.svg",
    "jobTitle": "Full Stack Developer and DevOps Engineer",
    "description": "Full Stack Developer and DevOps Engineer specializing in React, Node.js, Docker, and Kubernetes",
    "sameAs": [
      "https://github.com/theogaditya",
      "https://www.linkedin.com/in/aditya-hota-6b1167276",
      "https://x.com/adityahota01"
    ],
    "knowsAbout": [
      "React",
      "Next.js", 
      "Node.js", 
      "Express.js", 
      "Docker", 
      "Kubernetes", 
      "Cloud Computing",
      "DevOps"
    ]
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
        <Script
          id="schema-markup"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Google Analytics can be added here */}
        
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}