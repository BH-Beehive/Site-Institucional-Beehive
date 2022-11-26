function listarInformacoesMaquina() {
    let idEmpresa = sessionStorage.ID_EMPRESA
    let hostName = sessionStorage.NOME_MAQUINA
    fetch(`/maquina/listarInformacoesMaquina?idEmpresa=${idEmpresa}&hostName=${hostName}`).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                for (var posicao = 0; posicao < 1; posicao++) {
                    listaInformacoes.innerHTML = `
       
                                <h2>${hostName}</h2>
                                <div class="infosMaquina">
                                    <div class="itemInfoMaquina">
                                        <h4>Processador</h4>
                                        <p>${resposta[posicao].processador}</p>
                                    </div>

                                    <div class="itemInfoMaquina">
                                        <h4>Arquitetura</h4>
                                        <p>${resposta[posicao].arquitetura}</p>
                                    </div>
                                    <div class="itemInfoMaquina">
                                        <h4>Sistema Operacional</h4>
                                        <p>${resposta[posicao].sistema_operacional}</p>
                                    </div>
                                </div>

                                <div class="activeTime">
                                    <h4>Disco total</h4>
                                    <p>${resposta[posicao].disco_total} Gb</p>
                                </div>


                        `
                }

            });
        } else {
            console.log("Houve um erro ao tentar listar maquinas!");
            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    })
}

const dataHj = new Date()
const mesAtual = dataHj.getMonth() + 1
let dataFiltrada = document.getElementById("dateFiltro").value
function filtrarData() {
    
    
    mesAtual = dataFiltrada.substring(0,2)
    alert(mesAtual)
}
function listarDadosMaquina() {
    dataFiltrada = document.getElementById("dateFiltro").value = dataHj.getFullYear() + '-' + ('0' + (dataHj.getMonth() + 1)).slice(-2) + '-' + ('0' + dataHj.getDate()).slice(-2);
    let hostName = sessionStorage.NOME_MAQUINA
    
    
    let menuHistorico = document.getElementById("dadosComponentesMenu")
    //h3NomeMaquina.innerHTML = `<h3>${hostName}</h3>`
    fetch(`/registro/historicoMensal?mes_atual=${mesAtual}&host_name=${hostName}`).then(function (resposta) {

        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                console.log("historicoMensal-----------------------------------" + resposta)
                for (var i = 0; i <= 30; i++) {
                    if (resposta[i].qdt_vermelho > resposta[i].qdt_amarelo) {

                        menuHistorico.innerHTML += `
                    <div class="dadosMenu">
                    <h3>${resposta[i].data_registro}</h3>
                    <h3>${resposta[i].qdt_vermelho}</h3>
                    <h3>VERMELHO</h3>               
                  </div>
                  `
                    }
                    else if (resposta[i].qdt_amarelo > resposta[i].qdt_vermelho) {
                        menuHistorico.innerHTML += `
                    <div class="dadosMenu">
                    <h3>${resposta[i].data_registro}</h3>
                    <h3>${resposta[i].qdt_amarelo}</h3>
                    <h3>AMARELO</h3>               
                  </div>
                  `
                    }
                    else {
                        menuHistorico.innerHTML += `
                    <div class="dadosMenu">
                    <h3>${resposta[i].data_registro}</h3>
                    <h3>${resposta[i].qdt_verde}</h3>
                    <h3>VERDE</h3>               
                  </div>
                  `
                    }

                }
            });
        } else {
            console.log("Houve um erro ao tentar listar maquinas!");
            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    })
}



//  ------------------------------ DASHBOARD MICRO CHARTS ------------------------------------------



let hostName = sessionStorage.NOME_MAQUINA;

let dadosDiscoTotal = 0
let dadosDiscoUsado = 0
var proximaAtualizacao;

