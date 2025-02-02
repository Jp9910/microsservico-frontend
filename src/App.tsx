import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/Navbar/Navbar'
import Card from './components/CardProduto/CardProduto'
import InputTexto from './components/InputTexto/InputTexto'
import BotaoPesquisar from './components/BotaoPesquisar/BotaoPesquisar'

function App() {
    // const [count, setCount] = useState(0);
    // pegar produtos da api
    // const [gato, setGato] = useState([]);
    // useEffect(() => {
    // fetch('https://api.thecatapi.com/v1/images/search?limit=10')
    //     .then(response => response.json())
    //     .then(data => setGato(data))
    // }, []);

    // Se basear no koboldshop!
    const produtos = [
        {
            nome:"Café",
            preco:5,
            img: "cafe.png",
            descricao: ""
        },
        {
            nome:"Pão",
            preco:7,
            img: "pao.jpg",
            descricao: ""
        }
    ]

            //readonly
    const [stringBusca, setStringBusca] = useState('')

    return (
        <div className="app">

            <div id="div-navbar">
                <NavBar/>
            </div>

            <div id="spacing-for-navbar" className="mt-18"></div>

            <div className='flex h-12 pb-2 justify-center items-center'>
                <InputTexto label="" valorInicial="inicio" placeholder="Buscar produtos" required={false} state={stringBusca} setState={setStringBusca}/>
                <BotaoPesquisar/>
            </div>

            {/* organizar os cards em grid: https://mozilladevelopers.github.io/playground/css-grid/04-fr-unit/ */}
            <div id="pagina" className='grid grid-cols-4 gap-10 mx-10'>
                {/* // Lista de filtros? */}
                {produtos.map(
                    (produto, index) => 
                        <Card key={index} {...produto}/>
                )}
            </div>

            <p className='text-avocado-400'>Texto teste</p>

            {/* Adicionar um footer (pegar do outro projeto react) */}

        </div>
    )
}

export default App


