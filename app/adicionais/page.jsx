"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
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
    { id: 1,  name: "Entrada/Saída",         icon: "🚪", description: "Mensagens personalizadas de boas-vindas e despedida com embed customizável", features: ["Embed personalizado", "Auto-role", "Canal específico"] },
    { id: 2,  name: "Tickets",               icon: "🎫", description: "Sistema profissional de atendimento com categorias e logs completos", features: ["Múltiplas categorias", "Transcrição", "Sistema de claim"] },
    { id: 3,  name: "Metas",                 icon: "🎯", description: "Defina e acompanhe metas individuais e de equipe em tempo real", features: ["Metas individuais", "Ranking", "Notificações"] },
    { id: 4,  name: "AntiFlood",             icon: "🛡️", description: "Proteção automática contra spam e flood de mensagens no servidor", features: ["Detecção inteligente", "Punições automáticas", "Whitelist"] },
    { id: 5,  name: "Exoneração",            icon: "📤", description: "Gerenciamento completo de saída de membros da equipe", features: ["Formulário automático", "Remoção de cargos", "Registro"] },
    { id: 6,  name: "Rank Recrutamento",     icon: "🏆", description: "Ranking competitivo dos melhores recrutadores do servidor", features: ["Pontuação automática", "Prêmios", "Leaderboard"] },
    { id: 7,  name: "Advertências",          icon: "⚠️", description: "Gerenciamento de advertências com histórico e pontuação detalhada", features: ["Níveis de gravidade", "Histórico completo", "Auto-punição"] },
    { id: 8,  name: "Ausência",              icon: "🌙", description: "Permite membros marcarem ausência com justificativa e prazo", features: ["Período configurável", "Notificação auto", "Cargo temporário"] },
    { id: 9,  name: "Blacklist",             icon: "🚫", description: "Lista de usuários banidos com verificação automática na entrada", features: ["Ban permanente", "Razões detalhadas", "Compartilhamento"] },
    { id: 10, name: "Comandos Custom",       icon: "⚙️", description: "Conjunto de comandos personalizados para seu servidor específico", features: ["Personalização total", "Aliases", "Permissões"] },
    { id: 11, name: "Ban Permanente",        icon: "🔒", description: "Sistema de ban que impede entrada mesmo removendo do registro", features: ["Proteção avançada", "Múltiplos métodos", "Inviolável"] },
    { id: 12, name: "Expulsar Todos",        icon: "💥", description: "Comando de emergência para limpar servidor com segurança", features: ["Confirmação dupla", "Whitelist admin", "Log detalhado"] },
    { id: 13, name: "Canais por Emoji",      icon: "📋", description: "Painel para gerenciar canais que começam com emoji específico", features: ["Seleção por emoji", "Exclusão em massa", "Preview"] },
    { id: 14, name: "Apagar Mensagens",      icon: "🗑️", description: "Sistema completo de limpeza de mensagens com múltiplos filtros", features: ["Por usuário", "Por canal", "Servidor todo"] },
    { id: 15, name: "Mensagens em Massa",    icon: "📢", description: "Envie mensagens personalizadas para grupos específicos do servidor", features: ["Por cargo", "Por canal", "Todos do servidor"] },
    { id: 16, name: "Bloquear Canal",        icon: "🔐", description: "Controle rápido de permissões de escrita em canais do servidor", features: ["Toggle rápido", "Múltiplos canais", "Temporizador"] },
  ]

  const totalPrice = selectedAddons.length * 10

  return (
    <div className="min-h-screen text-white relative" style={{ zIndex: 1 }}>

      <style dangerouslySetInnerHTML={{ __html: `
        .addon-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          backdrop-filter: blur(20px);
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }
        .addon-card:hover {
          background: rgba(255,255,255,0.04);
          border-color: rgba(34,197,94,0.2);
          transform: translateY(-5px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(34,197,94,0.06);
        }
        .addon-card.selected {
          background: rgba(34,197,94,0.06);
          border-color: rgba(34,197,94,0.35);
          box-shadow: 0 0 40px rgba(34,197,94,0.08), inset 0 0 20px rgba(34,197,94,0.03);
        }
      `}} />

      <Header />

      <main className="relative z-10 px-6 py-20 pt-32 pb-40">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-5 px-5 py-2 rounded-full text-xs font-semibold tracking-widest uppercase"
              style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.1)', color: 'rgba(134,239,172,0.5)' }}>
              🛠️ Marketplace
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-4 text-white tracking-tight">
              Personalize seu <span style={{ color: 'rgba(134,239,172,0.8)', textShadow: '0 0 30px rgba(34,197,94,0.3)' }}>Bot</span>
            </h1>
            <p className="text-lg max-w-2xl mx-auto leading-relaxed mb-3" style={{ color: 'rgba(255,255,255,0.25)' }}>
              Adicione apenas as funcionalidades que você precisa.
            </p>
            <p className="text-2xl font-bold" style={{ color: 'rgba(134,239,172,0.7)' }}>
              R$ 10,00 por funcionalidade — pagamento único
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 flex-wrap mb-14">
            {["Pagamento único", "Sem alterar mensalidade", "Ativação imediata"].map((text, i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full text-xs"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.35)' }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(34,197,94,0.6)' }} />
                {text}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-12">
            {addons.map((addon) => {
              const isSelected = selectedAddons.includes(addon.id)
              return (
                <div
                  key={addon.id}
                  onClick={() => toggleAddon(addon.id)}
                  onMouseEnter={() => setHoveredAddon(addon.id)}
                  onMouseLeave={() => setHoveredAddon(null)}
                  className={`addon-card rounded-2xl p-5 ${isSelected ? 'selected' : ''}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-3xl">{addon.icon}</div>
                    <div className="w-5 h-5 rounded-full flex items-center justify-center transition-all"
                      style={{
                        background: isSelected ? 'rgba(34,197,94,0.3)' : 'rgba(255,255,255,0.05)',
                        border: isSelected ? '1px solid rgba(34,197,94,0.5)' : '1px solid rgba(255,255,255,0.08)',
                      }}>
                      {isSelected && (
                        <svg className="w-3 h-3" fill="rgba(134,239,172,0.9)" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </div>

                  <h3 className="font-semibold text-sm mb-1.5" style={{ color: 'rgba(255,255,255,0.85)' }}>{addon.name}</h3>
                  <p className="text-xs mb-4 leading-relaxed" style={{ color: 'rgba(255,255,255,0.2)' }}>{addon.description}</p>

                  <ul className="space-y-1.5 mb-5">
                    {addon.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
                        <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: isSelected ? 'rgba(134,239,172,0.6)' : 'rgba(255,255,255,0.2)' }} />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="w-full h-px mb-4" style={{ background: 'rgba(255,255,255,0.04)' }} />

                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>R$</span>
                      <span className="text-2xl font-bold" style={{ color: isSelected ? 'rgba(134,239,172,0.8)' : 'rgba(255,255,255,0.7)', textShadow: isSelected ? '0 0 15px rgba(34,197,94,0.3)' : 'none' }}>10</span>
                      <span className="text-xs ml-0.5" style={{ color: 'rgba(255,255,255,0.15)' }}>/único</span>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full transition-all"
                      style={{
                        background: isSelected ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.04)',
                        border: isSelected ? '1px solid rgba(34,197,94,0.3)' : '1px solid rgba(255,255,255,0.06)',
                        color: isSelected ? 'rgba(134,239,172,0.8)' : 'rgba(255,255,255,0.2)',
                      }}>
                      {isSelected ? '✓ Selecionado' : 'Selecionar'}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-20 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8" style={{ color: 'rgba(255,255,255,0.8)' }}>Perguntas Frequentes</h2>
            <div className="grid gap-3">
              {[
                { icon: "💰", q: "Como funciona o pagamento?", a: "Você paga apenas R$ 10,00 por funcionalidade escolhida, uma única vez. Esse valor NÃO aumenta sua mensalidade do plano base!" },
                { icon: "⚡", q: "Quando são ativadas?", a: "As funcionalidades são ativadas instantaneamente após confirmação do pagamento. Em até 5 minutos seu bot já estará com os novos recursos!" },
                { icon: "🔄", q: "Posso adicionar mais depois?", a: "Sim! Você pode adicionar novas funcionalidades a qualquer momento, pagando apenas R$ 10,00 por cada uma." },
                { icon: "🎁", q: "Posso testar antes?", a: "Todas as funcionalidades estão disponíveis no plano Trial gratuito de 24 horas! Teste tudo antes de comprar." },
              ].map((item, i) => (
                <div key={i} className="rounded-2xl p-5 transition-all duration-300"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <h3 className="font-semibold text-sm mb-2 flex items-center gap-2" style={{ color: 'rgba(255,255,255,0.7)' }}>
                    <span>{item.icon}</span>{item.q}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.25)' }}>{item.a}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      {selectedAddons.length > 0 && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
          <div className="rounded-2xl px-6 py-4 flex items-center gap-6"
            style={{ background: 'rgba(5,15,7,0.95)', border: '1px solid rgba(34,197,94,0.3)', backdropFilter: 'blur(20px)', boxShadow: '0 20px 60px rgba(0,0,0,0.7), 0 0 40px rgba(34,197,94,0.1)' }}>
            <div className="flex items-center gap-3">
              <div className="px-3 py-1.5 rounded-full text-sm font-bold"
                style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', color: 'rgba(134,239,172,0.8)' }}>
                {selectedAddons.length} {selectedAddons.length === 1 ? 'item' : 'itens'}
              </div>
              <div>
                <div className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>Total</div>
                <div className="text-xl font-bold" style={{ color: 'rgba(134,239,172,0.9)', textShadow: '0 0 15px rgba(34,197,94,0.3)' }}>
                  R$ {totalPrice},00
                </div>
              </div>
            </div>
            <button className="px-6 py-2.5 rounded-xl font-semibold text-sm transition-all hover:scale-105"
              style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)', color: 'rgba(134,239,172,0.9)' }}>
              Adicionar ao Plano →
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
