import * as React from "react"
import Noticia from "../noticia";
import * as noticiasStyles from "./index.module.css";
import {graphql, Link} from "gatsby";


export default function Noticias({titulo, nodes, linkVerTodas, nivelTitulo = 2, children}) {
    const Titulo = `h${nivelTitulo}`;

    return (
        <section className={noticiasStyles.container}>

            <Titulo className={noticiasStyles.titulo}>{titulo}</Titulo>
            <div className={noticiasStyles.divisoria}></div>

            <ul className={noticiasStyles.noticias}>
                {
                    nodes.map((node) => (
                        <li key={node.id}>
                            <Noticia children={node} nivelTitulo={nivelTitulo + 1}/>
                        </li>
                    ))
                }
            </ul>

            {linkVerTodas && (
                <Link to={linkVerTodas} className={noticiasStyles.verTodas}>
                    Ver todas as notícias →
                </Link>
            )}

            {children}
        </section>
    )
}


export const cardNoticiaFragment = graphql`
    fragment CardNoticia on Mdx {
        id
        excerpt
        frontmatter {
            date(formatString: "DD/MM/YYYY")
            slug
            title
            excerpt
            card_alt
            card {
                childImageSharp {
                    gatsbyImageData(
                        width: 600
                        placeholder: BLURRED
                        formats: [AUTO, WEBP, AVIF]
                    )
                }
            }
        }
    }
`
