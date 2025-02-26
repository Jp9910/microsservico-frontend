import { TokenService } from './TokenService';
import { jwtDecode } from "jwt-decode";
import IUsuario from '../types/Usuario';

export default class AuthService {

    static usuario: IUsuario|null = null

    static decodificarJWT() {
        const decodificado = jwtDecode(TokenService.token);
        console.log(decodificado);
        AuthService.usuario = decodificado as IUsuario;
    }

    static salvarToken(token: string) {
        TokenService.salvarToken(token);
        AuthService.decodificarJWT();
    }

    static logout() {
        TokenService.excluirToken();
    }

    static estaLogado() {
        return TokenService.possuiToken();
    }
}
