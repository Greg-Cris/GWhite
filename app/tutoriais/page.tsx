"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Header from "@/app/components/Header"
import Footer from "@/app/components/Footer"

export default function TutorialsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilter, setActiveFilter] = useState("Todos")
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => { setIsMounted(true) }, [])

  const filters = [
    { name: "Todos", count: 25 },
    { name: "Configuração", count: 13 },
    { name: "Vendas", count: 1 },
    { name: "Ticket", count: 2 },
    { name: "Auth", count: 1 },
    { name: "Comandos", count: 3 },
    { name: "Bancos", count: 5 },
  ]

  const tutorials = [
    { id: 1, title: "Primeiros Passos: Comprando e Convidando seu Bot", description: "Aprenda o passo a passo para comprar e convidar seu bot para o servidor.", duration: "01:47", views: "38", category: "Configuração" },
    { id: 2, title: "Primeiros Passos: Configurando e ligando o bot", description: "Configure seu bot e aprenda a colocar o token e usar os primeiros comandos.", duration: "03:17", views: "24", category: "Configuração" },
    { id: 3, title: "Sistema de Autorole - Configuração Completa", description: "Aprenda a configurar o sistema de autorole do seu bot.", duration: "02:34", views: "15", category: "Configuração" },
    { id: 4, title: "Criando um Cupom / Configurando", description: "Aprenda a configurar e criar cupons de desconto no seu bot", duration: "12:45", views: "25", category: "Vendas" },
    { id: 5, title: "Configuração: Sistema de Sugestões", description: "Aprenda a configurar o sistema de sugestões do seu bot para receber feedback dos usuários.", duration: "01:48", views: "10", category: "Configuração" },
    { id: 6, title: "Configuração: Anti Raid", description: "Aprenda a configurar o sistema de Anti Raid do seu bot para proteger seu servidor contra ataques.", duration: "01:48", views: "10", category: "Configuração" },
    { id: 7, title: "Configuração: Sistema de Auto lock em chats", description: "Aprenda a configurar o sistema de Auto lock em chats do seu bot para bloquear canais automaticamente.", duration: "01:32", views: "10", category: "Configuração" },
    { id: 8, title: "Configuração: Sistema de Ticket", description: "Configure o sistema de tickets para suporte no seu servidor.", duration: "04:22", views: "32", category: "Ticket" },
  ]

  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tutorial.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = activeFilter === "Todos" || tutorial.category === activeFilter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#050f07] to-black text-white relative overflow-hidden">

      {/* Partículas */}
      {isMounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(80)].map((_, i) => (
            <div key={`w-${i}`} className="absolute rounded-full will-change-transform"
              style={{
                backgroundColor: `rgba(255,255,255,${Math.random()*0.2+0.05})`,
                width: `${Math.random()*4+1}px`, height: `${Math.random()*4+1}px`,
                top: `${Math.random()*100}%`, left: `${Math.random()*100}%`,
                animation: `float-up ${Math.random()*12+8}s infinite linear`,
                animationDelay: `${Math.random()*8}s`,
              }}
            />
          ))}
          {[...Array(15)].map((_, i) => (
            <div key={`orb-${i}`} className="absolute rounded-full blur-lg will-change-transform"
              style={{
                backgroundColor: `rgba(34,197,94,${Math.random()*0.12+0.04})`,
                width: `${Math.random()*30+15}px`, height: `${Math.random()*30+15}px`,
                top: `${Math.random()*100}%`, left: `${Math.random()*100}%`,
                animation: `float-diagonal ${Math.random()*18+15}s infinite ease-in-out`,
                animationDelay: `${Math.random()*6}s`,
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
      `}</style>

      <div className="absolute inset-0 bg-gradient-to-r from-green-950/10 via-transparent to-green-950/10 pointer-events-none" />

      <Header />

      <main className="px-6 py-20 pt-32 relative z-10 max-w-7xl mx-auto">

        {/* Título */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4 px-6 py-2 bg-green-900/30 border border-green-600/40 rounded-full text-green-400 text-sm font-semibold">
            🎬 Aprenda em vídeo
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold mb-4 text-white">
            <span className="text-green-400" style={{textShadow: '0 0 20px rgba(74,222,128,0.4)'}}>Tutoriais</span>
          </h1>
          <p className="text-green-200/50 text-lg max-w-3xl mx-auto">
            Aprenda a configurar e usar todos os recursos dos seus bots com nossos tutoriais em vídeo passo a passo.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Buscar tutoriais..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#050f07] border border-green-900/40 rounded-xl px-12 py-4 text-white placeholder-green-900 focus:outline-none focus:border-green-600/60 transition-colors"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {filters.map((filter) => (
            <button
              key={filter.name}
              onClick={() => setActiveFilter(filter.name)}
              className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                activeFilter === filter.name
                  ? "bg-green-700 text-white shadow-lg shadow-green-900/50"
                  : "bg-[#050f07] text-green-200/50 hover:text-green-300 border border-green-900/30 hover:border-green-700/50"
              }`}
            >
              {filter.name} <span className="ml-2 text-xs opacity-60">{filter.count}</span>
            </button>
          ))}
        </div>

        {/* Tutorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTutorials.map((tutorial) => (
            <div
              key={tutorial.id}
              className="bg-[#050f07] border border-green-900/20 rounded-xl overflow-hidden hover:border-green-700/40 transition-all duration-300 cursor-pointer group hover:scale-[1.02]"
              style={{ boxShadow: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 10px 30px rgba(34,197,94,0.08)')}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
            >
              {/* Thumbnail */}
              <div className="relative bg-gradient-to-br from-green-950 to-black aspect-video flex items-center justify-center overflow-hidden border-b border-green-900/20">
                <div className="text-center p-6">
                  <div className="text-green-700 text-xs tracking-widest mb-2 font-semibold">CONFIGURAÇÃO</div>
                  <div className="text-4xl font-bold text-green-400 mb-1" style={{textShadow: '0 0 15px rgba(74,222,128,0.3)'}}>BOT</div>
                  <div className="text-3xl font-bold text-green-600/60">2EM1</div>
                </div>

                {/* Play button ao hover */}
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-900/50">
                    <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>

                {/* Duração */}
                <div className="absolute bottom-3 right-3 bg-black/80 border border-green-900/40 px-2 py-1 rounded text-xs font-semibold text-green-300">
                  {tutorial.duration}
                </div>

                {/* Categoria */}
                <div className="absolute top-3 left-3 bg-green-900/60 border border-green-700/40 px-2 py-1 rounded-full text-xs font-semibold text-green-300">
                  {tutorial.category}
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="text-white font-bold text-base mb-2 line-clamp-2">{tutorial.title}</h3>
                <p className="text-green-200/40 text-sm mb-4 line-clamp-2">{tutorial.description}</p>
                <div className="flex items-center justify-between text-xs text-green-700">
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {tutorial.views} views
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {tutorial.duration}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sem resultados */}
        {filteredTutorials.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-green-200/40 text-lg">Nenhum tutorial encontrado para "<span className="text-green-400">{searchTerm}</span>"</p>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-16 bg-[#050f07] border border-green-800/40 rounded-2xl p-12 text-center relative overflow-hidden"
          style={{boxShadow: '0 0 60px rgba(34,197,94,0.04)'}}>
          <div className="absolute inset-0 bg-gradient-to-r from-green-950/20 via-transparent to-green-950/20 pointer-events-none" />
          <div className="relative z-10">
            <div className="text-4xl mb-4">🐺</div>
            <h2 className="text-3xl font-bold mb-4 text-white">Precisa de Ajuda Personalizada?</h2>
            <p className="text-green-200/50 mb-8 max-w-2xl mx-auto">
              Não encontrou o que procurava? Nossa equipe de suporte está sempre pronta para ajudar você a configurar seu bot perfeitamente.
            </p>
            <Button className="bg-gradient-to-br from-green-600 to-green-800 hover:from-green-500 hover:to-green-700 text-white px-8 py-4 rounded-xl font-semibold shadow-xl shadow-green-900/40 transform hover:scale-105 transition-all duration-200">
              Falar com Suporte
            </Button>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  )
}
