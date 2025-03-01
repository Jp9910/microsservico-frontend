import { useContext, useState } from "react";
import UsuarioLogadoContext from "./UsuarioLogadoContext";
import { jwtDecode } from "jwt-decode";
import { TokenService } from "../services/TokenService";
import IUsuarioDecodificado from "../types/UsuarioDecodificado";
import { CookieCarrinhoService } from "../services/CookieCarrinhoService";
import IUsuario from "../types/Usuario";

// Context lets components pass information deep down without explicitly passing props.

// The context object itself does not hold any information. It represents which context other
// components read or provide. Typically, you will use SomeContext.Provider in components above
// to specify the context value, and call useContext(SomeContext) in components below to read it.

export const UsuarioLogadoProvider = function(prop : {children: React.ReactNode}) {

    const [usuario, setUsuario] = useState(useContext(UsuarioLogadoContext).usuario);

    async function pegarInformacoesDoToken() {
        if (!TokenService.possuiToken()) return;

        console.log("Decodificando token...")
        const usuarioDecodificado = jwtDecode(TokenService.token) as IUsuarioDecodificado
        console.log("Usuario decodificado:", usuarioDecodificado)
        const usuario: IUsuario = {email: usuarioDecodificado.sub, nome: usuarioDecodificado.nome}

        // Sincronizar o carrinho primeiro, pra qnd atualizar o usuário, a página de carrinho buscar o carrinho sincronizado
        await CookieCarrinhoService.sincronizarCarrinho(usuario);

        setUsuario(usuario);
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
            // sucesso no login
            TokenService.salvarToken(dados.token);
            pegarInformacoesDoToken()
        }).catch((erro) => {
            console.error("Erro na requisição de login: ", erro)
            alert("Não foi possível fazer o login")
        })
    }

    function logout() {
        console.log("logout")
        TokenService.excluirToken();
        setUsuario(null);
    }

    const contexto = {
        usuario,
        // setEmail,
        login,
        logout,
        pegarInformacoesDoToken
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