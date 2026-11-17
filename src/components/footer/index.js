import * as React from 'react';
import * as footerStyles from "./index.module.css";
import {Link} from "gatsby";
import logo from "../../images/logo.svg";


export default function Footer() {
    return (
        <footer>
            <div className={footerStyles.container}>
                <div className={footerStyles.logo}>
                    <img src={logo} alt=""/>
                    <div className={footerStyles.titulos}>
                        <Link to="/">
                            <p className={footerStyles.nome}>IGLU <span className={footerStyles.destaque}>GAMERS</span></p>
                            <p className={footerStyles.slogan}>Jogando com os pinguins</p>
                        </Link>
                    </div>
                </div>
                <p>Notícias para quem escolheu jogar com o lado livre da força.</p>
            </div>
        </footer>
    )
}
