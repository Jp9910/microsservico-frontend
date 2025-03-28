import { useParams } from "react-router"
import NavBar from "../components/Navbar/Navbar"
import Botao from "../components/Botao"
import {IProdutoLoja as IProduto} from "../types/Produto"
import { useEffect, useState } from "react"

function DetalhesProduto () {
    // // Por enquanto, vou usar apenas o state passado da página passada (não da pra acessar a página diretamente pelo link, apenas pelo botão)
    // const {state} = useLocation()
    // console.log("Estado:")
    // console.log(state)
    // if (!state) return <NotFound />
    // produto.preco
    
    // usar id para buscar o produto na API
    const {id} = useParams()
    const [produto, setProduto] = useState<IProduto>();
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
            const protocolo = import.meta.env.VITE_PROTOCOLO_REQUEST;
            const urlApiLoja = import.meta.env.VITE_URL_API_LOJA
            // const url = `http://localhost:8080/api/produto/${id}`
            const url = protocolo.concat(urlApiLoja).concat(`/api/produto/${id}`)
            
            //No typescript, <TipoGenerico> (ou <QualquerCoisa>) significa que esse tipo deve ser especificado quando a função for chamada. 
            async function carregarProdutos<TipoGenerico>(): Promise<TipoGenerico> {
                const res = await fetch(url)
                if (!res.ok) {
                    throw new Error(res.statusText);
                }
                return await res.json()
            }
    
            carregarProdutos<IProduto>()
            .then((dados) => {
                console.log(dados)
                setProduto(dados)
            }).catch(error => {
                console.error("Erro pegando dados dos produtos: ", error)
                setErro(error)
            }).finally(() => {
                setLoading(false)
            });
        }, [id])

    return (
        <section className="pagina">
            <NavBar />

            {loading && <div className="flex flex-col justify-center items-center">
                            Carregando produtos
                            <img src="loading.gif" width="200" height="200" alt="loading-gif" id="img-loading"></img>
                        </div> 
            }            
            {erro && <div className="flex justify-center items-center">Erro ao carregar o produto.</div>}

            {produto!=null && <div className="md:grid md:grid-rows-2">
                <div className="shrink-0">
                    <a href="#">
                        <img className="rounded-lg object-cover" src="/semimagem.jpg" width="100px" height="100px" alt={"imagem de ".concat(produto.nome)} />
                    </a>
                </div>
                <div className="p-5">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{produto.nome}</h5>
                    </a>
                    <span className="font-medium text-lg">
                        R${produto.preco}
                    </span>
                    <Botao legenda="Adicionar ao carrinho"/>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-300">
                        {produto.descricao ? produto.descricao : "Produto sem descrição."}
                    </p>
                </div>
            </div>}
        </section>
    )
}

export default DetalhesProduto