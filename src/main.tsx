import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './Home.tsx'

import TopTen from './jeux/TopTen.tsx'
import DiceCube from './jeux/Treeman.tsx'
import DiceGame from './jeux/DiceGame.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DiceGame />
    {/* <TopTen /> */}
    {/* <Home /> */}
  </StrictMode>,
)
