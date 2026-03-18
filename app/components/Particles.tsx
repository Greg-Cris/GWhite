"use client"

import { useEffect, useState, useMemo } from "react"

interface ParticlesProps {
  intensity?: "light" | "medium" | "strong"
}

function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

export default function Particles({ intensity = "medium" }: ParticlesProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => { setIsMounted(true) }, [])

  const config = {
    light:  { dots: 60,  orbs: 3,  dotOpacity: 0.15, orbOpacity: 0.04 },
    medium: { dots: 100, orbs: 6,  dotOpacity: 0.25, orbOpacity: 0.06 },
    strong: { dots: 150, orbs: 10, dotOpacity: 0.45, orbOpacity: 0.09 },
  }[intensity]

  const dots = useMemo(() => Array.from({ length: config.dots }, (_, i) => ({
    opacity:  seededRandom(i * 5 + 0) * config.dotOpacity + 0.1,
    size:     seededRandom(i * 5 + 1) * 4 + 1,
    left:     seededRandom(i * 5 + 3) * 100,
    duration: seededRandom(i * 5 + 4) * 8 + 6,
    delay:    seededRandom(i * 5 + 5) * 10,
    sway:     seededRandom(i * 5 + 6) * 40 - 20,
  })), [config.dots, config.dotOpacity])

  const orbs = useMemo(() => Array.from({ length: config.orbs }, (_, i) => ({
    opacity:  seededRandom(i * 6 + 100) * config.orbOpacity + 0.02,
    size:     seededRandom(i * 6 + 101) * 250 + 100,
    top:      seededRandom(i * 6 + 102) * 100,
    left:     seededRandom(i * 6 + 103) * 100,
    duration: seededRandom(i * 6 + 104) * 25 + 20,
    delay:    seededRandom(i * 6 + 105) * 10,
  })), [config.orbs, config.orbOpacity])

  if (!isMounted) return null

  return (
    <>
      <style jsx>{`
        @keyframes snow-fall {
          0%   { transform: translateY(-10px) translateX(0px); opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 0.6; }
          100% { transform: translateY(100vh) translateX(var(--sway)); opacity: 0; }
        }
        @keyframes float-diagonal {
          0%, 100% { transform: translate(0, 0); }
          50%       { transform: translate(30px, -30px); }
        }
      `}</style>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Partículas nevando de cima para baixo */}
        {dots.map((p, i) => (
          <div key={`dot-${i}`} className="absolute rounded-full"
            style={{
              backgroundColor: `rgba(255,255,255,${p.opacity})`,
              width:  `${p.size}px`,
              height: `${p.size}px`,
              top:    `-10px`,
              left:   `${p.left}%`,
              '--sway': `${p.sway}px`,
              animation:      `snow-fall ${p.duration}s infinite linear`,
              animationDelay: `${p.delay}s`,
            } as React.CSSProperties}
          />
        ))}

        {/* Orbs verdes suaves no fundo */}
        {orbs.map((p, i) => (
          <div key={`orb-${i}`} className="absolute rounded-full blur-3xl"
            style={{
              backgroundColor: `rgba(34,197,94,${p.opacity})`,
              width:  `${p.size}px`,
              height: `${p.size}px`,
              top:    `${p.top}%`,
              left:   `${p.left}%`,
              animation:      `float-diagonal ${p.duration}s infinite ease-in-out`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>
    </>
  )
}
