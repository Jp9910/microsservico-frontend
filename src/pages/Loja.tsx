import { useContext, useEffect, useState } from 'react';
import BotaoPesquisar from '../components/BotaoPesquisar/BotaoPesquisar'
import CardProduto from '../components/CardProduto/CardProduto'
import InputTexto from '../components/InputTexto/InputTexto'
import { IProdutoLoja } from "../types/Produto";
import UsuarioLogadoContext from '../contexts/UsuarioLogadoContext';
import { v4 as uuidv4 } from 'uuid';
import { CookieCarrinhoService } from '../services/CookieCarrinhoService';


function Sobre() {
    // Pegar os produtos na API, mandando requisição para o apigateway em vez de diretamente para o microsservico
    const [produtos, setProdutos] = useState<IProdutoLoja[]>([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);
    const usuarioContext = useContext(UsuarioLogadoContext)

    //https://www.freecodecamp.org/portuguese/news/como-fazer-o-fetch-dos-dados-em-react/
    //https://www.newline.co/@bespoyasov/how-to-use-fetch-with-typescript--a81ac257
    useEffect(() => {
        // Carregar produtos da loja
        const protocolo = "http://";
        const urlApiLoja = import.meta.env.VITE_URL_API_LOJA //localhost:8080
        const URI = protocolo.concat(urlApiLoja).concat('/produto?')
        const params = new URLSearchParams("skip=0&take=30")
        const URIFetch = URI+params.toString()
        console.log(URIFetch)
        
        //No typescript, <TipoGenerico> (ou <QualquerCoisa>) significa que esse tipo deve ser especificado quando a função for chamada. 
        async function carregarProdutos<TipoGenerico>(): Promise<TipoGenerico> {
            const res = await fetch(URIFetch)
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return await res.json()
        }

        carregarProdutos<IProdutoLoja[]>()
        .then((dados) => {
            console.log(dados)
            setProdutos(dados)
        }).catch(error => {
            console.error("Erro pegando dados dos produtos: ", error)
            setErro(error)
        }).finally(() => {
            setLoading(false)
        });
    }, [])

    function adicionarAoCarrinho(produto: IProdutoLoja) {
        console.log("Adicionando ao carrinho:",produto)
        const protocolo = "http://";
        const urlApiLoja = import.meta.env.VITE_URL_API_CARRINHO // localhost:3000
        const urlCompleta = protocolo.concat(urlApiLoja).concat('/carrinhos/adicionarProduto')

        if (!usuarioContext.usuario && !CookieCarrinhoService.cookieCarrinho) {
            CookieCarrinhoService.criarCookieCarrinho()
        }

        const carrinho = {
            emailCliente: usuarioContext.usuario?.email,
            cookieCliente: CookieCarrinhoService.cookieCarrinho,
            produto: {id: produto.id, nome: produto.nome, imagem: produto.imagem, preco: produto.preco}
        }
        console.log(carrinho)
        // Enviar pra api de produto
        fetch(urlCompleta, {method: "POST", body: JSON.stringify(carrinho), headers: {"Content-Type": "application/json"}})
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText);
                }
                return res.json()
            }).then((dados)=> {
                console.log("Produto adicionado ao carrinho:", dados)
            })
            .catch(error => {
                console.error("Erro ao adicionar ao carrinho: ", error)
            })
    }

    //   const produtos = [
    //     {
    //         nome: "Café",
    //         preco: 5,
    //         img: "cafe.png",
    //         descricao: "",
    //         id:1,
    //         variantes: []
    //     },
    //     {
    //         nome: "Pão",
    //         preco: 7,
    //         img: "pao.jpg",
    //         descricao: "",
    //         id:2,
    //         variantes: ["italiano", "australiano"]
    //     },{
    //         nome: "Café",
    //         preco: 5,
    //         img: "cafe.png",
    //         descricao: "",
    //         id:1,
    //         variantes: []
    //     },
    //     {
    //         nome: "Pão",
    //         preco: 7,
    //         img: "pao.jpg",
    //         descricao: "",
    //         id:2,
    //         variantes: []
    //     },{
    //         nome: "Café",
    //         preco: 5,
    //         img: "cafe.png",
    //         descricao: "",
    //         id:1,
    //         variantes: []
    //     },
    //     {
    //         nome: "Pão",
    //         preco: 7,
    //         img: "pao.jpg",
    //         descricao: "",
    //         id:2,
    //         variantes: []
    //     },
    // ]

    //readonly
    const [stringBusca, setStringBusca] = useState('')

    return (
        <section className="pagina">

            <div id="div-busca" className='flex h-12 pb-2 justify-center items-center'>
                <InputTexto label="" valorInicial="inicio" placeholder="Buscar produtos" required={false} state={stringBusca} setState={setStringBusca} />
                <BotaoPesquisar />
            </div>

            {loading && <div className="flex flex-col justify-center items-center">
                            Carregando produtos
                            <img src="loading.gif" width="200" height="200" alt="loading-gif" id="img-loading"></img>
                        </div> 
            }
            
            {erro && <div className="flex justify-center items-center">Erro ao carregar os produtos.</div>}
            
            {/* organizar os cards em grid: https://mozilladevelopers.github.io/playground/css-grid/04-fr-unit/ */}
            <div className='grid grid-cols-4 gap-10 mx-10'>
                {/* // Lista de filtros? */}
                {produtos.map(
                    (produto:IProdutoLoja) =>
                        <CardProduto key={uuidv4()} produto={produto} adicionarAoCarrinho={adicionarAoCarrinho} />
                )}
            </div>
        </section>
    )
}

export default Sobre


// Sobre o useEffect:
// O useEffect é executado apenas no início do ciclo de vida do componente caso não receba nenhuma dependência. 
// Dessa forma, podemos executar requisições apenas uma vez, mesmo que o componente seja renderizado novamente.

// Componentes são funções JavaScript e, por isso, quando um componente é atualizado, a função é executada. 
// Com o useEffect, podemos deixar para que o React gerencie as execuções, tornando possível executar a requisição apenas uma vez.