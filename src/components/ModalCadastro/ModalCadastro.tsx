// https://flowbite.com/docs/components/card/#card-with-form-inputs
import { useEffect, useRef, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';

function ModalCadastro(props: {setMostrar: React.Dispatch<React.SetStateAction<boolean>>}) {

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

    async function cadastrar(event:React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        console.log("cadastrar")
        console.log(email,nome,senha)
        const protocolo = "http://";
        const urlApiLoja = import.meta.env.VITE_URL_API_AUTENTICACAO
        const urlCompleta = protocolo.concat(urlApiLoja).concat('/usuarios/cadastrar')
        await fetch(urlCompleta, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({nome, email, senha})
        }).then((response) => {
            console.log("response:",response)
            if (response.ok) {
                alert("Cadastro realizado com sucesso")
                props.setMostrar(false)
                return
            }
            if (!response.ok) {return response.json()}
        }).then((responseBody)=>{
            console.log("responseBody:",responseBody)
            setRespostaApi(responseBody?.mensagem)
        }).catch((erro) => {
            console.error("Erro na requisição de cadastro: ", erro)
            alert("Não foi possível realizar o cadastro")
        })
    }

    const [email, setEmail] = useState("")
    const [nome, setNome] = useState("")
    const [senha, setSenha] = useState("")
    const [respostaApi, setRespostaApi] = useState("")

    return (
        <div id="modal-cadastro" className="absolute transform-translate-popup-login top-[50%] w-full">
            <div ref={wrapperRef} className="m-auto max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <form className="space-y-6" onSubmit={cadastrar}>
                    <div className="flex justify-between items-center">
                        <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                            Criar sua conta
                        </h5>
                        <button className="hover:cursor-pointer" type="button" onClick={() => props.setMostrar(false)}>
                            <CloseIcon/>
                        </button>
                    </div>
                    {respostaApi && <b className="flex text-md">{respostaApi}</b>}
                    <fieldset>
                        <label htmlFor="nome" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Nome
                        </label>
                        <input
                            onChange={(evento) => {setNome(evento.target.value)}}
                            type="text"
                            name="nome"
                            id="nome"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder="Ana da Silva"
                            required
                        />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Email
                        </label>
                        <input
                            onChange={(evento) => {setEmail(evento.target.value)}}
                            type="email"
                            name="email"
                            id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder="nome@dominio.com"
                            required
                        />
                    </fieldset>
                    <fieldset>
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
                    </fieldset>
                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Criar conta
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ModalCadastro