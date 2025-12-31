/* eslint-disable react/prop-types */
"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState, useMemo } from "react"
import Header from "@/app/components/Header"
import Footer from "@/app/components/Footer"

// Função para gerar posições consistentes
const generatePositions = (count: number, seed: number) => {
  const positions = []
  for (let i = 0; i < count; i++) {
    const x = ((seed + i * 7) % 100)
    const y = ((seed + i * 13) % 100)
    positions.push({ x, y })
  }
  return positions
}

// ServerCard com posições fixas
const ServerCard = ({ server }: { server: any }) => {
  const symbolPositions = useMemo(() => generatePositions(8, server.id), [server.id])
  const symbols = ['🎵', '🎶', '♪', '♫', '🎧', '🎤']

  return (
    <div className="relative flex-shrink-0 w-80 bg-[#1a1a1a] border border-gray-700/50 rounded-xl p-3 hover:bg-[#252525] transition-all duration-200 cursor-pointer overflow-hidden">
      {/* Fundo animado com símbolos */}
      <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
        {symbolPositions.map((pos, i) => (
          <div
            key={i}
            className="absolute text-4xl"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              animation: `float-symbol ${(i % 3) + 6}s infinite ease-in-out`,
              animationDelay: `${(i % 3)}s`,
            }}
          >
            {symbols[i % symbols.length]}
          </div>
        ))}
      </div>
      
      <div className="relative z-10 flex items-center space-x-3">
        <div className={`w-14 h-14 bg-gradient-to-br ${server.iconBg} rounded-xl flex items-center justify-center text-2xl shadow-lg flex-shrink-0`}>
          {server.icon}
        </div>
        <div className="flex-1 text-left min-w-0">
          <h3 className="text-white font-semibold text-sm mb-0.5 truncate">{server.name}</h3>
          <div className="flex items-center space-x-3 text-xs">
            <span className="flex items-center text-gray-400">
              <span className="w-1.5 h-1.5 bg-gray-500 rounded-full mr-1.5"></span>
              {server.members} membros
            </span>
            <span className="flex items-center text-green-400">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
              {server.online} online
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  const [isMounted, setIsMounted] = useState(false)
  
  const servers = [
    { id: 1, name: "Atentah Studio", icon: "🎨", iconBg: "from-gray-700 to-gray-900", members: "205", online: "20" },
    { id: 2, name: "💎 AeroTools Premium 💎", icon: "💎", iconBg: "from-gray-600 to-gray-800", members: "203", online: "20" },
    { id: 3, name: "BLACKOUT SHOP", icon: "🛍️", iconBg: "from-gray-800 to-black", members: "187", online: "18" },
    { id: 4, name: "Legends Store | #8K", icon: "🏪", iconBg: "from-gray-700 to-black", members: "7.6K", online: "764" },
    { id: 5, name: "VitinStore", icon: "🎮", iconBg: "from-gray-600 to-gray-900", members: "7.3K", online: "725" },
    { id: 6, name: "Suivex Community #5100", icon: "🦋", iconBg: "from-gray-700 to-gray-950", members: "5.0K", online: "502" },
  ]

  // Gerar partículas apenas no cliente
  const particles = useMemo(() => {
    if (!isMounted) return { white: [], orbs: [], gray: [], gold: [] }
    
    return {
      white: Array.from({ length: 80 }, (_, i) => ({
        size: Math.random() * 5 + 2,
        top: Math.random() * 100,
        left: Math.random() * 100,
        duration: Math.random() * 12 + 8,
        delay: Math.random() * 8,
        opacity: Math.random() * 0.8 + 0.3,
        blur: Math.random() * 0.5,
      })),
      orbs: Array.from({ length: 20 }, () => ({
        size: Math.random() * 20 + 12,
        top: Math.random() * 100,
        left: Math.random() * 100,
        duration: Math.random() * 18 + 15,
        delay: Math.random() * 6,
        opacity: Math.random() * 0.5 + 0.2,
      })),
      gray: Array.from({ length: 40 }, () => ({
        size: Math.random() * 6 + 2,
        top: Math.random() * 100,
        left: Math.random() * 100,
        duration: Math.random() * 16 + 12,
        delay: Math.random() * 10,
        opacity: Math.random() * 0.6 + 0.2,
        blur: Math.random() * 0.8,
      })),
      gold: Array.from({ length: 15 }, () => ({
        size: Math.random() * 4 + 2,
        top: Math.random() * 100,
        left: Math.random() * 100,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 8,
        opacity: Math.random() * 0.4 + 0.2,
        blur: Math.random() * 1,
      })),
    }
  }, [isMounted])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleDashboardClick = () => {
    const userData = localStorage.getItem('user')
    if (userData) {
      window.location.href = '/dashboard'
    } else {
      window.location.href = '/login'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-white relative overflow-hidden">
      {/* Partículas INTENSAS - apenas no cliente */}
      {isMounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Partículas brancas pequenas */}
          {particles.white.map((p, i) => (
            <div
              key={`white-${i}`}
              className="absolute rounded-full will-change-transform"
              style={{
                backgroundColor: `rgba(255, 255, 255, ${p.opacity})`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                top: `${p.top}%`,
                left: `${p.left}%`,
                animation: `float-up ${p.duration}s infinite linear`,
                animationDelay: `${p.delay}s`,
                filter: `blur(${p.blur}px)`,
              }}
            />
          ))}
          
          {/* Orbs GRANDES */}
          {particles.orbs.map((p, i) => (
            <div
              key={`orb-${i}`}
              className="absolute rounded-full blur-lg will-change-transform"
              style={{
                backgroundColor: `rgba(255, 255, 255, ${p.opacity})`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                top: `${p.top}%`,
                left: `${p.left}%`,
                animation: `float-diagonal ${p.duration}s infinite ease-in-out`,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}

          {/* Partículas cinzas */}
          {particles.gray.map((p, i) => (
            <div
              key={`gray-${i}`}
              className="absolute rounded-full will-change-transform"
              style={{
                backgroundColor: `rgba(200, 200, 200, ${p.opacity})`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                top: `${p.top}%`,
                left: `${p.left}%`,
                animation: `float-up ${p.duration}s infinite linear`,
                animationDelay: `${p.delay}s`,
                filter: `blur(${p.blur}px)`,
              }}
            />
          ))}
          
          {/* Partículas douradas */}
          {particles.gold.map((p, i) => (
            <div
              key={`gold-${i}`}
              className="absolute rounded-full will-change-transform"
              style={{
                backgroundColor: `rgba(217, 164, 65, ${p.opacity})`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                top: `${p.top}%`,
                left: `${p.left}%`,
                animation: `float-diagonal ${p.duration}s infinite ease-in-out`,
                animationDelay: `${p.delay}s`,
                filter: `blur(${p.blur}px)`,
              }}
            />
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes float-up {
          0% { transform: translateY(0) translateX(0); opacity: 0.3; }
          50% { opacity: 1; }
          100% { transform: translateY(-100vh) translateX(20px); opacity: 0; }
        }
        
        @keyframes float-diagonal {
          0%, 100% { transform: translate(0, 0); opacity: 0.5; }
          25% { transform: translate(30px, -30px); opacity: 0.8; }
          50% { transform: translate(60px, 0); opacity: 0.6; }
          75% { transform: translate(30px, 30px); opacity: 0.7; }
        }
        
        @keyframes natural-blink {
          0%, 85% { opacity: 1; }
          90%, 95% { opacity: 0.3; }
          100% { opacity: 1; }
        }
        
        @keyframes float-symbol {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(10px, -10px) rotate(5deg); }
          50% { transform: translate(-5px, -20px) rotate(-5deg); }
          75% { transform: translate(-10px, -10px) rotate(3deg); }
        }
        
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        
        .carousel-container:hover .carousel-track { animation-play-state: paused; }
        .carousel-track { animation: scroll 20s linear infinite; display: flex; }
      `}</style>

      {/* Overlay de gradiente sutil */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 pointer-events-none" />

      {/* Header Global */}
      <Header />

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center px-6 py-20 pt-32 text-center min-h-screen relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <div className="relative inline-block">
              <div className="absolute -top-12 left-0 transform -translate-x-2 -rotate-12 scale-x-[-1]">
                <span className="text-2xl" style={{ animation: "natural-blink 4s infinite ease-in-out" }}>
                  👑
                </span>
              </div>
              <span className="text-white font-bold tracking-wide">G-White Apps</span>
            </div>
          </h1>
          <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-gray-300">
            Seu futuro Bot está aqui.
          </h2>
          <div className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed space-y-0">
            <p className="text-balance">Eleve seu servidor Discord a um novo patamar com nossa tecnologia avançada.</p>
            <p className="text-balance">Automatize processos, melhore a experiência dos membros e simplifique a gestão.</p>
            <p className="text-balance">Transforme ideias em realidade com ferramentas poderosas e intuitivas.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={handleDashboardClick}
              className="bg-gradient-to-br from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white px-8 py-4 text-lg rounded-lg font-bold shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Ir para a Dashboard →
            </Button>
            <Link href="/planos">
              <Button className="bg-transparent hover:bg-white/10 text-white border-2 border-white/30 hover:border-white/50 px-8 py-4 text-lg rounded-lg font-semibold transform hover:scale-105 transition-all duration-200">
                Ver Planos
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Seção Nossos Clientes */}
      <section className="relative z-10 py-16 overflow-hidden">
        <div className="text-center mb-12 px-6">
          <h2 className="text-4xl font-bold mb-4 text-white">Nossos Clientes</h2>
          <p className="text-gray-400 text-base">
            Explore as melhores comunidades do Discord e conecte-se com milhares de pessoas que compartilham seus interesses.
          </p>
        </div>

        <div className="max-w-5xl mx-auto px-8">
          <div className="carousel-container relative w-full overflow-hidden">
            <div className="carousel-track">
              <div className="flex space-x-3 pr-3">
                {servers.map((server) => (
                  <ServerCard key={`first-${server.id}`} server={server} />
                ))}
              </div>
              <div className="flex space-x-3 pr-3">
                {servers.map((server) => (
                  <ServerCard key={`second-${server.id}`} server={server} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Global */}
      <Footer />
    </div>
  )
}