import Botao from "../Botao";

function Card (props: {nome:string, preco:number, img:string, descricao:string}) {
    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="md:grid md:grid-rows-2">
                <div className="shrink-0">
                    <a href="#">
                        <img className="rounded-lg object-cover" src="semimagem.jpg" width="100px" height="100px" alt={"imagem de ".concat(props.nome)} />
                    </a>
                </div>
                <div className="p-5">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.nome}</h5>
                    </a>
                    <span className="font-medium text-lg">
                        R${props.preco}
                    </span>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        {props.descricao ? props.descricao : "Essa é a descrição do produto. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
                    </p>
                    <Botao legenda="Adicionar ao carrinho"/>
                </div>
            </div>
        </div>
    )
}

export default Card;