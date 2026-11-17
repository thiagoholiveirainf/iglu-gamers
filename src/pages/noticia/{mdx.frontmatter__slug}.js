import React from "react";
import {graphql} from "gatsby";
import styled from "styled-components";
import Layout from "../../components/layout"
import Header from "../../components/header"
import Footer from "../../components/footer";
import Seo from "../../components/seo";


const Container = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  min-height: 100vh;
  padding: 2em 1.5em;
  font-family: "Roboto", sans-serif;


  h1 {
    font-size: 2.5em;
    font-weight: 800;
    line-height: 1.2;
    margin-bottom: 1em;
  }


  h2 {
    font-size: 1.6em;
    font-weight: 700;
    color: #0b7562;
    margin: 1.5em 0 0.5em;
  }

  h3 {
    font-size: 1.3em;
    font-weight: 700;
    margin: 1.2em 0 0.5em;
  }

  p, li {
    font-size: 1.15em;
    line-height: 1.7;
  }

  ul, ol {
    padding-left: 1.5em;
    margin: 1em 0;
  }

  ul { list-style: disc; }
  ol { list-style: decimal; }


  .gatsby-resp-image-figure {
    margin: 2em auto;
  }

  .gatsby-resp-image-wrapper {
    border-radius: 0.4em;
    overflow: hidden;
  }

  .gatsby-resp-image-figcaption {
    max-width: 480px;
    margin: 0.7em auto 0;
    font-size: 0.95em;
    font-style: italic;
    text-align: center;
    color: #555;
  }

  pre {
    background: #00071d;
    color: #fff;
    padding: 1em;
    border-radius: 0.3em;
    overflow-x: auto;
  }
`;

export default function Noticia({data, children}) {

    return (
        <Layout>
            <Header active="noticias" />
            <Container>
                <h1>{data.mdx.frontmatter.title}</h1>
                {children}
            </Container>
            <Footer />
        </Layout>
    )
}

export const query = graphql`
    query ($id: String!) {
        mdx(id: { eq: $id }) {
            frontmatter {
                title
                date(formatString: "DD/MM/YYYY")
                isoDate: date(formatString: "YYYY-MM-DD")
                time
                excerpt
                tags
                card {
                    publicURL
                }
            }
            excerpt
        }
    }
`

export const Head = ({data, location}) => {
    const {title, excerpt, isoDate, time, tags, card} = data.mdx.frontmatter;

    return (
        <Seo
            title={title}
            description={excerpt || data.mdx.excerpt}
            image={card?.publicURL}
            pathname={location.pathname}
            type="article"
        >
            <meta property="article:published_time" content={`${isoDate}T${time || "00:00"}:00-03:00`}/>
            {tags?.map((tag) => (
                <meta key={tag} property="article:tag" content={tag}/>
            ))}
        </Seo>
    );
}