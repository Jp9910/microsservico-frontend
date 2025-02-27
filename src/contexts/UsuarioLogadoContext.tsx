
import { createContext } from "react"
import IUsuario from "../types/Usuario"

const UsuarioLogadoContext = createContext(
    // Esse argumento define o valor inicial do context. Esses elementos dentro do objeto servem apenas pra indicar 
    // a estrutura, pra melhorar o autocomplete quando tiver usando o context. Mas poderia ser simplesmente um null
    {
        usuario: null as IUsuario|null,
        login: (email: string, senha: string) => {console.log(email,senha)},
        logout: () => {return},
        pegarInformacoesDoToken: () => {return}
    }
)

export default UsuarioLogadoContext;