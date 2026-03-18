"use client"

import { useEffect, useState, useMemo } from "react"

interface ParticlesProps {
  intensity?: "light" | "medium" | "strong"
}

export default function Particles({ intensity = "medium" }: ParticlesProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => { setIsMounted(true) }, [])

  const config = {
    light:  { dots: 30, orbs: 3,  dotOpacity: 0.08, orbOpacity: 0.04 },
    medium: { dots: 60, orbs: 6,  dotOpacity: 0.15, orbOpacity: 0.06 },
    strong: { dots: 90, orbs: 10, dotOpacity: 0.25, orbOpacity: 0.09 },
  }[intensity]

  const dots = useMemo(() => Array.from({ length: config.dots }, (_, i) => ({
    opacity: Math.random() * config.dotOpacity + 0.03,
    size: Math.random() * 3 + 1,
    top: Math.random() * 100,
    left: Math.random() * 100,
    duration: Math.random() * 14 + 10,
    delay: Math.random() * 10,
  })), [])

  const orbs = useMemo(() => Array.from({ length: config.orbs }, (_, i) => ({
    opacity: Math.random() * config.orbOpacity + 0.02,
    size: Math.random() * 250 + 100,
    top: Math.random() * 100,
    left: Math.random() * 100,
    duration: Math.random() * 25 + 20,
    delay: Math.random() * 10,
  })), [])

  if (!isMounted) return null

  return (
    <>
      <style jsx>{`
        @keyframes float-up {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 0.4; }
          100% { transform: translateY(-100vh); opacity: 0; }
        }
        @keyframes float-diagonal {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, -30px); }
        }
      `}</style>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Pontos brancos */}
        {dots.map((p, i) => (
          <div key={`dot-${i}`} className="absolute rounded-full"
            style={{
              backgroundColor: `rgba(255,255,255,${p.opacity})`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              top: `${p.top}%`,
              left: `${p.left}%`,
              animation: `float-up ${p.duration}s infinite linear`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}

        {/* Orbs verdes suaves */}
        {orbs.map((p, i) => (
          <div key={`orb-${i}`} className="absolute rounded-full blur-3xl"
            style={{
              backgroundColor: `rgba(34,197,94,${p.opacity})`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              top: `${p.top}%`,
              left: `${p.left}%`,
              animation: `float-diagonal ${p.duration}s infinite ease-in-out`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>
    </>
  )
}
