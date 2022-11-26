let listaIdMaquina = [];
let nomeMaquina = ""
const dataHj = new Date()
const mesAtual = dataHj.getMonth() + 1
const diaAtual = "26"
let proximoSetor = 0;

function cadastrarMaquina() {

    let select = document.getElementById('selectSetores');
    nomeSetor = select.options[select.selectedIndex].value;

    fetch(`/maquina/contarSetores?nomeSetor=${nomeSetor}`).then(function (resposta) {
        if (resposta.ok) {

            resposta.json().then(function (resposta) {
                for (var i = 0; i < resposta.length; i++) {
                    console.log(proximoSetor)

                    let hostNameVar = inputHostName.value;
                    let tokenVar = gerarToken();
                    let tipoVar = selectTipo.value;
                    let idEmpresaVar = sessionStorage.ID_EMPRESA;
                    let fkSetor = resposta[i].id_setor;

                    console.log(hostNameVar, tokenVar, tipoVar, idEmpresaVar, fkSetor)



                    fetch("/maquina/cadastrarMaquina", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            hostNameServer: hostNameVar,
                            tokenServer: tokenVar,
                            tipoServer: tipoVar,
                            empresaServer: idEmpresaVar,
                            setorServer: fkSetor
                        })
                    }).then(function (resposta) {

                        console.log("resposta: ", resposta);

                        if (resposta.ok) {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Cadastro bem-sucedido!',
                                showConfirmButton: false,
                                timer: 1500
                            })

                            setTimeout(() => {
                                window.location = "PrimaryDashboard.html";
                            }, "2000")

                            limparFormulario();
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Erro no cadastro!',
                                text: 'Por favor, verfique as informações e tente novamente!'
                            })
                        }
                    }).catch(function (resposta) {
                        console.log(`#ERRO: ${resposta}`);
                    });

                }
            })
        }


    });
}

function gerarToken() {
    var pass = '';
    var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
        'abcdefghijklmnopqrstuvwxyz0123456789';

    for (i = 1; i <= 10; i++) {
        var char = Math.floor(Math.random()
            * str.length + 1);

        pass += str.charAt(char)
    }

    return pass;
}

function editarMaquina() {

    let hostNameNovo = inputHostNameEditarMaquina.value;
    let tipo = selectTipoEditarMaquina.value;
    let fkSetor = selectSetoresEditarMaquina.value;
    let idEmpresa = sessionStorage.ID_EMPRESA;

    console.log(hostNameNovo, tipo, fkSetor, idEmpresa)

    fetch("/maquina/editarmaquina", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            hostNameNovoServer: hostNameNovo,
            tipoServer: tipo,
            fkSetorServer: fkSetor,
            idEmpresaServer: idEmpresa,
            hostNameAntigoServer: nomeMaquina,
        })
    }).then(function (resposta) {
        console.log("resposta: ", resposta);
        if (resposta.ok) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Maquina editada com sucesso!',
                showConfirmButton: false,
                timer: 1500
            })

            setTimeout(() => {
                window.location = "PrimaryDashboard.html";
            }, "2000")

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Erro no cadastro!',
                text: 'Por favor, verfique as informações e tente novamente!'
            })
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}