function iniciarGrafico() {


    const horaRegistro = []
    const dados = []
    const data = {
        labels: horaRegistro,
        datasets: [{
            label: "CPU",
            backgroundColor: '#28AEF3',
            borderColor: '#28AEF3',
            data: dados,
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {}
    };

    const chart = new Chart(
        document.getElementById('myChart'),
        config
    );




    const data2 = {
        labels: ["%Disco usado", "%Disco disponível"],
        datasets: [{
            label: 'DISCO',
            data: [0, 0],
            backgroundColor: [
                'red',
                'limegreen'

            ],
            hoverOffset: 4,
            options: {

            }
        }]
    };

    const config2 = {
        type: 'pie',
        data: data2,
        options: {
            scales: {
            },
            plugins: {
                tooltip: {
                    enabled: false
                },
                datalabels: {
                    formatter: (value, context) => { return `${value}%` },
                    color: ["white"],
                    font: {
                        size: 34
                    }
                }
            }

        },
        plugins: [ChartDataLabels]
    };

    const chart2 = new Chart(
        document.getElementById('myChartDisco'),
        config2
    );

    const horaRegistro3 = []
    const dadosRAM = []
    const data3 = {
        labels: horaRegistro3,
        datasets: [{
            label: "RAM",
            backgroundColor: 'red',
            borderColor: 'red',
            data: dadosRAM,
        }]
    };

    const config3 = {
        type: 'line',
        data: data3,
        options: {}
    };

    const chart3 = new Chart(
        document.getElementById('myChartRAM'),
        config3
    );

    setTimeout(() => atualizarGraficoCPU(chart), 3000);
    setTimeout(() => atualizarGraficoDisco(chart2), 3000);
    setTimeout(() => atualizarGraficoRAM(chart3), 3000);
}






let contador = []
let contadorCriticoCpu = 0
let contadorAlertaCpu = 0
let contadorNormalCpu = 0
let cssCPU = document.getElementById("chartCPU")
let cssDisco = document.getElementById("chartDisco")

function atualizarGraficoCPU(chartCPU) {
    fetch(`registro/registroGraficoLinhaTempo/${hostName}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    }).then(function (resposta) {
        resposta.json().then(function (resultado) {


            if (resultado[0].cpu_uso < 10) {

                contadorNormalCpu++
                if (contadorNormalCpu > contadorAlertaCpu && contadorNormalCpu > contadorCriticoCpu) {
                    cssCPU.style.animation = `luzNormal 2s infinite`
                }
            }
            else if (resultado[0].cpu_uso < 40) {
                contadorAlertaCpu++

                if (contadorAlertaCpu > contadorNormalCpu && contadorAlertaCpu > contadorCriticoCpu) {

                    cssCPU.style.animation = `luzAlerta 2s infinite`
                }
            }
            else {
                contadorCriticoCpu++

                if (contadorCriticoCpu > contadorAlertaCpu && contadorCriticoCpu > contadorNormalCpu) {

                    cssCPU.style.animation = `luzCritica 2s infinite`
                }
            }

            console.log('resultado', resultado)
            contador.push(1)
            const horaRegistro = resultado.map(dataRegistrada => dataRegistrada.data_registro);
            const dadosCPU = resultado.map(dadoCPU => dadoCPU.cpu_uso);
            console.log(horaRegistro)
            console.log(dadosCPU)
            if (contador.length >= 10) {

                chartCPU.data.datasets[0].data.shift();
                chartCPU.data.labels.shift()
            }
            chartCPU.data.labels.push(horaRegistro);
            chartCPU.data.datasets[0].data.push(resultado[0].cpu_uso);

            chartCPU.update();
            proximaAtualizacao = setTimeout(() => atualizarGraficoCPU(chartCPU), 3000);

            if (resposta.ok) {
                console.log("resposta: ", resposta.json());

            } else {
                throw ("Houve um erro ao tentar realizar a busca por data!");
            }

        }).catch(function (res) {
            console.log("#ERRO: "`${res}`);
        });
    })


}




function atualizarGraficoDisco(chartDisco) {
    fetch(`registro/registroGraficoLinhaTempo/${hostName}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    }).then(function (resposta) {
        resposta.json().then(function (resultado) {

            console.log('resultado', resultado)


            const horaRegistro = resultado.map(dataRegistrada => dataRegistrada.data_registro);
            const dadosDisco = resultado.map(dadoDisco => dadoDisco.disco_uso);
            dadosDiscoTotal = resultado[0].disco_total
            dadosDiscoUsado = resultado[0].disco_uso
            if ((100 - dadosDiscoUsado) < 10) {
                document.getElementById("chartDisco").style = "animation:luzCritica 2s infinite "
            }
            else if ((100 - dadosDiscoUsado) < 35) {
                document.getElementById("chartDisco").style = "animation:luzAlerta 2s infinite "
            }
            else {
                document.getElementById("chartDisco").style = "animation:luzNormal 2s infinite "
            }
            console.log("XXXXXXX" + dadosDiscoTotal)
            console.log("XXXXXXX" + dadosDiscoUsado)
            console.log(horaRegistro);
            console.log(dadosDisco);

            chartDisco.data.datasets[0].data = [dadosDiscoUsado, 100 - dadosDiscoUsado];
            chartDisco.update();
            proximaAtualizacao = setTimeout(() => atualizarGraficoDisco(chartDisco), 3000);

            if (resposta.ok) {
                console.log("resposta: ", resposta.json());



            } else {
                throw ("Houve um erro ao tentar realizar a busca por data!");
            }

        }).catch(function (res) {
            console.log("#ERRO: "`${res}`);
        });
    })


}






let contadorCriticoRam = 0
let contadorAlertaRam = 0
let contadorNormalRam = 0

let contador3 = []
function atualizarGraficoRAM(chartRAM) {
    fetch(`registro/registroGraficoLinhaTempo/${hostName}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    }).then(function (resposta) {
        resposta.json().then(function (resultado) {
            console.log("VERDE::" + contadorNormalRam)
            console.log("AMARELO::" + contadorAlertaRam)
            console.log("VERMELHO::" + contadorCriticoRam)
            let porcentagemRAM = (100 * resultado[0].memoria_uso) / resultado[0].memoria_total
            if (porcentagemRAM >= 90) {
                contadorCriticoRam++

                if (contadorCriticoRam > contadorAlertaRam && contadorCriticoRam > contadorNormalRam) {
                    document.getElementById("chartRam").style = "animation:luzCritica 2s infinite "
                }
            }
            else if (porcentagemRAM >= 75) {
                contadorAlertaRam++

                if (contadorAlertaRam > contadorNormalRam && contadorAlertaRam > contadorCriticoRam) {

                    document.getElementById("chartRam").style = "animation:luzAlerta 2s infinite "
                }
            }
            else {

                contadorNormalRam++
                if (contadorNormalRam > contadorAlertaRam && contadorNormalRam > contadorCriticoRam) {
                    document.getElementById("chartRam").style = "animation:luzNormal 2s infinite "

                }
            }



            console.log('resultado', resultado)
            contador3.push(1)
            const horaRegistro = resultado.map(dataRegistrada => dataRegistrada.data_registro);
            const dadosRAM = resultado.map(dadoRAM => dadoRAM.memoria_uso);
            console.log(horaRegistro)
            console.log(dadosRAM)
            if (contador3.length >= 10) {

                chartRAM.data.datasets[0].data.shift();
                chartRAM.data.labels.shift()
            }

            chartRAM.data.labels.push(horaRegistro);
            chartRAM.data.datasets[0].data.push(resultado[0].memoria_uso);
            chartRAM.update();

            proximaAtualizacao = setTimeout(() => atualizarGraficoRAM(chartRAM), 3000);

            if (resposta.ok) {
                console.log("resposta: ", resposta.json());



            } else {
                throw ("Houve um erro ao tentar realizar a busca por data!");
            }

        }).catch(function (res) {
            console.log("#ERRO: "`${res}`);
        });
    })


}

