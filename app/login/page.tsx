"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Header from "@/app/components/Header"

export default function LoginPage() {
  const [isLoadingLogin, setIsLoadingLogin] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => { setIsMounted(true) }, [])

  const handleDiscordLogin = () => {
    setIsLoadingLogin(true)
    const clientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID
    const redirectUri = "http://localhost:3000/auth/callback"
    const scope = "identify%20email%20guilds"
    window.location.href = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${scope}`
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
                backgroundColor: `rgba(34,197,94,0.04)`,
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
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(34,197,94,0.04) 0%, transparent 60%)' }} />

      <Header />

      <main className="flex items-center justify-center min-h-screen px-6 relative z-10 pt-20">
        <div className="w-full max-w-md">

          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
              style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.1)', color: 'rgba(134,239,172,0.5)' }}>
              🐺 Wht-Store
            </div>
            <h1 className="text-3xl font-bold mb-2 text-white">Bem-vindo de volta</h1>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.25)' }}>Acesse sua conta para continuar</p>
          </div>

          <div className="rounded-2xl p-7 relative overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)' }}>

            <div className="absolute top-0 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(34,197,94,0.2), transparent)' }} />

            <h2 className="text-base font-semibold text-center mb-6" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Como você quer entrar?
            </h2>

            <button
              onClick={handleDiscordLogin}
              disabled={isLoadingLogin}
              className="w-full py-4 rounded-xl font-semibold text-sm mb-4 flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
              style={{ background: '#5865F2', color: 'white', boxShadow: '0 8px 30px rgba(88,101,242,0.25)' }}
            >
              {isLoadingLogin ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Redirecionando...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 71 55" fill="currentColor">
                    <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978Z"/>
                  </svg>
                  Continuar com Discord
                </>
              )}
            </button>

            <div className="flex items-center gap-4 my-5">
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.05)' }}></div>
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>ou</span>
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.05)' }}></div>
            </div>

            <button disabled
              className="w-full py-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-3 cursor-not-allowed"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.15)' }}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Continuar com Email
            </button>

            <p className="text-center mt-4 text-xs" style={{ color: 'rgba(255,255,255,0.12)' }}>
              O login por email só funciona se você já fez com Discord anteriormente.
            </p>

            <div className="absolute bottom-0 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(34,197,94,0.1), transparent)' }} />
          </div>

          <p className="text-center mt-5 text-xs" style={{ color: 'rgba(255,255,255,0.12)' }}>
            Ao continuar, você concorda com nossos{" "}
            <a href="#" style={{ color: 'rgba(134,239,172,0.4)' }} className="hover:opacity-80 transition-opacity">
              Termos de Serviço
            </a>
          </p>
        </div>
      </main>
    </div>
  )
}