function statusSetor() {
    let qtdVermelho = 0;
    let qtdAmarelo = 0;
    let qtdVerde = 0;
    let idEmpresa = sessionStorage.ID_EMPRESA

    fetch(`/setor/statusSetor?id_empresa=${idEmpresa}&mes_atual=${mesAtual}&dia_atual=${diaAtual}`).then(function (resposta) {

        if (resposta.ok) {

            resposta.json().then(function (resposta) {

                for (var i = 0; i < resposta.length; i++) {
                    if (resposta[i].qdt_vermelho > resposta[i].qdt_amarelo) {
                        qtdVermelho++;

                    } else if (resposta[i].qdt_amarelo > resposta[i].qdt_vermelho) {
                        qtdAmarelo++;
                    } else {
                        qtdVerde++;
                    }


                }

                setorNivel.innerHTML = `<div class="backgroundKPIS">
                <div class="itemKPI normal"  onclick="gerarGraficosNormais()">
                    <p>Setores normais</p>
                    <h2>${qtdVerde}</h2>
                </div>
                <div class="itemKPI alerta"  onclick="gerarGraficosAlerta()">
                    <p>Setores em alerta</p>
                    <h2>${qtdAmarelo}</h2>
                </div>
                <div class="itemKPI critico"  onclick="gerarGraficosCritico()">
                    <p>Setores críticos</p>
                    <h2>${qtdVermelho}</h2>
                </div>
            </div>
            `


            });
        } else {
            console.log("Houve um erro ao tentar listar registros!");
            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    })
}

function gerarGraficosNormais() {

    if (Chart.getChart("setorChart")) {
        Chart.getChart("setorChart").destroy()

    }


    nomeSetor.innerHTML = '<h3>Setores Normais</h3>'
    let qtdVerde = [];
    let qtdAmarelo = [];
    let qtdVermelho = [];
    let idEmpresa = sessionStorage.ID_EMPRESA

    const setoresNormais = []

    fetch(`/setor/statusSetor?id_empresa=${idEmpresa}&mes_atual=${mesAtual}&dia_atual=${diaAtual}`).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                for (var i = 0; i < resposta.length; i++) {
                    if (resposta[i].qdt_verde > resposta[i].qdt_amarelo && resposta[i].qdt_verde > resposta[i].qdt_vermelho) {
                        setoresNormais.push(resposta[i].setor)

                        qtdAmarelo.push(resposta[i].qdt_amarelo)
                        qtdVermelho.push(resposta[i].qdt_vermelho)
                        qtdVerde.push(resposta[i].qdt_verde)


                    }
                }


                const data3 = {
                    labels: setoresNormais,

                };

                const config4 = {
                    type: 'bar',
                    data: data3,
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                            }
                        },
                        responsive: true
                    },
                };

                const myChart3 = new Chart(
                    document.getElementById('setorChart'),
                    config4
                );

            });
        } else {
            console.log("Houve um erro ao tentar listar registros!");
            resposta.text().then(texto => {
                console.error(texto);
            });
        }
        let verde = {
            label: "Normal",
            backgroundColor: 'Green',
            borderColor: 'Green',
            borderWidth: 1,
            minBarLength: 2,
            maxBarLength: 4,
            data: qtdVerde,

        }

        let amarelo = {
            label: "Alerta",
            backgroundColor: 'yellow',
            borderColor: 'yellow',
            borderWidth: 1,
            minBarLength: 2,
            maxBarLength: 4,
            data: qtdAmarelo,
        }

        let vermelho = {
            label: "Critico",
            backgroundColor: 'red',
            borderColor: 'red',
            borderWidth: 1,
            minBarLength: 2,
            maxBarLength: 4,
            data: qtdVermelho,
        }
        myChart3.data.datasets.push(verde, amarelo, vermelho)
        myChart3.update();


    })



}

function gerarGraficosAlerta() {
    if (Chart.getChart("setorChart")) {
        Chart.getChart("setorChart").destroy()


    }

    nomeSetor.innerHTML = '<h3>Setores em Alerta</h3>'
    let qtdVerde = [];
    let qtdAmarelo = [];
    let qtdVermelho = [];
    let idEmpresa = sessionStorage.ID_EMPRESA

    const setoresAlerta = []

    fetch(`/setor/statusSetor?id_empresa=${idEmpresa}&mes_atual=${mesAtual}&dia_atual=${diaAtual}`).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                for (var i = 0; i < resposta.length; i++) {
                    if (resposta[i].qdt_amarelo > resposta[i].qdt_vermelho && resposta[i].qdt_amarelo > resposta[i].qdt_verde) {

                        setoresAlerta.push(resposta[i].setor)
                        qtdAmarelo.push(resposta[i].qdt_amarelo)
                        qtdVermelho.push(resposta[i].qdt_vermelho)
                        qtdVerde.push(resposta[i].qdt_verde)
                    }

                }




                const data3 = {
                    labels: setoresAlerta,

                };

                const config4 = {
                    type: 'bar',
                    data: data3,
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                            }
                        },
                        responsive: true
                    },
                };

                const myChart3 = new Chart(
                    document.getElementById('setorChart'),
                    config4
                );

                let verde = {
                    label: "Normal",
                    backgroundColor: 'Green',
                    borderColor: 'Green',
                    borderWidth: 1,
                    minBarLength: 2,
                    maxBarLength: 4,
                    data: qtdVerde,

                }

                let amarelo = {
                    label: "Alerta",
                    backgroundColor: 'yellow',
                    borderColor: 'yellow',
                    borderWidth: 1,
                    minBarLength: 2,
                    maxBarLength: 4,
                    data: qtdAmarelo,
                }

                let vermelho = {
                    label: "Critico",
                    backgroundColor: 'red',
                    borderColor: 'red',
                    borderWidth: 1,
                    minBarLength: 2,
                    maxBarLength: 4,
                    data: qtdVermelho,
                }
                myChart3.data.datasets.push(verde, amarelo, vermelho)
                myChart3.update();



            });
        } else {
            console.log("Houve um erro ao tentar listar registros!");
            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    })


}


