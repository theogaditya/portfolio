import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import type React from "react" // Import React

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "adityahota.online",
  description: "Full stack developer and devops engineer from India with a passion for building scalable and efficient applications.",  
  keywords: [
    "Aditya Hota",
    "Full Stack Developer",
    "Developer",
    "DevOps Engineer",
    "Portfolio",
    "portfolio",
    "portfolio website",
    "portfolio website",
    "adityahota.online",
    "adityahota.online",
    "web development",
    "software development",
    "software development",
    "full stack developer",
    "full stack developer",
    "devops engineer",
    "devops engineer",
    "devops",
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
