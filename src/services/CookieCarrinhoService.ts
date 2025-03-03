import { v4 as uuidv4 } from 'uuid';
import IUsuario from '../types/Usuario';
const KEY = "cookie_carrinho"

export class CookieCarrinhoService {

    // Sobre onde guardar o token: https://stackoverflow.com/a/48714123/18552279
    static criarCookieCarrinho() {
        return localStorage.setItem(KEY, uuidv4())
    }

    static excluirCookieCarrinho() {
        return localStorage.removeItem(KEY);
    }

    static get cookieCarrinho() {
        return localStorage.getItem(KEY) ?? "";
    }

    static possuiCookieCarrinho() {
        return !!this.cookieCarrinho;
    }

    // Seria usada a partir do UsuarioLogadoProvider.login()
    static async sincronizarCarrinho(usuario: IUsuario|null) {
        try {
            const cookie = CookieCarrinhoService.cookieCarrinho
            const protocolo = import.meta.env.VITE_PROTOCOLO_REQUEST
            const urlApiCarrinho = import.meta.env.VITE_URL_API_CARRINHO;
            const urlBuscarCarrinhoPorCookie = 
                protocolo.concat(urlApiCarrinho)
                    .concat('/carrinhos/buscar?cookieCliente=')
                    .concat(cookie);

            // Buscar carrinho pelo cookie
            const responseBuscar = await fetch(urlBuscarCarrinhoPorCookie);
            const carrinhoCookie = await responseBuscar.json();
            console.log("carrinho cookie: ",carrinhoCookie)
            if (!carrinhoCookie) return

            const urlAtualizarCarrinho = protocolo.concat(urlApiCarrinho)
                .concat(`/carrinhos/sincronizarCarrinhos?emailCliente=${usuario?.email}&cookieCliente=${cookie}`)

            console.log("usuario:",usuario)

            // Sincronizar carrinhos
            const responseAtualizar = await fetch(urlAtualizarCarrinho, {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    emailCliente: usuario?.email,
                    cookieCliente: CookieCarrinhoService.cookieCarrinho,
                    produtos: carrinhoCookie.produtos
                })
            });

            if (responseAtualizar.ok) {
                console.log("Carrinho sincronizado com sucesso.");
                console.log(responseAtualizar)
            } else {
                console.error("Erro ao atualizar o carrinho.");
            }
            
        } catch (erro) {
            console.error("Erro ao sincronizar o carrinho: ", erro);
        }
    }
}
