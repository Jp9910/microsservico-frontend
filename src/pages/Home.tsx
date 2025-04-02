function Home() {
    return (
        <div className="pagina">
            {/* <div className="grid grid-flow-col grid-rows-3 gap-4">  
                <div className="bg-blue-500 row-span-3 row-start-12">01</div>  
                <div className="flex justify-center items-center gap-2 bg-blue-500 row-start-3 row-span-2 row-end-12">
                    02
                    <h1 className="">Bem-vindo!</h1>
                </div>  
                <div className="bg-blue-500 row-start-1 row-end-4">03</div>
            </div> */}

            <div className="grid grid-flow-col grid-rows-3 gap-4">  
                <div className=" row-span-3 row-start-12"></div>  
                <div className="flex justify-center items-center gap-2 row-start-3 row-span-2 row-end-12">
                    <b className="">Bem-vindo à MicroLoja!</b>
                </div>  
                <div className="row-start-1 row-end-4"></div>
            </div>
        </div>
    )
}

export default Home


