"use client"

import { motion } from "framer-motion"

interface AnimatedHeadingProps {
  children: string
  className?: string
  delay?: number
}

export function AnimatedHeading({ children, className = "", delay = 0 }: AnimatedHeadingProps) {
  const words = children.split(" ")

  return (
    <motion.h1
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.1,
            delayChildren: delay,
          },
        },
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          variants={{
            hidden: { opacity: 0, y: 50, rotateX: -90 },
            visible: {
              opacity: 1,
              y: 0,
              rotateX: 0,
              transition: {
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
              },
            },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  )
}

export function TypewriterText({ 
  text, 
  className = "",
  delay = 0,
  speed = 0.03
}: { 
  text: string
  className?: string
  delay?: number
  speed?: number
}) {
  return (
    <motion.p
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: speed,
            delayChildren: delay,
          },
        },
      }}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.p>
  )
}

export function GradientText({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode
  className?: string 
}) {
  return (
    <span className={`bg-linear-to-r from-foreground via-accent to-foreground bg-size-[200%_auto] animate-gradient bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  )
}

export function LetterPullUp({ 
  text, 
  className = "",
  delay = 0 
}: { 
  text: string
  className?: string
  delay?: number
}) {
  const letters = text.split("")

  return (
    <motion.div
      className={`flex ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.03,
            delayChildren: delay,
          },
        },
      }}
    >
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { y: 100, opacity: 0 },
            visible: {
              y: 0,
              opacity: 1,
              transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
              },
            },
          }}
          className={letter === " " ? "w-[0.25em]" : ""}
        >
          {letter}
        </motion.span>
      ))}
    </motion.div>
  )
}

export function BlurIn({ 
  children, 
  className = "",
  delay = 0 
}: { 
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function CountUp({ 
  target, 
  suffix = "",
  className = "",
  duration = 2
}: { 
  target: number
  suffix?: string
  className?: string
  duration?: number
}) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <motion.span
        initial={{ opacity: 1 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration }}
        onUpdate={(latest) => {
          // This is handled by framer-motion internally
        }}
      >
        {target}{suffix}
      </motion.span>
    </motion.span>
  )
}
