/* ==========================================
   CÂMARA DE COMÉRCIO DE GARÇA
   Arquivo: menu.js
   Autor: Tiago dos Anjos
   Descrição: Menu responsivo e rodapé
========================================== */

// ==========================================
// 1. SELECIONAR ELEMENTOS DO HTML
// ==========================================

const botaoMenu = document.querySelector("#menu");
const navegacao = document.querySelector("#navegacao");

// ==========================================
// 2. ABRIR E FECHAR O MENU
// ==========================================

if (botaoMenu && navegacao) {

    botaoMenu.addEventListener("click", () => {

        // Adiciona ou remove a classe aberto
        navegacao.classList.toggle("aberto");

        // Verifica se o menu está aberto
        const menuAberto = navegacao.classList.contains("aberto");

        // Atualiza o atributo de acessibilidade
        botaoMenu.setAttribute("aria-expanded", String(menuAberto));

        // Altera o ícone e a descrição do botão
        if (menuAberto) {
            botaoMenu.textContent = "✕";
            botaoMenu.setAttribute(
                "aria-label",
                "Fechar menu de navegação"
            );
        } else {
            botaoMenu.textContent = "☰";
            botaoMenu.setAttribute(
                "aria-label",
                "Abrir menu de navegação"
            );
        }

    });

    // ==========================================
    // 3. FECHAR MENU AO CLICAR EM UM LINK
    // ==========================================

    const linksMenu = navegacao.querySelectorAll("a");

    linksMenu.forEach((link) => {

        link.addEventListener("click", () => {

            navegacao.classList.remove("aberto");

            botaoMenu.textContent = "☰";

            botaoMenu.setAttribute("aria-expanded", "false");

            botaoMenu.setAttribute(
                "aria-label",
                "Abrir menu de navegação"
            );

        });

    });

    // ==========================================
    // 4. FECHAR MENU COM A TECLA ESC
    // ==========================================

    document.addEventListener("keydown", (evento) => {

        if (evento.key === "Escape") {

            navegacao.classList.remove("aberto");

            botaoMenu.textContent = "☰";

            botaoMenu.setAttribute("aria-expanded", "false");

            botaoMenu.setAttribute(
                "aria-label",
                "Abrir menu de navegação"
            );

            botaoMenu.focus();

        }

    });

}

// ==========================================
// 5. ATUALIZAR ANO DO RODAPÉ
// ==========================================

const anoAtual = document.querySelector("#ano-atual");

if (anoAtual) {

    const dataAtual = new Date();

    anoAtual.textContent = dataAtual.getFullYear();

}

// ==========================================
// 6. DATA DA ÚLTIMA MODIFICAÇÃO
// ==========================================

const ultimaModificacao = document.querySelector("#ultima-modificacao");

if (ultimaModificacao) {

    const dataModificacao = new Date(document.lastModified);

    const dataFormatada = dataModificacao.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });

    ultimaModificacao.textContent =
        `Última modificação: ${dataFormatada}`;

}