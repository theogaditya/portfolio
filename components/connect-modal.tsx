"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Github, Linkedin, Twitter, Mail, Copy, Check } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface ConnectModalProps {
  isOpen: boolean
  onClose: () => void
}

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/theogaditya",
    icon: Github,
    color: "hover:bg-[#333] hover:text-white dark:hover:bg-[#f0f0f0] dark:hover:text-[#333]",
    description: "Check out my code",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/aditya-hota-6b1167276",
    icon: Linkedin,
    color: "hover:bg-[#0077B5] hover:text-white",
    description: "Let's connect professionally",
  },
  {
    name: "Twitter",
    href: "https://x.com/adityahota01",
    icon: Twitter,
    color: "hover:bg-[#1DA1F2] hover:text-white",
    description: "Follow my updates",
  },
  {
    name: "Email",
    href: "mailto:adityahota99@gmail.com",
    icon: Mail,
    color: "hover:bg-[#EA4335] hover:text-white",
    description: "Send me a message",
  },
]

export function ConnectModal({ isOpen, onClose }: ConnectModalProps) {
  const [copiedEmail, setCopiedEmail] = useState(false)
  const email = "adityahota99@gmail.com"

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email)
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2000)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="relative w-full max-w-md bg-background border border-border rounded-2xl shadow-2xl pointer-events-auto overflow-hidden">
              {/* Header */}
              <div className="relative px-6 pt-6 pb-4 border-b border-border">
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </motion.button>
                
                <h2 className="text-2xl md:text-3xl font-light tracking-tight">
                  Let&apos;s <span className="italic">Connect</span>
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Choose your preferred way to reach out
                </p>
              </div>

              {/* Social Links */}
              <div className="p-6 space-y-3">
                {socialLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      target={link.name !== "Email" ? "_blank" : undefined}
                      rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
                      className={`group flex items-center gap-4 p-4 rounded-xl border border-border bg-card transition-all duration-300 ${link.color}`}
                    >
                      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-muted group-hover:bg-transparent transition-colors duration-300">
                        <link.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{link.name}</p>
                        <p className="text-sm text-muted-foreground group-hover:text-inherit/80 transition-colors">
                          {link.description}
                        </p>
                      </div>
                      <motion.div
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        whileHover={{ x: 5 }}
                      >
                        <span className="text-lg">→</span>
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Copy Email Section */}
              <div className="px-6 pb-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 border border-border"
                >
                  <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className="flex-1 text-sm font-mono truncate text-muted-foreground">
                    {email}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCopyEmail}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-background border border-border hover:bg-muted transition-colors"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-500" />
                        <span className="hidden sm:inline">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Copy</span>
                      </>
                    )}
                  </motion.button>
                </motion.div>
              </div>

              {/* Decorative accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-accent via-[#2563eb] to-accent" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
