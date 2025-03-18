import { useContext, useEffect, useState } from "react"
import IPedido from "../types/Pedido"
import UsuarioLogadoContext from "../contexts/UsuarioLogadoContext";
import { IProdutoPedidos } from "../types/Produto";
import { v4 as uuidv4 } from 'uuid';
import UsuarioService from "../services/UsuarioService";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from "react-router";


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
                .concat('/api/pedido/buscar/porEmail?email=')
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
                        <section key={uuidv4()} className="flex justify-center space-y-2 text-balck">
                            <Accordion color="secondary" className="flex m-3 w-1/3">
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                    sx={{inlineSize: "85%"}}
                                >
                                    <Typography component="span" sx={{ width: "25%" }}>
                                        Pedido #{pedido.id} <br/> 
                                    </Typography>
                                    <Typography component="span" sx={{ color: 'text.secondary', width: "40%" }}>
                                        Status: {pedido.status}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {
                                        pedido.produtos.map((produto: IProdutoPedidos) => {
                                            // return <ProdutoNoCarrinho key={uuidv4()} produto={produto} />
                                            return <section className="flex mb-2" key={uuidv4()}>
                                                <Link to={`/produto/${produto.id}`} target="_blank">
                                                <figure>
                                                {
                                                    (produto.linkImagem && <img width="100px" height="100px" src={produto.linkImagem} alt="imagem do produto"></img>)
                                                    || (produto.imagem && <img width="100px" height="100px" src={produto.imagem} alt="imagem do produto"></img>)
                                                    || (!produto.linkImagem && !produto.imagem && <img className="rounded-lg object-cover" src="semimagem.jpg" width="100px" height="100px" alt={"imagem de ".concat(produto.nome)} />)
                                                }
                                                </figure>
                                                </Link>
                                                <div className="flex flex-col">
                                                    <Link to={`/produto/${produto.id}`} target="_blank">
                                                        <h1 className="text-md mb-2">{produto.nome}</h1>
                                                    </Link>
                                                    <h1 className="text-md">R${produto.preco}</h1>
                                                </div>
                                            </section>
                                        })
                                    }
                                </AccordionDetails>
                            </Accordion>
                        </section>
                    )
                }
            </section>
        </section>
    )
}

export default PaginaPedidos


