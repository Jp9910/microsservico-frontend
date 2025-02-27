import fb from '../../assets/fb.png'
import ig from '../../assets/ig.png'
import tw from '../../assets/tw.png'
import gh from '../../assets/github.png'
import li from '../../assets/linkedin.png'

function Rodape () {
    return (
        <footer className="flex fixed bottom-0 w-full bg-blue-500 justify-between px-5 mt-3 items-center">
            <section className="flex">
                <ul>
                    <p className="flex text-sm items-center justify-center justify-self-center align-middle">Visite nossas redes!</p>
                    <div className='flex justify-between'>
                        <li className="inline-block">
                            <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
                                <img src={fb} width="24" height="24" alt="facebook logo"/>
                            </a>
                        </li>
                        <li className="inline-block">
                            <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
                                <img src={tw} width="24" height="24" alt="twitter logo"/>
                            </a>
                        </li>
                        <li className="inline-block">
                            <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
                                <img src={ig} width="24" height="24" alt="instagram logo"/>
                            </a>
                        </li>
                    </div>
                </ul>
            </section>
            <section>
                <img width="64" height="64" src="/logo.png" alt="logo"/>
            </section>
            <section>
                <p className="text-sm">Desenvolvido por JP</p>
                <ul>
                    <div className="flex justify-center space-x-5">
                        <li className="">
                            <a href="https://www.github.com/jp9910" target="_blank" rel="noreferrer">
                                <img src={gh} alt="GitHub logo"/>
                            </a>
                        </li>
                        <li className="">
                            <a href="https://www.linkedin.com/in/joao-paulo-secundo/" target="_blank" rel="noreferrer">
                                <img src={li} alt="Linkedin Logo"/>
                            </a>
                        </li>
                    </div>
                </ul>
            </section>
        </footer>
    )
}

export default Rodape