
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

        const dados = await resposta.json();

        if (!Array.isArray(dados)) {
            throw new Error("O JSON deve conter uma lista de empresas.");
        }

        empresas = dados;

        exibirEmpresas(empresas);

    } catch (erro) {

        console.error("Erro ao carregar empresas:", erro);

        containerEmpresas.textContent =
            "Não foi possível carregar o diretório.";

        totalEmpresas.textContent =
            "Empresas indisponíveis.";
    }
}

// ==========================================
// 3. IDENTIFICAR NÍVEL DE ASSOCIAÇÃO
// ==========================================

function obterNivelAssociacao(nivel) {

    const niveis = {
        1: "Membro",
        2: "Prata",
        3: "Ouro",
        bronze: "Membro",
        membro: "Membro",
        prata: "Prata",
        ouro: "Ouro"
    };

    const chave = String(nivel ?? "").toLowerCase();

    return niveis[chave] || "Membro";
}

// ==========================================
// 4. CRIAR CARTÕES DAS EMPRESAS
// ==========================================

function criarCartaoEmpresa(empresa) {

    const artigo = document.createElement("article");

    artigo.classList.add("empresa-card");

    // ======================================
    // LOGOTIPO DA EMPRESA
    // ======================================

    if (empresa.imagem) {

        const imagem = document.createElement("img");

        imagem.src = empresa.imagem;

        imagem.alt = `Logotipo da empresa ${empresa.nome}`;

        imagem.loading = "lazy";

        imagem.decoding = "async";

        imagem.width = 160;

        imagem.height = 100;

        imagem.classList.add("empresa-logo");

        // Caso a imagem não seja encontrada
        imagem.addEventListener("error", () => {

            console.warn(
                `Imagem não encontrada: ${empresa.imagem}`
            );

            imagem.remove();

        });

        artigo.appendChild(imagem);
    }

    // ======================================
    // NOME DA EMPRESA
    // ======================================

    const titulo = document.createElement("h3");

    titulo.textContent = empresa.nome;

    // ======================================
    // CATEGORIA
    // ======================================

    const categoria = document.createElement("p");

    categoria.classList.add("empresa-categoria");

    categoria.textContent = empresa.categoria;

    // ======================================
    // NÍVEL DE ASSOCIAÇÃO
    // ======================================

    const nivel = document.createElement("p");

    nivel.classList.add("empresa-nivel");

    const nomeNivel = obterNivelAssociacao(empresa.nivel);

    nivel.textContent = `Associação: ${nomeNivel}`;

    // ======================================
    // DESCRIÇÃO
    // ======================================

    const descricao = document.createElement("p");

    descricao.textContent = empresa.descricao || "";

    // ======================================
    // ENDEREÇO
    // ======================================

    const endereco = document.createElement("p");

    endereco.textContent =
        `Endereço: ${empresa.endereco || "Não informado"}`;

    // ======================================
    // TELEFONE
    // ======================================

    const telefone = document.createElement("p");

    telefone.textContent =
        `Telefone: ${empresa.telefone || "Não informado"}`;

    // ======================================
    // ADICIONAR ELEMENTOS AO CARTÃO
    // ======================================

    artigo.appendChild(titulo);

    artigo.appendChild(categoria);

    artigo.appendChild(nivel);

    artigo.appendChild(descricao);

    artigo.appendChild(endereco);

    artigo.appendChild(telefone);

    // ======================================
    // SITE DA EMPRESA
    // ======================================

    if (empresa.site) {

        const link = document.createElement("a");

        link.href = empresa.site;

        link.textContent = "Visitar site";

        link.target = "_blank";

        link.rel = "noopener noreferrer";

        link.setAttribute(
            "aria-label",
            `Visitar o site da empresa ${empresa.nome}`
        );

        artigo.appendChild(link);
    }

    return artigo;
}

// ==========================================
// 5. EXIBIR EMPRESAS
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

    const fragmento = document.createDocumentFragment();

    lista.forEach((empresa) => {

        const cartao = criarCartaoEmpresa(empresa);

        fragmento.appendChild(cartao);

    });

    containerEmpresas.appendChild(fragmento);
}

// ==========================================
// 6. FILTRAR EMPRESAS
// ==========================================

function filtrarEmpresas() {

    const pesquisa = campoPesquisa.value
        .toLocaleLowerCase("pt-BR")
        .trim();

    const categoriaSelecionada = campoCategoria.value;

    const resultado = empresas.filter((empresa) => {

        const nomeCorresponde = String(empresa.nome || "")
            .toLocaleLowerCase("pt-BR")
            .includes(pesquisa);

        const categoriaCorresponde =
            categoriaSelecionada === "todas" ||
            empresa.categoria === categoriaSelecionada;

        return nomeCorresponde && categoriaCorresponde;

    });

    exibirEmpresas(resultado);
}

// ==========================================
// 7. VISUALIZAÇÃO EM GRADE
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
// 8. VISUALIZAÇÃO EM LISTA
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
// 9. EVENTOS
// ==========================================

if (
    containerEmpresas &&
    campoPesquisa &&
    campoCategoria &&
    totalEmpresas &&
    botaoGrade &&
    botaoLista
) {

    campoPesquisa.addEventListener(
        "input",
        filtrarEmpresas
    );

    campoCategoria.addEventListener(
        "change",
        filtrarEmpresas
    );

    botaoGrade.addEventListener(
        "click",
        visualizarGrade
    );

    botaoLista.addEventListener(
        "click",
        visualizarLista
    );

    // Configurar visualização inicial
    visualizarGrade();

    // Carregar as empresas
    carregarEmpresas();
}
