"use client"

import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import Link from "next/link"
import Header from "@/app/components/Header"
import Footer from "@/app/components/Footer"

export default function AddonsPage() {
  const [selectedAddons, setSelectedAddons] = useState<number[]>([])
  const [hoveredAddon, setHoveredAddon] = useState<number | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => { setIsMounted(true) }, [])

  const toggleAddon = (id: number) => {
    setSelectedAddons(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const addons = [
    { id: 1, name: "Sistema de Entrada/Saída", icon: "🚪", description: "Mensagens personalizadas de boas-vindas e despedida com embed customizável", features: ["Embed personalizado", "Auto-role", "Canal específico"] },
    { id: 2, name: "Sistema de Tickets", icon: "🎫", description: "Sistema profissional de atendimento com categorias e logs", features: ["Múltiplas categorias", "Transcrição", "Sistema de claim"] },
    { id: 3, name: "Sistema de Metas", icon: "🎯", description: "Defina e acompanhe metas individuais e de equipe em tempo real", features: ["Metas individuais", "Ranking", "Notificações"] },
    { id: 4, name: "Sistema AntiFlood", icon: "🛡️", description: "Proteção automática contra spam e flood de mensagens", features: ["Detecção inteligente", "Punições automáticas", "Whitelist"] },
    { id: 5, name: "Sistema de Exoneração", icon: "📤", description: "Gerenciamento completo de saída de membros da equipe", features: ["Formulário automático", "Remoção de cargos", "Registro"] },
    { id: 6, name: "Rank de Recrutamento", icon: "🏆", description: "Ranking competitivo dos melhores recrutadores do servidor", features: ["Pontuação automática", "Prêmios", "Leaderboard"] },
    { id: 7, name: "Sistema de ADV", icon: "⚠️", description: "Gerenciamento de advertências com histórico e pontuação", features: ["Níveis de gravidade", "Histórico completo", "Auto-punição"] },
    { id: 8, name: "Sistema de Ausência", icon: "🌙", description: "Permite membros marcarem ausência com justificativa", features: ["Período configurável", "Notificação auto", "Cargo temporário"] },
    { id: 9, name: "Sistema de Blacklist", icon: "🚫", description: "Lista de usuários banidos com verificação automática", features: ["Ban permanente", "Razões detalhadas", "Compartilhamento"] },
    { id: 10, name: "Comandos Específicos", icon: "⚙️", description: "Conjunto de comandos personalizados para seu servidor", features: ["Personalização total", "Aliases", "Permissões"] },
    { id: 11, name: "Banimento Permanente", icon: "🔒", description: "Sistema de ban que impede entrada mesmo removendo do registro", features: ["Proteção avançada", "Múltiplos métodos", "Inviolável"] },
    { id: 12, name: "Expulsar Todos", icon: "💥", description: "Comando de emergência para limpar servidor (use com cautela!)", features: ["Confirmação dupla", "Whitelist admin", "Log detalhado"] },
    { id: 13, name: "Listar Canais por Emoji", icon: "📋", description: "Painel para gerenciar canais que começam com emoji específico", features: ["Seleção por emoji", "Exclusão em massa", "Preview"] },
    { id: 14, name: "Apagar Mensagens Avançado", icon: "🗑️", description: "Sistema completo de limpeza de mensagens com múltiplos filtros", features: ["Por usuário", "Por canal", "Servidor todo"] },
    { id: 15, name: "Mensagens em Massa", icon: "📢", description: "Envie mensagens personalizadas para grupos específicos", features: ["Por cargo", "Por canal", "Todos do servidor"] },
    { id: 16, name: "Bloquear/Desbloquear Canal", icon: "🔐", description: "Controle rápido de permissões de escrita em canais", features: ["Toggle rápido", "Múltiplos canais", "Temporizador"] },
  ]

  const totalPrice = selectedAddons.length * 10

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

      <main className="relative z-10 px-6 py-20 pt-32 pb-40">
        <div className="max-w-7xl mx-auto">

          {/* Título */}
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-6 py-2 bg-green-900/30 border border-green-600/40 rounded-full text-green-400 text-sm font-semibold">
              🛠️ Marketplace de Funcionalidades
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-white">
              Personalize seu <span className="text-green-400" style={{textShadow: '0 0 20px rgba(74,222,128,0.4)'}}>Bot</span>
            </h1>
            <p className="text-xl text-green-200/50 max-w-3xl mx-auto leading-relaxed mb-8">
              Adicione funcionalidades específicas ao seu plano atual.<br/>
              <span className="text-green-400 font-bold text-2xl">Apenas R$ 10,00 por funcionalidade</span> — pagamento único, sem aumentar mensalidade!
            </p>

            {/* Info Box */}
            <div className="max-w-2xl mx-auto bg-[#050f07] border border-green-800/40 rounded-2xl p-6">
              <div className="flex items-center justify-center gap-6 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-200/60">Pagamento único</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-200/60">Sem alterar mensalidade</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-200/60">Ativação imediata</span>
                </div>
              </div>
            </div>
          </div>

          {/* Grid de Adicionais */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-12">
            {addons.map((addon) => {
              const isSelected = selectedAddons.includes(addon.id)
              const isHovered = hoveredAddon === addon.id

              return (
                <div
                  key={addon.id}
                  onMouseEnter={() => setHoveredAddon(addon.id)}
                  onMouseLeave={() => setHoveredAddon(null)}
                  onClick={() => toggleAddon(addon.id)}
                  className="relative rounded-2xl p-5 cursor-pointer transition-all duration-300 transform hover:scale-105"
                  style={{
                    background: isSelected
                      ? 'linear-gradient(135deg, #052010 0%, #0a3015 50%, #051a0a 100%)'
                      : 'rgba(5,15,7,0.8)',
                    border: isSelected
                      ? '1px solid rgba(34,197,94,0.7)'
                      : '1px solid rgba(34,197,94,0.12)',
                    backdropFilter: 'blur(12px)',
                    boxShadow: isSelected
                      ? '0 0 30px rgba(34,197,94,0.2), inset 0 0 30px rgba(34,197,94,0.05)'
                      : isHovered
                      ? '0 10px 40px rgba(34,197,94,0.15)'
                      : 'none',
                  }}
                >
                  {/* Selo selecionado */}
                  {isSelected && (
                    <div className="absolute -top-2.5 -right-2.5 bg-green-500 rounded-full p-1.5 shadow-lg shadow-green-500/50">
                      <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}

                  {/* Ícone */}
                  <div className={`text-4xl mb-3 transition-transform duration-300 ${isHovered ? 'scale-125' : 'scale-100'}`}>
                    {addon.icon}
                  </div>

                  {/* Nome */}
                  <h3 className="text-base font-bold mb-1.5 text-white min-h-[48px]">{addon.name}</h3>

                  {/* Descrição */}
                  <p className="text-green-200/40 text-xs mb-3 min-h-[40px] leading-relaxed">{addon.description}</p>

                  {/* Features */}
                  <ul className="space-y-1.5 mb-4">
                    {addon.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-xs gap-2">
                        <div className="w-3.5 h-3.5 rounded-full bg-green-800/60 border border-green-600/40 flex items-center justify-center flex-shrink-0">
                          <svg className="w-2 h-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-green-100/60">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Divisor */}
                  <div className="w-full h-px bg-green-900/30 mb-3" />

                  {/* Preço */}
                  <div className="flex items-baseline justify-center py-2 rounded-lg"
                    style={{ background: isSelected ? 'rgba(34,197,94,0.1)' : 'rgba(5,20,10,0.5)' }}>
                    <span className="text-xs text-green-300/50 mr-1">R$</span>
                    <span className="text-2xl font-bold text-white" style={{ textShadow: isSelected ? '0 0 10px rgba(74,222,128,0.4)' : 'none' }}>10</span>
                    <span className="text-xs text-green-300/50 ml-1">/único</span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* FAQ */}
          <div className="mt-20 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10 text-white">Perguntas Frequentes</h2>
            <div className="grid gap-4">
              {[
                { icon: "💰", q: "Como funciona o pagamento?", a: "Você paga apenas R$ 10,00 por funcionalidade escolhida, uma única vez. Esse valor NÃO aumenta sua mensalidade do plano base!" },
                { icon: "⚡", q: "Quando são ativadas?", a: "As funcionalidades são ativadas instantaneamente após confirmação do pagamento. Em até 5 minutos seu bot já estará com os novos recursos!" },
                { icon: "🔄", q: "Posso adicionar mais depois?", a: "Sim! Você pode adicionar novas funcionalidades a qualquer momento, pagando apenas R$ 10,00 por cada nova funcionalidade que desejar." },
                { icon: "🎁", q: "Posso testar antes?", a: "Todas as funcionalidades estão disponíveis no plano Trial gratuito de 24 horas! Teste tudo antes de comprar." },
              ].map((item, i) => (
                <div key={i} className="bg-[#050f07] border border-green-900/20 rounded-2xl p-6 hover:border-green-700/40 transition-all duration-300">
                  <h3 className="text-lg font-bold mb-2 flex items-center gap-3 text-white">
                    <span className="text-2xl">{item.icon}</span>
                    {item.q}
                  </h3>
                  <p className="text-green-200/40 text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      {/* Carrinho Fixo */}
      {selectedAddons.length > 0 && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-[#050f07] border border-green-600/60 rounded-2xl shadow-2xl shadow-green-900/40 p-5 backdrop-blur-md"
            style={{ boxShadow: '0 0 40px rgba(34,197,94,0.2)' }}>
            <div className="flex items-center gap-6 flex-wrap justify-center">
              <div className="flex items-center gap-4">
                <div className="bg-green-900/40 border border-green-700/40 rounded-full px-4 py-2">
                  <span className="text-xl font-bold text-white">{selectedAddons.length}</span>
                  <span className="text-sm ml-1 text-green-300/60">selecionados</span>
                </div>
                <div className="text-left">
                  <div className="text-xs text-green-300/50">Total a pagar</div>
                  <div className="text-2xl font-bold text-white" style={{ textShadow: '0 0 15px rgba(74,222,128,0.4)' }}>
                    R$ {totalPrice},00
                  </div>
                </div>
              </div>
              <Button className="bg-gradient-to-br from-green-600 to-green-800 hover:from-green-500 hover:to-green-700 text-white px-6 py-5 rounded-xl font-bold shadow-lg shadow-green-900/50 transform hover:scale-105 transition-all">
                Adicionar ao Plano →
              </Button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
