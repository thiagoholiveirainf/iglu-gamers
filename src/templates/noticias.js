import * as React from "react";
import {graphql} from "gatsby";
import Layout from "../components/layout";
import Header from "../components/header";
import Footer from "../components/footer";
import Noticias from "../components/noticias";
import Paginacao from "../components/paginacao";
import Seo from "../components/seo";

export default function ListaNoticias({data, pageContext}) {
    const {paginaAtual, numPaginas} = pageContext;

    return (
        <Layout>
            <Header active="noticias"/>
            <Noticias titulo="Notícias" nivelTitulo={1} nodes={data.allMdx.nodes}>
                <Paginacao
                    paginaAtual={paginaAtual}
                    numPaginas={numPaginas}
                    caminhoBase="/noticias"
                />
            </Noticias>
            <Footer/>
        </Layout>
    );
}

export const query = graphql`
    query ($skip: Int!, $limit: Int!) {
        allMdx(sort: {frontmatter: {date: DESC}}, limit: $limit, skip: $skip) {
            nodes {
                ...CardNoticia
            }
        }
    }
`;

export const Head = ({pageContext, location}) => (
    <Seo
        title={pageContext.paginaAtual > 1
            ? `Notícias - Página ${pageContext.paginaAtual}`
            : "Notícias"}
        description="Todas as notícias do IGLU GAMERS sobre games no Linux: Proton, Steam Deck, anti-cheat, emulação, drivers e muito mais."
        pathname={location.pathname}
    />
);
