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
    imagem:string,
    linkImagem: string
    // No carrinho não tem descricao
}

export interface IProdutoPedidos {
    id: number,
    nome: string,
    preco: number,
    imagem:string,
    linkImagem: string
}