
/* ==========================================
   CÂMARA DE COMÉRCIO DE GARÇA
   Arquivo: destaques.js
   Autor: Tiago dos Anjos
   WDD231 - Empresas em Destaque
========================================== */

"use strict";

// ==========================================
// 1. SELECIONAR O CONTAINER
// ==========================================

const containerDestaques = document.querySelector(
    "#empresas-container"
);

// ==========================================
// 2. EMBARALHAR AS EMPRESAS
// ==========================================

function embaralharEmpresas(lista) {

    const empresasEmbaralhadas = [...lista];

    for (
        let i = empresasEmbaralhadas.length - 1;
        i > 0;
        i--
    ) {

        const j = Math.floor(Math.random() * (i + 1));

        [
            empresasEmbaralhadas[i],
            empresasEmbaralhadas[j]
        ] = [
            empresasEmbaralhadas[j],
            empresasEmbaralhadas[i]
        ];
    }

    return empresasEmbaralhadas;
}

// ==========================================
// 3. CRIAR CARTÃO DE EMPRESA
// ==========================================

function criarCartaoDestaque(empresa) {

    const artigo = document.createElement("article");
    artigo.classList.add("card", "empresa-destaque-card");

    // LOGOTIPO
    if (empresa.imagem) {

        const imagem = document.createElement("img");

        imagem.src = empresa.imagem;
        imagem.alt = `Logotipo da empresa ${empresa.nome}`;
        imagem.loading = "lazy";
        imagem.width = 120;
        imagem.height = 100;

        artigo.appendChild(imagem);
    }

    // NOME
    const titulo = document.createElement("h3");
    titulo.textContent = empresa.nome;
    artigo.appendChild(titulo);

    // NÍVEL DE ASSOCIAÇÃO
    const nivel = document.createElement("span");

    const nivelNormalizado = empresa.nivel
        .trim()
        .toLowerCase();

    nivel.classList.add(`nivel-${nivelNormalizado}`);

    nivel.textContent =
        `Associado ${nivelNormalizado === "ouro" ? "Ouro" : "Prata"}`;

    artigo.appendChild(nivel);

    // ENDEREÇO
    const endereco = document.createElement("p");
    endereco.textContent = `Endereço: ${empresa.endereco}`;
    artigo.appendChild(endereco);

    // TELEFONE
    const telefone = document.createElement("p");
    telefone.textContent = `Telefone: ${empresa.telefone}`;
    artigo.appendChild(telefone);

    // SITE
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
// 4. CARREGAR EMPRESAS DO JSON
// ==========================================

async function carregarDestaques() {

    if (!containerDestaques) {
        return;
    }

    try {

        const resposta = await fetch(
            "dados/empresas.json",
            { cache: "no-store" }
        );

        if (!resposta.ok) {
            throw new Error(
                `Erro HTTP: ${resposta.status}`
            );
        }

        const empresas = await resposta.json();

        if (!Array.isArray(empresas)) {
            throw new Error(
                "O JSON deve conter uma lista de empresas."
            );
        }

        // ==================================
        // 5. FILTRAR OURO E PRATA
        // ==================================

        const associadas = empresas.filter(empresa => {

            const nivel = String(
                empresa.nivel || ""
            ).trim().toLowerCase();

            return nivel === "ouro" ||
                   nivel === "prata";
        });

        // ==================================
        // 6. EMBARALHAR E SELECIONAR
        // ==================================

        const embaralhadas = embaralharEmpresas(
            associadas
        );

        const quantidade = Math.min(
            3,
            embaralhadas.length
        );

        const selecionadas = embaralhadas.slice(
            0,
            quantidade
        );

        // ==================================
        // 7. EXIBIR CARTÕES
        // ==================================

        containerDestaques.replaceChildren();

        if (selecionadas.length < 2) {

            const mensagem = document.createElement("p");

            mensagem.textContent =
                "Cadastre pelo menos duas empresas " +
                "associadas de nível ouro ou prata.";

            containerDestaques.appendChild(mensagem);

            return;
        }

        selecionadas.forEach(empresa => {

            const cartao = criarCartaoDestaque(empresa);

            containerDestaques.appendChild(cartao);
        });

    } catch (erro) {

        console.error(
            "Erro ao carregar empresas em destaque:",
            erro
        );

        containerDestaques.textContent =
            "Não foi possível carregar as empresas em destaque.";
    }
}

// ==========================================
// 8. INICIALIZAR
// ==========================================

if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        carregarDestaques
    );

} else {

    carregarDestaques();
}
