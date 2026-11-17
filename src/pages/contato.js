import * as React from "react"
import Layout from "../components/layout";
import Header from "../components/header";
import Footer from "../components/footer";
import FormContato from "../components/formContato";
import Seo from "../components/seo";


export default function ContatoPage() {
    return (
        <Layout>
            <Header/>
            <FormContato/>
            <Footer copyRightYear={2026}/>
        </Layout>

    )
}

export const Head = ({location}) => (
    <Seo
        title="Contato"
        description="Fale com a equipe do IGLU GAMERS: envie sugestões de pauta, dúvidas ou parcerias."
        pathname={location.pathname}
    />
)
