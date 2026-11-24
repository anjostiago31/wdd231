/* ==========================================
   CÂMARA DE COMÉRCIO DE GARÇA
   Arquivo: associacao.js
   Autor: Tiago dos Anjos
   Descrição: Funcionalidades da associação
========================================== */

/* ==========================================
   1. REGISTRO DE DATA E HORA
========================================== */

const campoData = document.querySelector("#data-solicitacao");

if (campoData) {
    campoData.value = new Date().toISOString();
}

/* ==========================================
   2. ABERTURA DOS MODAIS
========================================== */

const linksModais = document.querySelectorAll(".abrir-modal");

linksModais.forEach((link) => {

    link.addEventListener("click", (evento) => {

        evento.preventDefault();

        const idModal = link.dataset.modal;
        const modal = document.getElementById(idModal);

        if (modal && !modal.open) {
            modal.showModal();
        }

    });

});

/* ==========================================
   3. FECHAMENTO DOS MODAIS PELO BOTÃO
========================================== */

const botoesFechar = document.querySelectorAll(".fechar-modal");

botoesFechar.forEach((botao) => {

    botao.addEventListener("click", () => {

        const modal = botao.closest("dialog");

        if (modal && modal.open) {
            modal.close();
        }

    });

});

/* ==========================================
   4. FECHAMENTO AO CLICAR FORA DO MODAL
========================================== */

const modais = document.querySelectorAll(".modal-associacao");

modais.forEach((modal) => {

    modal.addEventListener("click", (evento) => {

        if (evento.target !== modal) {
            return;
        }

        const limites = modal.getBoundingClientRect();

        const cliqueFora =
            evento.clientX < limites.left ||
            evento.clientX > limites.right ||
            evento.clientY < limites.top ||
            evento.clientY > limites.bottom;

        if (cliqueFora) {
            modal.close();
        }

    });

});

/* ==========================================
   5. SELEÇÃO DO NÍVEL DE ASSOCIAÇÃO
========================================== */

const botoesPlanos = document.querySelectorAll(".escolher-plano");
const campoNivel = document.querySelector("#nivel");

botoesPlanos.forEach((botao) => {

    botao.addEventListener("click", () => {

        const planoSelecionado = botao.dataset.plano;

        if (campoNivel) {

            campoNivel.value = planoSelecionado;

            campoNivel.focus({
                preventScroll: true
            });

            const movimentoReduzido = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

            campoNivel.scrollIntoView({
                behavior: movimentoReduzido ? "instant" : "smooth",
                block: "center"
            });

        }

    });

});