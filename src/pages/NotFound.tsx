import Botao from "../components/Botao"
import { useNavigate } from "react-router"

function NotFound () {
    const navigate = useNavigate()
    return (
        <div id="div-pagina-nao-encontrada">
            <h1>Página não encontrada</h1>
            <Botao legenda={"< voltar"} aoClicar={() => {navigate('/')}} />
        </div>
    )
}

export default NotFound


// navigate('/') // ir para "/"
// navigate(-1) // voltar 1 pagina
// navigate(-2) // voltar 2 paginas
// navigate(1) //avançar 1 pagina
// navigate(-1, {state: informacoes_passadas_para_prox_pagina, replace: true})
// "replace: true" remove a ultima pagina do stack de navegação (bom para logins)