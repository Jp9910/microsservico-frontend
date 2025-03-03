import IUsuario from "../types/Usuario";

const KEY_LOGADO = "estaLogado"
const KEY_EMAIL = "email"
const KEY_NOME = "nome"

export default class UsuarioService {

    static salvarUsuario(usuario: IUsuario) {
        localStorage.setItem(KEY_EMAIL, usuario.email)
        localStorage.setItem(KEY_NOME, usuario.nome)
        localStorage.setItem(KEY_LOGADO, "sim")
        return
    }

    static excluirUsuario() {
        localStorage.removeItem(KEY_EMAIL)
        localStorage.removeItem(KEY_NOME)
        localStorage.setItem(KEY_LOGADO, "não")
    }

    static get estaLogado() {
        return localStorage.getItem(KEY_LOGADO) == "sim" ? true : false;
    }

    static get usuario(): IUsuario {
        const email = localStorage.getItem(KEY_EMAIL) ?? ""
        const nome = localStorage.getItem(KEY_NOME) ?? ""
        return {email, nome}
    }
}
