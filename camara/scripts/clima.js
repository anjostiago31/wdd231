/* ==========================================
   CÂMARA DE COMÉRCIO DE GARÇA
   Arquivo: clima.js
   Autor: Tiago dos Anjos
   Descrição: Previsão do tempo para Garça - SP
========================================== */

// ==========================================
// 1. ELEMENTOS DO HTML
// ==========================================

const temperaturaElemento = document.querySelector("#temperatura");
const descricaoElemento = document.querySelector("#descricao-clima");
const previsaoElemento = document.querySelector("#previsao-dias");

// ==========================================
// 2. CONFIGURAÇÃO DA API
// ==========================================

// Coordenadas aproximadas de Garça - SP
const latitude = -22.21;
const longitude = -49.65;

// Endereço da API Open-Meteo
const urlClima =
    `https://api.open-meteo.com/v1/forecast?` +
    `latitude=${latitude}&longitude=${longitude}` +
    `&current=temperature_2m,relative_humidity_2m,` +
    `weather_code,wind_speed_10m` +
    `&daily=temperature_2m_max,temperature_2m_min,weather_code` +
    `&timezone=America%2FSao_Paulo` +
    `&forecast_days=4`;

// ==========================================
// 3. DESCRIÇÕES DO CLIMA
// ==========================================

function obterDescricaoClima(codigo) {

    const descricoes = {
        0: "Céu limpo ☀️",
        1: "Predominantemente limpo 🌤️",
        2: "Parcialmente nublado ⛅",
        3: "Nublado ☁️",
        45: "Nevoeiro 🌫️",
        48: "Nevoeiro com geada 🌫️",
        51: "Garoa fraca 🌦️",
        53: "Garoa moderada 🌦️",
        55: "Garoa intensa 🌧️",
        56: "Garoa congelante fraca 🌧️",
        57: "Garoa congelante intensa 🌧️",
        61: "Chuva fraca 🌧️",
        63: "Chuva moderada 🌧️",
        65: "Chuva forte 🌧️",
        66: "Chuva congelante fraca 🌧️",
        67: "Chuva congelante forte 🌧️",
        71: "Neve fraca ❄️",
        73: "Neve moderada ❄️",
        75: "Neve forte ❄️",
        77: "Grãos de neve ❄️",
        80: "Pancadas de chuva fracas 🌦️",
        81: "Pancadas de chuva moderadas 🌧️",
        82: "Pancadas de chuva fortes ⛈️",
        85: "Pancadas de neve fracas ❄️",
        86: "Pancadas de neve fortes ❄️",
        95: "Trovoadas ⛈️",
        96: "Trovoadas com granizo fraco ⛈️",
        99: "Trovoadas com granizo forte ⛈️"
    };

    return descricoes[codigo] || "Condição não disponível";
}

// ==========================================
// 4. FORMATAR DATA
// ==========================================

function formatarData(data) {

    // A API retorna datas no formato YYYY-MM-DD
    const [ano, mes, dia] = data.split("-").map(Number);

    const dataFormatada = new Date(ano, mes - 1, dia);

    return dataFormatada.toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "2-digit",
        month: "2-digit"
    });
}

// ==========================================
// 5. EXIBIR CLIMA ATUAL
// ==========================================

function exibirClimaAtual(dados) {

    const climaAtual = dados.current;

    const temperatura = climaAtual.temperature_2m;
    const umidade = climaAtual.relative_humidity_2m;
    const vento = climaAtual.wind_speed_10m;
    const codigoClima = climaAtual.weather_code;

    temperaturaElemento.textContent =
        `${Math.round(temperatura)}°C`;

    descricaoElemento.textContent =
        obterDescricaoClima(codigoClima);

    // Informações complementares
    const informacoes = document.createElement("div");

    informacoes.classList.add("informacoes-clima");

    const textoUmidade = document.createElement("p");
    textoUmidade.textContent = `💧 Umidade: ${umidade}%`;

    const textoVento = document.createElement("p");
    textoVento.textContent = `💨 Vento: ${vento} km/h`;

    informacoes.appendChild(textoUmidade);
    informacoes.appendChild(textoVento);

    const informacoesAntigas =
        document.querySelector(".informacoes-clima");

    if (informacoesAntigas) {
        informacoesAntigas.remove();
    }

    descricaoElemento.insertAdjacentElement(
        "afterend",
        informacoes
    );
}

// ==========================================
// 6. EXIBIR PREVISÃO DOS PRÓXIMOS DIAS
// ==========================================

function exibirPrevisao(dados) {

    const previsao = dados.daily;

    // Limpar conteúdo anterior
    previsaoElemento.innerHTML = "";

    // Começa no índice 1 para não repetir o dia atual
    for (let i = 1; i <= 3; i++) {

        const data = previsao.time[i];

        const maxima = previsao.temperature_2m_max[i];
        const minima = previsao.temperature_2m_min[i];
        const codigo = previsao.weather_code[i];

        // Criar cartão
        const cartao = document.createElement("div");
        cartao.classList.add("dia-previsao");

        // Informações do dia
        const informacoesDia = document.createElement("div");

        const tituloDia = document.createElement("h4");
        tituloDia.textContent = formatarData(data);

        const descricaoDia = document.createElement("p");
        descricaoDia.textContent = obterDescricaoClima(codigo);

        informacoesDia.appendChild(tituloDia);
        informacoesDia.appendChild(descricaoDia);

        // Temperaturas
        const temperaturas = document.createElement("div");
        temperaturas.classList.add("temperaturas-dia");

        const maximaElemento = document.createElement("p");
        maximaElemento.textContent =
            `Máx: ${Math.round(maxima)}°C`;

        const minimaElemento = document.createElement("p");
        minimaElemento.textContent =
            `Mín: ${Math.round(minima)}°C`;

        temperaturas.appendChild(maximaElemento);
        temperaturas.appendChild(minimaElemento);

        // Adicionar informações ao cartão
        cartao.appendChild(informacoesDia);
        cartao.appendChild(temperaturas);

        // Adicionar cartão à página
        previsaoElemento.appendChild(cartao);
    }
}

// ==========================================
// 7. CONSULTAR API
// ==========================================

async function carregarClima() {

    try {

        const resposta = await fetch(urlClima);

        if (!resposta.ok) {
            throw new Error("Erro ao consultar a previsão do tempo.");
        }

        const dados = await resposta.json();

        if (!dados.current || !dados.daily) {
            throw new Error("Dados meteorológicos incompletos.");
        }

        exibirClimaAtual(dados);
        exibirPrevisao(dados);

    } catch (erro) {

        console.error("Erro na previsão do tempo:", erro);

        temperaturaElemento.textContent =
            "Temperatura indisponível";

        descricaoElemento.textContent =
            "Não foi possível carregar o clima no momento.";

        previsaoElemento.textContent =
            "Tente novamente mais tarde.";
    }
}

// ==========================================
// 8. INICIAR A PREVISÃO
// ==========================================

if (
    temperaturaElemento &&
    descricaoElemento &&
    previsaoElemento
) {
    carregarClima();
}