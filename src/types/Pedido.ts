import { IProdutoCarrinho } from "./Produto";

export default interface IPedido {
    id: number,
    emailCliente: string,
    createdAt: string,
    produtos: Array<IProdutoCarrinho>,
    status: string // "Processando Pagamento"|"Em preparo"|"Entregue"
}