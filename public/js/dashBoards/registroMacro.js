function registroPizzaMaquina() {


        fetch(`/registro/registroPizzaMaquina`, { cache: "no-store" })
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (resposta) {
                        console.log("Dados recebidos: ", resposta);
                        resposta.reverse();
    
                        plotarGrafico(resposta);
                    });
                } else {
                    console.error("Nenhum dado encontrado ou erro na API");
                }
            })
            .catch(function (error) {
                console.error(
                    `Erro na obtenção dos dados p/ gráfico: ${error.message}`
                );
            });
    }
    function plotarGrafico(resposta) {
        console.log('iniciando plotagem do gráfico...');
    
        var dados = {
            labels: ['Verde', 'Amarelo', 'Vermelho'],
            datasets: [
                {
                    label: 'Quantidade de votos',
                    backgroundColor: '#32b9cd8f',
                    data: []
                },
            ]
        };
    
        for (i = 0; i < resposta.length; i++) {
            var registro = resposta[i];
            if (registro.tipo_alerta == "Verde") {
                dados.datasets[0].data.push(registro.tipo_alerta);
            } else if (registro.tipo_alerta == "Amarelo") {
                dados.datasets[0].data.push(registro.tipo_alerta);
            } else {
                dados.datasets[0].data.push(registro.tipo_alerta);
            }
        }
    
        console.log(JSON.stringify(dados));
    
        var ctx = document.getElementById("chart1").getContext('2d');
        window.grafico_linha = Chart.doughnut(ctx, {
            data: dados,
            options: {
                responsive: true,
                animation: { duration: 500 },
                hoverMode: 'index',
                stacked: false,
                title: {
                    display: false,
                    text: 'Dados capturados'
                },
                scales: {
                    yAxes: [{
                        type: 'linear',
                        display: true,
                        position: 'left',
                        id: 'y-temperatura',
                        ticks: {
                            beginAtZero: true,
                            max: 30,
                            min: 0
                        }
                    }, {
                        type: 'linear',
                        display: false,
                        position: 'right',
                        id: 'y-umidade',
                        ticks: {
                            beginAtZero: true,
                            max: 30,
                            min: 0
                        },
    
                        gridLines: {
                            drawOnChartArea: false,
                        },
                    }],
                }
            }
        });
}