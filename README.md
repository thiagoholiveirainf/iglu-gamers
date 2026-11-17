<p align="center">
  <img src="src/images/logo.svg" alt="Logo do IGLU GAMERS" width="96">
</p>

<h1 align="center">IGLU GAMERS</h1>

<p align="center">
  Notícias, guias e novidades sobre games no Linux: Proton, Steam Deck, drivers, emulação e tudo para jogar com os pinguins.
</p>

---

## Sobre o projeto

O **IGLU GAMERS** é um portal de notícias sobre jogos no Linux, feito com **Gatsby 5** e **React 18**. As matérias são escritas em **MDX**, viram páginas estáticas no build e são publicadas na CDN do **Netlify**, com deploy automático a cada push.

Este projeto foi desenvolvido como trabalho acadêmico do Instituto Infnet.

## Funcionalidades

- **Notícias em MDX**: cada matéria é uma pasta em `noticias/` com o texto, a imagem do card e as imagens do corpo.
- **Rotas geradas a partir do conteúdo**: cada notícia ganha sua própria URL em `/noticia/<slug>/` (File System Route API).
- **Listagem paginada**: `/noticias/`, `/noticias/2/`… com 3 notícias por página, geradas no `gatsby-node.js`.
- **Imagens otimizadas**: redimensionamento, WebP, lazy loading e legendas com `gatsby-plugin-image`, `gatsby-plugin-sharp` e `gatsby-remark-images`.
- **Formulário de contato**: validação no cliente (nome, e-mail, assunto e mensagem) e envio para o **Netlify Forms**, com campo anti-spam (honeypot).
- **SEO**: `title`, `description`, imagem de compartilhamento (Open Graph/Twitter), URL canônica e metadados de artigo em todas as rotas, além de `sitemap.xml` e `robots.txt`.
- **Página 404 personalizada**, com sugestões de leitura (também ativa no `gatsby develop`).
- **Layout responsivo**, com menu que destaca a seção ativa.

## Tecnologias

| Área | Ferramentas |
|---|---|
| Framework | Gatsby 5, React 18 |
| Conteúdo | MDX (`gatsby-plugin-mdx`), `gatsby-source-filesystem` |
| Imagens | `gatsby-plugin-image`, `gatsby-plugin-sharp`, `gatsby-transformer-sharp`, `gatsby-remark-images` |
| Estilos | CSS Modules (`*.module.css`) e CSS-in-JS (`styled-components`) |
| Fontes | Roboto e Open Sans via `@fontsource` |
| SEO | Head API do Gatsby, `gatsby-plugin-sitemap`, `gatsby-plugin-robots-txt` |
| Deploy e formulário | Netlify (CDN, CI/CD e Netlify Forms) |

## Rotas

| Rota | Conteúdo |
|---|---|
| `/` | Página inicial com o destaque e as últimas 3 notícias |
| `/noticias/` | Todas as notícias, com paginação (`/noticias/2/`, …) |
| `/noticia/<slug>/` | Página de cada notícia |
| `/contato/` | Formulário de contato |
| `/destaque/` | Página de destaque (em construção) |
| `/sitemap.xml` e `/robots.txt` | Metadados do site (gerados só no build) |
| qualquer outra | Página 404 personalizada |

## Como rodar localmente

Pré-requisitos: **Node.js 22** (veja `.nvmrc`) e npm.

```bash
# Instalar as dependências
npm install

# Servidor de desenvolvimento em http://localhost:8000
npm run develop

# Build de produção na pasta public/
npm run build

# Servir o build em http://localhost:9000
npm run serve

# Limpar o cache do Gatsby (útil quando uma rota antiga continua aparecendo)
npm run clean
```

> O `sitemap.xml` e o `robots.txt` só existem depois do `npm run build`. No `develop` eles retornam 404, e isso é esperado.
>
> O formulário de contato só envia de verdade no Netlify. Localmente, o envio mostra a mensagem de falha.

