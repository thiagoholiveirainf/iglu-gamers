import * as React from "react";
import {Link} from "gatsby";
import * as styles from "./index.module.css";
import logo from "../../images/logo.svg";

export default function NaoEncontrada() {
    return (
        <section className={styles.container}>
            <div className={styles.conteudo}>
                <img src={logo} alt="" className={styles.icone} aria-hidden="true"/>

                <p className={styles.codigo}>
                    4<span className={styles.destaque}>0</span>4
                </p>

                <h1>Esse iglu está vazio</h1>

                <p className={styles.texto}>
                    A página que você procurou não existe, mudou de endereço ou derreteu.
                    Mas não se preocupe: os pinguins continuam jogando por aqui.
                </p>

                <div className={styles.botoes}>
                    <Link to="/" className={styles.botao}>Voltar para a página inicial</Link>
                    <Link to="/noticias/" className={styles.botaoSecundario}>Ver todas as notícias</Link>
                </div>
            </div>
        </section>
    );
}
