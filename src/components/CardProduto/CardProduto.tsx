import { useNavigate } from "react-router";
import IProduto from "../../types/Produto";
import Botao from "../Botao";

function CardProduto (props: {produto: IProduto}) {
    const navigate = useNavigate()
    function redirecionarParaDetalhes(produto: IProduto) {
        navigate(`/produto/${produto.id}`, { state: { produto }, replace: false });
    }
    return (
        <div className="grid grid-rows-2 max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="">
                <a href="#">
                    <img className="rounded-lg object-cover" src="semimagem.jpg" width="100px" height="100px" alt={"imagem de ".concat(props.produto.nome)} />
                </a>
            </div>
            <div className="p-5">
                <a href="#">
                    <span className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.produto.nome}</span>
                </a>
                <span className="font-medium text-lg">
                    R${props.produto.preco}
                </span>
                <Botao legenda="Detalhes" aoClicar={()=>{redirecionarParaDetalhes(props.produto)}}/>
                <Botao legenda="Adicionar ao carrinho"/>
            </div>
        </div>
    )
}

export default CardProduto;