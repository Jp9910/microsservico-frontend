
const KEY = "token"

export class TokenService {

    // Sobre onde guardar o token: https://stackoverflow.com/a/48714123/18552279
    static salvarToken(token: string) {
        return localStorage.setItem(KEY, token);
    }

    static excluirToken() {
        return localStorage.removeItem(KEY);
    }

    static get token() {
        return localStorage.getItem(KEY) ?? "";
    }

    static possuiToken() {
        return !!this.token;
    }
}
