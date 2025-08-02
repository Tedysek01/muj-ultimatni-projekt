import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, RotateCcw, Trophy, Timer, Target, Zap } from 'lucide-react'

type Position = { x: number; y: number }
type TetrominoType = 'I' | 'O' | 'T' | 'S' | 'Z' | 'J' | 'L'
type Board = (string | null)[][]

const BOARD_WIDTH = 10
const BOARD_HEIGHT = 20
const INITIAL_DROP_TIME = 1000

const TETROMINOES: Record<TetrominoType, { shape: number[][], color: string }> = {
  I: {
    shape: [
      [1, 1, 1, 1]
    ],
    color: 'bg-red-500'
  },
  O: {
    shape: [
      [1, 1],
      [1, 1]
    ],
    color: 'bg-orange-500'
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1]
    ],
    color: 'bg-pink-500'
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0]
    ],
    color: 'bg-rose-500'
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1]
    ],
    color: 'bg-yellow-500'
  },
  J: {
    shape: [
      [1, 0, 0],
      [1, 1, 1]
    ],
    color: 'bg-amber-500'
  },
  L: {
    shape: [
      [0, 0, 1],
      [1, 1, 1]
    ],
    color: 'bg-red-400'
  }
}

interface Tetromino {
  type: TetrominoType
  position: Position
  rotation: number
}

