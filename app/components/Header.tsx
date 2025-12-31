"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

interface UserData {
  id: string
  username: string
  avatar: string
  email: string
  globalName?: string
}

// Cache global para evitar re-leitura do localStorage
let userCache: UserData | null | undefined = undefined

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  // Inicializa com o cache se existir
  const [user, setUser] = useState<UserData | null>(userCache === undefined ? null : userCache)
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  // Carrega apenas se ainda não carregou
  useEffect(() => {
    if (userCache === undefined) {
      try {
        const userData = localStorage.getItem('user')
        const parsedUser = userData ? JSON.parse(userData) : null
        userCache = parsedUser
        setUser(parsedUser)
      } catch (error) {
        console.error('Erro ao carregar usuário:', error)
        userCache = null
        setUser(null)
      }
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0)
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    userCache = null
    setUser(null)
    setShowDropdown(false)
    window.location.href = '/'
  }

  const isActive = (path: string) => pathname === path

  return (
    <header className={`fixed top-0 left-0 right-0 flex items-center justify-between px-6 py-3 lg:px-12 z-50 transition-all duration-300 ${isScrolled ? "bg-black/90 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.8)]" : "bg-transparent"}`}>
      <Link href="/" className="flex items-center">
        <Image 
          src="/gwhite-logo.png" 
          alt="G-White Apps" 
          width={100} 
          height={64} 
          className="h-16 w-auto"
          priority
        />
      </Link>

      <div className="flex items-center gap-4">
        <nav className="hidden md:flex items-center space-x-2">
          <Link 
            href="/" 
            className={`${isActive('/') ? 'text-white bg-white/10' : 'text-gray-300 hover:text-white hover:bg-white/10'} transition-all duration-200 px-4 py-2 rounded-lg`}
          >
            Início
          </Link>
          <Link 
            href="/planos" 
            className={`${isActive('/planos') ? 'text-white bg-white/10' : 'text-gray-300 hover:text-white hover:bg-white/10'} transition-all duration-200 px-4 py-2 rounded-lg`}
          >
            Planos
          </Link>
          <Link 
            href="/adicionais" 
            className={`${isActive('/adicionais') ? 'text-white bg-white/10' : 'text-gray-300 hover:text-white hover:bg-white/10'} transition-all duration-200 px-4 py-2 rounded-lg`}
          >
            Adicionais
          </Link>
          <Link 
            href="/tutoriais" 
            className={`${isActive('/tutoriais') ? 'text-white bg-white/10' : 'text-gray-300 hover:text-white hover:bg-white/10'} transition-all duration-200 px-4 py-2 rounded-lg`}
          >
            Tutoriais
          </Link>
        </nav>

        {user ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              aria-label="Menu do usuário"
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
                </div>

                <div className="py-2">
                  <Link 
                    href="/dashboard" 
                    className="w-full px-4 py-2 text-left hover:bg-white/5 transition-colors flex items-center gap-3"
                    onClick={() => setShowDropdown(false)}
                  >
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    Dashboard
                  </Link>

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
        ) : (
          <Link href="/login">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all duration-200 shadow-lg font-semibold">
              Entrar
            </button>
          </Link>
        )}
      </div>
    </header>
  )
}