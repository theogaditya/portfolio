"use client"

import { ReactLenis } from "lenis/react"
import type { ReactNode } from "react"

export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 0.8, smoothWheel: true, touchMultiplier: 2 }}>
      {children}
    </ReactLenis>
  )
}
