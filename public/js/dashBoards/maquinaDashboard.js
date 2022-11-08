function listarInformacoesMaquina() {
    let idEmpresa = sessionStorage.ID_EMPRESA
    let hostName = sessionStorage.NOME_MAQUINA
    fetch(`/maquina/listarInformacoesMaquina?idEmpresa=${idEmpresa}&hostName=${hostName}`).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                for (var posicao = 0; posicao < 1; posicao++) {
                    listaInformacoes.innerHTML = `
                    <div class="content">
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
                                        <h4>SO</h4>
                                        <p>${resposta[posicao].sistema_operacional}</p>
                                    </div>
                                </div>

                                <div class="activeTime">
                                    <h4>Tempo de atividade</h4>
                                    <h3>10:00:10</h3>
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

function listarDadosMaquina() {
    let hostName = sessionStorage.NOME_MAQUINA
    h3NomeMaquina.innerHTML = `<h3>${hostName}</h3>`

    fetch(`/maquina/listarDadosMaquina?hostName=${hostName}`).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                for (var posicao = 0; posicao < 1; posicao++) {
                    dadosComponentes.innerHTML = `
                    <div class="content">
                    <div class="infoComponents">
                        <p>Componentes</p>
                        <h3>${hostName}</h3>
                    </div>

                    <div class="labelsComponents">
                        <p>#</p>
                        <p>Nome</p>
                        <p>Porcentagem</p>
                    </div>

                    <div class="contentOfProgressBarComponents">

                        <div class="itemProgressBarComponents">
                            <h4>01</h4>
                            <h5>RAM</h5>
                            <div class="progressBarFullComponent">
                                <div class="progressBarInsideComponentRam divVermelhoComponent">

                                </div>
                            </div>

                            <div class="porcentComponent porcentComponentVermelho">
                                <span>${resposta[posicao].memoria_uso}</span>%
                            </div>
                        </div>

                        <div class="itemProgressBarComponents">
                            <h4>01</h4>
                            <h5>CPU</h5>
                            <div class="progressBarFullComponent">
                                <div class="progressBarInsideComponentCpu">

                                </div>
                            </div>

                            <div class="porcentComponent porcentComponentAzulClaro">
                                <span>${resposta[posicao].cpu_uso}</span>%
                            </div>
                        </div>

                        <div class="itemProgressBarComponents">
                            <h4>02</h4>
                            <h5>DISCO</h5>
                            <div class="progressBarFullComponent">
                                <div class="progressBarInsideComponentDisco divAmarelaComponent">

                                </div>
                            </div>

                            <div class="porcentComponent porcentComponentAmarelo">
                                <span>${resposta[posicao].disco_uso}</span>%
                            </div>
                        </div>
                    </div>
                </div>
                    
                        `
                let cpu = progressBarInsideComponentCpu.value;
                console.log(cpu)
                cpu.style.width = `35%`
                }
                
            });
        } else {
            console.log("Houve um erro ao tentar listar dados maquinas!");
            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    })
}






