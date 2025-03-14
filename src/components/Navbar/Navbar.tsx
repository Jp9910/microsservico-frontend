// https://flowbite.com/docs/components/navbar/

import { Link, useLocation } from "react-router";
import NavbarSpacing from "./NavbarSpacing";
import CardLogin from "../CardLogin/CardLogin";
import { useContext, useEffect, useState } from "react";
import BotaoEstilizado from "../Botao/BotaoEstilizado";
import ModalCadastro from "../ModalCadastro/ModalCadastro";
import UsuarioService from "../../services/UsuarioService";
import UsuarioLogadoContext from "../../contexts/UsuarioLogadoContext";

function NavBar() {

    // const url = window.location.href.split("/")
    // const currentLocation = url[url.length-1] // rota "/" resultará em ""
    // console.log(currentLocation)

    const localUrl = useLocation()

    const [mostrarCardLogin, setMostrarCardLogin] = useState(false)
    const toggleCardLogin = () => {setMostrarCardLogin(true)}

    const [mostrarModalCadastro, setMostrarModalCadastro] = useState(false)
    const toggleModalCadastro = () => {setMostrarModalCadastro(true)}

    const usuarioContext = useContext(UsuarioLogadoContext);

    // recarregar componenente quando a dependência mudar
    useEffect(() => { }, [usuarioContext])

    const usuario = UsuarioService.usuario

    /**
     * Recarregar componente apenas 1 vez usando useRef:
     * const precisaCarregarUsuarioRef = useRef(true)
     * 
     * useEffect(() => {
     *     console.log("Carregando usuário a partir do token")
     *     if (precisaCarregarUsuarioRef.current) {
     *         usuarioContext.pegarInformacoesDoToken()
     *         precisaCarregarUsuarioRef.current = false
     *     }
     * }, [usuarioContext])
     */

    return (
        <section id="section-navbar">
            {mostrarCardLogin && <CardLogin setMostrar={setMostrarCardLogin} setMostrarModalCadastro={setMostrarModalCadastro}/>}
            {mostrarModalCadastro && <ModalCadastro setMostrar={setMostrarModalCadastro} />}
            <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
                <section className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="/logosemnome.png" className="h-8" alt="Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">MicroLoja</span>
                    </Link>
                    <section className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <Link to="/" id="navbar-link-home" 
                                    className={`${localUrl.pathname==="/" ? "md:text-blue-700 md:dark:text-blue-500" : ""}
                                    block py-2 px-3 rounded-sm md:p-0 
                                    md:hover:text-blue-700
                                    md:bg-transparent text-gray-900 dark:text-white`} 
                                >
                                    Página inicial
                                </Link>
                            </li>
                            <li>
                                <Link to="/sobre" id="navbar-link-sobre" 
                                    className={`${localUrl.pathname==="/sobre" ? "md:text-blue-700 md:dark:text-blue-500" : ""}
                                    active block py-2 px-3 rounded-sm md:p-0
                                    text-gray-900
                                    hover:bg-gray-100 md:hover:bg-transparent md:target:text-blue-700 
                                    md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}
                                >
                                    Sobre
                                </Link>
                            </li>
                            <li>
                                <Link to="/loja" id="navbar-link-loja"
                                    className={`${localUrl.pathname==="/loja" ? "md:text-blue-700 md:dark:text-blue-500" : ""}
                                    block py-2 px-3 rounded-sm md:p-0
                                    text-gray-900 
                                    hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 
                                    md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>
                                    Loja
                                </Link>
                            </li>
                        </ul>
                    </section>
                    <section className="flex md:order-2 gap-2 md:space-x-0 rtl:space-x-reverse">
                        {
                            UsuarioService.estaLogado ? 
                                <section className="space-x-2">
                                    <span className="text-md">Olá, {usuario.nome}!</span>
                                    <BotaoEstilizado id="botao-navbar-pedidos">
                                        <Link to="/pedidos">
                                            Pedidos
                                        </Link>
                                    </BotaoEstilizado>
                                    <BotaoEstilizado id="botao-navbar-logout" aoClicar={usuarioContext.logout}>Sair</BotaoEstilizado>
                                </section>
                                :
                                <section className="flex gap-2 md:space-x-0 rtl:space-x-reverse">
                                    <BotaoEstilizado id="botao-navbar-login" aoClicar={toggleCardLogin}>Login</BotaoEstilizado>
                                    <BotaoEstilizado id="botao-navbar-cadastro" aoClicar={toggleModalCadastro}>Criar conta</BotaoEstilizado> 
                                </section>
                        }
                        <BotaoEstilizado>
                            <Link to="/carrinho">Carrinho</Link>
                        </BotaoEstilizado>
                        <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </section>
                </section>
            </nav>
            <NavbarSpacing/>
        </section>
    )
}

export default NavBar;