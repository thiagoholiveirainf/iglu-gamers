const siteUrl = (process.env.SITE_URL || process.env.URL || `http://localhost:8000`).replace(/\/$/, "");

const contextoNetlify = process.env.CONTEXT || "production";

module.exports = {
  siteMetadata: {
    title: `IGLU GAMERS`,
    description: `Notícias, guias e novidades sobre games no Linux: Proton, Steam Deck, drivers, emulação e tudo para jogar com os pinguins.`,
    siteUrl,
    image: `/og-image.jpg`,
    lang: `pt-BR`,
    locale: `pt_BR`,
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `noticia`,
        path: `${__dirname}/noticias`,
      },
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 480,
              linkImagesToOriginal: false,
              showCaptions: ["title"],
              backgroundColor: "transparent",
              quality: 80,
              withWebp: true,
            },
          },
        ],
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-styled-components",
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        excludes: [`/dev-404-page/`],
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: siteUrl,
        sitemap: `${siteUrl}/sitemap.xml`,
        resolveEnv: () => contextoNetlify,
        env: {
          production: {
            policy: [{userAgent: "*", allow: "/"}],
          },
          "deploy-preview": {
            policy: [{userAgent: "*", disallow: ["/"]}],
            sitemap: null,
            host: null,
          },
          "branch-deploy": {
            policy: [{userAgent: "*", disallow: ["/"]}],
            sitemap: null,
            host: null,
          },
        },
      },
    },
  ],
}
