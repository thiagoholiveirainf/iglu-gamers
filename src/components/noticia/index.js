import * as React from 'react';
import * as noticiaStyles from "./index.module.css";
import iconSeta from '../../images/icon-seta-dark.svg';
import {GatsbyImage, getImage} from "gatsby-plugin-image";
import {Link} from "gatsby"


export default function Noticia({ children, nivelTitulo = 3 }) {

    const cardImage = getImage(children.frontmatter.card)
    const Titulo = `h${nivelTitulo}`;

    return (
        <article className={noticiaStyles.container}>
            <Link to={`/noticia/${children.frontmatter.slug}`}>
            <GatsbyImage
                image={cardImage}
                alt={children.frontmatter.card_alt}
            />
                <div className={noticiaStyles.containerText}>
                    <p className={noticiaStyles.data}>{children.frontmatter.date}</p>
                    <Titulo className={noticiaStyles.titulo}>{children.frontmatter.title}</Titulo>
                    <p>{children.frontmatter.excerpt}</p>
                    <div className={noticiaStyles.divisoria}>
                        Leia matéria completa <img src={iconSeta} alt="" />
                    </div>
                </div>
            </Link>
        </article>
    );
}