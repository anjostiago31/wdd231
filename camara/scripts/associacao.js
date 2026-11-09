/* ==========================================
   CÂMARA DE COMÉRCIO DE GARÇA
   Arquivo: associacao.js
   Autor: Tiago dos Anjos
   Descrição: Interações do formulário
========================================== */

// ==========================================
// 1. SELECIONAR ELEMENTOS
// ==========================================

const formulario = document.querySelector("#formulario");

const campoNivel = document.querySelector("#nivel");

const campoData = document.querySelector("#data-solicitacao");

const botoesPlano = document.querySelectorAll(".escolher-plano");

// ==========================================
// 2. SELECIONAR PLANO
// ==========================================

botoesPlano.forEach((botao) => {

    botao.addEventListener("click", () => {

        const plano = botao.dataset.plano;

        campoNivel.value = plano;

        document.querySelector("#formulario-associacao")
            .scrollIntoView({
                behavior: "smooth"
            });

        campoNivel.focus({
            preventScroll: true
        });

    });

});

// ==========================================
// 3. DATA E HORA DA SOLICITAÇÃO
// ==========================================

function atualizarDataSolicitacao() {

    const dataAtual = new Date();

    campoData.value = dataAtual.toISOString();
}

// ==========================================
// 4. VALIDAÇÃO E ENVIO
// ==========================================

if (formulario) {

    formulario.addEventListener("submit", (evento) => {

        atualizarDataSolicitacao();

        if (!formulario.checkValidity()) {

            evento.preventDefault();

            formulario.reportValidity();

            return;
        }

        // O navegador enviará os dados para obrigado.html
        // utilizando o método GET.

    });

}