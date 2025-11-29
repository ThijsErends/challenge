import { Routes, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Puzzle1 from './components/Puzzle1'
import Puzzle2 from './components/Puzzle2'
import Puzzle3 from './components/Puzzle3'
import Puzzle4 from './components/Puzzle4'
import Puzzle5 from './components/Puzzle5'
import Puzzle6 from './components/Puzzle6'
import Puzzle7 from './components/Puzzle7'
import Puzzle8 from './components/Puzzle8'
import Puzzle9 from './components/Puzzle9'
import Puzzle10 from './components/Puzzle10'
import Layout from './components/Layout'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/puzzle-1" element={<Puzzle1 />} />
        <Route path="/puzzle-2" element={<Puzzle2 />} />
        <Route path="/puzzle-3" element={<Puzzle3 />} />
        <Route path="/puzzle-4" element={<Puzzle4 />} />
        <Route path="/puzzle-5" element={<Puzzle5 />} />
        <Route path="/puzzle-6" element={<Puzzle6 />} />
        <Route path="/puzzle-7" element={<Puzzle7 />} />
        <Route path="/puzzle-8" element={<Puzzle8 />} />
        <Route path="/puzzle-9" element={<Puzzle9 />} />
        <Route path="/puzzle-10" element={<Puzzle10 />} />
      </Routes>
    </Layout>
  )
}

export default App

