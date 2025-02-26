import { useContext, useState } from "react";
import UsuarioLogadoContext from "./UsuarioLogadoContext";
import AuthService from "../services/AuthService";
// Context lets components pass information deep down without explicitly passing props.

// The context object itself does not hold any information. It represents which context other 
// components read or provide. Typically, you will use SomeContext.Provider in components above
// to specify the context value, and call useContext(SomeContext) in components below to read it.

export const UsuarioLogadoProvider = function(prop : {children: React.ReactNode}) {

    const [usuario, setUsuario] = useState(useContext(UsuarioLogadoContext).usuario);

    const setNome = (nome: string) => {
        setUsuario((estadoAnterior) => {
            return {...estadoAnterior, nome: nome}
        })
    }

    const setEmail = (email: string) => {
        setUsuario((estadoAnterior) => {
            return {...estadoAnterior, email: email}
        })
    }

    async function login(email: string, senha: string) {
        const protocolo = "http://";
        const urlApiLoja = import.meta.env.VITE_URL_API_AUTENTICACAO
        const urlCompleta = protocolo.concat(urlApiLoja).concat('/auth/login')
        await fetch(urlCompleta, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                //'Authorization': 'Bearer <TOKEN_JWT>'
            },
            body: JSON.stringify({email: email, senha: senha})
        }).then((response) => {
            return response.json()
        }).then(dados => {
            // console.log(dados)
            AuthService.salvarToken(dados.token);
        }).catch((erro) => {
            console.error("Erro na requisição de login: ", erro)
        })
    }

    function logout() {
        console.log("logout")
    }

    const contexto = {
        usuario,
        setNome,
        setEmail,
        login,
        logout
    }
    
    return (
        <UsuarioLogadoContext.Provider value={contexto}>
            {prop.children}
        </UsuarioLogadoContext.Provider>
    )
}

// "{ usuario:
//      { nome: string; email: string; }; 
//      setNome: (nome: string) => void; 
//      setEmail: (email: string) => void; 
// }"

// '{ usuario: 
//     { nome: string; email: string; }; 
//     setNome: () => null; 
//     setEmail: () => null; 
// }'