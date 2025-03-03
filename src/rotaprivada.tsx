import { Navigate, Outlet } from "react-router";
import UsuarioService from "./services/UsuarioService";

const RotaPrivada = () => {
    return (
        UsuarioService.estaLogado ? <Outlet /> : <Navigate to="/" />
    )
}

export default RotaPrivada;
