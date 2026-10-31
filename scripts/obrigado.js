/* ==========================================
   CÂMARA DE COMÉRCIO DE GARÇA
   Arquivo: obrigado.js
   Autor: Tiago dos Anjos
   Descrição: Confirmação de associação
========================================== */

// ==========================================
// 1. RECUPERAR PARÂMETROS DA URL
// ==========================================

const parametros = new URLSearchParams(window.location.search);

// ==========================================
// 2. OBTER DADOS DO FORMULÁRIO
// ==========================================

const nome = parametros.get("nome");
const sobrenome = parametros.get("sobrenome");
const empresa = parametros.get("empresa");
const email = parametros.get("email");
const nivel = parametros.get("nivel");
const dataSolicitacao = parametros.get("dataSolicitacao");

// ==========================================
// 3. SELECIONAR ELEMENTOS HTML
// ==========================================

const campoNome = document.querySelector("#confirmacao-nome");
const campoEmpresa = document.querySelector("#confirmacao-empresa");
const campoEmail = document.querySelector("#confirmacao-email");
const campoNivel = document.querySelector("#confirmacao-nivel");
const campoData = document.querySelector("#confirmacao-data");

// ==========================================
// 4. FORMATAR NÍVEL DE ASSOCIAÇÃO
// ==========================================

function formatarNivel(valor) {

    const niveis = {
        "sem-fins-lucrativos": "Sem Fins Lucrativos",
        "prata": "Prata",
        "ouro": "Ouro"
    };

    return niveis[valor] || "Não informado";
}

// ==========================================
// 5. FORMATAR DATA
// ==========================================

function formatarData(valor) {

    if (!valor) {
        return "Não informada";
    }

    const data = new Date(valor);

    if (Number.isNaN(data.getTime())) {
        return "Data inválida";
    }

    return data.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}

// ==========================================
// 6. EXIBIR DADOS NA PÁGINA
// ==========================================

function exibirConfirmacao() {

    const nomeCompleto = [nome, sobrenome]
        .filter(Boolean)
        .join(" ");

    campoNome.textContent =
        nomeCompleto || "Não informado";

    campoEmpresa.textContent =
        empresa || "Não informada";

    campoEmail.textContent =
        email || "Não informado";

    campoNivel.textContent =
        formatarNivel(nivel);

    campoData.textContent =
        formatarData(dataSolicitacao);
}

// ==========================================
// 7. EXECUTAR FUNÇÃO
// ==========================================

if (
    campoNome &&
    campoEmpresa &&
    campoEmail &&
    campoNivel &&
    campoData
) {
    exibirConfirmacao();
}