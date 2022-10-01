function MascaraCelular(objeto, evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var regex = /^[0-9.]+$/;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }

    if (objeto.value.length == 0)
        objeto.value = '(' + objeto.value;

    if (objeto.value.length == 3)
        objeto.value = objeto.value + ')';

    if (objeto.value.length == 9)
        objeto.value = objeto.value + '-';
}

function MascaraTelefone(objeto, evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var regex = /^[0-9.]+$/;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }

    if (objeto.value.length == 4)
        objeto.value = objeto.value + '-';
}


function atualizarSuporte() {
    let nomeSuporteVar = inputNomeSuporte.value;
    let emailVar = inputEmailSuporte.value;
    let senhaVar = inputSenhaSuporte.value;
    let slackVar = inputSlackSuporte.value;
    let telefoneVar = inputTelefoneSuporte.value;
    let celularVar = inputCelularSuporte.value;
    console.log(nomeSuporteVar, emailVar, senhaVar, slackVar, telefoneVar, celularVar)

    if (nomeSuporteVar.trim() == "" || emailVar.trim() == "" || senhaVar.trim() == "" || slackVar.trim() == "" || telefoneVar.trim() == "" || celularVar.trim() == "") {
        Swal.fire({
            icon: 'info',
            title: 'Preencha os campos!',
            text: 'Por favor, verfique os dados e tente novamente!'
        })
    } else if (emailVar.trim().indexOf('@' && '.com') == - 1 || slackVar.trim().indexOf('@' && '.com') == - 1) {
        Swal.fire({
            icon: 'error',
            title: 'Email Inválido!',
            text: 'Por favor, informe um email válido!',
        })
    } else if (senhaVar.length < 8) {
        Swal.fire({
            icon: 'error',
            title: 'Senha inválida!',
            text: 'Digite uma senha maior que 7 digitos!',
        })
    } else if (telefoneVar.length < 8) {
        Swal.fire({
            icon: 'error',
            title: 'Telefone inválido!',
            text: 'Por favor, insira um telefone válido!',
        })
    } else if (celularVar.length != 14) {
        Swal.fire({
            icon: 'error',
            title: 'Numero de celular inválido!',
            text: 'Por favor, insira um numero válido!',
        })
    } else { 

    fetch("/usuario/atualizarSuporte", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeSuporteServer: nomeSuporteVar,
            emailServer: emailVar,
            senhaServer: senhaVar,
            slackServer: slackVar,
            telefoneServer: telefoneVar,
            celularServer: celularVar
        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Salvado com sucesso!',
                showConfirmButton: false,
                timer: 1500
            })

            limparFormulario();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Erro ao salvar!',
                text: 'Por favor, verfique as informações e tente novamente!'
            })
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}
}