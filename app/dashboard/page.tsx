"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"

interface UserData {
  id: string
  username: string
  avatar: string
  email: string
  globalName?: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<UserData | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push('/login')
    }

    const handleScroll = () => setIsScrolled(window.scrollY > 0)
    window.addEventListener("scroll", handleScroll)

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/login')
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-white relative overflow-hidden">
      <style dangerouslySetInnerHTML={{__html: `
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
      `}} />

      {/* Partículas INTENSAS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Partículas brancas pequenas */}
        {[...Array(120)].map((_, i) => {
          const opacity = Math.random() * 0.8 + 0.3;
          const size = Math.random() * 5 + 2;
          const topPos = Math.random() * 100;
          const leftPos = Math.random() * 100;
          const duration = Math.random() * 12 + 8;
          const delay = Math.random() * 8;
          const blur = Math.random() * 0.5;
          
          return (
            <div
              key={`white-${i}`}
              className="absolute rounded-full will-change-transform"
              style={{
                backgroundColor: `rgba(255, 255, 255, ${opacity})`,
                width: `${size}px`,
                height: `${size}px`,
                top: `${topPos}%`,
                left: `${leftPos}%`,
                animation: `float-up ${duration}s infinite linear`,
                animationDelay: `${delay}s`,
                filter: `blur(${blur}px)`,
              }}
            />
          );
        })}
        
        {/* Orbs GRANDES e BRILHANTES */}
        {[...Array(30)].map((_, i) => {
          const opacity = Math.random() * 0.5 + 0.2;
          const size = Math.random() * 20 + 12;
          const topPos = Math.random() * 100;
          const leftPos = Math.random() * 100;
          const duration = Math.random() * 18 + 15;
          const delay = Math.random() * 6;
          
          return (
            <div
              key={`orb-${i}`}
              className="absolute rounded-full blur-lg will-change-transform"
              style={{
                backgroundColor: `rgba(255, 255, 255, ${opacity})`,
                width: `${size}px`,
                height: `${size}px`,
                top: `${topPos}%`,
                left: `${leftPos}%`,
                animation: `float-diagonal ${duration}s infinite ease-in-out`,
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}

        {/* Partículas cinzas médias */}
        {[...Array(60)].map((_, i) => {
          const opacity = Math.random() * 0.6 + 0.2;
          const size = Math.random() * 6 + 2;
          const topPos = Math.random() * 100;
          const leftPos = Math.random() * 100;
          const duration = Math.random() * 16 + 12;
          const delay = Math.random() * 10;
          const blur = Math.random() * 0.8;
          
          return (
            <div
              key={`gray-${i}`}
              className="absolute rounded-full will-change-transform"
              style={{
                backgroundColor: `rgba(200, 200, 200, ${opacity})`,
                width: `${size}px`,
                height: `${size}px`,
                top: `${topPos}%`,
                left: `${leftPos}%`,
                animation: `float-up ${duration}s infinite linear`,
                animationDelay: `${delay}s`,
                filter: `blur(${blur}px)`,
              }}
            />
          );
        })}
        
        {/* Partículas douradas */}
        {[...Array(25)].map((_, i) => {
          const opacity = Math.random() * 0.4 + 0.2;
          const size = Math.random() * 4 + 2;
          const topPos = Math.random() * 100;
          const leftPos = Math.random() * 100;
          const duration = Math.random() * 20 + 15;
          const delay = Math.random() * 8;
          const blur = Math.random() * 1;
          
          return (
            <div
              key={`gold-${i}`}
              className="absolute rounded-full will-change-transform"
              style={{
                backgroundColor: `rgba(217, 164, 65, ${opacity})`,
                width: `${size}px`,
                height: `${size}px`,
                top: `${topPos}%`,
                left: `${leftPos}%`,
                animation: `float-diagonal ${duration}s infinite ease-in-out`,
                animationDelay: `${delay}s`,
                filter: `blur(${blur}px)`,
              }}
            />
          );
        })}
      </div>
      
      {/* Overlay de gradiente sutil */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 pointer-events-none" />

      {/* Efeitos de luz de fundo */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-300/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>

      {/* Header FIXO */}
      <header className={`fixed top-0 left-0 right-0 flex items-center justify-between px-6 py-3 lg:px-12 z-50 transition-all duration-300 ${isScrolled ? "bg-black/90 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.8)]" : "bg-transparent"}`}>
        <a href="/" className="flex items-center">
          <img src="/gwhite-logo.png" alt="G-White Apps" className="h-16 w-auto" />
        </a>

        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center space-x-2">
            <a href="/" className="text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200 px-4 py-2 rounded-lg">
              Início
            </a>
            <a href="/planos" className="text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200 px-4 py-2 rounded-lg">
              Planos
            </a>
            <a href="/adicionais" className="text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200 px-4 py-2 rounded-lg">
              Adicionais
            </a>
            <a href="/tutoriais" className="text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200 px-4 py-2 rounded-lg">
              Tutoriais
            </a>
          </nav>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <img
                src={user.avatar}
                alt={user.username}
                className="w-10 h-10 rounded-full border-2 border-purple-500"
              />
              <svg
                className={`w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-[#1a1a1a] border border-gray-800 rounded-xl shadow-2xl overflow-hidden">
                <div className="p-4 border-b border-gray-800">
                  <div className="flex items-center gap-3">
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate">{user.globalName || user.username}</p>
                      <p className="text-sm text-gray-400 truncate">{user.email}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Último acesso: Hoje às 20:54</p>
                </div>

                <div className="py-2">
                  <button className="w-full px-4 py-2 text-left hover:bg-white/5 transition-colors flex items-center gap-3">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    Aplicações
                  </button>

                  <button className="w-full px-4 py-2 text-left hover:bg-white/5 transition-colors flex items-center gap-3">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    Carteira
                  </button>

                  <button className="w-full px-4 py-2 text-left hover:bg-white/5 transition-colors flex items-center gap-3">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Configurações
                  </button>
                </div>

                <div className="border-t border-gray-800">
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 text-left hover:bg-red-500/10 transition-colors flex items-center gap-3 text-red-400"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sair da conta
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="pt-32 px-6 lg:px-12 pb-20 relative z-10 max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Painel de <span className="text-purple-500">Controle</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Gerencie seus bots e monitore o desempenho em tempo real
          </p>
        </div>

        <div className="flex flex-col items-center justify-center py-20">
          <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-3xl p-12 mb-8">
            <svg className="w-24 h-24 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </div>

          <h2 className="text-3xl font-bold mb-3">Comece sua jornada!</h2>
          <p className="text-gray-400 mb-2">Você ainda não tem nenhum bot configurado.</p>
          <p className="text-gray-500 mb-8">Que tal criar algo incrível?</p>

          <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-purple-500/50 flex items-center gap-2">
            Criar meu primeiro bot
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </main>

      {/* Footer FIXO */}
      <footer className="flex flex-col sm:flex-row items-center justify-between px-6 py-6 lg:px-12 border-t border-gray-800 relative z-10 bg-black/90 backdrop-blur-md gap-4">
        <div className="flex items-center space-x-6">
          <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2">
            <span>📋</span> Termos de Serviço
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/></svg>
            Discord
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            Youtube
          </a>
        </div>
        <div className="text-gray-500 text-xs">© 2025 G-White Apps. Todos os direitos reservados</div>
      </footer>
    </div>
  )
}