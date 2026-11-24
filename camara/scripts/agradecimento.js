/* ==========================================
   CÂMARA DE COMÉRCIO DE GARÇA
   Arquivo: agradecimento.js
   Autor: Tiago dos Anjos
   Descrição: Exibição dos dados da associação
========================================== */

/* ==========================================
   1. RECUPERAÇÃO DOS DADOS DO FORMULÁRIO
========================================== */

const parametros = new URLSearchParams(window.location.search);

/* ==========================================
   2. NÍVEIS DE ASSOCIAÇÃO
========================================== */

const niveisAssociacao = {
    np: "Associação NP - Sem Fins Lucrativos",
    bronze: "Associação Bronze",
    silver: "Associação Prata",
    gold: "Associação Ouro"
};

/* ==========================================
   3. FUNÇÃO PARA EXIBIR OS DADOS
========================================== */

function exibirDado(id, valor) {

    const elemento = document.getElementById(id);

    if (elemento) {

        elemento.textContent =
            valor && valor.trim()
                ? valor
                : "Não informado";

    }

}

/* ==========================================
   4. DADOS DO RESPONSÁVEL
========================================== */

exibirDado(
    "confirmacao-nome",
    parametros.get("nome")
);

exibirDado(
    "confirmacao-sobrenome",
    parametros.get("sobrenome")
);

exibirDado(
    "confirmacao-cargo",
    parametros.get("cargo")
);

exibirDado(
    "confirmacao-email",
    parametros.get("email")
);

exibirDado(
    "confirmacao-telefone",
    parametros.get("telefone")
);

/* ==========================================
   5. DADOS DA ORGANIZAÇÃO
========================================== */

exibirDado(
    "confirmacao-empresa",
    parametros.get("empresa")
);

/* ==========================================
   6. NÍVEL DE ASSOCIAÇÃO
========================================== */

const nivelSelecionado = parametros.get("nivel");

const nomeNivel = Object.hasOwn(
    niveisAssociacao,
    nivelSelecionado
)
    ? niveisAssociacao[nivelSelecionado]
    : "Não informado";

exibirDado(
    "confirmacao-nivel",
    nomeNivel
);

/* ==========================================
   7. FORMATAÇÃO DA DATA E HORA
========================================== */

function formatarDataHora(valor) {

    if (!valor) {
        return "Não informado";
    }

    const data = new Date(valor);

    if (Number.isNaN(data.getTime())) {
        return "Data inválida";
    }

    const dataFormatada = data.toLocaleDateString(
        "pt-BR",
        {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        }
    );

    const horaFormatada = data.toLocaleTimeString(
        "pt-BR",
        {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false
        }
    );

    return `${dataFormatada} às ${horaFormatada}`;

}

/* ==========================================
   8. EXIBIÇÃO DA DATA E HORA
========================================== */

const dataSolicitacao = parametros.get("dataSolicitacao");

exibirDado(
    "confirmacao-data",
    formatarDataHora(dataSolicitacao)
);