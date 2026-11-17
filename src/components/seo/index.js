import * as React from "react";
import useSiteMetadata from "../../hooks/use-site-metadata";


export default function Seo({title, description, image, pathname = "/", type = "website", noindex = false, children}) {
    const site = useSiteMetadata();

    const tituloCompleto = title ? `${title} | ${site.title}` : site.title;
    const descricao = description || site.description;
    const imagem = image || site.image;
    const imagemUrl = imagem.startsWith("http") ? imagem : `${site.siteUrl}${imagem}`;
    const url = `${site.siteUrl}${pathname}`;

    return (
        <>
            <html lang={site.lang}/>
            <title>{tituloCompleto}</title>
            <meta name="description" content={descricao}/>
            <meta name="image" content={imagemUrl}/>
            <link rel="canonical" href={url}/>


            <link rel="icon" type="image/svg+xml" href="/favicon.svg"/>
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
            <meta name="theme-color" content="#00071d"/>
            {noindex && <meta name="robots" content="noindex, nofollow"/>}


            <meta property="og:site_name" content={site.title}/>
            <meta property="og:locale" content={site.locale}/>
            <meta property="og:type" content={type}/>
            <meta property="og:title" content={tituloCompleto}/>
            <meta property="og:description" content={descricao}/>
            <meta property="og:image" content={imagemUrl}/>
            <meta property="og:url" content={url}/>


            <meta name="twitter:card" content="summary_large_image"/>
            <meta name="twitter:title" content={tituloCompleto}/>
            <meta name="twitter:description" content={descricao}/>
            <meta name="twitter:image" content={imagemUrl}/>

            {children}
        </>
    );
}
