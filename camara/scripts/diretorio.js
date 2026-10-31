/* ==========================================
   CÂMARA DE COMÉRCIO DE GARÇA
   Arquivo: diretorio.js
   Autor: Tiago dos Anjos
   Descrição: Diretório dinâmico de empresas
========================================== */

// ==========================================
// 1. SELECIONAR ELEMENTOS
// ==========================================

const containerEmpresas = document.querySelector("#lista-empresas");

const campoPesquisa = document.querySelector("#pesquisa-empresa");

const campoCategoria = document.querySelector("#categoria");

const totalEmpresas = document.querySelector("#total-empresas");

const botaoGrade = document.querySelector("#visualizar-grade");

const botaoLista = document.querySelector("#visualizar-lista");

// Armazena as empresas carregadas
let empresas = [];

// ==========================================
// 2. CARREGAR EMPRESAS
// ==========================================

async function carregarEmpresas() {

    try {

        const resposta = await fetch("dados/empresas.json");

        if (!resposta.ok) {
            throw new Error("Não foi possível carregar as empresas.");
        }

        empresas = await resposta.json();

        exibirEmpresas(empresas);

    } catch (erro) {

        console.error("Erro:", erro);

        containerEmpresas.textContent =
            "Não foi possível carregar o diretório.";

        totalEmpresas.textContent =
            "Empresas indisponíveis.";
    }
}

// ==========================================
// 3. CRIAR CARTÕES
// ==========================================

function criarCartaoEmpresa(empresa) {

    const artigo = document.createElement("article");

    artigo.classList.add("empresa-card");

    const titulo = document.createElement("h3");
    titulo.textContent = empresa.nome;

    const categoria = document.createElement("p");
    categoria.classList.add("empresa-categoria");
    categoria.textContent = empresa.categoria;

    const descricao = document.createElement("p");
    descricao.textContent = empresa.descricao;

    const endereco = document.createElement("p");
    endereco.textContent = `Endereço: ${empresa.endereco}`;

    const telefone = document.createElement("p");
    telefone.textContent = `Telefone: ${empresa.telefone}`;

    artigo.appendChild(titulo);
    artigo.appendChild(categoria);
    artigo.appendChild(descricao);
    artigo.appendChild(endereco);
    artigo.appendChild(telefone);

    // Exibir site apenas quando existir
    if (empresa.site) {

        const link = document.createElement("a");

        link.href = empresa.site;
        link.textContent = "Visitar site";
        link.target = "_blank";
        link.rel = "noopener noreferrer";

        artigo.appendChild(link);
    }

    return artigo;
}

// ==========================================
// 4. EXIBIR EMPRESAS
// ==========================================

function exibirEmpresas(lista) {

    containerEmpresas.replaceChildren();

    totalEmpresas.textContent =
        `${lista.length} empresa(s) encontrada(s)`;

    if (lista.length === 0) {

        const mensagem = document.createElement("p");

        mensagem.textContent =
            "Nenhuma empresa encontrada para esta pesquisa.";

        containerEmpresas.appendChild(mensagem);

        return;
    }

    lista.forEach((empresa) => {

        const cartao = criarCartaoEmpresa(empresa);

        containerEmpresas.appendChild(cartao);

    });
}

// ==========================================
// 5. FILTRAR EMPRESAS
// ==========================================

function filtrarEmpresas() {

    const pesquisa = campoPesquisa.value
        .toLowerCase()
        .trim();

    const categoriaSelecionada = campoCategoria.value;

    const resultado = empresas.filter((empresa) => {

        const nomeCorresponde = empresa.nome
            .toLowerCase()
            .includes(pesquisa);

        const categoriaCorresponde =
            categoriaSelecionada === "todas" ||
            empresa.categoria === categoriaSelecionada;

        return nomeCorresponde && categoriaCorresponde;

    });

    exibirEmpresas(resultado);
}

// ==========================================
// 6. VISUALIZAÇÃO EM GRADE
// ==========================================

function visualizarGrade() {

    containerEmpresas.classList.remove("empresas-lista");

    containerEmpresas.classList.add("empresas-grade");

    botaoGrade.classList.add("ativo");

    botaoLista.classList.remove("ativo");

    botaoGrade.setAttribute("aria-pressed", "true");

    botaoLista.setAttribute("aria-pressed", "false");
}

// ==========================================
// 7. VISUALIZAÇÃO EM LISTA
// ==========================================

function visualizarLista() {

    containerEmpresas.classList.remove("empresas-grade");

    containerEmpresas.classList.add("empresas-lista");

    botaoLista.classList.add("ativo");

    botaoGrade.classList.remove("ativo");

    botaoLista.setAttribute("aria-pressed", "true");

    botaoGrade.setAttribute("aria-pressed", "false");
}

// ==========================================
// 8. EVENTOS
// ==========================================

if (
    containerEmpresas &&
    campoPesquisa &&
    campoCategoria &&
    totalEmpresas &&
    botaoGrade &&
    botaoLista
) {

    campoPesquisa.addEventListener("input", filtrarEmpresas);

    campoCategoria.addEventListener("change", filtrarEmpresas);

    botaoGrade.addEventListener("click", visualizarGrade);

    botaoLista.addEventListener("click", visualizarLista);

    carregarEmpresas();
}