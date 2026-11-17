import * as React from "react"
import Layout from "../components/layout";
import Header from "../components/header";
import Footer from "../components/footer";
import Seo from "../components/seo";


export default function DestaquePage() {
    return (
        <Layout>
            <Header/>
            <div className="main-content">
                Contato
            </div>
            <Footer copyRightYear={2026}/>
        </Layout>

    )
}

export const Head = ({location}) => (
    <Seo
        title="Destaque"
        description="O Linux nunca esteve tão pronto para jogar: drivers melhores, mais jogos compatíveis e uma comunidade gigante."
        pathname={location.pathname}
    />
)
