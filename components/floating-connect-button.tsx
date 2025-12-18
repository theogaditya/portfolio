"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, Menu, X, User, Briefcase, FolderKanban, Mail } from "lucide-react"
import { ConnectModal } from "./connect-modal"

const navItems = [
  { label: "About Me", href: "about-me", icon: User },
  { label: "Experience", href: "experience", icon: Briefcase },
  { label: "Projects", href: "projects", icon: FolderKanban },
  { label: "Contact", href: "contact", icon: Mail, isContact: true },
]

export function FloatingConnectButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsNavOpen(false)
  }

  const handleButtonClick = () => {
    if (isMobile) {
      setIsNavOpen(!isNavOpen)
    } else {
      setIsModalOpen(true)
    }
  }

  return (
    <>
      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isNavOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-20 right-6 z-40 flex flex-col gap-2 p-3 bg-background/95 backdrop-blur-md border border-border rounded-2xl shadow-xl"
          >
            {navItems.map((item, index) => (
              <motion.button
                key={item.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => {
                  if (item.isContact) {
                    setIsNavOpen(false)
                    setIsModalOpen(true)
                  } else {
                    scrollToSection(item.href)
                  }
                }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted transition-colors duration-200 text-left"
              >
                <item.icon className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm font-medium">{item.label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleButtonClick}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 bg-foreground text-background rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
        aria-label={isMobile ? "Navigation Menu" : "Let's Connect"}
      >
        <motion.div
          animate={{ rotate: isHovered && !isMobile ? 15 : 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {/* Show Menu/X icon on mobile, MessageCircle on desktop */}
          {isMobile ? (
            <AnimatePresence mode="wait">
              {isNavOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          ) : (
            <MessageCircle className="w-5 h-5" />
          )}
        </motion.div>

        {/* Expanded text on hover - desktop only */}
        <AnimatePresence>
          {isHovered && !isMobile && (
            <motion.span
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-sm font-medium whitespace-nowrap overflow-hidden"
            >
              Let&apos;s Connect
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Connect Modal */}
      <ConnectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