function Tetris() {
  const navigate = useNavigate()
  const [board, setBoard] = useState<Board>(() => 
    Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(null))
  )
  const [currentPiece, setCurrentPiece] = useState<Tetromino | null>(null)
  const [nextPiece, setNextPiece] = useState<TetrominoType | null>(null)
  const [score, setScore] = useState(0)
  const [lines, setLines] = useState(0)
  const [level, setLevel] = useState(1)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [dropTime, setDropTime] = useState(INITIAL_DROP_TIME)

  const getRandomTetromino = (): TetrominoType => {
    const types: TetrominoType[] = ['I', 'O', 'T', 'S', 'Z', 'J', 'L']
    return types[Math.floor(Math.random() * types.length)]
  }

  const createTetromino = (type: TetrominoType): Tetromino => ({
    type,
    position: { x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 },
    rotation: 0
  })

  const getRotatedShape = (shape: number[][], rotation: number): number[][] => {
    let rotatedShape = shape
    for (let i = 0; i < rotation % 4; i++) {
      const rows = rotatedShape.length
      const cols = rotatedShape[0].length
      const newShape = Array(cols).fill(null).map(() => Array(rows).fill(0))
      
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          newShape[col][rows - 1 - row] = rotatedShape[row][col]
        }
      }
      rotatedShape = newShape
    }
    return rotatedShape
  }

  const isValidPosition = (piece: Tetromino, board: Board): boolean => {
    const shape = getRotatedShape(TETROMINOES[piece.type].shape, piece.rotation)
    
    for (let row = 0; row < shape.length; row++) {
      for (let col = 0; col < shape[row].length; col++) {
        if (shape[row][col]) {
          const newX = piece.position.x + col
          const newY = piece.position.y + row
          
          if (
            newX < 0 || 
            newX >= BOARD_WIDTH || 
            newY >= BOARD_HEIGHT ||
            (newY >= 0 && board[newY][newX])
          ) {
            return false
          }
        }
      }
    }
    return true
  }

  const placePiece = (piece: Tetromino, board: Board): Board => {
    const newBoard = board.map(row => [...row])
    const shape = getRotatedShape(TETROMINOES[piece.type].shape, piece.rotation)
    const color = TETROMINOES[piece.type].color
    
    for (let row = 0; row < shape.length; row++) {
      for (let col = 0; col < shape[row].length; col++) {
        if (shape[row][col]) {
          const newY = piece.position.y + row
          const newX = piece.position.x + col
          if (newY >= 0) {
            newBoard[newY][newX] = color
          }
        }
      }
    }
    return newBoard
  }

  const clearLines = (board: Board): { newBoard: Board; linesCleared: number } => {
    const newBoard = board.filter(row => row.some(cell => cell === null))
    const linesCleared = BOARD_HEIGHT - newBoard.length
    
    while (newBoard.length < BOARD_HEIGHT) {
      newBoard.unshift(Array(BOARD_WIDTH).fill(null))
    }
    
    return { newBoard, linesCleared }
  }

  const movePiece = useCallback((direction: 'left' | 'right' | 'down') => {
    if (!currentPiece || gameOver || !gameStarted || isPaused) return
    
    const newPiece = { ...currentPiece }
    
    switch (direction) {
      case 'left':
        newPiece.position.x -= 1
        break
      case 'right':
        newPiece.position.x += 1
        break
      case 'down':
        newPiece.position.y += 1
        break
    }
    
    if (isValidPosition(newPiece, board)) {
      setCurrentPiece(newPiece)
    } else if (direction === 'down') {
      // Piece has landed - place it and spawn new one
      const newBoard = placePiece(currentPiece, board)
      const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard)
      
      // Update board first
      setBoard(clearedBoard)
      
      // Update score and level
      if (linesCleared > 0) {
        setLines(prev => {
          const newLines = prev + linesCleared
          const newLevel = Math.floor(newLines / 10) + 1
          if (newLevel > level) {
            setLevel(newLevel)
            setDropTime(Math.max(100, INITIAL_DROP_TIME - (newLevel - 1) * 100))
          }
          return newLines
        })
        setScore(prev => prev + (linesCleared * 100 * level))
      }
      
      // Check if we can spawn a new piece
      const nextType = nextPiece || getRandomTetromino()
      const nextNewPiece = createTetromino(nextType)
      
      if (!isValidPosition(nextNewPiece, clearedBoard)) {
        setGameOver(true)
        setGameStarted(false)
        setCurrentPiece(null)
      } else {
        // Spawn new piece
        setCurrentPiece(nextNewPiece)
        setNextPiece(getRandomTetromino())
      }
    }
  }, [currentPiece, board, gameOver, gameStarted, isPaused, level, nextPiece])

  const rotatePiece = useCallback(() => {
    if (!currentPiece || gameOver || !gameStarted || isPaused) return
    
    const newPiece = {
      ...currentPiece,
      rotation: currentPiece.rotation + 1
    }
    
    if (isValidPosition(newPiece, board)) {
      setCurrentPiece(newPiece)
    }
  }, [currentPiece, board, gameOver, gameStarted, isPaused])

  const startGame = () => {
    setGameStarted(true)
    setGameOver(false)
    setIsPaused(false)
    
    // Create first piece
    const firstType = getRandomTetromino()
    const firstPiece = createTetromino(firstType)
    setCurrentPiece(firstPiece)
    setNextPiece(getRandomTetromino())
  }

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    e.preventDefault()
    
    if (!gameStarted && e.code === 'Space') {
      startGame()
      return
    }
    
    if (e.code === 'Space') {
      setIsPaused(prev => !prev)
      return
    }
    
    if (gameOver || !gameStarted || isPaused) return
    
    switch (e.key) {
      case 'ArrowLeft':
      case 'a':
      case 'A':
        movePiece('left')
        break
      case 'ArrowRight':
      case 'd':
      case 'D':
        movePiece('right')
        break
      case 'ArrowDown':
      case 's':
      case 'S':
        movePiece('down')
        break
      case 'ArrowUp':
      case 'w':
      case 'W':
        rotatePiece()
        break
    }
  }, [gameStarted, gameOver, isPaused, movePiece, rotatePiece])

  const resetGame = () => {
    setBoard(Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(null)))
    setCurrentPiece(null)
    setNextPiece(null)
    setScore(0)
    setLines(0)
    setLevel(1)
    setGameStarted(false)
    setGameOver(false)
    setIsPaused(false)
    setDropTime(INITIAL_DROP_TIME)
  }

  const renderCell = (cell: string | null, isCurrentPiece = false) => {
    let className = "w-6 h-6 border border-slate-600/30"
    
    if (cell) {
      className += ` ${cell} border-slate-400/50`
    } else if (isCurrentPiece) {
      className += " bg-slate-500/50 border-slate-400/50"
    } else {
      className += " bg-slate-800/20"
    }
    
    return className
  }

  const getBoardWithCurrentPiece = (): Board => {
    if (!currentPiece) return board
    
    const newBoard = board.map(row => [...row])
    const shape = getRotatedShape(TETROMINOES[currentPiece.type].shape, currentPiece.rotation)
    const color = TETROMINOES[currentPiece.type].color
    
    for (let row = 0; row < shape.length; row++) {
      for (let col = 0; col < shape[row].length; col++) {
        if (shape[row][col]) {
          const newY = currentPiece.position.y + row
          const newX = currentPiece.position.x + col
          if (newY >= 0 && newY < BOARD_HEIGHT && newX >= 0 && newX < BOARD_WIDTH) {
            newBoard[newY][newX] = color
          }
        }
      }
    }
    return newBoard
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])

  useEffect(() => {
    if (!gameStarted || gameOver || isPaused || !currentPiece) return
    
    const interval = setInterval(() => {
      movePiece('down')
    }, dropTime)
    
    return () => clearInterval(interval)
  }, [gameStarted, gameOver, isPaused, currentPiece, dropTime, movePiece])

  const displayBoard = getBoardWithCurrentPiece()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-pink-900 to-rose-900 flex items-center justify-center p-4">
      <div className="text-center animate-fade-in max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Zpět na hlavní stránku
          </button>
          
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-400 via-rose-400 to-red-400 bg-clip-text text-transparent mb-4">
            Tetris
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          {/* Game Stats */}
          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-600/50 rounded-xl p-6 space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-bold text-slate-200 mb-4">Statistiky</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-yellow-400" />
                    <span className="text-slate-400">Skóre:</span>
                  </div>
                  <span className="text-yellow-400 font-bold">{score}</span>
                </div>
                
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-red-400" />
                    <span className="text-slate-400">Řady:</span>
                  </div>
                  <span className="text-red-400 font-bold">{lines}</span>
                </div>
                
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-pink-400" />
                    <span className="text-slate-400">Level:</span>
                  </div>
                  <span className="text-pink-400 font-bold">{level}</span>
                </div>
                
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Timer className="w-4 h-4 text-orange-400" />
                    <span className="text-slate-400">Rychlost:</span>
                  </div>
                  <span className="text-orange-400 font-bold">{(1000 / dropTime).toFixed(1)}/s</span>
                </div>
              </div>
            </div>
            
            {/* Next Piece */}
            {nextPiece && (
              <div className="border-t border-slate-600/50 pt-4">
                <h4 className="text-sm font-bold text-slate-400 mb-2">Další dílek:</h4>
                <div className="flex justify-center">
                  <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(4, minmax(0, 1fr))` }}>
                    {TETROMINOES[nextPiece].shape.map((row, rowIndex) => 
                      row.map((cell, colIndex) => (
                        <div
                          key={`${rowIndex}-${colIndex}`}
                          className={`w-4 h-4 border border-slate-600/30 ${
                            cell ? TETROMINOES[nextPiece].color : 'bg-slate-800/20'
                          }`}
                        />
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Game Board */}
          <div className="flex flex-col items-center">
            {/* Game Status */}
            <div className="mb-6">
              {!gameStarted && (
                <div className="text-xl font-bold text-pink-400 animate-pulse">
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

            {/* Board */}
            <div className="inline-block bg-slate-800/30 backdrop-blur-sm border border-slate-600/50 rounded-lg p-4 mb-6">
              <div className="grid gap-0" style={{ gridTemplateColumns: `repeat(${BOARD_WIDTH}, minmax(0, 1fr))` }}>
                {displayBoard.map((row, rowIndex) =>
                  row.map((cell, colIndex) => (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className={renderCell(cell)}
                    />
                  ))
                )}
              </div>
            </div>

            {/* Controls */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={resetGame}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-semibold py-3 px-6 rounded-full shadow-lg shadow-pink-500/25 hover:shadow-xl hover:shadow-pink-500/40 transform hover:scale-105 transition-all duration-200"
              >
                <RotateCcw className="w-5 h-5" />
                Nová hra
              </button>
              
              {gameStarted && !gameOver && (
                <button
                  onClick={() => setIsPaused(!isPaused)}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white font-semibold py-3 px-6 rounded-full shadow-lg shadow-yellow-500/25 hover:shadow-xl hover:shadow-yellow-500/40 transform hover:scale-105 transition-all duration-200"
                >
                  <Timer className="w-5 h-5" />
                  {isPaused ? 'Pokračovat' : 'Pauza'}
                </button>
              )}
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-600/50 rounded-xl p-6">
            <h3 className="text-lg font-bold text-slate-200 mb-4 text-center">Ovládání</h3>
            <div className="text-slate-400 text-sm space-y-2">
              <p className="flex items-center gap-2">
                <span>⬅️➡️</span>
                Pohyb doleva/doprava
              </p>
              <p className="flex items-center gap-2">
                <span>⬇️</span>
                Rychlejší pád
              </p>
              <p className="flex items-center gap-2">
                <span>⬆️</span>
                Rotace dílku
              </p>
              <p className="flex items-center gap-2">
                <span>⏸️</span>
                MEZERNÍK - Pauza
              </p>
              <p className="text-xs text-slate-500 mt-4">
                Nebo použijte WASD klávesy
              </p>
            </div>
            
            <div className="border-t border-slate-600/50 pt-4 mt-4">
              <h4 className="text-sm font-bold text-slate-400 mb-2">Cíl hry:</h4>
              <p className="text-xs text-slate-500">
                Skládejte padající dílky a vyplňte celé řady pro jejich odstranění. Hra se postupně zrychluje!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tetris