function registroPizzaServidor() {
    const dataHj = new Date()
    const mesAtual = dataHj.getMonth() + 1
    const diaAtual = dataHj.getDate()
    let qtdVermelho1 = 0;
    let qtdAmarelo1 = 0;
    let qtdVerde1 = 0;
    let totalMaquina1 = 0;
    let idEmpresa = sessionStorage.ID_EMPRESA
    fetch(`/registro/registroPizzaServidor?idEmpresa=${idEmpresa}&mes_atual=${mesAtual}&dia_atual=${diaAtual}`).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                for (let posicao = 0; posicao < resposta.length; posicao++) {
                    console.log(resposta[posicao].alerta)
                    if (resposta[posicao].alerta == 'vermelho') {
                        qtdVermelho1++
                    } else if (resposta[posicao].alerta == 'amarelo') {
                        qtdAmarelo1++
                    } else {
                        qtdVerde1++
                    }
                    totalMaquina1++
                }
                let resultadoVermelho = (qtdVermelho1 / totalMaquina1) * 100;
                let resultadoAmarelo = (qtdAmarelo1 / totalMaquina1) * 100;
                let resultadoVerde = (qtdVerde1 / totalMaquina1) * 100;
                atualizarMetricasServidor.innerHTML = `<div class="metricasContent">
                <div class="metricas">
                    <div class="itemMetrica">
                        <div class="divcorAlerta divVerde"></div>
                        <p><span>${resultadoVerde.toFixed(0)}%</span> Normal</p>
                    </div>

                    <div class="itemMetrica">
                        <div class="divcorAlerta divAmarela"></div>
                        <p><span>${resultadoAmarelo.toFixed(0)}%</span> Alerta</p>
                    </div>

                    <div class="itemMetrica">
                        <div class="divcorAlerta divVermelha"></div>
                        <p><span>${resultadoVermelho.toFixed(0)}%</span> Crítico</p>
                    </div>
                </div>
                <div class="chart">
                    <canvas id="chart2"></canvas> 
                </div>

            </div>`
                criarGrafico2(qtdVermelho1, qtdAmarelo1, qtdVerde1, totalMaquina1)
            });
        } else {
            console.log("Houve um erro ao tentar listar registros!");
            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    })
}

function registroPizzaServidorPorSetor() {
    let qtdVermelho1 = 0;
    let qtdAmarelo1 = 0;
    let qtdVerde1 = 0;
    let totalMaquina1 = 0;
    let idEmpresa = sessionStorage.ID_EMPRESA
    let select = document.getElementById('selectSetor');
    let selectNomeSetor = select.options[select.selectedIndex].value;
    let nomeSetor = parseInt(selectNomeSetor);
    fetch(`/registro/registroPizzaServidorPorSetor?idEmpresa=${idEmpresa}&nomeSetor=${nomeSetor + 1}&mes_atual=${mesAtual}&dia_atual=${diaAtual}`).then(function (resposta) {
        limparGrafico1()
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                for (let posicao = 0; posicao < resposta.length; posicao++) {
                    if (resposta[posicao].alerta == 'vermelho') {
                        qtdVermelho++
                    } else if (resposta[posicao].alerta == 'amarelo') {
                        qtdAmarelo++
                    }else{
                        qtdVerde++
                    }
                    totalMaquina1++
                }
                let resultadoVermelho = (qtdVermelho1 / totalMaquina1) * 100;
                let resultadoAmarelo = (qtdAmarelo1 / totalMaquina1) * 100;
                let resultadoVerde = (qtdVerde1 / totalMaquina1) * 100;
                atualizarMetricasServidor.innerHTML = `<div class="metricasContent">
                <div class="metricas">
                    <div class="itemMetrica">
                        <div class="divcorAlerta divVerde"></div>
                        <p><span>${resultadoVerde.toFixed(0)}%</span> Normal</p>
                    </div>

                    <div class="itemMetrica">
                        <div class="divcorAlerta divAmarela"></div>
                        <p><span>${resultadoAmarelo.toFixed(0)}%</span> Alerta</p>
                    </div>

                    <div class="itemMetrica">
                        <div class="divcorAlerta divVermelha"></div>
                        <p><span>${resultadoVermelho.toFixed(0)}%</span> Crítico</p>
                    </div>
                </div>
                <div class="chart">
                    <canvas id="chart2"></canvas> 
                </div>

            </div>`
                criarGrafico2(qtdVermelho1, qtdAmarelo1, qtdVerde1, totalMaquina1)
            });
        } else {
            console.log("Houve um erro ao tentar listar maquinas!");
            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    })
}

function limparGrafico1() {
    let qtdVermelho1 = 0;
    let qtdAmarelo1 = 0;
    let qtdVerde1 = 0;
    let totalMaquina1 = 0;
    atualizarMetricasServidor.innerHTML = `<div class="metricasContent">
                <div class="metricas">
                    <div class="itemMetrica">
                        <div class="divcorAlerta divVerde"></div>
                        <p><span>0%</span>Normal</p>
                    </div>

                    <div class="itemMetrica">
                        <div class="divcorAlerta divAmarela"></div>
                        <p><span>0%</span>Alerta</p>
                    </div>

                    <div class="itemMetrica">
                        <div class="divcorAlerta divVermelha"></div>
                        <p><span>0%</span>Crítico</p>
                    </div>
                </div>
                <div class="chart">
                    <canvas id="chart2"></canvas> 
                </div>

            </div>`
    criarGrafico2(qtdVermelho1, qtdAmarelo1, qtdVerde1, totalMaquina1)
}

function criarGrafico2(qtdVermelho1, qtdAmarelo1, qtdVerde1) {
    const data1 = {
        datasets: [{
            label: 'Máquinas',
            data: [qtdVerde1, qtdVermelho1, qtdAmarelo1],
            backgroundColor: [
                '#00FF29',
                '#FF0F00',
                '#FF7A00'
            ],
            hoverOffset: 4
        }]
    };

    const config1 = {
        type: 'doughnut',
        data: data1,
    };

    const myChart1 = new Chart(
        document.getElementById('chart2'),
        config1
    );
}

