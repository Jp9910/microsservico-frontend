export interface IProdutoLoja {
    id: number,
    nome: string,
    preco: number,
    descricao:string,
    imagem:string
}

export interface IProdutoCarrinho {
    id: number,
    nome: string,
    preco: number,
    imagem:string
    // No carrinho não tem descricao
}