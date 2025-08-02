import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, RotateCcw, Trophy, Gamepad2, Zap } from 'lucide-react'

type Position = { x: number; y: number }
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'

const GRID_SIZE = 20
const INITIAL_SNAKE = [{ x: 10, y: 10 }]
const INITIAL_FOOD = { x: 15, y: 15 }
const INITIAL_DIRECTION: Direction = 'RIGHT'
const GAME_SPEED = 150

function Snake() {
  const navigate = useNavigate()
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE)
  const [food, setFood] = useState<Position>(INITIAL_FOOD)
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const generateFood = useCallback((currentSnake: Position[]): Position => {
    let newFood: Position
    let attempts = 0
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      }
      attempts++
      if (attempts > 100) break
    } while (currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y))
    return newFood
  }, [])

  const moveSnake = useCallback(() => {
    if (gameOver || !gameStarted || isPaused) return

    setSnake(currentSnake => {
      const newSnake = [...currentSnake]
      const head = { ...newSnake[0] }

      switch (direction) {
        case 'UP':
          head.y -= 1
          break
        case 'DOWN':
          head.y += 1
          break
        case 'LEFT':
          head.x -= 1
          break
        case 'RIGHT':
          head.x += 1
          break
      }

      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        setGameOver(true)
        return currentSnake
      }

      if (currentSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true)
        return currentSnake
      }

      newSnake.unshift(head)

      if (head.x === food.x && head.y === food.y) {
        const newFood = generateFood(newSnake)
        setFood(newFood)
        setScore(prevScore => prevScore + 10)
      } else {
        newSnake.pop()
      }

      return newSnake
    })
  }, [direction, food, gameOver, gameStarted, isPaused, generateFood])

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    e.preventDefault()
    
    if (!gameStarted) {
      if (e.code === 'Space') {
        setGameStarted(true)
        return
      }
    }

    if (e.code === 'Space') {
      setIsPaused(prev => !prev)
      return
    }

    if (gameOver || isPaused) return

    switch (e.key) {
      case 'ArrowUp':
      case 'w':
      case 'W':
        if (direction !== 'DOWN') setDirection('UP')
        break
      case 'ArrowDown':
      case 's':
      case 'S':
        if (direction !== 'UP') setDirection('DOWN')
        break
      case 'ArrowLeft':
      case 'a':
      case 'A':
        if (direction !== 'RIGHT') setDirection('LEFT')
        break
      case 'ArrowRight':
      case 'd':
      case 'D':
        if (direction !== 'LEFT') setDirection('RIGHT')
        break
    }
  }, [direction, gameOver, gameStarted, isPaused])

  const resetGame = () => {
    setSnake(INITIAL_SNAKE)
    setFood(INITIAL_FOOD)
    setDirection(INITIAL_DIRECTION)
    setGameOver(false)
    setScore(0)
    setGameStarted(false)
    setIsPaused(false)
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])

  useEffect(() => {
    if (!gameStarted || gameOver || isPaused) return
    
    const gameInterval = setInterval(moveSnake, GAME_SPEED)
    return () => clearInterval(gameInterval)
  }, [moveSnake, gameStarted, gameOver, isPaused])

  const getCellClass = (x: number, y: number) => {
    const isSnakeHead = snake[0] && snake[0].x === x && snake[0].y === y
    const isSnakeBody = snake.some((segment, index) => index > 0 && segment.x === x && segment.y === y)
    const isFood = food.x === x && food.y === y

    let baseClass = "w-4 h-4 border border-slate-600/30"

    if (isSnakeHead) {
      baseClass += " bg-gradient-to-br from-red-400 to-pink-500 rounded-sm shadow-lg"
    } else if (isSnakeBody) {
      baseClass += " bg-gradient-to-br from-red-600 to-pink-600 rounded-sm"
    } else if (isFood) {
      baseClass += " bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full animate-pulse shadow-lg"
    } else {
      baseClass += " bg-slate-800/20"
    }

    return baseClass
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-pink-900 flex items-center justify-center p-4">
      <div className="text-center animate-fade-in">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Zpět na hlavní stránku
          </button>
          
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-red-400 via-pink-400 to-rose-400 bg-clip-text text-transparent mb-4">
            Snake
          </h1>
        </div>

        {/* Game Status */}
        <div className="mb-6">
          <div className="flex items-center justify-center gap-6 text-lg font-semibold text-slate-300 mb-4">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span>Skóre: {score}</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-red-400" />
              <span>Délka: {snake.length}</span>
            </div>
          </div>

          {!gameStarted && (
            <div className="text-xl font-bold text-red-400 animate-pulse">
              Stiskněte MEZERNÍK pro start
            </div>
          )}
          
          {gameStarted && isPaused && (
            <div className="text-xl font-bold text-yellow-400">
              Pauza - stiskněte MEZERNÍK pro pokračování
            </div>
          )}
          
          {gameOver && (
            <div className="text-2xl font-bold text-rose-400">
              Konec hry! Finální skóre: {score}
            </div>
          )}
        </div>

        {/* Game Board */}
        <div className="inline-block bg-slate-800/30 backdrop-blur-sm border border-slate-600/50 rounded-lg p-4 mb-6">
          <div className="grid grid-cols-20 gap-0" style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))` }}>
            {Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, index) => {
              const x = index % GRID_SIZE
              const y = Math.floor(index / GRID_SIZE)
              return (
                <div key={index} className={getCellClass(x, y)} />
              )
            })}
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-4 justify-center mb-6">
          <button
            onClick={resetGame}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white font-semibold py-3 px-6 rounded-full shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/40 transform hover:scale-105 transition-all duration-200"
          >
            <RotateCcw className="w-5 h-5" />
            Nová hra
          </button>
          
          {gameStarted && !gameOver && (
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white font-semibold py-3 px-6 rounded-full shadow-lg shadow-yellow-500/25 hover:shadow-xl hover:shadow-yellow-500/40 transform hover:scale-105 transition-all duration-200"
            >
              <Gamepad2 className="w-5 h-5" />
              {isPaused ? 'Pokračovat' : 'Pauza'}
            </button>
          )}
        </div>

        {/* Game Instructions */}
        <div className="text-slate-400 text-sm max-w-md mx-auto space-y-2">
          <p className="flex items-center justify-center gap-2">
            <span>🎮</span>
            Ovládání: Šipky nebo WASD
          </p>
          <p className="flex items-center justify-center gap-2">
            <span>⏸️</span>
            Pauza: MEZERNÍK
          </p>
          <p className="flex items-center justify-center gap-2">
            <span>🎯</span>
            Cíl: Sběr žluto-oranžového jídla, vyhni se stěnám a vlastnímu tělu
          </p>
        </div>
      </div>
    </div>
  )
}

export default Snake