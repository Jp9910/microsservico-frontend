import { Link } from "react-router";
import { IProdutoCarrinho } from "../../types/Produto";
import CloseIcon from '@mui/icons-material/Close';

function ProdutoNoCarrinho(props: {produto: IProdutoCarrinho, removerProdutoDoCarrinho: (IdProduto: number) => void}) {

    return (
        <div className="flex w-1/3 justify-start flex-col">
            <div className="flex justify-between flex-row">
                <section className="flex w-1/3 justify-start flex-row">

                    <Link to={`/produto/${props.produto.id}`}>
                        <img className="rounded-lg object-cover" src="semimagem.jpg" width="128px" height="128px" alt={"imagem de ".concat(props.produto.nome)} />
                    </Link>

                    <section className="flex flex-col ml-2 items-start">
                        <button className="cursor-pointer">
                            <Link to={`/produto/${props.produto.id}`}>
                                <b className="mb-2 text-2xl tracking-tight text-gray-900 dark:text-white">{props.produto.nome}</b>
                            </Link>
                        </button>
                        <p className="font-medium text-2xl">
                            R${props.produto.preco}
                        </p>
                        <p>
                            Unidades: 1
                        </p>
                    </section>
                </section>
                <button className="hover:cursor-pointer" type="button" onClick={() => props.removerProdutoDoCarrinho(props.produto.id)}>
                    Remover <CloseIcon/>
                </button>
            </div>
            <hr className="h-[1px] w-full mt-6 mb-2 mx-auto bg-gray-100 border-0 rounded-sm dark:bg-gray-700"></hr>
        </div>
    )
}

export default ProdutoNoCarrinho;