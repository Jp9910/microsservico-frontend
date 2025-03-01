import {BrowserRouter, Routes, Route} from 'react-router'
import Home from "./pages/Home"
import Sobre from './pages/Sobre'
import Loja from './pages/Loja'
import Rodape from './components/Rodape/Rodape'
import NotFound from './pages/NotFound'
import DetalhesProduto from './pages/DetalhesProduto'
import Carrinho from './pages/Carrinho'
import { UsuarioLogadoProvider } from './contexts/UsuarioLogadoProvider'
import NavBar from './components/Navbar/Navbar'
import RotaPrivada from './rotaprivada'
import PaginaPedidos from './pages/Pedidos'

// https://github.com/alura-cursos/aluroni-router/blob/main/src/routes.tsx
function Roteador() {
    return (
        <BrowserRouter>
            <UsuarioLogadoProvider>
            <NavBar />
            <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/sobre" element={<Sobre />}/>
                    <Route path="/loja" element={<Loja />}/>
                    <Route path="/produto/:id" element={<DetalhesProduto />}/>
                    <Route path="/carrinho" element={<Carrinho />}/>
                    <Route path="*" element={<NotFound />}/>
                    <Route element={<RotaPrivada />}>
                        <Route path="/pedidos" element={<PaginaPedidos />} />
                    </Route>
            </Routes>
            </UsuarioLogadoProvider>
            <Rodape />
        </BrowserRouter>
    )
}

export default Roteador