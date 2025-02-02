import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
// import { BrowserRouter } from 'react-router'
import Roteador from './roteador'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Roteador/>
    </StrictMode>,
)
