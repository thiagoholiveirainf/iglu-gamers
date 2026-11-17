import * as React from "react"
import {graphql} from "gatsby";
import Layout from "../components/layout";
import Header from "../components/header";
import Footer from "../components/footer";
import Hero from "../components/hero";
import Noticias from "../components/noticias";
import Seo from "../components/seo";


export default function IndexPage({data}) {
    return (
        <Layout>
            <Header/>
            <Hero/>
            <Noticias
                titulo="Últimas notícias"
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

export const Head = ({location}) => <Seo pathname={location.pathname}/>
