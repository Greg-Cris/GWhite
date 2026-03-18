"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Header from "@/app/components/Header"
import Footer from "@/app/components/Footer"

export default function DiscordPage() {
  const [clientCount, setClientCount] = useState(0)
  const [botCount, setBotCount] = useState(0)
  const [uptimeCount, setUptimeCount] = useState(0)
  const [notifications, setNotifications] = useState([])
  const [isMounted, setIsMounted] = useState(false)
  const [feedbacks, setFeedbacks] = useState([
    { id: 1, name: "João Silva", avatar: "🎮", rating: 5, comment: "Melhor bot que já usei! Suporte excepcional e funcionalidades incríveis.", date: "Há 2 dias" },
    { id: 2, name: "Maria Santos", avatar: "👑", rating: 5, comment: "Sistema de vendas automatizado funcionou perfeitamente. Recomendo!", date: "Há 1 semana" },
    { id: 3, name: "Pedro Costa", avatar: "⚡", rating: 5, comment: "Atendimento rápido e bot super estável. Vale cada centavo!", date: "Há 3 dias" },
    { id: 4, name: "Ana Oliveira", avatar: "🌟", rating: 5, comment: "Configuração simples e intuitiva. Meu servidor ficou profissional!", date: "Há 5 dias" }
  ])
  const [newFeedback, setNewFeedback] = useState({ name: "", comment: "", rating: 5 })
  const [showFeedbackForm, setShowFeedbackForm] = useState(false)

  const names = ["Lucas Almeida", "Carla Ferreira", "Rafael Santos", "Beatriz Lima", "Gabriel Costa", "Juliana Souza", "Bruno Oliveira", "Camila Rodrigues", "Felipe Martins", "Amanda Silva", "Thiago Pereira", "Larissa Gomes"]

  useEffect(() => {
    setIsMounted(true)
    const animateCounter = (target, setter, duration = 2000) => {
      let start = 0
      const increment = target / (duration / 16)
      const timer = setInterval(() => {
        start += increment
        if (start >= target) { setter(target); clearInterval(timer) }
        else setter(Math.floor(start))
      }, 16)
    }
    animateCounter(150, setClientCount)
    animateCounter(25, setBotCount)
    animateCounter(99, setUptimeCount)
  }, [])

  useEffect(() => {
    const usedNames = new Set()
    const showNotification = () => {
      if (usedNames.size >= names.length) return
      let randomName
      do { randomName = names[Math.floor(Math.random() * names.length)] } while (usedNames.has(randomName))
      usedNames.add(randomName)
      const actions = ["acabou de entrar no Discord!", "está explorando os planos", "acabou de comprar um bot!", "está online no servidor"]
      const notification = { id: Date.now(), name: randomName, action: actions[Math.floor(Math.random() * actions.length)] }
      setNotifications(prev => [...prev, notification])
      setTimeout(() => { setNotifications(prev => prev.filter(n => n.id !== notification.id)) }, 5000)
    }
    const interval = setInterval(showNotification, 4000)
    showNotification()
    return () => clearInterval(interval)
  }, [])

  const handleSubmitFeedback = (e) => {
    e.preventDefault()
    if (newFeedback.name && newFeedback.comment) {
      setFeedbacks([{ id: Date.now(), name: newFeedback.name, avatar: "👤", rating: newFeedback.rating, comment: newFeedback.comment, date: "Agora" }, ...feedbacks])
      setNewFeedback({ name: "", comment: "", rating: 5 })
      setShowFeedbackForm(false)
    }
  }

  const features = [
    { icon: "🤖", title: "Bots Personalizados", description: "Desenvolvemos bots sob medida para atender todas as necessidades do seu servidor Discord." },
    { icon: "⚡", title: "Alta Performance", description: "Infraestrutura robusta garantindo 99.9% de uptime e respostas instantâneas." },
    { icon: "🛡️", title: "Segurança Total", description: "Proteção avançada contra raids, spam e ataques ao seu servidor." },
    { icon: "🎨", title: "Design Exclusivo", description: "Interface moderna e intuitiva com comandos personalizáveis." },
    { icon: "📊", title: "Sistema de Vendas", description: "Automatize suas vendas com sistema completo de pagamentos e entregas." },
    { icon: "💬", title: "Suporte 24/7", description: "Equipe dedicada pronta para ajudar você a qualquer momento." }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#030a04] to-black text-white relative overflow-hidden">

      {isMounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(40)].map((_, i) => (
            <div key={`w-${i}`} className="absolute rounded-full"
              style={{ backgroundColor: `rgba(255,255,255,${Math.random()*0.07+0.01})`, width: `${Math.random()*2+1}px`, height: `${Math.random()*2+1}px`, top: `${Math.random()*100}%`, left: `${Math.random()*100}%`, animation: `float-up ${Math.random()*15+10}s infinite linear`, animationDelay: `${Math.random()*10}s` }} />
          ))}
          {[...Array(5)].map((_, i) => (
            <div key={`orb-${i}`} className="absolute rounded-full blur-3xl"
              style={{ backgroundColor: `rgba(34,197,94,0.03)`, width: `${Math.random()*300+150}px`, height: `${Math.random()*300+150}px`, top: `${Math.random()*100}%`, left: `${Math.random()*100}%`, animation: `float-diagonal ${Math.random()*30+20}s infinite ease-in-out`, animationDelay: `${Math.random()*10}s` }} />
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes float-up { 0% { transform: translateY(0); opacity: 0; } 10% { opacity: 0.5; } 90% { opacity: 0.2; } 100% { transform: translateY(-100vh); opacity: 0; } }
        @keyframes float-diagonal { 0%, 100% { transform: translate(0,0); } 50% { transform: translate(30px,-30px); } }
        @keyframes slide-in { from { transform: translateX(400px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes discord-pulse { 0%, 100% { box-shadow: 0 0 20px rgba(88,101,242,0.4); } 50% { box-shadow: 0 0 40px rgba(88,101,242,0.7); } }
        .card-glass { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); transition: all 0.35s cubic-bezier(0.4,0,0.2,1); }
        .card-glass:hover { background: rgba(255,255,255,0.04); border-color: rgba(34,197,94,0.18); transform: translateY(-5px); box-shadow: 0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(34,197,94,0.05); }
      `}</style>

      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(34,197,94,0.03) 0%, transparent 60%)' }} />

      {/* Notificações */}
      <div className="fixed bottom-6 right-6 z-50 space-y-3 max-w-xs">
        {notifications.map((notif) => (
          <div key={notif.id} className="rounded-xl p-4 shadow-2xl" style={{ background: 'rgba(5,10,6,0.97)', border: '1px solid rgba(34,197,94,0.2)', backdropFilter: 'blur(20px)', animation: 'slide-in 0.5s ease-out', boxShadow: '0 10px 40px rgba(0,0,0,0.8)' }}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)' }}>👤</div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-xs truncate">{notif.name}</p>
                <p className="text-xs truncate" style={{ color: 'rgba(255,255,255,0.3)' }}>{notif.action}</p>
              </div>
              <div className="text-xs" style={{ color: 'rgba(134,239,172,0.6)' }}>✓</div>
            </div>
          </div>
        ))}
      </div>

      <Header />

      <main className="px-6 py-20 pt-32 relative z-10 max-w-7xl mx-auto">

        {/* Hero */}
        <div className="text-center mb-20">
          <div className="inline-block mb-6 p-5 rounded-2xl" style={{ background: 'rgba(88,101,242,0.08)', border: '1px solid rgba(88,101,242,0.15)' }}>
            <svg className="w-16 h-16 mx-auto" viewBox="0 0 71 55" fill="#5865F2">
              <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978Z"/>
            </svg>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-white tracking-tight">
            Junte-se à Nossa <span style={{ color: 'rgba(134,239,172,0.8)', textShadow: '0 0 30px rgba(34,197,94,0.3)' }}>Comunidade</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto mb-8 leading-relaxed" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Entre no nosso servidor Discord e conheça mais sobre nossos bots, tire dúvidas e faça parte de uma comunidade ativa de mais de 150 clientes satisfeitos!
          </p>
          <a href="https://discord.gg/WcSU5AvhRX" target="_blank" rel="noopener noreferrer">
            <button className="px-10 py-4 rounded-xl font-bold text-base text-white transition-all duration-300 hover:scale-105 flex items-center gap-3 mx-auto"
              style={{ background: '#5865F2', boxShadow: '0 8px 30px rgba(88,101,242,0.3)', animation: 'discord-pulse 3s infinite' }}>
              <svg className="w-5 h-5" viewBox="0 0 71 55" fill="currentColor">
                <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978Z"/>
              </svg>
              Entrar no Discord
            </button>
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
          {[
            { value: `${clientCount}+`, label: "Clientes Satisfeitos", sub: "Em toda nossa trajetória" },
            { value: `${botCount}+`, label: "Bots Desenvolvidos", sub: "Projetos personalizados" },
            { value: `${uptimeCount}.9%`, label: "Uptime Garantido", sub: "Alta disponibilidade" },
          ].map((stat, i) => (
            <div key={i} className="card-glass rounded-2xl p-8 text-center">
              <div className="text-5xl font-bold mb-2 text-white" style={{ textShadow: '0 0 20px rgba(34,197,94,0.2)' }}>{stat.value}</div>
              <div className="font-semibold text-base mb-1 text-white">{stat.label}</div>
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.2)' }}>{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Sobre */}
        <div className="card-glass rounded-3xl p-12 mb-20 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(34,197,94,0.04) 0%, transparent 60%)' }} />
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-6 text-center text-white">Sobre a Wht-Store</h2>
            <p className="text-base leading-relaxed mb-4 text-center max-w-3xl mx-auto" style={{ color: 'rgba(255,255,255,0.3)' }}>
              A <span className="text-white font-semibold">Wht-Store</span> é especializada no desenvolvimento de bots personalizados para Discord. Com anos de experiência no mercado, oferecemos soluções completas para automatização, moderação, vendas e entretenimento.
            </p>
            <p className="text-base leading-relaxed text-center max-w-3xl mx-auto" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Nossa missão é fornecer bots de <span style={{ color: 'rgba(134,239,172,0.7)' }} className="font-semibold">alta qualidade</span>, com <span style={{ color: 'rgba(134,239,172,0.7)' }} className="font-semibold">suporte excepcional</span> e <span style={{ color: 'rgba(134,239,172,0.7)' }} className="font-semibold">preços acessíveis</span>.
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center text-white">Por Que Escolher Nossos Bots?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, i) => (
              <div key={i} className="card-glass rounded-2xl p-6">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-base font-bold mb-2 text-white">{feature.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.25)' }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="card-glass rounded-3xl p-12 text-center mb-20 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(88,101,242,0.05) 0%, transparent 60%)' }} />
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4 text-white">Pronto Para Começar?</h2>
            <p className="mb-8 max-w-xl mx-auto text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.25)' }}>
              Entre no nosso Discord agora mesmo! Converse com nossa equipe, tire suas dúvidas e conheça outros clientes satisfeitos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://discord.gg/WcSU5AvhRX" target="_blank" rel="noopener noreferrer">
                <button className="px-8 py-3.5 rounded-xl font-semibold text-sm text-white transition-all hover:scale-105"
                  style={{ background: '#5865F2', boxShadow: '0 8px 20px rgba(88,101,242,0.25)' }}>
                  Entrar no Discord
                </button>
              </a>
              <a href="/planos">
                <button className="px-8 py-3.5 rounded-xl font-semibold text-sm transition-all hover:scale-105"
                  style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', color: 'rgba(134,239,172,0.8)' }}>
                  Ver Planos
                </button>
              </a>
            </div>
          </div>
        </div>

        {/* Feedbacks */}
        <div>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3 text-white">O Que Nossos Clientes Dizem</h2>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.25)' }}>Veja os depoimentos de quem já usa nossos bots</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {feedbacks.map((feedback) => (
              <div key={feedback.id} className="card-glass rounded-2xl p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0"
                    style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.12)' }}>
                    {feedback.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold text-sm">{feedback.name}</h3>
                    <div className="flex gap-0.5 mt-1">
                      {[...Array(feedback.rating)].map((_, i) => <span key={i} className="text-yellow-400 text-xs">⭐</span>)}
                    </div>
                  </div>
                  <span className="text-xs flex-shrink-0" style={{ color: 'rgba(255,255,255,0.2)' }}>{feedback.date}</span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>{feedback.comment}</p>
              </div>
            ))}
          </div>

          {/* Form de feedback */}
          <div className="card-glass rounded-2xl p-8">
            <h3 className="text-xl font-bold mb-6 text-center text-white">Deixe Seu Feedback</h3>
            {!showFeedbackForm ? (
              <div className="text-center">
                <button onClick={() => setShowFeedbackForm(true)}
                  className="px-8 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105"
                  style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', color: 'rgba(134,239,172,0.8)' }}>
                  ✍️ Escrever Feedback
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitFeedback} className="max-w-xl mx-auto space-y-4">
                <div>
                  <label className="block text-sm mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>Seu Nome</label>
                  <input type="text" value={newFeedback.name} onChange={(e) => setNewFeedback({...newFeedback, name: e.target.value})}
                    className="w-full rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                    placeholder="Digite seu nome..." required />
                </div>
                <div>
                  <label className="block text-sm mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>Avaliação</label>
                  <div className="flex gap-2">
                    {[1,2,3,4,5].map((star) => (
                      <button key={star} type="button" onClick={() => setNewFeedback({...newFeedback, rating: star})}
                        className={`text-2xl transition-transform hover:scale-110 ${star <= newFeedback.rating ? 'text-yellow-400' : 'text-gray-700'}`}>⭐</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>Seu Comentário</label>
                  <textarea value={newFeedback.comment} onChange={(e) => setNewFeedback({...newFeedback, comment: e.target.value})}
                    className="w-full rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all resize-none"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                    rows={4} placeholder="Conte-nos sua experiência..." required />
                </div>
                <div className="flex gap-3 justify-center">
                  <button type="submit" className="px-7 py-2.5 rounded-xl font-semibold text-sm transition-all hover:scale-105"
                    style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', color: 'rgba(134,239,172,0.8)' }}>
                    📤 Enviar
                  </button>
                  <button type="button" onClick={() => setShowFeedbackForm(false)}
                    className="px-7 py-2.5 rounded-xl font-semibold text-sm transition-all"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.3)' }}>
                    Cancelar
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
