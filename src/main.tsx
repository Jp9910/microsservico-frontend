import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Roteador from './roteador'
// console.log(import.meta.env.MODE)
// console.log(import.meta.env.VITE_DEV_TEST)
// console.log(import.meta.env.VITE_ENV_TEST)
// console.log(import.meta.env.VITE_PROD_TEST)
// console.log(import.meta.env.APP_URL)

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Roteador/>
    </StrictMode>,
)

// Running in dev or building prod mode: https://vite.dev/guide/cli
// Env variables and modes: https://vite.dev/guide/env-and-mode
// npx vite <-- runs local server in dev mode
// npx vite build <-- builds for production, 
// to actually deploy: 
        // https://vite.dev/guide/static-deploy.html
        // https://stackoverflow.com/questions/75531401/how-to-use-vite-for-production-build
        // - "So just use vite build and point the server to use the build files right ?"
        // - "Yes, that's right. Though I would suggest using one of these methods (vitejs.dev/guide/static-deploy.html) to deploy than using docker!"