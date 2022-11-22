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
    const dataHj = new Date()
    const mesAtual = dataHj.getMonth() + 1
    let menuHistorico = document.getElementById("dadosComponentesMenu")
    //h3NomeMaquina.innerHTML = `<h3>${hostName}</h3>`
    fetch(`/registro/historicoMensal?mes_atual=${mesAtual}&host_name=${hostName}`).then(function (resposta) {
        
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
              console.log("historicoMensal-----------------------------------"+resposta)
             for(var i=0;i<=30;i++){
                if(resposta[i].qdt_vermelho > resposta[i].qdt_amarelo ){
                    
                    menuHistorico.innerHTML+=`
                    <div class="dadosMenu">
                    <h3>${resposta[i].data_registro}</h3>
                    <h3>${resposta[i].qdt_vermelho}</h3>
                    <h3>VERMELHO</h3>               
                  </div>
                  `
                }
                else if(resposta[i].qdt_amarelo > resposta[i].qdt_vermelho ){
                    menuHistorico.innerHTML+=`
                    <div class="dadosMenu">
                    <h3>${resposta[i].data_registro}</h3>
                    <h3>${resposta[i].qdt_amarelo}</h3>
                    <h3>AMARELO</h3>               
                  </div>
                  `
                }
                else{
                    menuHistorico.innerHTML+=`
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








