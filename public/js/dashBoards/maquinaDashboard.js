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

function listarDadosMaquina() {
    let hostName = sessionStorage.NOME_MAQUINA
    let mesAtual = 11
    //h3NomeMaquina.innerHTML = `<h3>${hostName}</h3>`
    fetch(`/registro/historicoMensal/${mesAtual}/${hostName}`).then(function (resposta) {
        
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
              console.log("historicoMensal-----------------------------------"+resposta)
              alert(resposta)
            });
        } else {
            console.log("Houve um erro ao tentar listar maquinas!");
            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    })
}








