/* eslint-disable react/prop-types */
"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useMemo } from "react"
import Header from "@/app/components/Header"
import Footer from "@/app/components/Footer"

const generatePositions = (count: number, seed: number) => {
  const positions = []
  for (let i = 0; i < count; i++) {
    const x = ((seed + i * 7) % 100)
    const y = ((seed + i * 13) % 100)
    positions.push({ x, y })
  }
  return positions
}

const ServerCard = ({ server }: { server: any }) => {
  const symbolPositions = useMemo(() => generatePositions(8, server.id), [server.id])
  const symbols = ['🎵', '🎶', '♪', '♫', '🎧', '🎤']

  return (
    <div className="relative flex-shrink-0 w-80 bg-[#0a1a0e] border border-green-900/50 rounded-xl p-3 hover:bg-[#0d2212] transition-all duration-200 cursor-pointer overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
        {symbolPositions.map((pos, i) => (
          <div key={i} className="absolute text-4xl"
            style={{ left: `${pos.x}%`, top: `${pos.y}%`, animation: `float-symbol ${(i % 3) + 6}s infinite ease-in-out`, animationDelay: `${(i % 3)}s` }}>
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
  const servers = [
    { id: 1, name: "Atentah Studio", icon: "🎨", iconBg: "from-green-900 to-green-950", members: "205", online: "20" },
    { id: 2, name: "💎 AeroTools Premium 💎", icon: "💎", iconBg: "from-green-800 to-green-950", members: "203", online: "20" },
    { id: 3, name: "BLACKOUT SHOP", icon: "🛍️", iconBg: "from-green-950 to-black", members: "187", online: "18" },
    { id: 4, name: "Legends Store | #8K", icon: "🏪", iconBg: "from-green-900 to-black", members: "7.6K", online: "764" },
    { id: 5, name: "VitinStore", icon: "🎮", iconBg: "from-green-800 to-green-950", members: "7.3K", online: "725" },
    { id: 6, name: "Suivex Community #5100", icon: "🦋", iconBg: "from-green-900 to-green-950", members: "5.0K", online: "502" },
  ]

  const handleDashboardClick = () => {
    const userData = localStorage.getItem('user')
    if (userData) { window.location.href = '/dashboard' }
    else { window.location.href = '/login' }
  }

  return (
    <div className="min-h-screen text-white relative" style={{ zIndex: 1 }}>

      <style dangerouslySetInnerHTML={{ __html: `
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
      `}} />

      <div className="absolute inset-0 bg-gradient-to-r from-green-950/10 via-transparent to-green-950/10 pointer-events-none" />

      <Header />

      <main className="flex flex-col items-center justify-center px-6 py-20 pt-32 text-center min-h-screen relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <div className="relative inline-block">
              <div className="absolute -top-12 left-0 transform -translate-x-2 -rotate-12 scale-x-[-1]">
                <span className="text-2xl" style={{ animation: "natural-blink 4s infinite ease-in-out" }}>🐺</span>
              </div>
              <img src="/wht-store-logo.png" alt="Wht-Store" className="h-32 lg:h-40 w-auto mx-auto" />
            </div>
          </h1>
          <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-green-100/80">
            Seu futuro Bot está aqui.
          </h2>
          <div className="text-xl text-green-200/50 mb-12 max-w-3xl mx-auto leading-relaxed space-y-0">
            <p className="text-balance">Eleve seu servidor Discord a um novo patamar com nossa tecnologia avançada.</p>
            <p className="text-balance">Automatize processos, melhore a experiência dos membros e simplifique a gestão.</p>
            <p className="text-balance">Transforme ideias em realidade com ferramentas poderosas e intuitivas.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button onClick={handleDashboardClick}
              className="bg-gradient-to-br from-green-600 to-green-800 hover:from-green-500 hover:to-green-700 text-white px-8 py-4 text-lg rounded-lg font-bold shadow-xl shadow-green-900/50 transform hover:scale-105 transition-all duration-200">
              Ir para a Dashboard →
            </Button>
            <Link href="/planos">
              <Button className="bg-transparent hover:bg-green-900/20 text-white border-2 border-green-800/50 hover:border-green-600/70 px-8 py-4 text-lg rounded-lg font-semibold transform hover:scale-105 transition-all duration-200">
                Ver Planos
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <section className="relative z-10 py-16 overflow-hidden">
        <div className="text-center mb-12 px-6">
          <h2 className="text-4xl font-bold mb-4 text-white">Nossos Clientes</h2>
          <p className="text-green-200/50 text-base">
            Explore as melhores comunidades do Discord e conecte-se com milhares de pessoas que compartilham seus interesses.
          </p>
        </div>
        <div className="max-w-5xl mx-auto px-8">
          <div className="carousel-container relative w-full overflow-hidden">
            <div className="carousel-track">
              <div className="flex space-x-3 pr-3">
                {servers.map((server) => <ServerCard key={`first-${server.id}`} server={server} />)}
              </div>
              <div className="flex space-x-3 pr-3">
                {servers.map((server) => <ServerCard key={`second-${server.id}`} server={server} />)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
