import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from '@/pages/landing-page'
import TicTacToe from '@/components/tic-tac-toe'
import Snake from '@/components/snake'
import Tetris from '@/components/tetris'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/tic-tac-toe" element={<TicTacToe />} />
        <Route path="/snake" element={<Snake />} />
        <Route path="/tetris" element={<Tetris />} />
      </Routes>
    </Router>
  )
}

export default App