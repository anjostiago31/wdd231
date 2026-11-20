
/* ==========================================
   CÂMARA DE COMÉRCIO DE GARÇA
   Arquivo: clima.js
   Autor: Tiago dos Anjos
   Descrição: Clima atual e previsão para Garça - SP
   API: OpenWeatherMap
========================================== */

"use strict";

// ==========================================
// 1. ELEMENTOS DO HTML
// ==========================================

const temperaturaElemento =
    document.querySelector("#temperatura");

const descricaoElemento =
    document.querySelector("#condicao");

const umidadeElemento =
    document.querySelector("#umidade");

const ventoElemento =
    document.querySelector("#vento");

const atualizacaoElemento =
    document.querySelector("#atualizacao");

const previsaoElemento =
    document.querySelector("#previsao");

// ==========================================
// 2. CONFIGURAÇÃO DA API
// ==========================================

// Insira sua chave da OpenWeatherMap
const API_KEY = "f154f5b18b77de8774f4d97bf47b1f8d";

// Coordenadas aproximadas de Garça - SP
const LATITUDE = -22.21;
const LONGITUDE = -49.65;

const URL_CLIMA =
    "https://api.openweathermap.org/data/2.5/weather";

const URL_PREVISAO =
    "https://api.openweathermap.org/data/2.5/forecast";

// ==========================================
// 3. CONSULTAR API
// ==========================================

async function consultarAPI(endereco) {

    const url = new URL(endereco);

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
            `Erro na OpenWeatherMap: ${resposta.status}`
        );
    }

    return await resposta.json();
}

// ==========================================
// 4. FORMATAR DATA
// ==========================================

function formatarData(data) {

    const [ano, mes, dia] =
        data.split("-").map(Number);

    const dataFormatada =
        new Date(Date.UTC(ano, mes - 1, dia, 12));

    return dataFormatada.toLocaleDateString(
        "pt-BR",
        {
            weekday: "long",
            day: "2-digit",
            month: "2-digit",
            timeZone: "UTC"
        }
    );
}

// ==========================================
// 5. EXIBIR CLIMA ATUAL
// ==========================================

function exibirClimaAtual(dados) {

    temperaturaElemento.textContent =
        `${Math.round(dados.main.temp)}°C`;

    descricaoElemento.textContent =
        dados.weather[0].description;

    if (umidadeElemento) {
        umidadeElemento.textContent =
            `${dados.main.humidity}%`;
    }

    if (ventoElemento) {
        const velocidade =
            dados.wind.speed * 3.6;

        ventoElemento.textContent =
            `${velocidade.toFixed(1)} km/h`;
    }

    if (atualizacaoElemento) {

        const horarioLocal = new Date(
            (dados.dt + dados.timezone) * 1000
        );

        const horario = horarioLocal
            .toISOString()
            .slice(11, 16);

        atualizacaoElemento.textContent =
            `Dados referentes às ${horario}`;
    }
}

// ==========================================
// 6. EXIBIR PREVISÃO DOS PRÓXIMOS 3 DIAS
// ==========================================

function exibirPrevisao(dados) {

    const deslocamento = dados.city.timezone;

    const agoraLocal = new Date(
        Date.now() + deslocamento * 1000
    );

    const hoje = agoraLocal
        .toISOString()
        .slice(0, 10);

    // Agrupar previsões por data local
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

    previsaoElemento.replaceChildren();

    const proximosDias =
        Array.from(dias.entries()).slice(0, 3);

    proximosDias.forEach(([data, registros]) => {

        // Máximas e mínimas entre os horários
        // disponibilizados para cada dia
        const maxima = Math.max(
            ...registros.map(item => item.main.temp_max)
        );

        const minima = Math.min(
            ...registros.map(item => item.main.temp_min)
        );

        // Condição prevista mais próxima do meio-dia
        const registro = registros.reduce(
            (melhor, atual) => {

                function distanciaMeioDia(item) {

                    const hora = new Date(
                        (item.dt + deslocamento) * 1000
                    ).getUTCHours();

                    return Math.abs(hora - 12);
                }

                return distanciaMeioDia(atual) <
                    distanciaMeioDia(melhor)
                    ? atual
                    : melhor;
            }
        );

        // Criar cartão
        const cartao =
            document.createElement("div");

        cartao.classList.add(
            "dia-previsao",
            "cartao-previsao"
        );

        const informacoesDia =
            document.createElement("div");

        const tituloDia =
            document.createElement("h4");

        tituloDia.textContent =
            formatarData(data);

        const descricaoDia =
            document.createElement("p");

        descricaoDia.textContent =
            registro.weather[0].description;

        informacoesDia.append(
            tituloDia,
            descricaoDia
        );

        // Temperaturas
        const temperaturas =
            document.createElement("div");

        temperaturas.classList.add(
            "temperaturas-dia"
        );

        const maximaElemento =
            document.createElement("p");

        maximaElemento.textContent =
            `Máx: ${Math.round(maxima)}°C`;

        const minimaElemento =
            document.createElement("p");

        minimaElemento.textContent =
            `Mín: ${Math.round(minima)}°C`;

        temperaturas.append(
            maximaElemento,
            minimaElemento
        );

        cartao.append(
            informacoesDia,
            temperaturas
        );

        previsaoElemento.appendChild(cartao);
    });
}

// ==========================================
// 7. CARREGAR CLIMA E PREVISÃO
// ==========================================

async function carregarClima() {

    try {

        const [climaAtual, previsao] =
            await Promise.all([
                consultarAPI(URL_CLIMA),
                consultarAPI(URL_PREVISAO)
            ]);

        exibirClimaAtual(climaAtual);
        exibirPrevisao(previsao);

    } catch (erro) {

        console.error(
            "Erro na previsão do tempo:",
            erro
        );

        temperaturaElemento.textContent =
            "Temperatura indisponível";

        descricaoElemento.textContent =
            "Não foi possível carregar o clima.";

        previsaoElemento.textContent =
            "Previsão indisponível no momento.";
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

    if (API_KEY === "SUA_CHAVE_AQUI") {

        temperaturaElemento.textContent =
            "Configure a chave da API";

        previsaoElemento.textContent =
            "Aguardando configuração.";

    } else {

        carregarClima();

        // Atualização automática a cada 15 minutos
        setInterval(carregarClima, 900000);
    }
}
