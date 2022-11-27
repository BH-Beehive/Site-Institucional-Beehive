window.onload = obterDadosGrafico()
// window.onload = obterDadosGrafico2()

function obterDadosGrafico() {


    fetch(`/maquina/listarDadosMaquina`, { cache: "no-store" })
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
        labels: ['00:01', '00:02', '00:03', '00:04', '00:05', '00:06', '00:07', '00:08', '00:09'],
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
            dados.datasets[0].data.push(registro.memoria_uso);
        }
        // dados.labels.data.push(registro.nome);
    }

    console.log(JSON.stringify(dados));

    var ctx = document.getElementById("myChart").getContext('2d');
    window.grafico_linha = Chart.Linear(ctx, {
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