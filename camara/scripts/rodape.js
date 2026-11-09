// Data e horário da última modificação da página

const elementoModificacao = document.querySelector("#ultima-modificacao");

if (elementoModificacao) {
    const data = new Date(document.lastModified);

    const dataFormatada = data.toLocaleDateString("pt-BR");

    const horaFormatada = data.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });

    elementoModificacao.textContent =
        `${dataFormatada} às ${horaFormatada}`;
}