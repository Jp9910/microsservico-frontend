function Botao (props: {legenda: string}) {
    return (
        <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            {props.legenda}
            {/* javascript pode ser escrito entre {} */}
        </button>
        // javascript pode ser escrito com //
    )
}

export default Botao

// props.children é o que está entre o abre e fecha do componente:
// <button>
//     esse é o props.children
// </button>