import { Link } from 'react-router'
import Botao from '../components/Botao'

function Sobre() {
    return (
        <div className="pagina">

            <div className="flex h-dvh justify-center items-center">
                <div className=''>
                    <img src="logo.png"/>
                </div>
                <div className="flex flex-col w-1/3">
                    <h1 className='text-avocado-400 text-x1 justify-center'>Sobre nós</h1>
                    <p className='sm:text-justify'>
                        Nossa loja começou em 2020, criada pelo Fulano da Silva, com o sonho de melhorar a vida das pessoas.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/loja">
                        <Botao legenda="Ir às compras!"/>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Sobre