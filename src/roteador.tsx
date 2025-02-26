import {BrowserRouter, Routes, Route} from 'react-router'
import Home from "./pages/Home"
import Sobre from './pages/Sobre'
import Loja from './pages/Loja'
import Rodape from './components/Rodape/Rodape'
import NotFound from './pages/NotFound'
import DetalhesProduto from './pages/DetalhesProduto'
import { UsuarioLogadoProvider } from './contexts/UsuarioLogadoProvider'

// https://github.com/alura-cursos/aluroni-router/blob/main/src/routes.tsx
function Roteador() {
    return (
        <BrowserRouter>
            <UsuarioLogadoProvider>
            <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/sobre" element={<Sobre />}/>
                    <Route path="/loja" element={<Loja />}/>
                    <Route path="/produto/:id" element={<DetalhesProduto />}/>
                    <Route path="*" element={<NotFound />}/>
            </Routes>
            </UsuarioLogadoProvider>
            <Rodape/>
        </BrowserRouter>
    )
}

export default Roteador