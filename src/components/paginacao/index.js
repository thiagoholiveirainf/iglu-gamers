import * as React from "react";
import {Link} from "gatsby";
import * as styles from "./index.module.css";


function caminhoDaPagina(caminhoBase, pagina) {
    return pagina === 1 ? `${caminhoBase}/` : `${caminhoBase}/${pagina}/`;
}

export default function Paginacao({paginaAtual, numPaginas, caminhoBase}) {
    if (numPaginas <= 1) {
        return null;
    }

    const temAnterior = paginaAtual > 1;
    const temProxima = paginaAtual < numPaginas;
    const paginas = Array.from({length: numPaginas}, (_, i) => i + 1);

    return (
        <nav className={styles.paginacao} aria-label="Paginação das notícias">
            {temAnterior ? (
                <Link
                    to={caminhoDaPagina(caminhoBase, paginaAtual - 1)}
                    className={styles.seta}
                    rel="prev"
                >
                    ← Anterior
                </Link>
            ) : (
                <span className={`${styles.seta} ${styles.desabilitado}`} aria-hidden="true">
                    ← Anterior
                </span>
            )}

            <ul className={styles.numeros}>
                {paginas.map((pagina) => (
                    <li key={pagina}>
                        {pagina === paginaAtual ? (
                            <span
                                className={`${styles.numero} ${styles.atual}`}
                                aria-current="page"
                            >
                                {pagina}
                            </span>
                        ) : (
                            <Link
                                to={caminhoDaPagina(caminhoBase, pagina)}
                                className={styles.numero}
                                aria-label={`Página ${pagina}`}
                            >
                                {pagina}
                            </Link>
                        )}
                    </li>
                ))}
            </ul>

            {temProxima ? (
                <Link
                    to={caminhoDaPagina(caminhoBase, paginaAtual + 1)}
                    className={styles.seta}
                    rel="next"
                >
                    Próxima →
                </Link>
            ) : (
                <span className={`${styles.seta} ${styles.desabilitado}`} aria-hidden="true">
                    Próxima →
                </span>
            )}
        </nav>
    );
}
