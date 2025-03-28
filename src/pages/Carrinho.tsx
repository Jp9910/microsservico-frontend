import { useContext, useEffect, useState } from "react";
import UsuarioLogadoContext from "../contexts/UsuarioLogadoContext";
import ICarrinho from "../types/Carrinho";
import { IProdutoCarrinho } from "../types/Produto";
import ProdutoNoCarrinho from "../components/ProdutoNoCarrinho/ProdutoNoCarrinho";
import BotaoEstilizado from "../components/Botao/BotaoEstilizado";
import { v4 as uuidv4 } from 'uuid';
import { CookieCarrinhoService } from "../services/CookieCarrinhoService";
import CardLogin from "../components/CardLogin/CardLogin";
import { Link } from "react-router";
import UsuarioService from "../services/UsuarioService";

function Carrinho() {
    const [carrinho, setCarrinho] = useState(null as ICarrinho | null)
    const [produtosCarrinho, setProdutosCarrinho] = useState([] as IProdutoCarrinho[])
    const [loadingCarrinho, setLoadingCarrinho] = useState(true);
    const [loadingPedido, setLoadingPedido] = useState(false);
    const [erroCarrinho, setErroCarrinho] = useState(null as string|null);
    const [avisoPedido, setAvisoPedido] = useState(null as string|null);
    const [pedidoFoiFeito, setPedidoFoiFeito] = useState(false);
    const usuarioContext = useContext(UsuarioLogadoContext)

    const [mostrarCardLogin, setMostrarCardLogin] = useState(false)

    const [mostrarFormPagamento, setMostrarFormPagamento] = useState(false)
    const [numeroCartao, setNumeroCartao] = useState("")
    const [dataExpiracaoCartao, setDataExpiracaoCartao] = useState("")
    const [codigoSegurancaCartao, setCodigoSegurancaCartao] = useState("")

    function fazerCheckoutOuLogin() {
        if (usuarioContext.usuario || UsuarioService.usuario.email) {
            setMostrarFormPagamento(true)
        }
        else {
            setMostrarCardLogin(true)
        }
    }

    function realizarPedido(event:React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setLoadingPedido(true)
        console.log("Registrando pedido")
        console.log(numeroCartao,dataExpiracaoCartao,codigoSegurancaCartao)

        const protocolo = import.meta.env.VITE_PROTOCOLO_REQUEST;
        const urlApiLoja = import.meta.env.VITE_URL_API_LOJA //local: "localhost:7285"
        const urlCompleta = protocolo.concat(urlApiLoja).concat('/api/pedido')
        const produtosIds: number[] = []
        produtosCarrinho.map((produto) => {produtosIds.push(produto.id)})
        const pedido = {
            "EmailCliente": usuarioContext.usuario?.email || UsuarioService.usuario.email,
            "IdsProdutos": produtosIds,
            "IdCarrinho": carrinho?._id,
            "NumeroCartao": numeroCartao,
            "DataExpiracaoCartao": dataExpiracaoCartao,
            "CodigoSegurancaCartao": codigoSegurancaCartao,
        }
        console.log("pedido:",pedido)

        // Enviar o pedido para a loja
        fetch(urlCompleta, {method: "POST", body: JSON.stringify(pedido), headers: {"Content-Type": "application/json"}})
            .then((res) => {
                console.log("RESPOTSATA::",res)
                if (!res.ok) {
                    throw new Error(res.statusText);
                }
                return res.json()
            }).then((dados)=> {
                console.log("Resposta da api de pedidos:", dados)
                setAvisoPedido("✅ Pedido realizado com sucesso. Obrigado por comprar conosco 😄")
                setPedidoFoiFeito(true)
            })
            .catch(error => {
                console.error("Erro ao registrar o pedido: ", error)
                setLoadingPedido(false)
                setAvisoPedido(error)
            }).finally(() => {
                setLoadingPedido(false)
            })
    }

    function removerDoCarrinho(idProduto: number) {
        console.log("Removendo do carrinho produto com Id ", idProduto)
        const protocolo = import.meta.env.VITE_PROTOCOLO_REQUEST
        const urlApiLoja = import.meta.env.VITE_URL_API_CARRINHO
        const urlCompleta = protocolo.concat(urlApiLoja).concat('/carrinhos/removerProduto')

        const request_body = {
            emailCliente: usuarioContext.usuario?.email,
            cookieCliente: CookieCarrinhoService.cookieCarrinho,
            IdProduto: idProduto
        }
        console.log(request_body)

        // Enviar pra api de produto
        fetch(urlCompleta, { method: "PATCH", body: JSON.stringify(request_body), headers: { "Content-Type": "application/json" } })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText);
                }
            }).then(() => {
                console.log("Produto removido do carrinho")
                alert("Produto foi removido do carrinho")
                // const produtos = carrinho?.produtos.filter((prod) => prod.id !== idProduto) ?? []
                const produtos = produtosCarrinho.filter((prod) => prod.id !== idProduto) ?? []
                setProdutosCarrinho(produtos)
            })
            .catch(error => {
                console.error("Erro ao remover produto do carrinho: ", error)
                alert("Erro ao remover produto do carrinho")
            })
    }

    useEffect(() => {
        const protocolo = import.meta.env.VITE_PROTOCOLO_REQUEST
        const urlApiLoja = import.meta.env.VITE_URL_API_CARRINHO // localhost:3000
        const urlCompleta = protocolo.concat(urlApiLoja).concat('/carrinhos/buscar?')
        // buscar o carrinho pelo email se tiver usuario logado
        // buscar pelo cookie senão
        console.log(usuarioContext)

        let busca = ""
        const email = usuarioContext.usuario ? usuarioContext.usuario.email : ""
        if (email) {
            busca = `emailCliente=${email}`
        } else {
            const cookie = CookieCarrinhoService.cookieCarrinho
            busca = `cookieCliente=${cookie}`
        }
        const params = new URLSearchParams(busca)
        const URIFetch = urlCompleta + params.toString()
        console.log(URIFetch)

        //No typescript, <TipoGenerico> (ou <QualquerCoisa>) significa que esse tipo deve ser especificado quando a função for chamada.
        async function carregarCarrinho<TipoGenerico>(): Promise<TipoGenerico> {
            const res = await fetch(URIFetch)
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return await res.json()
        }

        carregarCarrinho<ICarrinho>()
            .then((dados) => {
                if (dados) {
                    console.log(dados)
                    setCarrinho(dados)
                    setProdutosCarrinho(dados.produtos)
                }
                setErroCarrinho(null)
            }).catch(error => {
                console.error("Erro carregando carrinho: ", error)
                setErroCarrinho(error)
            }).finally(() => {
                setLoadingCarrinho(false)
            });
    }, [usuarioContext])

    return (
        <section id="pagina">
            {mostrarCardLogin && <CardLogin setMostrar={setMostrarCardLogin} aviso={"Faça login para realizar o pedido"}/>}
            <section className="flex w-full justify-center">
                <svg width="128px" height="128px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" transform="rotate(0)matrix(1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="#000000" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                </path> </g>
                </svg>
                <h2 className="self-center text-6xl">Carrinho de compras</h2>
            </section>

            <section id="produtos-carrinho" className="flex flex-col mt-3">
                {loadingCarrinho && <div className="flex flex-col justify-center items-center">
                    Carregando carrinho...
                    <img src="loading.gif" width="200" height="200" alt="loading-gif" id="img-loading"></img>
                </div>
                }

                {erroCarrinho && <div className="flex justify-center items-center">Erro ao carregar o carrinho.</div>}

                {
                    produtosCarrinho.length == 0 &&
                    <section className="flex flex-col items-center">
                        <p className="text-2xl">Nenhum produto no seu carrinho ☹️</p>
                        <p className="text-lg mt-3">Adicione produtos para comprar!</p>
                    </section>
                }

                <section className="flex flex-col items-center space-y-2">
                    {
                        produtosCarrinho.map((produto: IProdutoCarrinho) => {
                            return <ProdutoNoCarrinho key={uuidv4()} produto={produto} removerProdutoDoCarrinho={removerDoCarrinho} />
                        })
                    }
                </section>
                {
                    produtosCarrinho.length > 0 &&
                    <section className="flex justify-center">
                        <section className="flex w-1/3 justify-end">
                            <BotaoEstilizado aoClicar={() => {fazerCheckoutOuLogin()}}>
                                Checkout
                            </BotaoEstilizado>
                        </section>
                    </section>
                }
            </section>

            {
                mostrarFormPagamento &&
                <section id="formulario-pagamento" className="flex mt-3 justify-center">
                    <form className="flex flex-col w-1/3 space-y-6 items-center" onSubmit={realizarPedido}>
                        <h2 className="self-center text-3xl">Realizar pagamento</h2>

                        {loadingPedido &&
                            <div className="flex flex-col justify-center items-center">
                                Registrando pedido
                                <img src="loading.gif" width="200" height="200" alt="loading-gif" id="img-loading"></img>
                            </div>
                        }

                        {avisoPedido && <div className="flex justify-center items-center">{avisoPedido}</div>}

                        {pedidoFoiFeito && 
                            <div className="flex justify-center items-center">
                                Verifique o status na&nbsp;<Link to="/pedidos" className="text-blue-400 cursor-pointer">Página de Pedidos.</Link>
                            </div>
                        }

                        <fieldset className="w-1/2">
                            <label htmlFor="numeroCartao" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Número do cartão
                            </label>
                            <input
                                onChange={(evento) => {setNumeroCartao(evento.target.value)}}
                                type="text"
                                inputMode="numeric"
                                name="numeroCartao"
                                id="numeroCartao"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                placeholder="1234 5678 9123 4567"
                                required
                            />
                        </fieldset>

                        <fieldset className="w-1/2 justify-center">
                            <label htmlFor="dataExpiracaoCartao" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Data de expiração
                            </label>
                            <input
                                onChange={(evento) => {setDataExpiracaoCartao(evento.target.value)}}
                                type="month"
                                name="dataExpiracaoCartao"
                                id="dataExpiracaoCartao"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                placeholder="AAAA-MM"
                                required
                            />
                        </fieldset>

                        <fieldset className="w-1/2 justify-center">
                            <label htmlFor="codigoSegurancaCartao" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Código de segurança
                            </label>
                            <input
                                onChange={(evento) => {setCodigoSegurancaCartao(evento.target.value)}}
                                type="number"
                                name="codigoSegurancaCartao"
                                id="codigoSegurancaCartao"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                placeholder="123"
                                required
                            />
                        </fieldset>

                        <section className="flex justify-center">
                            <section className="flex w-full justify-end">
                                <BotaoEstilizado tipo="submit">Confirmar Pedido</BotaoEstilizado>
                            </section>
                        </section>
                    </form>
                </section>
            }
        </section>
    )
}

export default Carrinho