import { Heart, Sparkles, Gamepad2, Users, Trophy, Zap, Play, Star, ArrowRight, Shield, Wifi, Smartphone } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function LandingPage() {
  const navigate = useNavigate()

  const games = [
    {
      title: 'Tic Tac Toe',
      description: 'Klasická strategická hra pro dva hráče s nekonečnou zábavou',
      path: '/tic-tac-toe',
      icon: '⭕',
      gradient: 'from-orange-500 to-red-500',
      category: 'Strategie',
      players: '2 hráči',
      rating: 4.8
    },
    {
      title: 'Snake',
      description: 'Retro arkádová hra, která nikdy nezestárne',
      path: '/snake',
      icon: '🐍',
      gradient: 'from-red-500 to-pink-500',
      category: 'Arkáda',
      players: '1 hráč',
      rating: 4.9
    },
    {
      title: 'Tetris',
      description: 'Legendární puzzle hra s padajícími bloky',
      path: '/tetris',
      icon: '🟦',
      gradient: 'from-pink-500 to-rose-500',
      category: 'Puzzle',
      players: '1 hráč',
      rating: 4.7
    }
  ]

  const features = [
    {
      icon: <Gamepad2 className="w-8 h-8" />,
      title: 'Instant Play',
      description: 'Hrajte okamžitě bez stahování nebo instalace'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Bezpečné hraní',
      description: 'Všechny hry jsou testované a 100% bezpečné'
    },
    {
      icon: <Wifi className="w-8 h-8" />,
      title: 'Online & Offline',
      description: 'Hrajte online nebo offline podle vaší preference'
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: 'Multi-platforma',
      description: 'Funguje na všech zařízeních - mobil, tablet, PC'
    }
  ]

  const stats = [
    { number: '10K+', label: 'Aktivních hráčů' },
    { number: '50K+', label: 'Odehraných her' },
    { number: '99%', label: 'Spokojenost' },
    { number: '24/7', label: 'Dostupnost' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-orange-900">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-orange-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-32 right-20 w-40 h-40 bg-pink-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-red-400 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="text-center animate-fade-in max-w-6xl mx-auto relative z-10">
          <div className="mb-12 animate-slide-up">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-full blur-2xl opacity-50 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-orange-500 to-red-500 p-6 rounded-full">
                  <Gamepad2 className="w-16 h-16 text-white" />
                </div>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-bold bg-gradient-to-r from-orange-300 via-red-300 to-pink-200 bg-clip-text text-transparent mb-6 leading-tight">
              GameHub
            </h1>
            
            <p className="text-2xl md:text-3xl text-slate-300 mb-4 font-light">
              Ultimátní herní platforma
            </p>
            
            <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              Objevte svět nekonečné zábavy s naší kolekcí klasických her. 
              Hrajte okamžitě, kdekoli a kdykoli - bez registrace, bez stahování.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <button
                onClick={() => document.getElementById('games-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-bold py-4 px-8 rounded-full shadow-2xl shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/40 transform hover:scale-105 transition-all duration-300 text-lg"
              >
                <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
                Začít hrát zdarma
              </button>
              
              <button
                onClick={() => document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="group inline-flex items-center gap-3 bg-slate-800/50 backdrop-blur-sm border-2 border-slate-600 hover:border-slate-500 text-slate-200 font-semibold py-4 px-8 rounded-full shadow-lg hover:bg-slate-700/50 transform hover:scale-105 transition-all duration-300 text-lg"
              >
                Zjistit více
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            {/* Tech Stack */}
            <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-400 animate-slide-up" style={{ animationDelay: '0.6s' }}>
              <span className="bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-700 hover:border-slate-600 transition-colors">
                React 18
              </span>
              <span className="bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-700 hover:border-slate-600 transition-colors">
                TypeScript
              </span>
              <span className="bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-700 hover:border-slate-600 transition-colors">
                Tailwind CSS
              </span>
              <span className="bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-700 hover:border-slate-600 transition-colors">
                Vite
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="py-20 px-4 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-slate-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Games Section */}
      <div id="games-section" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Trophy className="w-8 h-8 text-orange-400" />
              <h2 className="text-4xl md:text-5xl font-bold text-slate-200">
                Populární hry
              </h2>
            </div>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Vyberte si z naší pečlivě vybrané kolekce klasických her
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {games.map((game, index) => (
              <div
                key={game.path}
                className="group bg-slate-800/30 backdrop-blur-sm border border-slate-600/50 rounded-2xl p-8 hover:bg-slate-700/40 hover:border-slate-500/70 transition-all duration-500 cursor-pointer transform hover:scale-105 hover:-translate-y-2 shadow-xl hover:shadow-2xl"
                onClick={() => navigate(game.path)}
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="text-5xl group-hover:scale-110 transition-transform duration-300">
                    {game.icon}
                  </div>
                  <div className="flex items-center gap-1 bg-slate-700/50 px-3 py-1 rounded-full">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-slate-300 font-medium">{game.rating}</span>
                  </div>
                </div>
                
                <h3 className={`text-2xl font-bold bg-gradient-to-r ${game.gradient} bg-clip-text text-transparent mb-3`}>
                  {game.title}
                </h3>
                
                <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                  {game.description}
                </p>
                
                <div className="flex items-center justify-between mb-6">
                  <span className="bg-slate-700/50 px-3 py-1 rounded-full text-xs text-slate-300">
                    {game.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <Users className="w-4 h-4" />
                    {game.players}
                  </div>
                </div>
                
                <button className={`w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r ${game.gradient} text-white font-semibold py-3 px-6 rounded-xl group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-105`}>
                  <Play className="w-5 h-5" />
                  Hrát nyní
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features-section" className="py-20 px-4 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Zap className="w-8 h-8 text-orange-400" />
              <h2 className="text-4xl md:text-5xl font-bold text-slate-200">
                Proč GameHub?
              </h2>
            </div>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Moderní herní platforma navržená pro maximální pohodlí a zábavu
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-8 bg-slate-800/30 backdrop-blur-sm border border-slate-600/50 rounded-2xl hover:bg-slate-700/40 hover:border-slate-500/70 transition-all duration-300 transform hover:scale-105 group"
                style={{ animationDelay: `${0.1 + index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-200 mb-4">
                  {feature.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-3xl p-12">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Sparkles className="w-12 h-12 text-orange-400 animate-pulse" />
                <Heart className="w-6 h-6 text-red-400 absolute -top-1 -right-1 animate-bounce" />
              </div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-slate-200 mb-6">
              Připraveni na zábavu?
            </h2>
            
            <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
              Připojte se k tisícům hráčů a objevte nekonečný svět zábavy. 
              Bez registrace, bez poplatků, jen čistá zábava.
            </p>
            
            <button
              onClick={() => document.getElementById('games-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-bold py-4 px-8 rounded-full shadow-2xl shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/40 transform hover:scale-105 transition-all duration-300 text-lg"
            >
              <Gamepad2 className="w-6 h-6" />
              Začít hrát hned teď
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-12 px-4 bg-slate-950/50 backdrop-blur-sm border-t border-slate-800">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-slate-500 text-sm mb-4">
            Projekt vytvořený s moderními webovými technologiemi
          </div>
          <div className="text-slate-600 text-xs">
            © 2024 GameHub. Všechna práva vyhrazena. Vytvořeno z promptu: "vytvoř jednoduchou landing page co říká ahoj světe"
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage