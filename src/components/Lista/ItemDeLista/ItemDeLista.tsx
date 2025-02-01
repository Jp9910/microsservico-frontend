import Botao from "../../Botao"

const ItemDeLista = (props: {nome: string, preco: number, img: string}) => {
    // const {produto, index} = props //desestruturação
    return (
        <li>
            {/* Files in the public directory are served at the root path.*/}
            <img src={props.img} width="100px" height="100px" alt={"imagem de ".concat(props.nome)} />
            {props.nome}
            <span>
                - Preço: R${props.preco}
            </span>
            <Botao legenda="Adicionar ao carrinho"/>
        </li>
    )
}

export default ItemDeLista