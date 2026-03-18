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

let userCache: UserData | null | undefined = undefined

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [user, setUser] = useState<UserData | null>(userCache === undefined ? null : userCache)
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

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
    <header className={`fixed top-0 left-0 right-0 flex items-center justify-between px-6 py-3 lg:px-12 z-50 transition-all duration-300 ${isScrolled ? "bg-black/90 backdrop-blur-md shadow-[0_4px_20px_rgba(0,80,0,0.4)]" : "bg-transparent"}`}>
      <Link href="/" className="flex items-center gap-3">
        <Image 
          src="/wht-store-logo.png" 
          alt="Wht-Store" 
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
            className={`${isActive('/') ? 'text-green-400 bg-green-900/20' : 'text-gray-300 hover:text-green-400 hover:bg-green-900/20'} transition-all duration-200 px-4 py-2 rounded-lg`}
          >
            Início
          </Link>
          <Link 
            href="/planos" 
            className={`${isActive('/planos') ? 'text-green-400 bg-green-900/20' : 'text-gray-300 hover:text-green-400 hover:bg-green-900/20'} transition-all duration-200 px-4 py-2 rounded-lg`}
          >
            Planos
          </Link>
          <Link 
            href="/adicionais" 
            className={`${isActive('/adicionais') ? 'text-green-400 bg-green-900/20' : 'text-gray-300 hover:text-green-400 hover:bg-green-900/20'} transition-all duration-200 px-4 py-2 rounded-lg`}
          >
            Adicionais
          </Link>
          <Link 
            href="/tutoriais" 
            className={`${isActive('/tutoriais') ? 'text-green-400 bg-green-900/20' : 'text-gray-300 hover:text-green-400 hover:bg-green-900/20'} transition-all duration-200 px-4 py-2 rounded-lg`}
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
                className="w-10 h-10 rounded-full border-2 border-green-500"
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
              <div className="absolute right-0 mt-2 w-64 bg-[#0a1a0e] border border-green-900/50 rounded-xl shadow-2xl shadow-green-900/20 overflow-hidden">
                <div className="p-4 border-b border-green-900/30">
                  <div className="flex items-center gap-3">
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="w-12 h-12 rounded-full border border-green-700"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate text-white">{user.globalName || user.username}</p>
                      <p className="text-sm text-green-300/50 truncate">{user.email}</p>
                    </div>
                  </div>
                </div>

                <div className="py-2">
                  <Link 
                    href="/dashboard" 
                    className="w-full px-4 py-2 text-left hover:bg-green-900/20 transition-colors flex items-center gap-3 text-gray-300 hover:text-green-400"
                    onClick={() => setShowDropdown(false)}
                  >
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    Dashboard
                  </Link>

                  <button className="w-full px-4 py-2 text-left hover:bg-green-900/20 transition-colors flex items-center gap-3 text-gray-300 hover:text-green-400">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    Carteira
                  </button>

                  <button className="w-full px-4 py-2 text-left hover:bg-green-900/20 transition-colors flex items-center gap-3 text-gray-300 hover:text-green-400">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Configurações
                  </button>
                </div>

                <div className="border-t border-green-900/30">
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
            <button className="bg-gradient-to-br from-green-600 to-green-800 hover:from-green-500 hover:to-green-700 text-white px-6 py-2 rounded-lg transition-all duration-200 shadow-lg shadow-green-900/50 font-semibold">
              Entrar
            </button>
          </Link>
        )}
      </div>
    </header>
  )
}
