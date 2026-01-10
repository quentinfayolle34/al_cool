import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './Home.tsx'

import TopTen from './jeux/TopTen.tsx'
import Treeman from './jeux/Treeman.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Treeman />
    {/* <TopTen /> */}
    {/* <Home /> */}
  </StrictMode>,
)
