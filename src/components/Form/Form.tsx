// import { Botao } from "../Botao"; // --> export Botao
import Botao from "../Botao"; // --> export default Botao

const Form = (props: {nome: string}) => {
    return (
        <form>
            <div>
                <label htmlFor="tarefa">
                    Adicione um novo estudo
                </label>
                <input
                    type="text"
                    name="tarefa"
                    id="tarefa"
                    placeholder={props.nome}
                    required
                />
            </div>
            <div>
                <label htmlFor="tempo">
                    Tempo
                </label>
                <input
                    type="time"
                    step="1"
                    name="tempo"
                    id="tempo"
                    min="00:00:00"
                    max="01:30:00"
                    required
                />
            </div>
            <Botao legenda="Enviar"/>
        </form>
    )
}

export default Form