import {key} from "../utils/constantes.js";

export async function fetchdata(name) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&appid=${key}&lang=pt_br`

    try {                                       // "tente" executar os comandos abaixo.
            const resposta = await fetch(url)  // faz a chamada à API e o 'await' manda o JS esperar a resposta.
            console.log(resposta?.body)
            const dados = await resposta.json() // transforma a resposta bruta em um objeto que o JS entende.
            console.log(dados)

            return dados
        } catch (erro)  {
            console.error("deu erro em buscar a capital:", capital.nome)
        }
}

export async function fetchForecast(name) {

    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${name}&units=metric&appid=${key}&lang=pt_br`;
    
    try {

        const resposta = await fetch(url)
        const dados = await resposta.json()
        return dados

    } catch (erro) {
        console.error("deu erro em buscar a previsão:", erro);
    }
}