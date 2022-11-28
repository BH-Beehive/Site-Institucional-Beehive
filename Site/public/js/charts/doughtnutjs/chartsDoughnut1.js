function registroPizzaMaquina() {
    const dataHj = new Date()
    const mesAtual = dataHj.getMonth() + 1
    const diaAtual = dataHj.getDate()
    let qtdVermelho = 0;
    let qtdAmarelo = 0;
    let qtdVerde = 0;
    let totalMaquina = 0;
    let idEmpresa = sessionStorage.ID_EMPRESA
    fetch(`/registro/registroPizzaMaquina?idEmpresa=${idEmpresa}&mes_atual=${mesAtual}&dia_atual=${diaAtual}`).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                for (let posicao = 0; posicao < resposta.length; posicao++) {
                    console.log(resposta[posicao].alerta)
                    if (resposta[posicao].qtd_vermelho > resposta[posicao].qtd_amarelo && resposta[posicao].qtd_vermelho > resposta[posicao].qtd_verde) {
                        qtdVermelho++
                    } else if (resposta[posicao].qtd_amarelo > resposta[posicao].qtd_vermelho && resposta[posicao].qtd_amarelo > resposta[posicao].qtd_verde) {
                        qtdAmarelo++
                    } else if(resposta[posicao].qtd_verde > resposta[posicao].qtd_vermelho && resposta[posicao].qtd_verde > resposta[posicao].qtd_amarelo) {
                        qtdVerde++
                    }
                    else{
                        limparGrafico()
                    }
                    totalMaquina++
                }
                let resultadoVermelho = (qtdVermelho / totalMaquina) * 100;
                let resultadoAmarelo = (qtdAmarelo / totalMaquina) * 100;
                let resultadoVerde = (qtdVerde / totalMaquina) * 100;
                atualizarMetricasMaquina.innerHTML = `<div class="metricasContent">
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
                    <canvas id="chart1"></canvas> 
                </div>

            </div>`
                criarGrafico(qtdVermelho, qtdAmarelo, qtdVerde, totalMaquina)
            });
        } else {
            console.log("Houve um erro ao tentar listar registros!");
            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    })
}

function registroPizzaMaquinaPorSetor() {
    const dataHj = new Date()
    const mesAtual = dataHj.getMonth() + 1
    const diaAtual = dataHj.getDate()
    let qtdVermelho = 0;
    let qtdAmarelo = 0;
    let qtdVerde = 0;
    let totalMaquina = 0;
    let idEmpresa = sessionStorage.ID_EMPRESA
    let select = document.getElementById('selectSetor');
    let selectNomeSetor = select.options[select.selectedIndex].value;
    let nomeSetor = parseInt(selectNomeSetor);
    fetch(`/registro/registroPizzaMaquinaPorSetor?idEmpresa=${idEmpresa}&nomeSetor=${nomeSetor}&mes_atual=${mesAtual}&dia_atual=${diaAtual}`).then(function (resposta) {
        limparGrafico()
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                for (let posicao = 0; posicao < resposta.length; posicao++) {
                    console.log(resposta[posicao].alerta)
                    if (resposta[posicao].qtd_vermelho > resposta[posicao].qtd_amarelo && resposta[posicao].qtd_vermelho > resposta[posicao].qtd_verde) {
                        qtdVermelho++
                    } else if (resposta[posicao].qtd_amarelo > resposta[posicao].qtd_vermelho && resposta[posicao].qtd_amarelo > resposta[posicao].qtd_verde) {
                        qtdAmarelo++
                    } else if(resposta[posicao].qtd_verde > resposta[posicao].qtd_vermelho && resposta[posicao].qtd_verde > resposta[posicao].qtd_amarelo) {
                        qtdVerde++
                    }
                    else{
                        limparGrafico()
                    }
                    totalMaquina++
                }
                let resultadoVermelho = (qtdVermelho / totalMaquina) * 100;
                let resultadoAmarelo = (qtdAmarelo / totalMaquina) * 100;
                let resultadoVerde = (qtdVerde / totalMaquina) * 100;
                atualizarMetricasMaquina.innerHTML = `<div class="metricasContent">
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
                    <canvas id="chart1"></canvas> 
                </div>

            </div>`
                criarGrafico(qtdVermelho, qtdAmarelo, qtdVerde)
            });
        } else {
            console.log("Houve um erro ao tentar listar maquinas!");
            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    })
}

function limparGrafico() {
    let qtdVermelho = 0;
    let qtdAmarelo = 0;
    let qtdVerde = 0;
    let totalMaquina = 0;

    atualizarMetricasMaquina.innerHTML = `<div class="metricasContent">
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
                    <canvas id="chart1"></canvas> 
                </div>

            </div>`
    criarGrafico(qtdVermelho, qtdAmarelo, qtdVerde)

}


function criarGrafico(qtdVermelho, qtdAmarelo, qtdVerde) {
    const data = {
        datasets: [{
            label: 'Máquinas',
            data: [qtdVerde, qtdVermelho, qtdAmarelo],
            backgroundColor: [
                '#00FF29',
                '#FF0F00',
                '#FF7A00'
            ],
            hoverOffset: 4
        }]
    };

    const config = {
        type: 'doughnut',
        data: data,
    };

    const myChart = new Chart(
        document.getElementById('chart1'),
        config
    );
}
