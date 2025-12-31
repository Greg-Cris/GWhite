"use client"

import { useEffect, useState, useRef } from "react"
import { useSearchParams, useRouter } from "next/navigation"

export default function AuthCallback() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<string>("Processando...")
  const hasProcessed = useRef(false)

  const exchangeCodeForToken = async (code: string) => {
    try {
      setStatus("Autenticando com Discord...")
      console.log("🔄 Iniciando troca de código...")
      
      const response = await fetch("/api/auth/discord", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      })

      const data = await response.json()
      console.log("📦 Resposta da API:", data)

      if (!response.ok) {
        console.error("❌ Erro da API:", data)
        throw new Error(data.error || data.hint || "Erro ao processar login")
      }
      
      setStatus("Login realizado com sucesso!")
      console.log("✅ Dados do usuário:", data.user)
      
      // Salvar dados do usuário no localStorage
      localStorage.setItem('user', JSON.stringify(data.user))
      console.log("💾 Usuário salvo no localStorage")
      
      // Redirecionar para dashboard
      console.log("🔄 Redirecionando para dashboard...")
      setTimeout(() => {
        router.push("/dashboard")
      }, 1500)
      
    } catch (err) {
      console.error("❌ Erro no login:", err)
      const errorMessage = err instanceof Error ? err.message : "Erro ao processar o login. Tente novamente."
      setError(errorMessage)
      
      // Esperar 5 segundos antes de redirecionar
      setTimeout(() => router.push("/login"), 5000)
    }
  }

  useEffect(() => {
    // Evitar processamento duplicado (React Strict Mode chama useEffect 2x)
    if (hasProcessed.current) {
      console.log("⚠️ Já está processando, ignorando chamada duplicada...")
      return
    }

    const code = searchParams.get("code")
    const errorParam = searchParams.get("error")
    
    if (errorParam) {
      setError("Você cancelou o login ou ocorreu um erro.")
      setTimeout(() => router.push("/login"), 3000)
      return
    }
    
    if (code) {
      hasProcessed.current = true
      console.log("🎯 Processando código pela primeira vez...")
      exchangeCodeForToken(code)
    } else {
      setError("Nenhum código foi recebido.")
      setTimeout(() => router.push("/login"), 3000)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-white flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        {error ? (
          <div className="space-y-4">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold mb-2">Ops!</h1>
            <p className="text-gray-400">{error}</p>
            <p className="text-gray-500 text-sm mt-4">Redirecionando para a página de login...</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="relative inline-block">
              <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-purple-500"></div>
              <div className="absolute inset-0 rounded-full h-20 w-20 border-4 border-purple-500/20"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold mb-2">{status}</h1>
              <p className="text-gray-400">Aguarde um momento</p>
            </div>
            <div className="flex justify-center gap-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}