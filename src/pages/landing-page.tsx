import React from 'react'
import { Heart, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function LandingPage() {
  const navigate = useNavigate()

  const handleExploreClick = () => {
    navigate('/tic-tac-toe')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-black flex items-center justify-center p-4">
      <div className="text-center animate-fade-in">
        <div className="mb-8 animate-slide-up">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Sparkles className="w-16 h-16 text-purple-400 animate-pulse" />
              <Heart className="w-8 h-8 text-pink-400 absolute -top-2 -right-2 animate-bounce" />
            </div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-400 via-pink-300 to-slate-200 bg-clip-text text-transparent mb-4">
            Ahoj světe!
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Jednoduchá landing page vytvořená s moderními technologiemi
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-400 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <span className="bg-slate-800/50 backdrop-blur-sm px-3 py-1 rounded-full border border-slate-700">
              React 18
            </span>
            <span className="bg-slate-800/50 backdrop-blur-sm px-3 py-1 rounded-full border border-slate-700">
              TypeScript
            </span>
            <span className="bg-slate-800/50 backdrop-blur-sm px-3 py-1 rounded-full border border-slate-700">
              Tailwind CSS
            </span>
            <span className="bg-slate-800/50 backdrop-blur-sm px-3 py-1 rounded-full border border-slate-700">
              Vite
            </span>
          </div>
        </div>
        
        <div className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <button 
            onClick={handleExploreClick}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transform hover:scale-105 transition-all duration-200"
          >
            Začít prozkoumávat
          </button>
        </div>
        
        <div className="mt-12 text-slate-500 text-sm animate-slide-up" style={{ animationDelay: '0.8s' }}>
          Projekt vytvořený z promptu: "vytvoř jednoduchou landing page co říká ahoj světe"
        </div>
      </div>
    </div>
  )
}

export default LandingPage