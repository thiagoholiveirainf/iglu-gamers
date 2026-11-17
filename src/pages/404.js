import * as React from "react"
import {graphql} from "gatsby";
import Layout from "../components/layout";
import Header from "../components/header";
import Footer from "../components/footer";
import NaoEncontrada from "../components/naoEncontrada";
import Noticias from "../components/noticias";
import Seo from "../components/seo";


export default function NotFoundPage({data}) {
    return (
        <Layout>
            <Header/>
            <NaoEncontrada/>
            <Noticias
                titulo="Que tal ler uma destas?"
                nodes={data.allMdx.nodes}
                linkVerTodas="/noticias/"
            />
            <Footer/>
        </Layout>
    )
}

export const query = graphql`
    query {
        allMdx(sort: {frontmatter: {date: DESC}}, limit: 3) {
            nodes {
                ...CardNoticia
            }
        }
    }
`

export const Head = ({location}) => (
    <Seo
        title="Página não encontrada"
        description="A página que você procurou não existe ou mudou de endereço."
        pathname={location.pathname}
        noindex
    />
)
