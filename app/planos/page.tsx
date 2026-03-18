"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import Link from "next/link"
import Header from "@/app/components/Header"
import Footer from "@/app/components/Footer"

export default function PlansPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const plans = [
    {
      name: "Bot Recrutamento",
      badge: "Essencial",
      badgeColor: "bg-green-700",
      price: "25,00",
      period: "/mês",
      originalPrice: "40,00",
      description: "Sistema completo de recrutamento com formulários e gestão de metas.",
      icon: "👥",
      gradient: "from-green-700 via-green-800 to-emerald-700",
      glowColor: "rgba(34,197,94,0.3)",
      features: [
        "Formulário de recrutamento personalizado",
        "Canais de metas automatizados",
        "Sistema de definição de metas",
        "Painel de acompanhamento",
        "Notificações automáticas",
        "Relatórios de performance",
        "Suporte 24/7"
      ],
      buttonText: "Começar Agora",
      buttonColor: "from-green-600 to-green-800 hover:from-green-500 hover:to-green-700",
      highlighted: false,
      savings: "Desconto de R$ 15,00"
    },
    {
      name: "Pacote Completo",
      badge: "Melhor Custo-Benefício",
      badgeColor: "bg-emerald-600",
      popular: "⭐ Economia de R$ 35",
      price: "150,00",
      period: " + R$ 25/mês",
      originalPrice: "185,00",
      description: "Todos os 16 adicionais inclusos! Pagamento inicial com desconto.",
      icon: "🚀",
      gradient: "from-emerald-600 via-green-700 to-teal-700",
      glowColor: "rgba(16,185,129,0.4)",
      features: [
        "TODAS as 16 funcionalidades extras",
        "Sistema de Entrada/Saída personalizado",
        "Tickets profissionais + Metas + AntiFlood",
        "Exoneração + Rank + ADV + Ausência",
        "Blacklist + Comandos específicos",
        "Banimento permanente + Expulsar todos",
        "Gestão avançada de canais e mensagens",
        "Atualizações prioritárias"
      ],
      buttonText: "Quero Tudo Agora",
      buttonColor: "from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500",
      highlighted: true,
      savings: "Desconto de R$ 35,00"
    },
    {
      name: "Servidor GTA RP",
      badge: "Pagamento Único",
      badgeColor: "bg-teal-700",
      price: "30,00",
      period: " única vez",
      originalPrice: "50,00",
      description: "Servidor Discord completo configurado para sua facção de GTA RP.",
      icon: "🏙️",
      gradient: "from-teal-700 via-green-800 to-green-900",
      glowColor: "rgba(20,184,166,0.3)",
      features: [
        "Servidor completo pré-configurado",
        "Design profissional para GTA RP",
        "Cargos e hierarquia prontos",
        "Permissões configuradas",
        "Canais organizados por setores",
        "Posse transferida para você",
        "Pronto para usar em minutos"
      ],
      buttonText: "Solicitar Servidor",
      buttonColor: "from-teal-600 to-green-700 hover:from-teal-500 hover:to-green-600",
      highlighted: false,
      note: "Abra um ticket no Discord para solicitar",
      savings: "Desconto de R$ 20,00"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#050f07] to-black text-white relative overflow-hidden">

      {/* Partículas */}
      {isMounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(80)].map((_, i) => (
            <div key={`w-${i}`} className="absolute rounded-full will-change-transform"
              style={{
                backgroundColor: `rgba(255,255,255,${Math.random()*0.3+0.05})`,
                width: `${Math.random()*4+1}px`, height: `${Math.random()*4+1}px`,
                top: `${Math.random()*100}%`, left: `${Math.random()*100}%`,
                animation: `float-up ${Math.random()*12+8}s infinite linear`,
                animationDelay: `${Math.random()*8}s`,
              }}
            />
          ))}
          {[...Array(20)].map((_, i) => (
            <div key={`orb-${i}`} className="absolute rounded-full blur-lg will-change-transform"
              style={{
                backgroundColor: `rgba(34,197,94,${Math.random()*0.15+0.05})`,
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
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(16,185,129,0.3), 0 0 40px rgba(16,185,129,0.1); }
          50% { box-shadow: 0 0 40px rgba(16,185,129,0.5), 0 0 80px rgba(16,185,129,0.2); }
        }
        @keyframes border-glow {
          0%, 100% { border-color: rgba(34,197,94,0.4); }
          50% { border-color: rgba(34,197,94,0.9); }
        }
      `}</style>

      <div className="absolute inset-0 bg-gradient-to-r from-green-950/10 via-transparent to-green-950/10 pointer-events-none" />

      <Header />

      <main className="relative z-10 px-6 py-20 pt-32 pb-32">
        <div className="max-w-7xl mx-auto">

          {/* Título */}
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-6 py-2 bg-green-900/30 border border-green-600/40 rounded-full text-green-400 text-sm font-semibold">
              ✨ Planos Flexíveis e Acessíveis
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-white">
              Escolha seu <span className="text-green-400" style={{textShadow: '0 0 20px rgba(74,222,128,0.4)'}}>plano ideal</span>
            </h1>
            <p className="text-xl text-green-200/50 max-w-3xl mx-auto leading-relaxed">
              Do bot essencial ao pacote completo com tudo incluído.<br/>
              <span className="text-green-400 font-semibold">Ou personalize: adicione funcionalidades extras por apenas R$ 10 cada!</span>
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            {plans.map((plan, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`relative rounded-2xl p-6 transition-all duration-500 transform cursor-pointer ${
                  plan.highlighted ? "lg:scale-105 z-20" : hoveredCard === index ? "scale-102" : "scale-100"
                }`}
                style={{
                  background: plan.highlighted
                    ? 'linear-gradient(135deg, #052010 0%, #0a2a12 50%, #051a0a 100%)'
                    : 'rgba(5,15,7,0.8)',
                  border: plan.highlighted
                    ? '1px solid rgba(34,197,94,0.6)'
                    : '1px solid rgba(34,197,94,0.15)',
                  backdropFilter: 'blur(12px)',
                  animation: plan.highlighted ? 'glow-pulse 3s infinite' : 'none',
                  boxShadow: hoveredCard === index
                    ? `0 20px 60px ${plan.glowColor}`
                    : plan.highlighted
                    ? `0 10px 40px ${plan.glowColor}`
                    : 'none'
                }}
              >
                {/* Ícone */}
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                  <div className={`text-3xl bg-gradient-to-br ${plan.gradient} rounded-full p-2.5 shadow-lg transition-transform duration-300 ${hoveredCard === index ? 'scale-110 rotate-6' : ''}`}>
                    {plan.icon}
                  </div>
                </div>

                {/* Badge */}
                <div className="flex items-center justify-between mb-4 mt-6 flex-wrap gap-2">
                  <span className={`${plan.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                    {plan.badge}
                  </span>
                  {plan.popular && (
                    <span className="bg-green-500/20 text-green-300 border border-green-500/40 text-xs font-bold px-2 py-0.5 rounded-full">
                      {plan.popular}
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-bold mb-2 text-white">{plan.name}</h3>
                <p className="text-green-200/50 text-xs mb-4 min-h-[40px] leading-relaxed">{plan.description}</p>

                {/* Preço */}
                <div className="mb-6">
                  {plan.originalPrice && (
                    <div className="text-center mb-1">
                      <span className="text-gray-500 line-through text-sm">De R$ {plan.originalPrice}</span>
                    </div>
                  )}
                  <div className="flex items-baseline justify-center flex-wrap gap-1">
                    <span className="text-sm text-green-300/60 mr-1">R$</span>
                    <span className={`text-4xl font-bold text-white transition-all duration-300 ${hoveredCard === index ? 'scale-110' : ''}`} style={{textShadow: '0 0 15px rgba(74,222,128,0.3)'}}>
                      {plan.price.split(',')[0]}
                    </span>
                    <span className="text-xl font-bold text-white">,{plan.price.split(',')[1]}</span>
                    <span className="text-green-300/50 ml-1 text-sm">{plan.period}</span>
                  </div>
                  {plan.savings && (
                    <div className="mt-2 text-center">
                      <span className="bg-green-900/40 text-green-400 text-xs font-semibold px-3 py-1 rounded-full border border-green-700/40">
                        💰 {plan.savings}
                      </span>
                    </div>
                  )}
                </div>

                {/* Divisor */}
                <div className="w-full h-px bg-green-900/40 mb-5" />

                {/* Features */}
                <ul className="space-y-2.5 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${plan.gradient} flex items-center justify-center mr-2 mt-0.5 flex-shrink-0`}>
                        <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-green-100/70 text-xs">{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.note && (
                  <div className="mb-3 p-2 bg-green-950/50 rounded-lg border border-green-800/30">
                    <p className="text-xs text-green-300/70 text-center">💬 {plan.note}</p>
                  </div>
                )}

                <Button className={`w-full bg-gradient-to-br ${plan.buttonColor} text-white py-4 rounded-xl font-bold text-sm transition-all duration-300 shadow-lg ${hoveredCard === index ? 'scale-105' : ''}`}>
                  {plan.buttonText}
                  <span className={`ml-2 inline-block transition-transform duration-300 ${hoveredCard === index ? 'translate-x-1' : ''}`}>→</span>
                </Button>
              </div>
            ))}
          </div>

          {/* CTA Adicionais */}
          <div className="max-w-5xl mx-auto mb-16">
            <div className="bg-[#050f07] border border-green-800/40 rounded-3xl p-10 text-center relative overflow-hidden"
              style={{boxShadow: '0 0 60px rgba(34,197,94,0.05)'}}>
              <div className="absolute inset-0 bg-gradient-to-r from-green-950/20 via-transparent to-green-950/20 pointer-events-none" />
              <div className="relative z-10">
                <div className="text-5xl mb-4">🛠️</div>
                <h2 className="text-3xl font-bold mb-4 text-white">Quer personalizar seu bot?</h2>
                <p className="text-green-200/50 text-lg mb-6 max-w-2xl mx-auto">
                  Monte seu plano ideal! Adicione apenas as funcionalidades que você precisa por{' '}
                  <span className="text-green-400 font-bold">R$ 10,00 cada</span>.<br/>
                  <span className="text-sm text-green-200/30">Sistema de tickets, metas, antiflood, rank, blacklist e muito mais.</span>
                </p>
                <Link href="/adicionais">
                  <Button className="bg-gradient-to-br from-green-600 to-green-800 hover:from-green-500 hover:to-green-700 text-white px-8 py-6 rounded-xl font-bold text-lg shadow-xl shadow-green-900/40 transform hover:scale-105 transition-all duration-300">
                    Ver Todas as Funcionalidades →
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Comparativo */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-center mb-8 text-white">Compare os planos</h2>
            <div className="bg-[#050f07] border border-green-900/30 rounded-2xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                {[
                  { icon: "👥", name: "Bot Recrutamento", desc: "Ideal para começar com o essencial", price: "R$ 25/mês", color: "text-green-400" },
                  { icon: "🚀", name: "Pacote Completo", desc: "Todas as funcionalidades com desconto", price: "R$ 150 + R$ 25/mês", color: "text-emerald-400", border: true },
                  { icon: "🏙️", name: "Servidor GTA RP", desc: "Servidor pronto para sua facção", price: "R$ 30 único", color: "text-teal-400" },
                ].map((item, i) => (
                  <div key={i} className={`${item.border ? 'border-l border-r border-green-900/30 px-6' : ''}`}>
                    <div className="text-3xl mb-2">{item.icon}</div>
                    <div className="font-bold text-lg mb-2 text-white">{item.name}</div>
                    <div className="text-sm text-green-200/40">{item.desc}</div>
                    <div className={`mt-3 font-bold ${item.color}`}>{item.price}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Features Adicionais */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", title: "Pagamento Seguro", desc: "Proteção total em todas as transações", color: "from-green-700 to-green-900" },
              { icon: "M13 10V3L4 14h7v7l9-11h-7z", title: "Ativação Instantânea", desc: "Configure e use imediatamente", color: "from-emerald-700 to-emerald-900" },
              { icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z", title: "Suporte 24/7", desc: "Assistência quando você precisar", color: "from-teal-700 to-teal-900" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-3 p-6 bg-[#050f07] rounded-2xl border border-green-900/20 hover:border-green-600/40 transition-all duration-300 hover:scale-105"
                style={{boxShadow: 'none'}}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 10px 30px rgba(34,197,94,0.1)')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}>
                <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center shadow-lg`}>
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                </div>
                <span className="text-white font-semibold">{item.title}</span>
                <span className="text-green-200/40 text-sm text-center">{item.desc}</span>
              </div>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
