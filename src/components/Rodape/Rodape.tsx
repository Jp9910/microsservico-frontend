import fb from '../../assets/fb.png'
import ig from '../../assets/ig.png'
import tw from '../../assets/tw.png'
import gh from '../../assets/github.png'
import li from '../../assets/linkedin.png'

function Rodape () {
    return (
        <div>
        <div className=""></div>
        <footer className="flex rounded-sm bg-blue-500 justify-between px-5 mt-3 items-center">
            <section>
                <ul>
                    <li className="mr-8 inline-block">
                        <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
                            <img src={fb} alt="facebook logo"/>
                        </a>
                    </li>
                    <li className="mr-8 inline-block">
                        <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
                            <img src={tw} alt="twitter logo"/>
                        </a>
                    </li>
                    <li >
                        <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
                            <img src={ig} alt="instagram logo"/>
                        </a>
                    </li>
                </ul>
            </section>
            <section>
                <img width="50" height="50" src="logo.png" alt="logo"/>
            </section>
            <section>
                <p>Desenvolvido por JP</p>
                <ul>
                    <li className="mr-8 inline-block">
                        <a href="https://www.github.com/jp9910" target="_blank" rel="noreferrer">
                            <img src={gh} alt="GitHub logo"/>
                        </a>
                    </li>
                    <li className="mr-0 inline-block">
                        <a href="https://www.linkedin.com/in/joao-paulo-secundo/" target="_blank" rel="noreferrer">
                            <img src={li} alt="Linkedin Logo"/>
                        </a>
                    </li>
                </ul>
            </section>
        </footer>
        </div>
    )
}

export default Rodape