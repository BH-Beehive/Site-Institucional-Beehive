function alterarDados(){
    let senhaSuporte = document.getElementById("inputSenhaSuporte");
    let telefoneSuporte = document.getElementById("inputTelefoneSuporte");
    let celularSuporte = document.getElementById("inputCelularSuporte");
    senhaSuporte.style.border = "0.5px solid black";
    telefoneSuporte.style.border = "0.5px solid black";
    celularSuporte.style.border = "0.5px solid black";
    senhaSuporte.disabled = false;
    telefoneSuporte.disabled = false;
    celularSuporte.disabled = false;
}

function abrirModalSuporte() {
    var divModalSuporte = document.getElementById("divModalSuporte");
    divModalSuporte.style.display = "flex";
}

function fecharModalSuporte() {
    var divModal = document.getElementById("divModalSuporte");
    divModal.style.display = "none";
}


function MascaraCelular(objeto, evt) {
    let theEvent = evt || window.event;
    let key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    let regex = /^[0-9.]+$/;
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
    let theEvent = evt || window.event;
    let key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    let regex = /^[0-9.]+$/;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }

    if (objeto.value.length == 4)
        objeto.value = objeto.value + '-';
}


function atualizarSuporte() {
    let senhaSuporte = document.getElementById("inputSenhaSuporte");
    let telefoneSuporte = document.getElementById("inputTelefoneSuporte");
    let celularSuporte = document.getElementById("inputCelularSuporte");
    senhaSuporte.style.border = "none";
    telefoneSuporte.style.border = "none";
    celularSuporte.style.border = "none";
    senhaSuporte.disabled = true;
    telefoneSuporte.disabled = true;
    celularSuporte.disabled = true;

    let nomeSuporteVar = inputNomeSuporte.value;
    let idVar = inputIdentificacao.value;
    let senhaVar = inputSenhaSuporte.value;
    let slackVar = inputSlackSuporte.value;
    let telefoneVar = inputTelefoneSuporte.value;
    let celularVar = inputCelularSuporte.value;
    let id_usuario = sessionStorage.ID_SUPORTE;
    console.log(nomeSuporteVar, idVar, senhaVar, slackVar, telefoneVar, celularVar, id_usuario)

    if (nomeSuporteVar.trim() == "" || idVar.trim() == "" || senhaVar.trim() == "" || slackVar.trim() == "" || telefoneVar.trim() == "" || celularVar.trim() == "" || id_usuario.trim() == "") {
        Swal.fire({
            icon: 'info',
            title: 'Preencha os campos!',
            text: 'Por favor, verfique os dados e tente novamente!'
        })
    } else if (slackVar.trim().indexOf('@' && '.com') == - 1) {
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
            idServer: idVar,
            senhaServer: senhaVar,
            slackServer: slackVar,
            telefoneServer: telefoneVar,
            celularServer: celularVar,
            id_usuarioServer: id_usuario
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

function pegarSuporte() {
    let id_usuario = sessionStorage.ID_SUPORTE;
    let nome_suporte = "";
    let senha_suporte = "";
    let slack = "";
    let telefone = "";
    let celular = "";
    let cpf = "";
    let fk_empresa = "";
    let idEmpresa = sessionStorage.ID_EMPRESA
    fetch(`/usuario/pegarSuporte?id_usuario=${id_usuario}`).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                for (var posicao = 0; posicao < resposta.length; posicao++) {
                    id_usuario = resposta[posicao].id_usuario;
                    nome_suporte = resposta[posicao].nome_suporte;
                    senha_suporte = resposta[posicao].senha;
                    slack = resposta[posicao].email_slack;
                    telefone = resposta[posicao].telefone;
                    celular = resposta[posicao].celular;
                    cpf = resposta[posicao].cpf;
                    fk_empresa = resposta[posicao].fk_empresa;
                }
                let inputNomeSuporteP = document.getElementById("inputNomeSuporte");
                let inputIdentificacaoP = document.getElementById("inputIdentificacao");
                let inputSenhaSuporteP = document.getElementById("inputSenhaSuporte");
                let inputSlackSuporteP = document.getElementById("inputSlackSuporte");
                let inputTelefoneSuporteP = document.getElementById("inputTelefoneSuporte");
                let inputCelularSuporteP = document.getElementById("inputCelularSuporte");
                let h2NomeSuporteP = document.getElementById("h2Suporte");
                let emailPerfilSuporteP = document.getElementById("emailPerfil");
                
                inputNomeSuporteP.value = `${nome_suporte}`;
                inputIdentificacaoP.value = `${id_usuario}`;
                inputSenhaSuporteP.value = `${senha_suporte}`;
                inputSlackSuporteP.value = `${slack}`;
                inputTelefoneSuporteP.value = `${telefone}`;
                inputCelularSuporteP.value = `${celular}`;
                h2NomeSuporteP.innerHTML = `${nome_suporte}`;
                emailPerfilSuporteP.innerHTML = `${slack}`;

            });
        } else {
            console.log("Houve um erro ao tentar listar suportes!");
            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    })
}