function gerarGraficosCritico() {
    if (Chart.getChart("setorChart")) {
        Chart.getChart("setorChart").destroy()
    }


    nomeSetor.innerHTML = '<h3>Setores Criticos</h3>'
    let qtdVerde = [];
    let qtdAmarelo = [];
    let qtdVermelho = [];
    let idEmpresa = sessionStorage.ID_EMPRESA

    const setoresCritico = []

    fetch(`/setor/statusSetor?id_empresa=${idEmpresa}&mes_atual=${mesAtual}&dia_atual=${diaAtual}`).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                for (var i = 0; i < resposta.length; i++) {
                    if (resposta[i].qdt_vermelho > resposta[i].qdt_amarelo && resposta[i].qdt_vermelho > resposta[i].qdt_verde) {


                        setoresCritico.push(resposta[i].setor)

                        qtdAmarelo.push(resposta[i].qdt_amarelo)
                        qtdVermelho.push(resposta[i].qdt_vermelho)
                        qtdVerde.push(resposta[i].qdt_verde)

                    }

                }


                const data3 = {
                    labels: setoresCritico,

                };

                const config4 = {
                    type: 'bar',
                    data: data3,
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                            }
                        },
                        responsive: true
                    },
                };

                const myChart3 = new Chart(
                    document.getElementById('setorChart'),
                    config4
                );

                let verde = {
                    label: "Normal",
                    backgroundColor: 'Green',
                    borderColor: 'Green',
                    borderWidth: 1,
                    minBarLength: 2,
                    maxBarLength: 4,
                    data: qtdVerde,

                }

                let amarelo = {
                    label: "Alerta",
                    backgroundColor: 'yellow',
                    borderColor: 'yellow',
                    borderWidth: 1,
                    minBarLength: 2,
                    maxBarLength: 4,
                    data: qtdAmarelo,
                }

                let vermelho = {
                    label: "Critico",
                    backgroundColor: 'red',
                    borderColor: 'red',
                    borderWidth: 1,
                    minBarLength: 2,
                    maxBarLength: 4,
                    data: qtdVermelho,
                }
                myChart3.data.datasets.push(verde, amarelo, vermelho)
                myChart3.update();



            });
        } else {
            console.log("Houve um erro ao tentar listar registros!");
            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    })


}



function maquinaCritica() {
    let idEmpresa = sessionStorage.ID_EMPRESA

    fetch(`/maquina/maquinaCritica?id_empresa=${idEmpresa}&mes_atual=${mesAtual}&dia_atual=${diaAtual}`).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                for (var posicao = 0; posicao < resposta.length; posicao++) {

                    critica.innerHTML = `
        <h3>${resposta[posicao].maquina}</h3>
                <p>${resposta[posicao].data}</p>    
            `
                }
            });
        } else {
            console.log("Houve um erro ao tentar listar registros!");
            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    })
}

function servidorCritica() {

    let idEmpresa = sessionStorage.ID_EMPRESA
    fetch(`/maquina/servidorCritica?id_empresa=${idEmpresa}&mes_atual=${mesAtual}&dia_atual=${diaAtual}`).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                for (var posicao = 0; posicao < resposta.length; posicao++) {

                    criticoServe.innerHTML = `
        <h3>${resposta[posicao].maquina}</h3>
                <p>${resposta[posicao].data}</p>    
            `
                }
            });
        } else {
            console.log("Houve um erro ao tentar listar registros!");
            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    })
}







