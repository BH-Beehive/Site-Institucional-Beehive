let listaIdMaquina = [];

function cadastrarMaquina(){
    let hostNameVar = inputHostName.value;
    let tokenVar = gerarToken();
    let tipoVar = selectTipo.value;
    let idEmpresaVar = sessionStorage.ID_EMPRESA;
    let fkSetor = selectSetores.value;

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

// implementando
function resgatarFkSetor() {

}

function filtraSetor(){
    let idEmpresa = sessionStorage.ID_EMPRESA
    fetch(`/setor/filtraSetor?idEmpresa=${idEmpresa}`).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                if (resposta.length != null) {
                    selectSetores.innerHTML = `<select name="select-nivel-dashboard" class="inputs-dashboard-select maquina"
                    id="selectSetores">
                    <option value="0" disabled selected>Selecione...</option>
                    
                </select>`;
                    for (var posicao = 0; posicao < resposta.length; posicao++) {
                        selectSetores.innerHTML += `
                                <option value="${posicao + 1 }">${resposta[posicao].nome_setor}</option>
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
    fetch(`/setor/mostrarTotalMaquinasSelectSelecionado?idEmpresa=${idEmpresa}&nomeSetor=${nomeSetor + 1}`).then(function (resposta) {
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
    fetch(`/setor/mostrarTotalServidorSelectSelecionado?idEmpresa=${idEmpresa}&nomeSetor=${nomeSetor + 1}`).then(function (resposta) {
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
                            <div class="ItensMaquinasContent">
    
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
                            <div class="ItensMaquinasContent">

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
                        selectSetor.innerHTML += `
                                <option value="${posicao}">Setor: ${resposta[posicao].nome_setor}</option>
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
    fetch(`/setor/listarPorSetor?idEmpresa=${idEmpresa}&&tipoMaquina=${tipoMaquina}&&nomeSetor=${nomeSetor + 1}`).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                for (var posicao = 0; posicao < resposta.length; posicao++) {
                    listaMaquinas.innerHTML += `
                    <div class="ItensMaquinasContent">
    
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
}

function abrirModalSetor() {
    var divModalSetor = document.getElementById("divModalSetor");
    divModalSetor.style.display = "flex";
    var divModal = document.getElementById("divModalMaquina");
    divModal.style.display = "none";
}

function fecharModalMaquina() {
    var divModal = document.getElementById("divModalMaquina");
    divModal.style.display = "none";
}


function fecharModalSetor() {
    var divModalSetor = document.getElementById("divModalSetor");
    divModalSetor.style.display = "none";
}