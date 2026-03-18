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
  const [isMounted, setIsMounted] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsMounted(true)
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
      <div className="min-h-screen bg-gradient-to-br from-black via-[#030a04] to-black flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: 'rgba(34,197,94,0.4)', borderTopColor: 'transparent' }}></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#030a04] to-black text-white relative overflow-hidden">

      {isMounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(40)].map((_, i) => (
            <div key={`w-${i}`} className="absolute rounded-full"
              style={{
                backgroundColor: `rgba(255,255,255,${Math.random()*0.07+0.01})`,
                width: `${Math.random()*2+1}px`, height: `${Math.random()*2+1}px`,
                top: `${Math.random()*100}%`, left: `${Math.random()*100}%`,
                animation: `float-up ${Math.random()*15+10}s infinite linear`,
                animationDelay: `${Math.random()*10}s`,
              }}
            />
          ))}
          {[...Array(4)].map((_, i) => (
            <div key={`orb-${i}`} className="absolute rounded-full blur-3xl"
              style={{
                backgroundColor: `rgba(34,197,94,0.03)`,
                width: `${Math.random()*300+150}px`, height: `${Math.random()*300+150}px`,
                top: `${Math.random()*100}%`, left: `${Math.random()*100}%`,
                animation: `float-diagonal ${Math.random()*30+20}s infinite ease-in-out`,
                animationDelay: `${Math.random()*10}s`,
              }}
            />
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes float-up {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.2; }
          100% { transform: translateY(-100vh); opacity: 0; }
        }
        @keyframes float-diagonal {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, -30px); }
        }
      `}</style>

      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(34,197,94,0.03) 0%, transparent 60%)' }} />

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 flex items-center justify-between px-6 py-3 lg:px-12 z-50 transition-all duration-300 ${isScrolled ? "backdrop-blur-md" : "bg-transparent"}`}
        style={{ background: isScrolled ? 'rgba(0,0,0,0.9)' : 'transparent', borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
        <a href="/" className="flex items-center">
          <img src="/ChatGPT_Image_16_de_mar._de_2026_12_33_39.png" alt="Wht-Store" className="h-16 w-auto" />
        </a>

        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center space-x-1">
            {["Início", "Planos", "Adicionais", "Tutoriais"].map((item) => (
              <a key={item} href={item === "Início" ? "/" : `/${item.toLowerCase()}`}
                className="px-4 py-2 rounded-lg text-sm transition-all duration-200"
                style={{ color: 'rgba(255,255,255,0.35)' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.35)'; e.currentTarget.style.background = 'transparent' }}>
                {item}
              </a>
            ))}
          </nav>

          <div className="relative" ref={dropdownRef}>
            <button onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 transition-opacity hover:opacity-80">
              <img src={user.avatar} alt={user.username}
                className="w-9 h-9 rounded-full"
                style={{ border: '1px solid rgba(34,197,94,0.3)' }} />
              <svg className={`w-3.5 h-3.5 transition-transform ${showDropdown ? 'rotate-180' : ''}`}
                fill="none" stroke="rgba(255,255,255,0.3)" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-64 rounded-xl overflow-hidden"
                style={{ background: 'rgba(5,10,6,0.97)', border: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)', boxShadow: '0 20px 60px rgba(0,0,0,0.8)' }}>
                <div className="p-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <div className="flex items-center gap-3">
                    <img src={user.avatar} alt={user.username} className="w-10 h-10 rounded-full" style={{ border: '1px solid rgba(34,197,94,0.2)' }} />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate text-white">{user.globalName || user.username}</p>
                      <p className="text-xs truncate" style={{ color: 'rgba(255,255,255,0.25)' }}>{user.email}</p>
                    </div>
                  </div>
                </div>

                <div className="py-1">
                  {[
                    { icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z", label: "Aplicações" },
                    { icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z", label: "Carteira" },
                    { icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z", label: "Configurações" },
                  ].map((item) => (
                    <button key={item.label} className="w-full px-4 py-2.5 text-left flex items-center gap-3 text-sm transition-all"
                      style={{ color: 'rgba(255,255,255,0.4)' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)' }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.4)' }}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                      </svg>
                      {item.label}
                    </button>
                  ))}
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <button onClick={handleLogout}
                    className="w-full px-4 py-3 text-left flex items-center gap-3 text-sm transition-all"
                    style={{ color: 'rgba(239,68,68,0.6)' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.06)'; e.currentTarget.style.color = 'rgba(239,68,68,0.9)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(239,68,68,0.6)' }}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* Main */}
      <main className="pt-32 px-6 lg:px-12 pb-20 relative z-10 max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="text-sm mb-2" style={{ color: 'rgba(134,239,172,0.5)' }}>Dashboard</p>
          <h1 className="text-4xl lg:text-5xl font-bold mb-3 text-white">
            Painel de Controle
          </h1>
          <p className="text-base" style={{ color: 'rgba(255,255,255,0.25)' }}>
            Gerencie seus bots e monitore o desempenho em tempo real
          </p>
        </div>

        {/* Stats rápidos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {[
            { label: "Bots Ativos", value: "0", icon: "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" },
            { label: "Servidores", value: "0", icon: "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" },
            { label: "Comandos Usados", value: "0", icon: "M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
          ].map((stat, i) => (
            <div key={i} className="rounded-2xl p-5 transition-all duration-300"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(34,197,94,0.15)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)' }}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>{stat.label}</span>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.12)' }}>
                  <svg className="w-4 h-4" fill="none" stroke="rgba(134,239,172,0.5)" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={stat.icon} />
                  </svg>
                </div>
              </div>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Empty state */}
        <div className="flex flex-col items-center justify-center py-20 rounded-2xl"
          style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)' }}>
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
            style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.1)' }}>
            <svg className="w-10 h-10" fill="none" stroke="rgba(134,239,172,0.4)" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2 text-white">Comece sua jornada!</h2>
          <p className="text-sm mb-1" style={{ color: 'rgba(255,255,255,0.25)' }}>Você ainda não tem nenhum bot configurado.</p>
          <p className="text-sm mb-8" style={{ color: 'rgba(255,255,255,0.15)' }}>Que tal criar algo incrível?</p>
          <button className="px-7 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all duration-300 hover:scale-105"
            style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', color: 'rgba(134,239,172,0.8)' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(34,197,94,0.18)'; e.currentTarget.style.borderColor = 'rgba(34,197,94,0.35)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(34,197,94,0.1)'; e.currentTarget.style.borderColor = 'rgba(34,197,94,0.2)' }}>
            Criar meu primeiro bot
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="flex flex-col sm:flex-row items-center justify-between px-6 py-5 lg:px-12 relative z-10 gap-4"
        style={{ background: 'rgba(0,0,0,0.8)', borderTop: '1px solid rgba(255,255,255,0.04)', backdropFilter: 'blur(10px)' }}>
        <div className="flex items-center space-x-6">
          {[
            { label: "Termos de Serviço", icon: "📋" },
            { label: "Discord", svg: true },
            { label: "Youtube", svg2: true },
          ].map((item, i) => (
            <a key={i} href="#" className="flex items-center gap-1.5 text-sm transition-colors"
              style={{ color: 'rgba(255,255,255,0.2)' }}
              onMouseEnter={e => e.currentTarget.style.color = 'rgba(134,239,172,0.6)'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.2)'}>
              {item.icon && <span>{item.icon}</span>}
              {item.svg && <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/></svg>}
              {item.svg2 && <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>}
              {item.label}
            </a>
          ))}
        </div>
        <div className="text-xs" style={{ color: 'rgba(255,255,255,0.12)' }}>© 2025 Wht-Store. Todos os direitos reservados</div>
      </footer>
    </div>
  )
}