function filtraSetor() {
    let idEmpresa = sessionStorage.ID_EMPRESA
    fetch(`/setor/listarSetor?idEmpresa=${idEmpresa}`).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                if (resposta.length != null) {
                    selectSetores.innerHTML = `<select name="select-nivel-dashboard" class="inputs-dashboard-select maquina"
                    id="selectSetores">
                    <option value="0" disabled selected>Selecione...</option>
                    
                </select>`;
                    for (var posicao = 0; posicao < resposta.length; posicao++) {
                        selectSetores.innerHTML += `
                                <option value="${resposta[posicao].nome_setor}">${resposta[posicao].nome_setor}</option>
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

function filtraSetoresEdtitarMaquina() {
    let idEmpresa = sessionStorage.ID_EMPRESA
    fetch(`/setor/listarSetor?idEmpresa=${idEmpresa}`).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                if (resposta.length != null) {
                    selectSetoresEditarMaquina.innerHTML = `<select name="select-nivel-dashboard" class="inputs-dashboard-select maquina"
                    id="selectSetores">
                    <option value="0" disabled selected>Selecione...</option>
                    
                </select>`;
                    for (var posicao = 0; posicao < resposta.length; posicao++) {
                        selectSetoresEditarMaquina.innerHTML += `
                                <option value="${posicao + 1}">${resposta[posicao].nome_setor}</option>
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



function cadastrarSetor() {
    let nomeVar = inputNomeSetor.value;
    let idEmpresaVar = sessionStorage.ID_EMPRESA;
    let nivelVar = selectNivel.value;



    console.log(nomeVar, idEmpresaVar, nivelVar)


    fetch("/setor/cadastrarSetor", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeServer: nomeVar,
            empresaServer: idEmpresaVar,
            nivelServer: nivelVar,
        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Cadastro bem-sucedido!',
                showConfirmButton: false,
                timer: 1500
            })

            setTimeout(() => {
                window.location = "PrimaryDashboard.html";
            }, "2000")

            limparFormulario();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Erro no cadastro!',
                text: 'Por favor, verfique as informações e tente novamente!'
            })
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}

