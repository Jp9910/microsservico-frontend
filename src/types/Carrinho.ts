import { IProdutoCarrinho } from "./Produto";


export default interface ICarrinho {
    _id: number,
    produtos: Array<IProdutoCarrinho>,
    emailCliente: string
}