export default interface IUsuarioDecodificado {
    exp: number,
    id: number,
    isAdmin: boolean,
    iss: string, // issuer (api autenticacao)
    nome: string,
    sub: string // email
}