function mostrarTotalMaquinas() {
    let idEmpresa = sessionStorage.ID_EMPRESA
    fetch(`/setor/mostrarTotalMaquinas?idEmpresa=${idEmpresa}`).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                for (var posicao = 0; posicao < resposta.length; posicao++) {
                    mostrarTotalDeMaquinas.innerHTML = `<span>${resposta[posicao].totalMaquinas}</span>`
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

function mostrarTotalMaquinasSelectSelecionado() {
    let idEmpresa = sessionStorage.ID_EMPRESA
    let select = document.getElementById('selectSetor');
    let selectNomeSetor = select.options[select.selectedIndex].value;
    let nomeSetor = parseInt(selectNomeSetor);
    fetch(`/setor/mostrarTotalMaquinasSelectSelecionado?idEmpresa=${idEmpresa}&nomeSetor=${nomeSetor}`).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                for (var posicao = 0; posicao < resposta.length; posicao++) {
                    mostrarTotalDeMaquinas.innerHTML = `<span>${resposta[posicao].totalMaquinas}</span>`
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

function mostrarTotalServidor() {
    let idEmpresa = sessionStorage.ID_EMPRESA
    fetch(`/setor/mostrarTotalServidor?idEmpresa=${idEmpresa}`).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                for (var posicao = 0; posicao < resposta.length; posicao++) {
                    mostrarTotalDeServidor.innerHTML = `<span>${resposta[posicao].totalServidor}</span>`
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

function mostrarTotalServidorSelectSelecionado() {
    let idEmpresa = sessionStorage.ID_EMPRESA
    let select = document.getElementById('selectSetor');
    let selectNomeSetor = select.options[select.selectedIndex].value;
    let nomeSetor = parseInt(selectNomeSetor);
    fetch(`/setor/mostrarTotalServidorSelectSelecionado?idEmpresa=${idEmpresa}&nomeSetor=${nomeSetor}`).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                for (var posicao = 0; posicao < resposta.length; posicao++) {
                    mostrarTotalDeServidor.innerHTML = `<span>${resposta[posicao].totalservidores}</span>`
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

function verMachine(host_name) {

    console.log(host_name)
    sessionStorage.NOME_MAQUINA = host_name;
    window.location.href = `MaquinaDashboard.html`;
}

function listarMaquinas() {
    let select = document.getElementById('selectSetor');
    let selectNomeSetor = select.options[select.selectedIndex].value;
    if (selectNomeSetor != "todos") {
        sessionStorage.MAQUINA_AGORA = 'maquina'
        listarPorSetor()
    } else {
        mostrarTotalMaquinas()
        mostrarTotalServidor()
        registroPizzaMaquina()
        registroPizzaServidor()
        listaMaquinas.innerHTML = ``;
        let idEmpresa = sessionStorage.ID_EMPRESA
        fetch(`/maquina/listarMaquinas?idEmpresa=${idEmpresa}`).then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (resposta) {
                    for (var posicao = 0; posicao < resposta.length; posicao++) {
                        listaMaquinas.innerHTML += `
                                <div class="itemMaquina">
                                    <div class="nomesMaquina">
                                        <div class="divAlerta">
                                        </div>
    
                                        <h5>${resposta[posicao].host_name}</h5>
                                    </div>
    
                                    <h5 class="setorTopic">${resposta[posicao].nome_setor}</h5>
    
                                    <div class="divVerMaquina">
                                        <i onclick="verMachine('${resposta[posicao].host_name}')"
                                            class="fa regular fa-arrow-up-right-from-square"></i>
                                    </div>
                                    <div class="divBtnEditarMaquina">
                                        <button class="button-editar-dashboard" onclick="abrirModalEditarMaquina('${resposta[posicao].host_name}')"><img src="assets/icons/icon_editar.png"></button>
                                    </div>
                                </div>
                            `
                        listaIdMaquina.push(resposta[posicao].host_name)
                    }
                    console.log(listaIdMaquina)
                });
            } else {
                console.log("Houve um erro ao tentar listar maquinas!");
                resposta.text().then(texto => {
                    console.error(texto);
                });
            }
        })
    }
}

function listarServidor() {
    let select = document.getElementById('selectSetor');
    let selectNomeSetor = select.options[select.selectedIndex].value;
    if (selectNomeSetor != "todos") {
        sessionStorage.MAQUINA_AGORA = 'servidor'
        listarPorSetor()
    } else {
        mostrarTotalMaquinas()
        mostrarTotalServidor()
        registroPizzaMaquina()
        registroPizzaServidor()
        listaMaquinas.innerHTML = ``;
        let idEmpresa = sessionStorage.ID_EMPRESA
        fetch(`/maquina/listarServidor?idEmpresa=${idEmpresa}`).then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (resposta) {
                    for (var posicao = 0; posicao < resposta.length; posicao++) {
                        listaMaquinas.innerHTML += `
                                <div class="itemMaquina">
                                    <div class="nomesMaquina">
                                        <div class="divAlerta">
                                        </div>

                                        <h5 id="${posicao}i">${resposta[posicao].host_name}</h5>
                                    </div>

                                    <h5 class="setorTopic">${resposta[posicao].nome_setor}</h5>

                                    <div class="divVerMaquina">
                                        <i onclick="verMachine('${resposta[posicao].host_name}')"
                                            class="fa regular fa-arrow-up-right-from-square"></i>
                                    </div>
                                    <div class="divBtnEditarMaquina">
                                    <button class="button-editar-dashboard" onclick="abrirModalEditarMaquina('${resposta[posicao].host_name}')"><img src="assets/icons/icon_editar.png"></button>
                                </div>
                                </div>`
                        listaIdMaquina.push(resposta[posicao].host_name)
                    }
                    console.log(listaIdMaquina)
                });
            } else {
                console.log("Houve um erro ao tentar listar maquinas!");
                resposta.text().then(texto => {
                    console.error(texto);
                });
            }
        })
    }
}

