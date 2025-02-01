// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Lista from './components/Lista/Lista'
import NavBar from './components/Navbar/Navbar'
import Card from './components/CardProduto/CardProduto'

function App() {
    // const [count, setCount] = useState(0);
    // pegar produtos da api
    // const [gato, setGato] = useState([]);
    // useEffect(() => {
    // fetch('https://api.thecatapi.com/v1/images/search?limit=10')
    //     .then(response => response.json())
    //     .then(data => setGato(data))
    // }, []);
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

    return (
        <div className="app">

            <div id="div-navbar">
                <NavBar/>
            </div>

            <div id="spacing-for-navbar" className="mt-20">

            </div>

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


