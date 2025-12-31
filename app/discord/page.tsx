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
  const [feedbacks, setFeedbacks] = useState([
    {
      id: 1,
      name: "João Silva",
      avatar: "🎮",
      rating: 5,
      comment: "Melhor bot que já usei! Suporte excepcional e funcionalidades incríveis.",
      date: "Há 2 dias"
    },
    {
      id: 2,
      name: "Maria Santos",
      avatar: "👑",
      rating: 5,
      comment: "Sistema de vendas automatizado funcionou perfeitamente. Recomendo!",
      date: "Há 1 semana"
    },
    {
      id: 3,
      name: "Pedro Costa",
      avatar: "⚡",
      rating: 5,
      comment: "Atendimento rápido e bot super estável. Vale cada centavo!",
      date: "Há 3 dias"
    },
    {
      id: 4,
      name: "Ana Oliveira",
      avatar: "🌟",
      rating: 5,
      comment: "Configuração simples e intuitiva. Meu servidor ficou profissional!",
      date: "Há 5 dias"
    }
  ])
  const [newFeedback, setNewFeedback] = useState({ name: "", comment: "", rating: 5 })
  const [showFeedbackForm, setShowFeedbackForm] = useState(false)

  const names = [
    "Lucas Almeida", "Carla Ferreira", "Rafael Santos", "Beatriz Lima", "Gabriel Costa",
    "Juliana Souza", "Bruno Oliveira", "Camila Rodrigues", "Felipe Martins", "Amanda Silva",
    "Thiago Pereira", "Larissa Gomes", "Rodrigo Barbosa", "Fernanda Ribeiro", "Eduardo Dias",
    "Mariana Castro", "Vinicius Rocha", "Isabella Campos", "Guilherme Cardoso", "Natália Freitas",
    "André Moreira", "Letícia Azevedo", "Daniel Carvalho", "Bianca Monteiro", "Henrique Batista",
    "Gabriela Teixeira", "Matheus Araújo", "Sophia Correia", "Leonardo Pinto", "Yasmin Lopes",
    "Gustavo Fernandes", "Laura Nascimento", "Arthur Sousa", "Melissa Duarte", "Cauê Barros",
    "Helena Mendes", "Nicolas Ramos", "Alice Nunes", "Enzo Cavalcante", "Valentina Moura",
    "João Pedro Reis", "Clara Santos", "Davi Alves", "Lívia Machado", "Miguel Vieira",
    "Giovanna Cunha", "Heitor Castro", "Lorena Pires", "Pietro Silva", "Marina Costa",
    "Benjamin Araújo", "Elisa Farias", "Samuel Teixeira", "Lavínia Monteiro", "Benício Rocha",
    "Antonella Cardoso", "Theo Barbosa", "Cecília Dias", "Anthony Ferreira", "Lara Gomes",
    "Isaac Oliveira", "Emanuelly Lima", "Lorenzo Santos", "Stella Pereira", "Murilo Souza",
    "Aurora Martins", "Caio Rodrigues", "Isabelly Almeida", "Bryan Costa", "Melissa Campos",
    "Ryan Lima", "Esther Silva", "Levi Santos", "Manuela Ribeiro", "Noah Carvalho",
    "Sophie Batista", "Oliver Pinto", "Liz Moreira", "Henry Barros", "Luna Azevedo",
    "Ian Correia", "Maitê Lopes", "Lucca Nascimento", "Nina Freitas", "Thomas Ramos",
    "Emily Duarte", "Kaleb Mendes", "Olivia Cavalcante", "Yuri Nunes", "Jade Moura",
    "Joaquim Reis", "Clarice Alves", "Gael Machado", "Agatha Vieira", "Emanuel Cunha",
    "Milena Pires", "Ravi Farias", "Isabela Castro", "Juan Monteiro", "Bruna Cardoso",
    "Max Silva", "Pietra Rocha", "Raul Costa", "Catarina Barbosa", "Davi Luiz Dias",
    "Ayla Ferreira", "Apollo Gomes", "Victoria Oliveira", "Bento Lima", "Maya Santos"
  ]

  useEffect(() => {
    const animateCounter = (target, setter, duration = 2000) => {
      let start = 0
      const increment = target / (duration / 16)
      const timer = setInterval(() => {
        start += increment
        if (start >= target) {
          setter(target)
          clearInterval(timer)
        } else {
          setter(Math.floor(start))
        }
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
      do {
        randomName = names[Math.floor(Math.random() * names.length)]
      } while (usedNames.has(randomName))
      
      usedNames.add(randomName)
      
      const actions = [
        `acabou de entrar no Discord!`,
        `está explorando os planos`,
        `visualizou os tutoriais`,
        `acabou de comprar um bot!`,
        `está online no servidor`
      ]
      
      const notification = {
        id: Date.now(),
        name: randomName,
        action: actions[Math.floor(Math.random() * actions.length)]
      }
      
      setNotifications(prev => [...prev, notification])
      
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== notification.id))
      }, 5000)
    }
    
    const interval = setInterval(showNotification, 4000)
    showNotification()
    
    return () => clearInterval(interval)
  }, [])

  const handleSubmitFeedback = (e) => {
    e.preventDefault()
    if (newFeedback.name && newFeedback.comment) {
      const feedback = {
        id: Date.now(),
        name: newFeedback.name,
        avatar: "👤",
        rating: newFeedback.rating,
        comment: newFeedback.comment,
        date: "Agora"
      }
      setFeedbacks([feedback, ...feedbacks])
      setNewFeedback({ name: "", comment: "", rating: 5 })
      setShowFeedbackForm(false)
    }
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

  const grayParticles = [...Array(40)].map((_, i) => ({
    opacity: Math.random() * 0.6 + 0.2,
    size: Math.random() * 6 + 2,
    topPos: Math.random() * 100,
    leftPos: Math.random() * 100,
    duration: Math.random() * 16 + 12,
    delay: Math.random() * 10,
    blur: Math.random() * 0.8,
  }))

  const goldParticles = [...Array(15)].map((_, i) => ({
    opacity: Math.random() * 0.4 + 0.2,
    size: Math.random() * 4 + 2,
    topPos: Math.random() * 100,
    leftPos: Math.random() * 100,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 8,
    blur: Math.random() * 1,
  }))

  const features = [
    {
      icon: "🤖",
      title: "Bots Personalizados",
      description: "Desenvolvemos bots sob medida para atender todas as necessidades do seu servidor Discord."
    },
    {
      icon: "⚡",
      title: "Alta Performance",
      description: "Infraestrutura robusta garantindo 99.9% de uptime e respostas instantâneas."
    },
    {
      icon: "🛡️",
      title: "Segurança Total",
      description: "Proteção avançada contra raids, spam e ataques ao seu servidor."
    },
    {
      icon: "🎨",
      title: "Design Exclusivo",
      description: "Interface moderna e intuitiva com comandos personalizáveis."
    },
    {
      icon: "📊",
      title: "Sistema de Vendas",
      description: "Automatize suas vendas com sistema completo de pagamentos e entregas."
    },
    {
      icon: "💬",
      title: "Suporte 24/7",
      description: "Equipe dedicada pronta para ajudar você a qualquer momento."
    }
  ]

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

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(88, 101, 242, 0.5); }
          50% { box-shadow: 0 0 40px rgba(88, 101, 242, 0.8); }
        }

        @keyframes slide-in {
          from { transform: translateX(400px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        @keyframes slide-out {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(400px); opacity: 0; }
        }
      `}} />

      {/* Notificações */}
      <div className="fixed bottom-6 right-6 z-50 space-y-3 max-w-sm">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className="bg-gradient-to-r from-purple-900/95 to-blue-900/95 backdrop-blur-md border border-purple-500/50 rounded-xl p-4 shadow-2xl"
            style={{ animation: 'slide-in 0.5s ease-out' }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-xl">
                👤
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold text-sm">{notif.name}</p>
                <p className="text-gray-300 text-xs">{notif.action}</p>
              </div>
              <div className="text-green-400">✓</div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 pointer-events-none" />

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

        {grayParticles.map((particle, i) => (
          <div
            key={`gray-${i}`}
            className="absolute rounded-full will-change-transform"
            style={{
              backgroundColor: `rgba(200, 200, 200, ${particle.opacity})`,
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
        
        {goldParticles.map((particle, i) => (
          <div
            key={`gold-${i}`}
            className="absolute rounded-full will-change-transform"
            style={{
              backgroundColor: `rgba(217, 164, 65, ${particle.opacity})`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              top: `${particle.topPos}%`,
              left: `${particle.leftPos}%`,
              animation: `float-diagonal ${particle.duration}s infinite ease-in-out`,
              animationDelay: `${particle.delay}s`,
              filter: `blur(${particle.blur}px)`,
            }}
          />
        ))}
      </div>

      {/* Header Global */}
      <Header />

      <main className="px-6 py-20 pt-32 relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <svg className="w-24 h-24 mx-auto" viewBox="0 0 71 55" fill="none">
              <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z" fill="#5865F2"/>
            </svg>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
            Junte-se à Nossa Comunidade
          </h1>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto mb-8">
            Entre no nosso servidor Discord e conheça mais sobre nossos bots, tire dúvidas e faça parte de uma comunidade ativa de mais de 150 clientes satisfeitos!
          </p>
          <a 
            href="https://discord.gg/WcSU5AvhRX" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Button className="bg-[#5865F2] hover:bg-[#4752C4] text-white px-10 py-6 rounded-xl font-bold text-lg shadow-2xl transform hover:scale-105 transition-all duration-200"
              style={{ animation: 'pulse-glow 2s infinite' }}
            >
              <svg className="w-6 h-6 mr-3 inline-block" viewBox="0 0 71 55" fill="currentColor">
                <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978Z"/>
              </svg>
              Entrar no Discord
            </Button>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-gradient-to-br from-purple-900/30 to-purple-600/20 border border-purple-500/30 rounded-2xl p-8 text-center transform hover:scale-105 transition-all duration-300">
            <div className="text-6xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {clientCount}+
            </div>
            <div className="text-gray-300 text-lg font-semibold">Clientes Satisfeitos</div>
            <div className="text-gray-500 text-sm mt-2">Em toda nossa trajetória</div>
          </div>

          <div className="bg-gradient-to-br from-blue-900/30 to-blue-600/20 border border-blue-500/30 rounded-2xl p-8 text-center transform hover:scale-105 transition-all duration-300">
            <div className="text-6xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {botCount}+
            </div>
            <div className="text-gray-300 text-lg font-semibold">Bots Desenvolvidos</div>
            <div className="text-gray-500 text-sm mt-2">Projetos personalizados</div>
          </div>

          <div className="bg-gradient-to-br from-green-900/30 to-green-600/20 border border-green-500/30 rounded-2xl p-8 text-center transform hover:scale-105 transition-all duration-300">
            <div className="text-6xl font-bold mb-3 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              {uptimeCount}.9%
            </div>
            <div className="text-gray-300 text-lg font-semibold">Uptime Garantido</div>
            <div className="text-gray-500 text-sm mt-2">Alta disponibilidade</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-700/50 rounded-3xl p-12 mb-20">
          <h2 className="text-4xl font-bold mb-6 text-center">Sobre a G-White Apps</h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-6 text-center max-w-4xl mx-auto">
            A <span className="text-white font-semibold">G-White Apps</span> é especializada no desenvolvimento de bots personalizados para Discord. Com anos de experiência no mercado, oferecemos soluções completas para automatização, moderação, vendas e entretenimento em servidores Discord.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed text-center max-w-4xl mx-auto">
            Nossa missão é fornecer bots de <span className="text-purple-400 font-semibold">alta qualidade</span>, com <span className="text-blue-400 font-semibold">suporte excepcional</span> e <span className="text-green-400 font-semibold">preços acessíveis</span>, ajudando comunidades a crescerem e prosperarem no Discord.
          </p>
        </div>

        <div className="mb-20">
          <h2 className="text-4xl font-bold mb-12 text-center">Por Que Escolher Nossos Bots?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-[#1a1a1a] border border-gray-700/50 rounded-xl p-6 hover:bg-[#252525] hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#5865F2]/20 to-[#5865F2]/10 border border-[#5865F2]/30 rounded-3xl p-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Pronto Para Começar?</h2>
          <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto">
            Entre no nosso Discord agora mesmo! Converse com nossa equipe, tire suas dúvidas e conheça outros clientes satisfeitos com nossos serviços.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="https://discord.gg/WcSU5AvhRX" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button className="bg-[#5865F2] hover:bg-[#4752C4] text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl transform hover:scale-105 transition-all duration-200">
                Entrar no Discord
              </Button>
            </a>
            <a href="/planos">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl transform hover:scale-105 transition-all duration-200">
                Ver Planos
              </Button>
            </a>
          </div>
        </div>

        {/* Seção de Feedbacks */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">O Que Nossos Clientes Dizem</h2>
            <p className="text-gray-400 text-lg">Veja os depoimentos de quem já usa nossos bots</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {feedbacks.map((feedback) => (
              <div
                key={feedback.id}
                className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-700/50 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-2xl">
                    {feedback.avatar}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold">{feedback.name}</h3>
                    <div className="flex gap-1 mt-1">
                      {[...Array(feedback.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400">⭐</span>
                      ))}
                    </div>
                  </div>
                  <span className="text-gray-500 text-sm">{feedback.date}</span>
                </div>
                <p className="text-gray-300 leading-relaxed">{feedback.comment}</p>
              </div>
            ))}
          </div>

          {/* Formulário de Feedback */}
          <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Deixe Seu Feedback</h3>
            
            {!showFeedbackForm ? (
              <div className="text-center">
                <Button 
                  onClick={() => setShowFeedbackForm(true)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-semibold shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  ✍️ Escrever Feedback
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmitFeedback} className="max-w-2xl mx-auto space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2 font-semibold">Seu Nome</label>
                  <input
                    type="text"
                    value={newFeedback.name}
                    onChange={(e) => setNewFeedback({...newFeedback, name: e.target.value})}
                    className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="Digite seu nome..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 font-semibold">Avaliação</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewFeedback({...newFeedback, rating: star})}
                        className={`text-3xl transition-transform hover:scale-110 ${
                          star <= newFeedback.rating ? 'text-yellow-400' : 'text-gray-600'
                        }`}
                      >
                        ⭐
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 font-semibold">Seu Comentário</label>
                  <textarea
                    value={newFeedback.comment}
                    onChange={(e) => setNewFeedback({...newFeedback, comment: e.target.value})}
                    className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors resize-none"
                    rows="4"
                    placeholder="Conte-nos sua experiência..."
                    required
                  />
                </div>

                <div className="flex gap-4 justify-center">
                  <Button 
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-xl transform hover:scale-105 transition-all duration-200"
                  >
                    📤 Enviar Feedback
                  </Button>
                  <Button 
                    type="button"
                    onClick={() => setShowFeedbackForm(false)}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200"
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>

      {/* Footer Global */}
      <Footer />
    </div>
  )
}