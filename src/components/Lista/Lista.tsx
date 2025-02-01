import ItemDeLista from "./ItemDeLista/ItemDeLista";
// import imgCafe from "../../assets/cafe.png";
// As imagens devem ser salvas no BD, e pegas por uma API
// https://stackoverflow.com/questions/40702842/how-to-import-all-modules-from-a-directory-in-typescript

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Lista(_props: {produtos:{nome:string, preco:number, img:string}[]}) {
    const lista = {
        produtos: [
            {
                nome:"café",
                preco:5,
                img: "cafe.png"
            },
            {
                nome:"pão",
                preco:7,
                img: "pao.jpg"
            }
        ]
    }

    const listItems = lista.produtos.map((produto, index) =>
        <ItemDeLista {...produto} key={index}></ItemDeLista>
    )
    
    return (
        <aside className="flex">
            <h2 className="justify-self-center text-3x2 font-bold underline"> Produtos </h2>
            <ul>
                {listItems}
            </ul>
        </aside>
    )
}

export default Lista;