## Estrutura de pastas

```
.
├── noticias/                  # Conteúdo: uma pasta por notícia
│   └── 1-post/
│       ├── index.mdx          # Frontmatter + texto da matéria
│       ├── card.webp          # Imagem do card e de compartilhamento
│       └── image.webp         # (opcional) imagens usadas no corpo
├── src/
│   ├── components/            # Componentes React (cada um com seu index.module.css)
│   │   ├── header/            # Menu com link ativo
│   │   ├── hero/              # Destaque da página inicial
│   │   ├── noticias/          # Lista de cards de notícias
│   │   ├── noticia/           # Card de uma notícia
│   │   ├── paginacao/         # Navegação entre páginas da listagem
│   │   ├── formContato/       # Formulário com validação e Netlify Forms
│   │   ├── naoEncontrada/     # Conteúdo da página 404
│   │   ├── seo/               # Metadados do <head>
│   │   ├── layout/ e footer/
│   ├── hooks/
│   │   └── use-site-metadata.js
│   ├── pages/
│   │   ├── index.js, contato.js, destaque.js, 404.js
│   │   └── noticia/{mdx.frontmatter__slug}.js   # Página de cada notícia
│   ├── templates/
│   │   └── noticias.js        # Listagem paginada
│   └── images/                # Logo e ícones SVG
├── static/                    # Favicons e og-image.jpg (copiados como estão)
├── gatsby-config.js           # Metadados do site e plugins
├── gatsby-node.js             # Paginação, 404 no develop e sitemap.xml
├── gatsby-browser.js          # Importação das fontes
└── netlify.toml               # Build e cabeçalhos de cache no Netlify
```

## Como publicar uma nova notícia

1. Crie uma pasta em `noticias/`, por exemplo `noticias/7-post/`.
2. Adicione a imagem do card (`card.webp`) e, se quiser, imagens para o corpo do texto.
3. Crie o `index.mdx` com o frontmatter:

   ```mdx
   ---
   title: "Título da notícia"
   date: "2026-11-20"
   time: "10:30"
   slug: "titulo-da-noticia"
   card: "card.webp"
   card_alt: "Descrição da imagem do card"
   read_time: "4 min"
   excerpt: "Resumo curto que aparece no card e na descrição da página."
   tags: ["linux"]
   ---

   Texto da matéria em Markdown.

   ![Texto alternativo da imagem](./image.webp "Legenda que aparece abaixo da imagem")
   ```

4. Rode `npm run develop` para conferir. A notícia aparece em `/noticia/titulo-da-noticia/`, na listagem e no sitemap.

> As imagens precisam ser arquivos de imagem de verdade (WebP, JPG ou PNG). Um PSD renomeado para `.webp` quebra o build com o erro `Unsupported output format magick`.

## Deploy no Netlify

O build e a pasta publicada estão definidos no `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "public"
```

1. Envie o repositório para o GitHub.
2. No Netlify, vá em **Add new site → Import an existing project** e escolha o repositório.
3. Em **Forms**, clique em **Enable form detection** e faça um novo deploy para o formulário `contato` começar a receber mensagens.

A partir daí, cada push na branch de produção gera um novo deploy automático (CI/CD).

### Variáveis de ambiente

| Variável | Origem | Uso |
|---|---|---|
| `URL` | Definida pelo Netlify | URL pública do site no sitemap, no `robots.txt` e nas URLs canônicas |
| `CONTEXT` | Definida pelo Netlify | Só `production` é indexado. Deploy previews e branch deploys recebem `Disallow: /` |
| `SITE_URL` | Opcional | Sobrescreve `URL`, por exemplo para usar um domínio próprio |

Sem essas variáveis (rodando localmente), a URL usada é `http://localhost:8000`.

## Autor

**Thiago Henrique Almeida de Oliveira**, Instituto Infnet.
