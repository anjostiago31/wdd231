
"use strict";

// Elementos do clima atual
const temperatura = document.querySelector("#temperatura");
const condicao = document.querySelector("#condicao");
const umidade = document.querySelector("#umidade");
const vento = document.querySelector("#vento");
const atualizacao = document.querySelector("#atualizacao");

// Container da previsão
const previsaoContainer = document.querySelector("#previsao");

// Configuração da OpenWeatherMap
const API_KEY = "SUA_CHAVE_AQUI";

const LATITUDE = -22.21;
const LONGITUDE = -49.66;

const URL_ATUAL =
    "https://api.openweathermap.org/data/2.5/weather";

const URL_PREVISAO =
    "https://api.openweathermap.org/data/2.5/forecast";

// Formatar temperatura
function formatarTemperatura(valor) {
    return `${Math.round(valor)}°C`;
}

// Consultar a API
async function consultarAPI(endpoint) {

    const url = new URL(endpoint);

    url.search = new URLSearchParams({
        lat: LATITUDE,
        lon: LONGITUDE,
        appid: API_KEY,
        units: "metric",
        lang: "pt_br"
    });

    const resposta = await fetch(url);

    if (!resposta.ok) {
        throw new Error(
            `Erro na API: ${resposta.status}`
        );
    }

    return await resposta.json();
}

// Exibir clima atual
async function carregarClimaAtual() {

    if (!temperatura || !condicao) return;

    try {

        const dados = await consultarAPI(URL_ATUAL);

        temperatura.textContent =
            formatarTemperatura(dados.main.temp);

        condicao.textContent =
            dados.weather[0].description;

        if (umidade) {
            umidade.textContent =
                `${dados.main.humidity}%`;
        }

        if (vento) {
            vento.textContent =
                `${(dados.wind.speed * 3.6).toFixed(1)} km/h`;
        }

        if (atualizacao) {

            const horario = new Date(
                (dados.dt + dados.timezone) * 1000
            );

            const horas = String(
                horario.getUTCHours()
            ).padStart(2, "0");

            const minutos = String(
                horario.getUTCMinutes()
            ).padStart(2, "0");

            atualizacao.textContent =
                `Dados referentes às ${horas}:${minutos}`;
        }

    } catch (erro) {

        console.error(
            "Erro ao carregar clima atual:",
            erro
        );

        temperatura.textContent =
            "Clima indisponível";

        condicao.textContent =
            "Não foi possível consultar os dados.";
    }
}

// Exibir previsão dos próximos 3 dias
async function carregarPrevisao() {

    if (!previsaoContainer) return;

    try {

        const dados = await consultarAPI(
            URL_PREVISAO
        );

        const deslocamento = dados.city.timezone;

        // Data atual na localização da cidade
        const agoraLocal = new Date(
            Date.now() + deslocamento * 1000
        );

        const hoje = agoraLocal
            .toISOString()
            .slice(0, 10);

        // Agrupar previsões por dia
        const dias = new Map();

        dados.list.forEach(item => {

            const dataLocal = new Date(
                (item.dt + deslocamento) * 1000
            );

            const data = dataLocal
                .toISOString()
                .slice(0, 10);

            if (data <= hoje) return;

            if (!dias.has(data)) {
                dias.set(data, []);
            }

            dias.get(data).push(item);
        });

        const proximosDias = Array.from(
            dias.entries()
        ).slice(0, 3);

        previsaoContainer.replaceChildren();

        proximosDias.forEach(([data, registros]) => {

            // Selecionar o horário mais próximo de 12h
            const registro = registros.reduce(
                (melhor, atual) => {

                    const horaAtual = new Date(
                        (atual.dt + deslocamento) * 1000
                    ).getUTCHours();

                    const horaMelhor = new Date(
                        (melhor.dt + deslocamento) * 1000
                    ).getUTCHours();

                    return Math.abs(horaAtual - 12) <
                        Math.abs(horaMelhor - 12)
                        ? atual
                        : melhor;
                }
            );

            const dataFormatada = new Date(
                `${data}T12:00:00Z`
            ).toLocaleDateString("pt-BR", {
                weekday: "long",
                day: "2-digit",
                month: "2-digit",
                timeZone: "UTC"
            });

            const cartao = document.createElement("article");
            cartao.className = "cartao-previsao";

            const titulo = document.createElement("h4");
            titulo.textContent = dataFormatada;

            const temperaturaDia = document.createElement("p");
            temperaturaDia.className = "temperatura-previsao";
            temperaturaDia.textContent =
                formatarTemperatura(registro.main.temp);

            const descricao = document.createElement("p");
            descricao.textContent =
                registro.weather[0].description;

            cartao.append(
                titulo,
                temperaturaDia,
                descricao
            );

            previsaoContainer.appendChild(cartao);
        });

    } catch (erro) {

        console.error(
            "Erro ao carregar previsão:",
            erro
        );

        previsaoContainer.textContent =
            "Previsão indisponível no momento.";
    }
}

// Atualizar todas as informações
async function carregarDadosMeteorologicos() {

    await Promise.all([
        carregarClimaAtual(),
        carregarPrevisao()
    ]);
}

// Inicializar
if (API_KEY !== "SUA_CHAVE_AQUI") {

    carregarDadosMeteorologicos();

    // Atualizar a cada 15 minutos
    setInterval(
        carregarDadosMeteorologicos,
        900000
    );

} else {

    console.warn(
        "Configure sua chave da OpenWeatherMap."
    );

    if (temperatura) {
        temperatura.textContent =
            "Configure a chave da API";
    }

    if (previsaoContainer) {
        previsaoContainer.textContent =
            "Aguardando configuração da API.";
    }
}
