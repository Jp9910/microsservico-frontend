
import { createContext } from "react"

const UsuarioLogadoContext = createContext(
    // Esse argumento define o valor inicial do context. Esses elementos dentro do objeto servem apenas pra indicar 
    // a estrutura, pra melhorar o autocomplete quando tiver usando o context. Mas poderia ser simplesmente um null
    {
        usuario: {nome: "", email: ""},
        setNome: (nome: string) => {console.log(nome)},
        setEmail: (email: string) => {console.log(email)},
        login: (email: string, senha: string) => {console.log(email,senha)},
        logout: () => {return}
    }
)

export default UsuarioLogadoContext;