import { fetchdata, fetchForecast } from "./services/api.js";

const lupa = document.querySelector(".lupa")
const inputCidade = document.querySelector("#input-cidade")

async function cliqueiNoBotao() {
    const cidade = inputCidade?.value;
    if (!cidade?.trim()) {
        return
    }
  
    const dados = await fetchdata(cidade)
    if (dados) {
        colocarDadosNaTela(dados);    // Mostra na tela
    }

    const previsao = await fetchForecast(cidade)
        if (previsao) {
            preencherCincoDias(previsao)
        }

}

function preencherCincoDias(dadosPrevisao) {
    const spanMin = document.querySelectorAll(".dia-min")
    const spanMax = document.querySelectorAll(".dia-max")

    for (let i = 0; i < 5; i++) {
        let tempMinDoDia = Infinity;
        let tempMaxDoDia = -Infinity;

        // O forecast tem dados a cada 3 horas, então 8 itens = 1 dia
        for (let j = 0; j < 8; j++) {
            const indice = i * 8 + j;
            if (indice < dadosPrevisao.list.length) {
                const previsaoDoIntervalo = dadosPrevisao.list[indice];
                if (previsaoDoIntervalo.main.temp_min < tempMinDoDia) {
                    tempMinDoDia = previsaoDoIntervalo.main.temp_min;
                }
                if (previsaoDoIntervalo.main.temp_max > tempMaxDoDia) {
                    tempMaxDoDia = previsaoDoIntervalo.main.temp_max;
                }
            }
        }

        spanMin[i].innerHTML = Math.floor(tempMinDoDia) + "°"
        spanMax[i].innerHTML = Math.floor(tempMaxDoDia) + "°"
    }
}

lupa.addEventListener("click",  cliqueiNoBotao)

inputCidade.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        cliqueiNoBotao();
    }
});

function colocarDadosNaTela(dados) { 
    document.querySelector(".caixa-previsao-cidade").style.display = "flex";
    // document.querySelector(".img-previsao").src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`;
    document.querySelector(".cidade").innerHTML = dados.name;
    document.querySelector(".temp").innerHTML = "Temperatura " + Math.floor(dados.main.temp) + "°C";
    document.querySelector(".descricao").innerHTML = dados.weather[0].description;
    document.querySelector(".temp_max").innerHTML = "Temperatura Maxima: " + Math.floor(dados.main.temp_max) + "°C";
    document.querySelector(".temp_min").innerHTML = "Temperatura Minima: " + Math.floor(dados.main.temp_min) + "°C";
    document.querySelector(".sensacao").innerHTML = Math.floor(dados.main.feels_like) + "°C";
    document.querySelector(".vento").innerHTML = Math.floor(dados.wind.speed) + "km/h";
    document.querySelector(".umidade").innerHTML = "Umidade: " + dados.main.humidity + "%";
}


async function atualizarCapitais() {
    const capitais = [
        { nome: "Rio de Janeiro", id: "rio"},
        { nome: "Sao Paulo", id: "sp"},
        { nome: "Belo Horizonte", id: "bh"},
        { nome: "Porto Alegre", id: "pa"},
        { nome: "Recife", id: "rc"},
        { nome: "Salvador", id: "sv"},
        { nome: "Curitiba", id: "ct"},
        { nome: "Fortaleza", id: "ft"},
        { nome: "Manaus", id: "mn"},
        { nome: "Joao Pessoa", id: "jp"}
    ]
    capitais.forEach(async (capital) => {   // "para cada" item da lista, execute o código abaixo.
                                            // chamamos o item da vez de "capital".

        try {                                    // "tente" executar os comandos abaixo.
            const dados = await fetchdata(capital.nome); // transforma a resposta bruta em um objeto que o JS entende.
            console.log(dados)

            document.getElementById(`${capital.id}-min`).innerHTML = Math.floor(dados.main.temp_min) + "°";
            document.getElementById(`${capital.id}-max`).innerHTML = Math.floor(dados.main.temp_max) + "°";
        } catch (erro)  {
            console.log("deu erro em buscar a capital:", capital.nome);
        }
    })
}

atualizarCapitais()

// parte feita com ajuda do claude 
function atualizarDias() {
    const nomesDias = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]

    // peguei a data de hoje do sistema
    const dataHoje = new Date()
    const diaAtual = dataHoje.getDay() // Ex: se hoje for quarta, isso vale 3
    const elementosDias = document.querySelectorAll(".dia-semana")

    elementosDias.forEach((paragrafo, index) => {
        // o 'index' começa em 0 (primeiro quadradinho)
        // somei 'index + 1' porque o primeiro quadradinho ja é o de "Amanhã"
        let indiceProximo = (diaAtual + index + 1) % 7

        // troquei o texto do HTML pelo nome que está na nossa lista
        paragrafo.innerHTML = nomesDias[indiceProximo]
    })
}

atualizarDias()

// clicar no x e fechar
// selecionei o x e a caixa de previsao
const botaoFechar = document.querySelector(".fechar")
const caixaPrevisao = document.querySelector(".caixa-previsao-cidade")

// criei a funcao que esconde a caixa quando clicar x
botaoFechar.addEventListener("click", () => {
    caixaPrevisao.style.display = "none" // quando coloca none, o quadrado sai da tela
    inputCidade.value = ""
})