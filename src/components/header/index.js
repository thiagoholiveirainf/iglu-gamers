import * as React from 'react';
import * as headerStyles from "./index.module.css";
import logo from "../../images/logo.svg";
import iconContato from "../../images/icon-contato.svg";
import {Link} from "gatsby";

export default function Header({active}) {
    return (
        <header className={headerStyles.header}>
            <div className={headerStyles.container}>

                <Link to="/">
                    <div className={headerStyles.logo}>
                        <img src={logo} alt=""/>
                        <div className={headerStyles.titulos}>
                            <p className={headerStyles.nome}>IGLU <span className={headerStyles.destaque}>GAMERS</span></p>
                            <p className={headerStyles.slogan}>Jogando com os pinguins</p>
                        </div>
                    </div>
                </Link>

                <nav aria-label="Principal">
                    <ul>
                        <li>
                            <Link
                                to="/noticias/"
                                className={active === "noticias" ? headerStyles.ativo : undefined}
                                aria-current={active === "noticias" ? "page" : undefined}
                            >
                                Notícias
                            </Link>
                        </li>
                    </ul>
                </nav>

                <Link to="/contato/" className={headerStyles.botaoContato}>
                    <img src={iconContato} alt=""/>
                    Contato
                </Link>
            </div>
        </header>
    )
}
