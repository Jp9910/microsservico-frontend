import { useContext, useEffect, useState } from "react";
import UsuarioLogadoContext from "../contexts/UsuarioLogadoContext";
import ICarrinho from "../types/Carrinho";

function Carrinho () {
    const [carrinho, setCarrinho] = useState(null as ICarrinho|null)
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);
    const usuarioContext = useContext(UsuarioLogadoContext)

    useEffect(() => {
        const protocolo = "http://";
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
            const cookie = localStorage.getItem("carrinho") ?? ""
            busca = `cookieCliente=${cookie}`
        }
        const params = new URLSearchParams(busca)
        const URIFetch = urlCompleta+params.toString()
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
            console.log(dados)
            setCarrinho(dados)
        }).catch(error => {
            console.error("Erro pegando dados dos produtos: ", error)
            setErro(error)
        }).finally(() => {
            setLoading(false)
        });
    }, [usuarioContext])

    return (
        <section id="pagina">
            <section className="flex w-full justify-center">
                <svg width="128px" height="128px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" transform="rotate(0)matrix(1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="#000000" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
                    </path> </g>
                </svg>
                <h2 className="self-center text-6xl">Carrinho de compras</h2>
            </section>
            <section className="flex flex-col">
                {
                    // produtos do carrinho em flex-col
                }
            </section>
            <section id="produtos-carrinho" className="">

            </section>
        </section>
    )
}

export default Carrinho