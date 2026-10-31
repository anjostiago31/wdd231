/* ==========================================
   WDD231 - PÁGINA INICIAL
   Autor: Tiago dos Anjos
   Controle da navegação responsiva
========================================== */

const botaoMenu = document.querySelector("#menu");
const navegacao = document.querySelector("#navegacao");

botaoMenu.addEventListener("click", () => {
    const aberto = navegacao.classList.toggle("aberto");

    botaoMenu.setAttribute("aria-expanded", String(aberto));

    botaoMenu.setAttribute(
        "aria-label",
        aberto ? "Fechar menu de navegação" : "Abrir menu de navegação"
    );

    botaoMenu.textContent = aberto ? "✕" : "☰";
});

// Fecha o menu ao selecionar um link
navegacao.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        navegacao.classList.remove("aberto");
        botaoMenu.setAttribute("aria-expanded", "false");
        botaoMenu.setAttribute("aria-label", "Abrir menu de navegação");
        botaoMenu.textContent = "☰";
    });
});