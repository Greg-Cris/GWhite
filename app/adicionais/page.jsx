"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import Link from "next/link"
import Header from "@/app/components/Header"
import Footer from "@/app/components/Footer"

export default function AddonsPage() {
  const [selectedAddons, setSelectedAddons] = useState([])
  const [hoveredAddon, setHoveredAddon] = useState(null)

  const toggleAddon = (id) => {
    setSelectedAddons(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const addons = [
    {
      id: 1,
      name: "Sistema de Entrada/Saída",
      icon: "🚪",
      description: "Mensagens personalizadas de boas-vindas e despedida com embed customizável",
      features: ["Embed personalizado", "Auto-role", "Canal específico"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      name: "Sistema de Tickets",
      icon: "🎫",
      description: "Sistema profissional de atendimento com categorias e logs",
      features: ["Múltiplas categorias", "Transcrição", "Sistema de claim"],
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 3,
      name: "Sistema de Metas",
      icon: "🎯",
      description: "Defina e acompanhe metas individuais e de equipe em tempo real",
      features: ["Metas individuais", "Ranking", "Notificações"],
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 4,
      name: "Sistema AntiFlood",
      icon: "🛡️",
      description: "Proteção automática contra spam e flood de mensagens",
      features: ["Detecção inteligente", "Punições automáticas", "Whitelist"],
      color: "from-red-500 to-orange-500"
    },
    {
      id: 5,
      name: "Sistema de Exoneração",
      icon: "📤",
      description: "Gerenciamento completo de saída de membros da equipe",
      features: ["Formulário automático", "Remoção de cargos", "Registro"],
      color: "from-yellow-500 to-orange-500"
    },
    {
      id: 6,
      name: "Rank de Recrutamento",
      icon: "🏆",
      description: "Ranking competitivo dos melhores recrutadores do servidor",
      features: ["Pontuação automática", "Prêmios", "Leaderboard"],
      color: "from-amber-500 to-yellow-500"
    },
    {
      id: 7,
      name: "Sistema de ADV",
      icon: "⚠️",
      description: "Gerenciamento de advertências com histórico e pontuação",
      features: ["Níveis de gravidade", "Histórico completo", "Auto-punição"],
      color: "from-orange-500 to-red-500"
    },
    {
      id: 8,
      name: "Sistema de Ausência",
      icon: "🌙",
      description: "Permite membros marcarem ausência com justificativa",
      features: ["Período configurável", "Notificação auto", "Cargo temporário"],
      color: "from-indigo-500 to-purple-500"
    },
    {
      id: 9,
      name: "Sistema de Blacklist",
      icon: "🚫",
      description: "Lista de usuários banidos com verificação automática",
      features: ["Ban permanente", "Razões detalhadas", "Compartilhamento"],
      color: "from-gray-700 to-gray-900"
    },
    {
      id: 10,
      name: "Comandos Específicos",
      icon: "⚙️",
      description: "Conjunto de comandos personalizados para seu servidor",
      features: ["Personalização total", "Aliases", "Permissões"],
      color: "from-cyan-500 to-blue-500"
    },
    {
      id: 11,
      name: "Banimento Permanente",
      icon: "🔒",
      description: "Sistema de ban que impede entrada mesmo removendo do registro",
      features: ["Proteção avançada", "Múltiplos métodos", "Inviolável"],
      color: "from-red-700 to-red-900"
    },
    {
      id: 12,
      name: "Expulsar Todos",
      icon: "💥",
      description: "Comando de emergência para limpar servidor (use com cautela!)",
      features: ["Confirmação dupla", "Whitelist admin", "Log detalhado"],
      color: "from-red-600 to-pink-600"
    },
    {
      id: 13,
      name: "Listar Canais por Emoji",
      icon: "📋",
      description: "Painel para gerenciar canais que começam com emoji específico",
      features: ["Seleção por emoji", "Exclusão em massa", "Preview"],
      color: "from-teal-500 to-green-500"
    },
    {
      id: 14,
      name: "Apagar Mensagens Avançado",
      icon: "🗑️",
      description: "Sistema completo de limpeza de mensagens com múltiplos filtros",
      features: ["Por usuário", "Por canal", "Servidor todo"],
      color: "from-slate-600 to-slate-800"
    },
    {
      id: 15,
      name: "Sistema de Mensagens em Massa",
      icon: "📢",
      description: "Envie mensagens personalizadas para grupos específicos",
      features: ["Por cargo", "Por canal", "Todos do servidor"],
      color: "from-violet-500 to-purple-500"
    },
    {
      id: 16,
      name: "Bloquear/Desbloquear Canal",
      icon: "🔐",
      description: "Controle rápido de permissões de escrita em canais",
      features: ["Toggle rápido", "Múltiplos canais", "Temporizador"],
      color: "from-zinc-600 to-zinc-800"
    }
  ]

  const totalPrice = selectedAddons.length * 10

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-white relative overflow-hidden">
      {/* Partículas de fundo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(60)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full will-change-transform"
            style={{
              backgroundColor: `rgba(${Math.random() > 0.5 ? '168, 85, 247' : '34, 211, 238'}, ${Math.random() * 0.3 + 0.1})`,
              width: `${Math.random() * 5 + 2}px`,
              height: `${Math.random() * 5 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float-slow ${Math.random() * 25 + 20}s infinite linear`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) translateX(30px); opacity: 0; }
        }
      `}</style>

      {/* Header Global */}
      <Header />

      {/* Main Content */}
      <main className="relative z-10 px-6 py-20 pt-32 pb-32">
        <div className="max-w-7xl mx-auto">
          {/* Título */}
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-6 py-2 bg-cyan-600/20 border border-cyan-500/50 rounded-full text-cyan-400 text-sm font-semibold">
              🛠️ Marketplace de Funcionalidades
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
              Personalize seu Bot
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8">
              Adicione funcionalidades específicas ao seu plano atual.<br/>
              <span className="text-cyan-400 font-bold text-2xl">Apenas R$ 10,00 por funcionalidade</span> - pagamento único, sem aumentar mensalidade!
            </p>
            
            {/* Info Box */}
            <div className="max-w-2xl mx-auto bg-gradient-to-r from-cyan-900/30 to-purple-900/30 border border-cyan-500/30 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-300">Pagamento único</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-300">Sem alterar mensalidade</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-300">Ativação imediata</span>
                </div>
              </div>
            </div>
          </div>

          {/* Grid de Adicionais */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {addons.map((addon) => {
              const isSelected = selectedAddons.includes(addon.id)
              const isHovered = hoveredAddon === addon.id
              
              return (
                <div
                  key={addon.id}
                  onMouseEnter={() => setHoveredAddon(addon.id)}
                  onMouseLeave={() => setHoveredAddon(null)}
                  onClick={() => toggleAddon(addon.id)}
                  className={`relative rounded-2xl p-6 cursor-pointer transition-all duration-300 transform ${
                    isSelected 
                      ? `bg-gradient-to-br ${addon.color} scale-105 shadow-2xl border-2 border-white` 
                      : 'bg-gray-900/60 border border-gray-700 hover:border-gray-600 hover:scale-105'
                  }`}
                  style={{
                    boxShadow: isHovered && !isSelected ? '0 10px 40px rgba(34, 211, 238, 0.2)' : ''
                  }}
                >
                  {/* Selo de Selecionado */}
                  {isSelected && (
                    <div className="absolute -top-3 -right-3 bg-white text-black rounded-full p-2 shadow-xl animate-bounce">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}

                  {/* Ícone */}
                  <div className={`text-5xl mb-4 transition-transform duration-300 ${isHovered ? 'scale-125' : 'scale-100'}`}>
                    {addon.icon}
                  </div>

                  {/* Nome */}
                  <h3 className="text-xl font-bold mb-2 min-h-[56px]">{addon.name}</h3>

                  {/* Descrição */}
                  <p className="text-gray-300 text-sm mb-4 min-h-[40px]">{addon.description}</p>

                  {/* Features */}
                  <ul className="space-y-2 mb-4">
                    {addon.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-xs">
                        <svg className="w-4 h-4 text-cyan-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className={isSelected ? 'text-white' : 'text-gray-400'}>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Preço */}
                  <div className={`flex items-baseline justify-center py-3 rounded-lg ${isSelected ? 'bg-white/20' : 'bg-gray-800/50'}`}>
                    <span className="text-sm mr-1">R$</span>
                    <span className="text-3xl font-bold">10</span>
                    <span className="text-sm ml-1">/único</span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Carrinho Fixo */}
          {selectedAddons.length > 0 && (
            <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 animate-slide-up">
              <div className="bg-gradient-to-r from-cyan-600 to-purple-600 rounded-2xl shadow-2xl p-6 border-2 border-white/20 backdrop-blur-md">
                <div className="flex items-center gap-6 flex-wrap justify-center">
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 rounded-full px-4 py-2">
                      <span className="text-2xl font-bold">{selectedAddons.length}</span>
                      <span className="text-sm ml-1">selecionados</span>
                    </div>
                    <div className="text-left">
                      <div className="text-sm text-cyan-100">Total a pagar</div>
                      <div className="text-3xl font-bold">R$ {totalPrice},00</div>
                    </div>
                  </div>
                  <Button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-6 rounded-xl font-bold text-lg shadow-xl transform hover:scale-105 transition-all">
                    Adicionar ao Plano →
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* FAQ Rápido */}
          <div className="mt-20 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10">Perguntas Frequentes</h2>
            <div className="grid gap-6">
              <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-3">
                  <span className="text-2xl">💰</span>
                  Como funciona o pagamento?
                </h3>
                <p className="text-gray-400">
                  Você paga apenas R$ 10,00 por funcionalidade escolhida, uma única vez. Esse valor NÃO aumenta sua mensalidade do plano base!
                </p>
              </div>

              <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-3">
                  <span className="text-2xl">⚡</span>
                  Quando são ativadas?
                </h3>
                <p className="text-gray-400">
                  As funcionalidades são ativadas instantaneamente após confirmação do pagamento. Em até 5 minutos seu bot já estará com os novos recursos!
                </p>
              </div>

              <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-3">
                  <span className="text-2xl">🔄</span>
                  Posso adicionar mais depois?
                </h3>
                <p className="text-gray-400">
                  Sim! Você pode adicionar novas funcionalidades a qualquer momento, pagando apenas R$ 10,00 por cada nova funcionalidade que desejar.
                </p>
              </div>

              <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-3">
                  <span className="text-2xl">🎁</span>
                  Posso testar antes?
                </h3>
                <p className="text-gray-400">
                  Todas as funcionalidades estão disponíveis no plano Trial gratuito de 24 horas! Teste tudo antes de comprar.
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Footer Global */}
      <Footer />
    </div>
  )
}