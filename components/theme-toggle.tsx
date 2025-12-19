"use client"

import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState, useRef } from "react"
import { createPortal } from "react-dom"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [lastClickTime, setLastClickTime] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setMounted(true)
    // Clear theme from localStorage to prevent persistence
    localStorage.removeItem('theme')
  }, [])

  // Separate effect for showing hint - runs after mounted
  useEffect(() => {
    if (!mounted) return
    
    // Show hint after 3 seconds every visit
    const showTimer = setTimeout(() => {
      setShowHint(true)
    }, 3000)
    
    // Hide hint after 13 seconds total
    const hideTimer = setTimeout(() => {
      setShowHint(false)
    }, 10000)
    
    return () => {
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
    }
  }, [mounted])

  // Update tooltip position when showing or on scroll/resize
  useEffect(() => {
    const updatePosition = () => {
      if (showHint && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect()
        setTooltipPosition({
          x: rect.left + rect.width / 2,
          y: rect.bottom + 8
        })
      }
    }
    
    updatePosition()
    window.addEventListener('scroll', updatePosition)
    window.addEventListener('resize', updatePosition)
    
    return () => {
      window.removeEventListener('scroll', updatePosition)
      window.removeEventListener('resize', updatePosition)
    }
  }, [showHint])

  // Handle theme cycling with hidden retro mode
  const handleClick = () => {
    // Hide hint when user interacts
    if (showHint) {
      setShowHint(false)
    }
    
    const now = Date.now()
    
    // Check for rapid triple-click to unlock retro theme
    if (now - lastClickTime < 500) {
      setClickCount(prev => prev + 1)
    } else {
      setClickCount(1)
    }
    setLastClickTime(now)

    // Triple-click detected - toggle retro mode
    if (clickCount >= 2) {
      if (theme === "retro") {
        setTheme("dark")
      } else {
        setTheme("retro")
      }
      setClickCount(0)
      return
    }

    // Normal toggle between light and dark
    if (theme === "retro") {
      setTheme("light")
    } else {
      setTheme(theme === "light" ? "dark" : "light")
    }
  }

  // Apply theme class to html element for retro theme
  useEffect(() => {
    if (mounted) {
      const html = document.documentElement
      html.classList.remove("light", "dark", "retro")
      if (theme) {
        html.classList.add(theme)
      }
    }
  }, [theme, mounted])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="relative">
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    )
  }

  return (
    <div className="relative">
      <Button 
        ref={buttonRef}
        variant="ghost" 
        size="icon" 
        onClick={handleClick}
        className={`relative overflow-hidden ${showHint ? 'ring-2 ring-accent ring-offset-2 ring-offset-background animate-pulse' : ''}`}
      >
        <AnimatePresence mode="wait">
          {theme === "light" && (
            <motion.div
              key="sun"
              initial={{ rotate: -90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Sun className="h-[1.2rem] w-[1.2rem]" />
            </motion.div>
          )}
          {theme === "dark" && (
            <motion.div
              key="moon"
              initial={{ rotate: 90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -90, scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Moon className="h-[1.2rem] w-[1.2rem]" />
            </motion.div>
          )}
          {theme === "retro" && (
            <motion.div
              key="retro"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <Monitor className="h-[1.2rem] w-[1.2rem]" />
            </motion.div>
          )}
        </AnimatePresence>
        <span className="sr-only">Toggle theme (triple-click for terminal mode)</span>
      </Button>
      
      {/* Click count indicator */}
      {clickCount > 0 && clickCount < 3 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full flex items-center justify-center"
        >
          <span className="text-[10px] font-bold text-background">{clickCount}</span>
        </motion.div>
      )}

      {/* Floating hint tooltip - rendered via portal to avoid clipping */}
      {mounted && createPortal(
        <AnimatePresence>
          {showHint && tooltipPosition.x > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -5, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -5, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="fixed z-[9999] pointer-events-none -translate-x-1/2"
              style={{
                left: `${tooltipPosition.x}px`,
                top: `${tooltipPosition.y}px`,
              }}
            >
              <div className="bg-background border border-border rounded-lg px-3 py-2 shadow-lg whitespace-nowrap relative">
                <p className="text-foreground text-xs font-medium flex items-center gap-1.5">
                  <span>✨</span> 
                  Triple-click for terminal mode
                </p>
                {/* Arrow pointing up */}
                <div className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-background border-l border-t border-border rotate-45" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  )
}
