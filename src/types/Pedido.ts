import { IProdutoPedidos } from "./Produto";

export default interface IPedido {
    id: number,
    emailCliente: string,
    createdAt: string,
    produtos: Array<IProdutoPedidos>,
    status: string // "Processando Pagamento"|"Em preparo"|"Entregue"
}