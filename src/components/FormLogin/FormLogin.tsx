// import { Botao } from "../Botao"; // --> export Botao
import Botao from "../Botao"; // --> export default Botao

const Form = (props: {legenda_botao: string}) => {
    return (
        <form>
            <div>
                <label htmlFor="usuario">
                    Nome de usuário
                </label>
                <input
                    type="text"
                    name="usuario"
                    id="usuario"
                    placeholder="Usuário"
                    required
                />
            </div>
            <div>
                <label htmlFor="senha">
                    Senha
                </label>
                <input
                    type="password"
                    name="senha"
                    id="senha"
                    required
                />
            </div>
            <Botao legenda={props.legenda_botao}/>
        </form>
    )
}

export default Form