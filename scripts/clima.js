const temperatura = document.querySelector("#temperatura");
const condicao = document.querySelector("#condicao");
const umidade = document.querySelector("#umidade");
const vento = document.querySelector("#vento");
const atualizacao = document.querySelector("#atualizacao");

// Coordenadas aproximadas de Garça - SP
const latitude = -22.21;
const longitude = -49.66;

// API Open-Meteo
const url = new URL("https://api.open-meteo.com/v1/forecast");

url.search = new URLSearchParams({
    latitude,
    longitude,
    current: [
        "temperature_2m",
        "relative_humidity_2m",
        "weather_code",
        "wind_speed_10m"
    ].join(","),
    timezone: "America/Sao_Paulo"
});

function descricaoClima(codigo) {

    if (codigo === 0) return "☀️ Céu limpo";
    if (codigo <= 3) return "⛅ Parcialmente nublado";
    if (codigo <= 48) return "🌫️ Neblina";
    if (codigo <= 67) return "🌧️ Chuva";
    if (codigo <= 77) return "❄️ Neve";
    if (codigo <= 82) return "🌦️ Pancadas de chuva";
    if (codigo <= 86) return "🌨️ Neve";
    if (codigo <= 99) return "⛈️ Tempestade";

    return "Condição não disponível";
}

async function carregarClima() {

    try {

        const resposta = await fetch(url);

        if (!resposta.ok) {
            throw new Error("Erro ao consultar o clima");
        }

        const dados = await resposta.json();
        const clima = dados.current;

        temperatura.textContent =
            `${clima.temperature_2m.toFixed(1)}°C`;

        condicao.textContent =
            descricaoClima(clima.weather_code);

        umidade.textContent =
            `${clima.relative_humidity_2m}%`;

        vento.textContent =
            `${clima.wind_speed_10m} km/h`;

        const horario = clima.time.split("T")[1];

        atualizacao.textContent =
            `Dados referentes às ${horario}`;

    } catch (erro) {

        temperatura.textContent =
            "Clima indisponível";

        condicao.textContent =
            "Não foi possível consultar os dados.";

        console.error("Erro:", erro);
    }
}

// Carregar ao abrir a página
carregarClima();

// Atualizar a cada 15 minutos
setInterval(carregarClima, 900000);