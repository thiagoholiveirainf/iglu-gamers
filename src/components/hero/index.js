import * as React from 'react';
import * as heroStyles from "./index.module.css";
import heroImage from '../../images/hero.webp';

export default function hero() {
    return (
        <div className={heroStyles.container}>
            <div className={heroStyles.containerText}>
                <span className={heroStyles.botao}>Destaque</span> <span className={heroStyles.data}>08 de novembro de 2026</span>

                <h1>O <span className={heroStyles.destaque}>Linux</span> nunca esteve tão <span className={heroStyles.destaque}>pronto para jogar</span>.</h1>
                <p><strong>Drivers melhores, mais jogos compatíveis</strong> e uma <strong>comunidade gigante</strong>.</p>
                <p>Descubra por que <strong>2026</strong> é o ano do pinguim gamer.</p>
            </div>

            <img src={heroImage} alt="" className={heroStyles.image}/>
        </div>
    )
}
