const path = require("path");
const fs = require("fs");

const NOTICIAS_POR_PAGINA = 3;

exports.createPages = async ({graphql, actions, reporter}) => {
    const {createPage} = actions;

    const resultado = await graphql(`
        query {
            allMdx {
                totalCount
            }
        }
    `);

    if (resultado.errors) {
        reporter.panicOnBuild("Erro ao buscar as notícias para a paginação.", resultado.errors);
        return;
    }

    const totalNoticias = resultado.data.allMdx.totalCount;
    const numPaginas = Math.max(1, Math.ceil(totalNoticias / NOTICIAS_POR_PAGINA));

    for (let i = 0; i < numPaginas; i++) {
        createPage({
            path: i === 0 ? "/noticias/" : `/noticias/${i + 1}/`,
            component: path.resolve("./src/templates/noticias.js"),
            context: {
                limit: NOTICIAS_POR_PAGINA,
                skip: i * NOTICIAS_POR_PAGINA,
                paginaAtual: i + 1,
                numPaginas,
            },
        });
    }
};


exports.onCreatePage = ({page, actions}) => {
    if (process.env.NODE_ENV !== "development") return;
    if (page.path !== "/404/") return;

    actions.createPage({
        ...page,
        path: "/dev-404-personalizada/",
        matchPath: "/*",
    });
};


exports.onPostBuild = ({reporter}) => {
    const origem = path.join(__dirname, "public", "sitemap-index.xml");
    const destino = path.join(__dirname, "public", "sitemap.xml");

    if (fs.existsSync(origem)) {
        fs.copyFileSync(origem, destino);
        reporter.info("sitemap.xml gerado a partir de sitemap-index.xml");
    } else {
        reporter.warn("sitemap-index.xml não encontrado; sitemap.xml não foi gerado.");
    }
};
