import { useState } from 'react';
import BotaoPesquisar from '../components/BotaoPesquisar/BotaoPesquisar'
import CardProduto from '../components/CardProduto/CardProduto'
import InputTexto from '../components/InputTexto/InputTexto'
import NavBar from '../components/Navbar/Navbar'
import { v4 as uuidv4 } from 'uuid';

function Sobre() {
    const produtos = [
        {
            nome: "Café",
            preco: 5,
            img: "cafe.png",
            descricao: "",
            id:1
        },
        {
            nome: "Pão",
            preco: 7,
            img: "pao.jpg",
            descricao: "",
            id:2
        },{
            nome: "Café",
            preco: 5,
            img: "cafe.png",
            descricao: "",
            id:1
        },
        {
            nome: "Pão",
            preco: 7,
            img: "pao.jpg",
            descricao: "",
            id:2
        },{
            nome: "Café",
            preco: 5,
            img: "cafe.png",
            descricao: "",
            id:1
        },
        {
            nome: "Pão",
            preco: 7,
            img: "pao.jpg",
            descricao: "",
            id:2
        },
    ]

            //readonly
    const [stringBusca, setStringBusca] = useState('')

    return (
        <div className="pagina">
            <NavBar />

            <div id="div-busca" className='flex h-12 pb-2 justify-center items-center'>
                <InputTexto label="" valorInicial="inicio" placeholder="Buscar produtos" required={false} state={stringBusca} setState={setStringBusca} />
                <BotaoPesquisar />
            </div>

            {/* organizar os cards em grid: https://mozilladevelopers.github.io/playground/css-grid/04-fr-unit/ */}
            <div className='grid grid-cols-4 gap-10 mx-10'>
                {/* // Lista de filtros? */}
                {produtos.map(
                    (produto) =>
                        <CardProduto key={uuidv4()} {...produto} />
                )}
            </div>
        </div>
    )
}

export default Sobre