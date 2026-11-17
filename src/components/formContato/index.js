import * as React from "react";
import * as styles from "./index.module.css";
import iconContato from "../../images/icon-contato.svg";

const ASSUNTOS = [
    "Sugestão de pauta",
    "Parceria e publicidade",
    "Correção em matéria",
    "Dúvida",
    "Outro",
];

const VALORES_INICIAIS = {
    nome: "",
    email: "",
    assunto: "",
    mensagem: "",
};

const MIN_MENSAGEM = 10;


const NOME_FORMULARIO = "contato";


function codificar(dados) {
    return new URLSearchParams(dados).toString();
}

function validar(valores) {
    const erros = {};

    if (!valores.nome.trim()) {
        erros.nome = "Informe seu nome.";
    }

    if (!valores.email.trim()) {
        erros.email = "Informe seu e-mail.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valores.email)) {
        erros.email = "Informe um e-mail válido.";
    }

    if (!valores.assunto) {
        erros.assunto = "Escolha um assunto.";
    }

    if (valores.mensagem.trim().length < MIN_MENSAGEM) {
        erros.mensagem = `A mensagem precisa ter pelo menos ${MIN_MENSAGEM} caracteres.`;
    }

    return erros;
}

export default function FormContato() {
    const [valores, setValores] = React.useState(VALORES_INICIAIS);
    const [erros, setErros] = React.useState({});
    const [status, setStatus] = React.useState("idle");
    const [isca, setIsca] = React.useState("");

    function handleChange(event) {
        const {name, value} = event.target;
        setValores((atual) => ({...atual, [name]: value}));

        if (erros[name]) {
            setErros((atual) => ({...atual, [name]: undefined}));
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const novosErros = validar(valores);
        setErros(novosErros);

        if (Object.keys(novosErros).length > 0) {
            return;
        }

        setStatus("enviando");

        try {
            const resposta = await fetch("/", {
                method: "POST",
                headers: {"Content-Type": "application/x-www-form-urlencoded"},
                body: codificar({
                    "form-name": NOME_FORMULARIO,
                    "bot-field": isca,
                    ...valores,
                }),
            });

            if (!resposta.ok) {
                throw new Error(`Falha no envio: ${resposta.status}`);
            }

            setStatus("sucesso");
            setValores(VALORES_INICIAIS);
        } catch (erro) {
            console.error(erro);
            setStatus("falha");
        }
    }


    function propsDoCampo(nome) {
        return {
            id: nome,
            name: nome,
            value: valores[nome],
            onChange: handleChange,
            "aria-invalid": Boolean(erros[nome]),
            "aria-describedby": erros[nome] ? `${nome}-erro` : undefined,
            className: erros[nome] ? styles.campoInvalido : undefined,
        };
    }

    function mensagemDeErro(nome) {
        return erros[nome] ? (
            <span id={`${nome}-erro`} className={styles.erro}>
                {erros[nome]}
            </span>
        ) : null;
    }

    return (
        <section className={styles.container}>
            <h1>Fale com a gente</h1>
            <div className={styles.divisoria}></div>

            <div className={styles.conteudo}>
                <div className={styles.info}>
                    <p>
                        Tem uma <strong>sugestão de pauta</strong>, encontrou algum{" "}
                        <strong>erro em uma matéria</strong> ou quer fechar uma{" "}
                        <strong>parceria</strong>? Mande sua mensagem.
                    </p>
                    <p>
                        A equipe da <span className={styles.destaque}>IGLU GAMERS</span>{" "}
                        responde em até <strong>2 dias úteis</strong>.
                    </p>
                </div>

                {status === "sucesso" ? (
                    <div className={styles.sucesso} role="status">
                        <h2>Mensagem enviada!</h2>
                        <p>Obrigado pelo contato. Logo, logo um pinguim responde você.</p>
                        <button
                            type="button"
                            className={styles.botao}
                            onClick={() => setStatus("idle")}
                        >
                            Enviar outra mensagem
                        </button>
                    </div>
                ) : (
                    <form
                        className={styles.form}
                        onSubmit={handleSubmit}
                        noValidate
                        name={NOME_FORMULARIO}
                        method="POST"
                        data-netlify="true"
                        netlify-honeypot="bot-field"
                    >

                        <input type="hidden" name="form-name" value={NOME_FORMULARIO}/>
                        <p className={styles.isca} aria-hidden="true">
                            <label>
                                Não preencha este campo:{" "}
                                <input
                                    name="bot-field"
                                    tabIndex={-1}
                                    autoComplete="off"
                                    value={isca}
                                    onChange={(event) => setIsca(event.target.value)}
                                />
                            </label>
                        </p>

                        {status === "falha" && (
                            <p className={styles.falha} role="alert">
                                Não foi possível enviar sua mensagem. Verifique sua conexão e tente novamente.
                            </p>
                        )}

                        <div className={styles.linha}>
                            <div className={styles.campo}>
                                <label htmlFor="nome">Nome</label>
                                <input type="text" autoComplete="name" {...propsDoCampo("nome")} />
                                {mensagemDeErro("nome")}
                            </div>

                            <div className={styles.campo}>
                                <label htmlFor="email">E-mail</label>
                                <input type="email" autoComplete="email" {...propsDoCampo("email")} />
                                {mensagemDeErro("email")}
                            </div>
                        </div>

                        <div className={styles.campo}>
                            <label htmlFor="assunto">Assunto</label>
                            <select {...propsDoCampo("assunto")}>
                                <option value="" disabled>
                                    Selecione um assunto
                                </option>
                                {ASSUNTOS.map((assunto) => (
                                    <option key={assunto} value={assunto}>
                                        {assunto}
                                    </option>
                                ))}
                            </select>
                            {mensagemDeErro("assunto")}
                        </div>

                        <div className={styles.campo}>
                            <label htmlFor="mensagem">Mensagem</label>
                            <textarea rows={6} {...propsDoCampo("mensagem")} />
                            {mensagemDeErro("mensagem")}
                        </div>

                        <button
                            type="submit"
                            className={styles.botao}
                            disabled={status === "enviando"}
                        >
                            <img src={iconContato} alt="" />
                            {status === "enviando" ? "Enviando..." : "Enviar mensagem"}
                        </button>
                    </form>
                )}
            </div>
        </section>
    );
}
