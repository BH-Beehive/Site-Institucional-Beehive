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


    
    console.log(nomeVar,idEmpresaVar,nivelVar)


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