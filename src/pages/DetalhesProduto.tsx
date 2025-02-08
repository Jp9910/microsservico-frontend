import { useLocation } from "react-router"
import NavBar from "../components/Navbar/Navbar"
import Botao from "../components/Botao"
import NotFound from "./NotFound"

function DetalhesProduto () {
    // const {id} = useParams()
    // usar id para buscar o produto na API

    // Por enquanto, vou usar apenas o state passado da página passada (não da pra acessar a página diretamente pelo link, apenas pelo botão)
    const {state} = useLocation()
    console.log(state)
    if (!state) return <NotFound />
    return (
        <div className="pagina">
            <NavBar />

            <div className="md:grid md:grid-rows-2">
                <div className="shrink-0">
                    <a href="#">
                        <img className="rounded-lg object-cover" src="/semimagem.jpg" width="100px" height="100px" alt={"imagem de ".concat(state.produto.nome)} />
                    </a>
                </div>
                <div className="p-5">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{state.produto.nome}</h5>
                    </a>
                    <span className="font-medium text-lg">
                        R${state.produto.preco}
                    </span>
                    <Botao legenda="Adicionar ao carrinho"/>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-300">
                        {state.produto.descricao ? state.produto.descricao : "Produto sem descrição."}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default DetalhesProduto