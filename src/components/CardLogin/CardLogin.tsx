// https://flowbite.com/docs/components/card/#card-with-form-inputs

import { useEffect, useRef, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';

function CardLogin(props: {setMostrar: React.Dispatch<React.SetStateAction<boolean>>}) {

    //https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
    // Hook that alerts clicks outside of the passed ref
    function useOutsideAlerter(ref:React.MutableRefObject<null|HTMLDivElement>) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            function handleClickOutside(event:any) {
                console.log(event.target)
                if (ref.current && !ref.current.contains(event.target) && event.target.id !== "botao-navbar-login") {
                    props.setMostrar(false)
                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }
    const wrapperRef = useRef(null)
    useOutsideAlerter(wrapperRef)

    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    async function logar (event:React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        // fetch para api de login localhost:8080/usuarios/login
        const url = 'http://localhost:8080/usuarios/login'
        await fetch(url, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                //'Authorization': 'Bearer <TOKEN_JWT>'
            },
            body: JSON.stringify({email: email, senha: senha})
        }).then(response => {
            // TODO: GUARDAR O TOKEN JWT RECEBIDO DA API
            console.log(response)
        }).catch((erro) => {
            console.error("Erro pegando dados dos produtos: ", erro)
        }).finally(() => {
            console.log("finally")
        })
    }

    return (
        <div className="absolute transform-translate-popup-login top-[50%] w-full">
            <div ref={wrapperRef} className="m-auto max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <form className="space-y-6" onSubmit={logar}>
                    <div className="flex justify-between items-center">
                        <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                            Entrar
                        </h5>
                        <button className="hover:cursor-pointer" type="button" onClick={() => props.setMostrar(false)}>
                            <CloseIcon/>
                        </button>
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Email
                        </label>
                        <input 
                            onChange={(evento) => {setEmail(evento.target.value)}} 
                            type="email" 
                            name="email" 
                            id="email" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="nome@dominio.com" 
                            required 
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Password
                        </label>
                        <input 
                            onChange={(evento) => {setSenha(evento.target.value)}} 
                            type="password" 
                            name="password" 
                            id="password" 
                            placeholder="••••••••" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                            required 
                        />
                    </div>
                    <div className="flex items-start">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input 
                                    id="remember" 
                                    type="checkbox" 
                                    value="" 
                                    className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                                />
                            </div>
                            <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Lembrar email
                                {/* "Lembrar-me" lembra o usuário, e pede para digitar a senha */}
                                {/* "Stay signed-in" desliga o logout automático (não expirar o token ou a sessão) */}
                            </label>
                        </div>
                        <a href="#" className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500">
                            Esqueceu a senha?
                        </a>
                    </div>
                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Login
                    </button>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Não tem conta?&nbsp;
                        <a href="#" className="text-blue-700 hover:underline dark:text-blue-500">
                            Criar uma conta
                        </a>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CardLogin