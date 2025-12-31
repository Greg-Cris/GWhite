"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Header from "@/app/components/Header"

export default function LoginPage() {
  const [isLoadingLogin, setIsLoadingLogin] = useState(false)

  const handleDiscordLogin = () => {
    setIsLoadingLogin(true)
    const clientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID
    const redirectUri = "http://localhost:3000/auth/callback"
    const scope = "identify%20email%20guilds"
    
    window.location.href = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${scope}`
  }

  const whiteParticles = [...Array(80)].map((_, i) => ({
    opacity: Math.random() * 0.8 + 0.3,
    size: Math.random() * 5 + 2,
    topPos: Math.random() * 100,
    leftPos: Math.random() * 100,
    duration: Math.random() * 12 + 8,
    delay: Math.random() * 8,
    blur: Math.random() * 0.5,
  }))

  const orbs = [...Array(20)].map((_, i) => ({
    opacity: Math.random() * 0.5 + 0.2,
    size: Math.random() * 20 + 12,
    topPos: Math.random() * 100,
    leftPos: Math.random() * 100,
    duration: Math.random() * 18 + 15,
    delay: Math.random() * 6,
  }))

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

      {/* Partículas Animadas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {whiteParticles.map((particle, i) => (
          <div
            key={`white-${i}`}
            className="absolute rounded-full will-change-transform"
            style={{
              backgroundColor: `rgba(255, 255, 255, ${particle.opacity})`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              top: `${particle.topPos}%`,
              left: `${particle.leftPos}%`,
              animation: `float-up ${particle.duration}s infinite linear`,
              animationDelay: `${particle.delay}s`,
              filter: `blur(${particle.blur}px)`,
            }}
          />
        ))}
        
        {orbs.map((orb, i) => (
          <div
            key={`orb-${i}`}
            className="absolute rounded-full blur-lg will-change-transform"
            style={{
              backgroundColor: `rgba(255, 255, 255, ${orb.opacity})`,
              width: `${orb.size}px`,
              height: `${orb.size}px`,
              top: `${orb.topPos}%`,
              left: `${orb.leftPos}%`,
              animation: `float-diagonal ${orb.duration}s infinite ease-in-out`,
              animationDelay: `${orb.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 pointer-events-none" />

      {/* Header Global */}
      <Header />

      {/* Main Content */}
      <main className="flex items-center justify-center min-h-screen px-6 relative z-10 pt-20">
        <div className="w-full max-w-md">
          {/* Logo e Título */}
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold mb-2">
              G-White <span className="text-purple-500">Apps</span>
            </h1>
            <p className="text-gray-400">Acesse sua conta</p>
          </div>

          {/* Card de Login */}
          <div className="bg-[#1a1a1a] border border-gray-700/50 rounded-2xl p-7 backdrop-blur-md">
            <h2 className="text-xl font-bold text-center mb-6">Como você quer entrar?</h2>
            
            {/* Botão Discord */}
            <Button 
              onClick={handleDiscordLogin}
              disabled={isLoadingLogin}
              className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white py-7 rounded-xl font-semibold text-base mb-4 flex items-center justify-center gap-3 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoadingLogin ? (
                <>
                  <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Redirecionando...
                </>
              ) : (
                <>
                  <svg className="w-6 h-6" viewBox="0 0 71 55" fill="currentColor">
                    <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978Z"/>
                  </svg>
                  Continuar com Discord
                </>
              )}
            </Button>

            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-gray-700"></div>
              <span className="text-gray-500 text-sm">ou</span>
              <div className="flex-1 h-px bg-gray-700"></div>
            </div>

            {/* Botão Email */}
            <Button 
              disabled
              className="w-full bg-gray-700 hover:bg-gray-600 text-white py-7 rounded-xl font-semibold text-base flex items-center justify-center gap-3 transition-all duration-200 opacity-50 cursor-not-allowed"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Continuar com Email
            </Button>

            <p className="text-gray-500 text-xs text-center mt-5">
              O login por email só funciona se você já fez com Discord anteriormente.
            </p>
          </div>

          {/* Termos */}
          <p className="text-gray-500 text-xs text-center mt-5">
            Ao continuar, você concorda com nossos{" "}
            <a href="#" className="text-purple-500 hover:text-purple-400">
              Termos de Serviço
            </a>
          </p>
        </div>
      </main>
    </div>
  )
}