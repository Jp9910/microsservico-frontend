import { useContext, useEffect, useState } from "react"
import IPedido from "../types/Pedido"
import UsuarioLogadoContext from "../contexts/UsuarioLogadoContext";
import ProdutoNoCarrinho from "../components/ProdutoNoCarrinho/ProdutoNoCarrinho";
import { IProdutoCarrinho } from "../types/Produto";
import { v4 as uuidv4 } from 'uuid';
import UsuarioService from "../services/UsuarioService";

function PaginaPedidos() {
    const [pedidos, setPedidos] = useState([] as IPedido[])
    const [loadingPedidos, setLoadingPedidos] = useState(true);
    const [erroPedidos, setErroPedidos] = useState(null);

    const usuarioContext = useContext(UsuarioLogadoContext)

    useEffect(() => {
        const protocolo = import.meta.env.VITE_PROTOCOLO_REQUEST
        const urlApiLoja = import.meta.env.VITE_URL_API_LOJA // localhost:3000
        const email = usuarioContext.usuario?.email || UsuarioService.usuario.email
        const urlBuscarPedido = 
                protocolo.concat(urlApiLoja)
                    .concat('/pedido/buscar/porEmail?email=')
                    .concat(email);

        console.log("usuario na pagina pedidos: ", usuarioContext)

        //No typescript, <TipoGenerico> (ou <QualquerCoisa>) significa que esse tipo deve ser especificado quando a função for chamada.
        async function carregarPedidos<TipoGenerico>(): Promise<TipoGenerico> {
            const res = await fetch(urlBuscarPedido)
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return await res.json()
        }

        carregarPedidos<IPedido[]>()
            .then((dados) => {
                console.log(dados)
                setPedidos(dados)
                setErroPedidos(null)
            }).catch(error => {
                console.error("Erro carregando pedidos: ", error)
                setErroPedidos(error)
            }).finally(() => {
                setLoadingPedidos(false)
            });
    }, [usuarioContext])


    return (
        <section id="pagina">
            <section className="flex w-full justify-center">
                <h2 className="self-center text-6xl">Pedidos</h2>
            </section>

            <section id="pedidos" className="flex flex-col mt-3">
                {loadingPedidos && <div className="flex flex-col justify-center items-center">
                    Carregando pedidos...
                    <img src="loading.gif" width="200" height="200" alt="loading-gif" id="img-loading"></img>
                </div>
                }

                {erroPedidos && <div className="flex justify-center items-center">Erro ao carregar os pedidos.</div>}

                {
                    pedidos.map((pedido) => 
                        <section key={uuidv4()} className="flex flex-col items-center space-y-2">
                            {
                                pedido.produtos.map((produto: IProdutoCarrinho) => {
                                    return <ProdutoNoCarrinho key={uuidv4()} produto={produto} />
                                })
                            }
                        </section>
                    )
                }
            </section>
        </section>
    )
}

export default PaginaPedidos


