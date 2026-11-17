import {graphql, useStaticQuery} from "gatsby";


export default function useSiteMetadata() {
    const data = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    title
                    description
                    siteUrl
                    image
                    lang
                    locale
                }
            }
        }
    `);

    return data.site.siteMetadata;
}
