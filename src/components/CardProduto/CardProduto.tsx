import { Link } from "react-router";
import { IProdutoLoja } from "../../types/Produto";
import BotaoEstilizado from "../Botao/BotaoEstilizado";

function CardProduto (props: {produto: IProdutoLoja, adicionarAoCarrinho: (produto: IProdutoLoja) => void}) {
    // const navigate = useNavigate()
    // function redirecionarParaDetalhes(produto: IProdutoLoja) {
    //     navigate(`/produto/${produto.id}`, { state: { produto }, replace: false });
    // }

    return (
        <div className="grid grid-rows-2 max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="">
                <a href="#">
                    <img className="rounded-lg object-cover" src="semimagem.jpg" width="100px" height="100px" alt={"imagem de ".concat(props.produto.nome)} />
                </a>
            </div>
            <div className="p-5">
                <Link to={`/produto/${props.produto.id}`}>
                    <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.produto.nome}</h2>
                </Link>
                <span className="font-medium text-lg">
                    R${props.produto.preco}
                </span>
                <BotaoEstilizado>
                    <Link to={`/produto/${props.produto.id}`}>
                        Detalhes
                    </Link>
                </BotaoEstilizado>
                <BotaoEstilizado aoClicar={()=>{props.adicionarAoCarrinho(props.produto)}}>
                    Adicionar ao carrinho
                </BotaoEstilizado>
            </div>
        </div>
    )
}

export default CardProduto;