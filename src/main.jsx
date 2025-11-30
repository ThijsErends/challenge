import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { PuzzleProgressProvider } from './contexts/PuzzleProgressContext'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <PuzzleProgressProvider>
        <App />
      </PuzzleProgressProvider>
    </HashRouter>
  </React.StrictMode>,
)