function listarSetor() {
    selectSetor.innerHTML = `<select name="" id="selectSetor" onchange="listarMaquinas()">
                                <option value="todos">Setor: Nenhum</option>
                            </select>`;
    let idEmpresa = sessionStorage.ID_EMPRESA
    fetch(`/setor/listarSetor?idEmpresa=${idEmpresa}`).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                if (resposta.length != null) {
                    selectSetor.innerHTML = `<select name="" id="selectSetor" onchange="listarPorSetor()">
                                <option value="todos">Setor: Todos</option>
                                            </select>`;
                    for (var posicao = 0; posicao < resposta.length; posicao++) {
                        console.log(resposta[posicao].id_setor)
                        selectSetor.innerHTML += `
                                <option value="${resposta[posicao].id_setor}">Setor: ${resposta[posicao].nome_setor}</option>
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

function listarPorSetor() {
    listaMaquinas.innerHTML = ``
    mostrarTotalMaquinasSelectSelecionado()
    mostrarTotalServidorSelectSelecionado()
    registroPizzaMaquinaPorSetor()
    registroPizzaServidorPorSetor()
    let select = document.getElementById('selectSetor');
    let selectNomeSetor = select.options[select.selectedIndex].value;
    let nomeSetor = parseInt(selectNomeSetor);
    let tipoMaquina = sessionStorage.MAQUINA_AGORA;
    let idEmpresa = sessionStorage.ID_EMPRESA
    console.log('Estou na primaryDash:' + nomeSetor, tipoMaquina, idEmpresa)
    fetch(`/setor/listarPorSetor?idEmpresa=${idEmpresa}&&tipoMaquina=${tipoMaquina}&&nomeSetor=${nomeSetor}`).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                for (var posicao = 0; posicao < resposta.length; posicao++) {
                    listaMaquinas.innerHTML += `
                                <div class="itemMaquina">
                                    <div class="nomesMaquina">
                                        <div class="divAlerta">
                                        </div>
    
                                        <h5>${resposta[posicao].host_name}</h5>
                                    </div>
    
                                    <h5 class="setorTopic">${resposta[posicao].nome_setor}</h5>
    
                                    <div class="divVerMaquina">
                                        <i onclick="verMachine('${resposta[posicao].host_name}')"
                                            class="fa regular fa-arrow-up-right-from-square"></i>
                                    </div>
                                    <div class="divBtnEditarMaquina">
                                        <button class="button-editar-dashboard" onclick="abrirModalEditarMaquina('${resposta[posicao].host_name}')"><img src="assets/icons/icon_editar.png"></button>
                                    </div>
                                </div>`
                    listaIdMaquina.push(resposta[posicao].host_name)
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

function abrirModalMaquina() {
    var divModal = document.getElementById("divModalMaquina");
    divModal.style.display = "flex";
    var divModalSetor = document.getElementById("divModalSetor");
    divModalSetor.style.display = "none";
    var divModalEditarMaquina = document.getElementById("divModalEditarMaquina");
    divModalEditarMaquina.style.display = "none";
}



function abrirModalEditarMaquina(hostName) {
    var divModalEditarMaquina = document.getElementById("divModalEditarMaquina");
    divModalEditarMaquina.style.display = "flex";
    var divModalSetor = document.getElementById("divModalSetor");
    divModalSetor.style.display = "none";
    var divModal = document.getElementById("divModalMaquina");
    divModal.style.display = "none";
    nomeMaquina = hostName

}

function abrirModalSetor() {
    var divModalSetor = document.getElementById("divModalSetor");
    divModalSetor.style.display = "flex";
    var divModal = document.getElementById("divModalMaquina");
    divModal.style.display = "none";
    var divModalEditarMaquina = document.getElementById("divModalEditarMaquina");
    divModalEditarMaquina.style.display = "none";
}

function fecharModalMaquina() {
    var divModal = document.getElementById("divModalMaquina");
    divModal.style.display = "none";
}

function fecharModalEditarMaquina() {
    var divModalEditarMaquina = document.getElementById("divModalEditarMaquina");
    divModalEditarMaquina.style.display = "none";
}

function fecharModalSetor() {
    var divModalSetor = document.getElementById("divModalSetor");
    divModalSetor.style.display = "none";
}