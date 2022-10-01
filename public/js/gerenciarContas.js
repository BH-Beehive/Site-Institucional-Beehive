function cadastrarSuporte() {
    let nomeSuporteVar = inputNome.value;
    let emailVar = inputEmail.value;
    let senhaVar = inputSenha.value;
    let emailSlackVar = inputEmailSlack;
    let telefoneVar = inputTelefone;
    let celularVar = inputCelular;
    let cpfVar = inputCpf.value;
    let idEmpresaVar = sessionStorage.ID_EMPRESA;
    
    console.log(nomeSuporteVar, emailVar, senhaVar, emailSlackVar, telefoneVar, celularVar, cpfVar, idEmpresaVar)


    fetch("/usuario/cadastrarSuporte", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeSuporteServer,
            emailServer: emailVar,
            senhaServer: senhaVar,
            emailSlackServer: emailSlackVar,
            telefoneServer: telefoneVar,
            celularServer: celularVar,
            cpfServer: cpfServer,
            idEmpresaServer: idEmpresaVar
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
                window.location = "Login.html";
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

function editarSuporte() {
    let nomeSuporteVar = inputNome.value;
    let emailVar = inputEmail.value;
    let senhaVar = inputSenha.value;
    let cpfVar = inputCpf.value;
    let emailSlackVar = inputEmailSlack;
    let telefoneVar = inputTelefone;
    let celularVar = inputCelular;
    let idEmpresaVar = sessionStorage.ID_EMPRESA;
    
    console.log(nomeSuporteVar, emailVar, senhaVar, emailSlackVar, telefoneVar, celularVar, cpfVar, idEmpresaVar)


    fetch("/usuario/editarSuporte", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeSuporteServer,
            emailServer: emailVar,
            senhaServer: senhaVar,
            emailSlackServer: emailSlackVar,
            telefoneServer: telefoneVar,
            celularServer: celularVar,
            cpfServer: cpfServer,
            idEmpresaServer: idEmpresaVar
        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Perfil editado com sucesso!',
                showConfirmButton: false,
                timer: 1500
            })

            setTimeout(() => {
                window.location = "Login.html";
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

function deletarSuporte() {
    let emailSlackVar = inputEmailSlack;
    
    console.log(emailSlackVar)


    fetch("/usuario/deletarSuporte", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailSlackServer: emailSlackVar
        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Perfil editado com sucesso!',
                showConfirmButton: false,
                timer: 1500
            })

            setTimeout(() => {
                window.location = "Login.html";
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