import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, RotateCcw, Trophy, Users } from 'lucide-react'

type Player = 'X' | 'O' | null
type Board = Player[]

function TicTacToe() {
  const navigate = useNavigate()
  const [board, setBoard] = useState<Board>(Array(9).fill(null))
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X')
  const [winner, setWinner] = useState<Player>(null)
  const [gameOver, setGameOver] = useState(false)
  const [winningLine, setWinningLine] = useState<number[]>([])

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ]

  const checkWinner = (board: Board): { winner: Player; line: number[] } => {
    for (const combination of winningCombinations) {
      const [a, b, c] = combination
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a], line: combination }
      }
    }
    return { winner: null, line: [] }
  }

  const handleCellClick = (index: number) => {
    if (board[index] || gameOver) return

    const newBoard = [...board]
    newBoard[index] = currentPlayer
    setBoard(newBoard)

    const { winner: gameWinner, line } = checkWinner(newBoard)
    if (gameWinner) {
      setWinner(gameWinner)
      setWinningLine(line)
      setGameOver(true)
    } else if (newBoard.every(cell => cell !== null)) {
      setGameOver(true)
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setCurrentPlayer('X')
    setWinner(null)
    setGameOver(false)
    setWinningLine([])
  }

  const getCellClass = (index: number) => {
    let baseClass = "w-20 h-20 bg-slate-800 border-2 border-slate-600 rounded-lg flex items-center justify-center text-4xl font-bold transition-all duration-200 hover:bg-slate-700 hover:border-slate-500 cursor-pointer"
    
    if (board[index]) {
      baseClass += " cursor-not-allowed"
    }
    
    if (winningLine.includes(index)) {
      baseClass += " bg-gradient-to-br from-green-600 to-emerald-600 border-green-400 animate-pulse"
    }
    
    if (board[index] === 'X') {
      baseClass += " text-blue-400"
    } else if (board[index] === 'O') {
      baseClass += " text-pink-400"
    }
    
    return baseClass
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-black flex items-center justify-center p-4">
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
          
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Tic Tac Toe
          </h1>
        </div>

        {/* Game Status */}
        <div className="mb-8">
          {winner ? (
            <div className="flex items-center justify-center gap-3 text-2xl font-bold text-green-400">
              <Trophy className="w-8 h-8" />
              Vítěz: Hráč {winner}
            </div>
          ) : gameOver ? (
            <div className="text-2xl font-bold text-yellow-400">
              Remíza!
            </div>
          ) : (
            <div className="flex items-center justify-center gap-3 text-xl font-semibold text-slate-300">
              <Users className="w-6 h-6" />
              Na tahu: Hráč {currentPlayer}
              <span className={`text-2xl ${currentPlayer === 'X' ? 'text-blue-400' : 'text-pink-400'}`}>
                {currentPlayer}
              </span>
            </div>
          )}
        </div>

        {/* Game Board */}
        <div className="grid grid-cols-3 gap-3 mb-8 animate-slide-up">
          {board.map((cell, index) => (
            <button
              key={index}
              className={getCellClass(index)}
              onClick={() => handleCellClick(index)}
              disabled={!!cell || gameOver}
            >
              {cell}
            </button>
          ))}
        </div>

        {/* Control Buttons */}
        <div className="flex gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <button
            onClick={resetGame}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold py-3 px-6 rounded-full shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transform hover:scale-105 transition-all duration-200"
          >
            <RotateCcw className="w-5 h-5" />
            Nová hra
          </button>
        </div>

        {/* Game Rules */}
        <div className="mt-12 text-slate-400 text-sm max-w-md mx-auto animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <p className="mb-2">🎯 Cíl hry: Získejte tři své symboly v řadě!</p>
          <p>✨ Horizontálně, vertikálně nebo diagonálně</p>
        </div>
      </div>
    </div>
  )
}

export default TicTacToe