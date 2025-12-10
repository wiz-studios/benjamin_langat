"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

interface ParallaxSectionProps {
  backgroundImage: string
  children: React.ReactNode
  overlay?: boolean
  speed?: number
}

export function ParallaxSection({ backgroundImage, children, overlay = true, speed = 0.5 }: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [offsetY, setOffsetY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const scrollPosition = window.scrollY
        const sectionTop = rect.top + scrollPosition
        const relativeScroll = scrollPosition - sectionTop + window.innerHeight
        setOffsetY(relativeScroll * speed)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [speed])

  return (
    <div ref={sectionRef} className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          transform: `translateY(${offsetY * 0.3}px)`,
          height: "120%",
          top: "-10%",
        }}
      />
      {overlay && <div className="absolute inset-0 bg-black/60" />}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
