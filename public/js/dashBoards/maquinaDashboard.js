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
                                        <h4>Fabricante</h4>
                                        <p>Microsoft</p>
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