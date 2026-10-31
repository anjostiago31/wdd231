const anoAtual = document.querySelector("#anoAtual");
const ultimaModificacao = document.querySelector("#ultimaModificacao");

// Ano atual
anoAtual.textContent = new Date().getFullYear();

// Última modificação
ultimaModificacao.textContent =
    `Última modificação: ${document.lastModified}`;