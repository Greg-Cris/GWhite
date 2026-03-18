"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Header from "@/app/components/Header"
import Footer from "@/app/components/Footer"

export default function TutorialsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilter, setActiveFilter] = useState("Todos")

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
    { id: 5, title: "Configuração: Sistema de Sugestões", description: "Aprenda a configurar o sistema de sugestões do seu bot.", duration: "01:48", views: "10", category: "Configuração" },
    { id: 6, title: "Configuração: Anti Raid", description: "Proteja seu servidor contra ataques com o sistema Anti Raid.", duration: "01:48", views: "10", category: "Configuração" },
    { id: 7, title: "Configuração: Auto lock em chats", description: "Bloqueie canais automaticamente com o sistema de Auto lock.", duration: "01:32", views: "10", category: "Configuração" },
    { id: 8, title: "Configuração: Sistema de Ticket", description: "Configure o sistema de tickets para suporte no seu servidor.", duration: "04:22", views: "32", category: "Ticket" },
  ]

  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tutorial.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = activeFilter === "Todos" || tutorial.category === activeFilter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen text-white relative" style={{ zIndex: 1 }}>

      <style dangerouslySetInnerHTML={{ __html: `
        .card-hover { transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
        .card-hover:hover { transform: translateY(-8px); border-color: rgba(34,197,94,0.2) !important; box-shadow: 0 25px 50px rgba(0,0,0,0.6), 0 0 40px rgba(34,197,94,0.05); }
      `}} />

      <Header />

      <main className="px-6 py-20 pt-32 relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-5 px-5 py-2 rounded-full text-xs font-semibold tracking-widest uppercase"
            style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.1)', color: 'rgba(134,239,172,0.5)' }}>
            🎬 Aprenda em vídeo
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold mb-4 text-white tracking-tight">Tutoriais</h1>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.25)' }}>
            Aprenda a configurar e usar todos os recursos dos seus bots com tutoriais em vídeo passo a passo.
          </p>
        </div>

        <div className="max-w-xl mx-auto mb-8">
          <div className="relative">
            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4" fill="none" stroke="rgba(255,255,255,0.15)" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input type="text" placeholder="Buscar tutoriais..." value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl px-12 py-3.5 text-sm focus:outline-none transition-all"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.8)' }} />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {filters.map((filter) => (
            <button key={filter.name} onClick={() => setActiveFilter(filter.name)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              style={{
                background: activeFilter === filter.name ? 'rgba(34,197,94,0.12)' : 'rgba(255,255,255,0.03)',
                border: activeFilter === filter.name ? '1px solid rgba(34,197,94,0.3)' : '1px solid rgba(255,255,255,0.06)',
                color: activeFilter === filter.name ? 'rgba(134,239,172,0.8)' : 'rgba(255,255,255,0.3)',
              }}>
              {filter.name} <span className="ml-1 text-xs opacity-40">{filter.count}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTutorials.map((tutorial) => (
            <div key={tutorial.id} className="card-hover rounded-2xl overflow-hidden cursor-pointer group"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="relative aspect-video flex items-center justify-center overflow-hidden"
                style={{ background: 'linear-gradient(160deg, #040d05 0%, #000 100%)' }}>
                <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(34,197,94,0.05) 0%, transparent 70%)' }} />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.15)' }}>
                    <svg className="w-5 h-5 ml-0.5" fill="rgba(134,239,172,0.6)" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                </div>
                <div className="absolute bottom-3 right-3 px-2 py-1 rounded text-xs font-mono"
                  style={{ background: 'rgba(0,0,0,0.6)', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  {tutorial.duration}
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(34,197,94,0.07)', color: 'rgba(134,239,172,0.5)', border: '1px solid rgba(34,197,94,0.1)' }}>
                    {tutorial.category}
                  </span>
                </div>
                <h3 className="font-semibold text-sm mb-2 line-clamp-2 leading-relaxed" style={{ color: 'rgba(255,255,255,0.85)' }}>{tutorial.title}</h3>
                <p className="text-xs mb-4 line-clamp-2 leading-relaxed" style={{ color: 'rgba(255,255,255,0.2)' }}>{tutorial.description}</p>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-xs" style={{ color: 'rgba(255,255,255,0.15)' }}>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {tutorial.views}
                  </span>
                  <span className="text-xs" style={{ color: 'rgba(255,255,255,0.15)' }}>{tutorial.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTutorials.length === 0 && (
          <div className="text-center py-20">
            <p style={{ color: 'rgba(255,255,255,0.2)' }}>Nenhum tutorial encontrado para "<span style={{ color: 'rgba(134,239,172,0.5)' }}>{searchTerm}</span>"</p>
          </div>
        )}

        <div className="mt-16 rounded-2xl p-12 text-center relative overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(34,197,94,0.05) 0%, transparent 60%)' }} />
          <div className="relative z-10">
            <div className="text-4xl mb-4">🐺</div>
            <h2 className="text-2xl font-bold mb-3 text-white">Precisa de Ajuda?</h2>
            <p className="mb-8 max-w-lg mx-auto text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.25)' }}>
              Nossa equipe está sempre pronta para ajudar você a configurar seu bot perfeitamente.
            </p>
            <button className="px-8 py-3 rounded-xl font-medium text-sm transition-all duration-300 hover:scale-105"
              style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', color: 'rgba(134,239,172,0.8)' }}>
              Falar com Suporte →
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
