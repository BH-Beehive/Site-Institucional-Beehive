let listaIdMaquina = [];

function cadastrarMaquina() {
    let hostNameVar = inputNome.value;
    let tokenVar = gerarToken();
    let tipoVar = inputTelefone.value;
    let idEmpresaVar = sessionStorage.ID_EMPRESA;
    let fkSetor = inputCelular.value;

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

    for (i = 1; i <= 15; i++) {
        var char = Math.floor(Math.random()
            * str.length + 1);

        pass += str.charAt(char)
    }

    return pass;
}

// implementando
function resgatarFkSetor() {

}

function cadastrarSetor() {
    let nomeVar = inputNome.value;
    let idEmpresaVar = sessionStorage.ID_EMPRESA;
    let nivelVar = inputCelular.value;



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

function verMachine(host_name) {

    console.log(host_name)
    sessionStorage.NOME_MAQUINA = host_name;
    window.location.href = `MaquinaDashboard.html`;
}

function listarMaquinas() {
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

function listarServidor() {
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
                                    <i onclick="verMachine()"
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