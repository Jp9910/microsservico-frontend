import { Navigate, Outlet } from "react-router";
import { TokenService } from "./services/TokenService";

const RotaPrivada = () => {
    // se possuiToken, está logado
    // ou teria que ser um useEffect que vai rodar depois do usuario mudar, pq o usuario só é setado quando a navbar carrega...
    return (
        TokenService.possuiToken() ? <Outlet /> : <Navigate to="/" />
    )
}

export default RotaPrivada;
