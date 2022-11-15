let emailExistente = false;
let cnpjExistente = false;
let celularExistente = false;
let telefoneExistente = false;

function revelar() {
    let icon_revel = document.getElementById("button_icon");
    let senha_revel = document.getElementById("inputSenha");
    let senha__confirm_revel = document.getElementById("inputConfirmarSenha");

    if (senha_revel.type == "password") {
        senha__confirm_revel.type = "text";
        senha_revel.type = "text";
        icon_revel.innerHTML = '<i class="fa fa-sharp fa-solid fa-eye-slash"></i>';

    }
    else {

        senha__confirm_revel.type = "password";
        senha_revel.type = "password";
        icon_revel.innerHTML = '<i class="fas fa-eye"></i>';

    }
}



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
function MascaraCnpj(objeto, evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var regex = /^[0-9.]+$/;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }

    if (objeto.value.length == 2)
        objeto.value = objeto.value + '.';
    if (objeto.value.length == 6)
        objeto.value = objeto.value + '.';
    if (objeto.value.length == 10)
        objeto.value = objeto.value + '/';
    if (objeto.value.length == 15)
        objeto.value = objeto.value + '-';
}


function proximaEtapa() {
    var regex = /^(?=(?:.*?[A-Z]){1})(?=(?:.*?[0-9]){1})(?=(?:.*?[!@#$%*()_+^&}{:;?.]){1})(?!.*\s)[0-9a-zA-Z!@#$%;*(){}_+^&]*$/;
    if(emailExistente == true){
        Swal.fire({
            icon: 'error',
            title: 'Email existente!',
            text: 'Email já cadastrado!',
        })
    }
    
    
    else if (inputEmail.value.trim() == "" || inputSenha.value == "" || inputConfirmarSenha.value == "") {
        Swal.fire({
            icon: 'error',
            title: 'Preencha os campos!',
            text: 'Por favor, preencha os campos!',
        })
    }
    else if (inputEmail.value.trim().indexOf('@' && '.com') == - 1) {
        Swal.fire({
            icon: 'error',
            title: 'Email Inválido!',
            text: 'Por favor, informe um email válido!',
        })
    } else if (inputSenha.value.trim() != inputConfirmarSenha.value) {
        Swal.fire({
            icon: 'error',
            title: 'Senhas não coincidem!',
            text: 'Por favor, confira as senhas!',
        })
    }
    else if (inputSenha.length < 8 || !regex.exec(inputSenha.value)) {
        Swal.fire({
            icon: 'error',
            title: 'Senha inválida!',
            text: 'Digite uma senha maior que 7 digitos e com caracteres especiais!',
        })
    }
    else {
        campoCadastro1.style.display = "none";
        campoCadastro2.style.display = "";
        imagemCadastro.src = "assets/img/imgCadastro2.svg";
    }
}

function proximaEtapa2() {

    if (inputRazaoSocial.value == "" || inputCnpj.value.length == 0 || inputCelular.value.length == 0 || inputTelefone.value.length == 0) {
        Swal.fire({
            icon: 'error',
            title: 'Preencha os campos',
            text: 'Por favor, preencha os campos!',
        })
    }
    else if (cnpjExistente == true) {
        Swal.fire({
            icon: 'error',
            title: 'CNPJ já cadastrado!',
            text: 'O cnpj inserido já está cadastrado!',
        })
    }
    else if (inputCnpj.value.length != 18) {
        Swal.fire({
            icon: 'error',
            title: 'CNPJ inválido!',
            text: 'Por favor, insira um cnpj válido!',
        })
    }
    else if (inputCelular.value.length != 14) {
        Swal.fire({
            icon: 'error',
            title: 'Numero de celular inválido!',
            text: 'Por favor, insira um numero válido!',
        })
    }
    else if (celularExistente == true) {
        Swal.fire({
            icon: 'error',
            title: 'Numero de celular já cadastrado!',
            text: 'O numero de celular inserido já está cadastrado!',
        })
    } 
    else if (inputTelefone.value.length < 8) {
        Swal.fire({
            icon: 'error',
            title: 'Telefone inválido!',
            text: 'Por favor, insira um telefone válido!',
        })
    }
    else if (telefoneExistente == true) {
        Swal.fire({
            icon: 'error',
            title: 'Numero de telefone já cadastrado!',
            text: 'O numero de telefone inserido já está cadastrado!',
        })
    } 
    else {
        campoCadastro1.style.display = "none";
        campoCadastro2.style.display = "none";
        campoCadastro3.style.display = "";
        imagemCadastro.src = "assets/img/imgCadastro3.svg";
    }
}
function anteriorEtapa() {
    campoCadastro2.style.display = "none";
    campoCadastro1.style.display = "";
    imagemCadastro.src = "assets/img/imgCadastro1.svg";
}
function anteriorEtapa2() {
    campoCadastro3.style.display = "none";
    campoCadastro2.style.display = "";
    imagemCadastro.src = "assets/img/imgCadastro2.svg";
}


function savePlanType(){
    const date = new Date().toISOString();
    console.log(date);
    const planTipe = localStorage.getItem('planType')
}


function limpa_formu_cep() {

    document.getElementById('rua').value = ("");
    document.getElementById('cidade').value = ("");
    document.getElementById('uf').value = ("");
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {

        document.getElementById('inputCidade').value = (conteudo.localidade);
        document.getElementById('inputEstado').value = (conteudo.uf);
        document.getElementById('inputRua').value = (conteudo.logradouro);
    }
    else {

        limpa_formu_cep();
        alert("CEP não encontrado.");
    }
}

function pesquisacep(valor) {

    let cep = valor.replace(/\D/g, '');

    if (cep != "") {

        let validacep = /^[0-9]{8}$/;

        if (validacep.test(cep)) {

            document.getElementById('inputCidade').value = "...";
            document.getElementById('inputEstado').value = "...";
            document.getElementById('inputRua').value = "...";

            let script = document.createElement('script');

            script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';
            document.body.appendChild(script);
        }
        else {

            limpa_formu_cep();
            alert("Formato de CEP inválido.");
        }
    }
    else {

        limpa_formu_cep();
    }
};

function cadastrar() {
    let nomeVar = inputRazaoSocial.value;
    let cnpjVar = inputCnpj.value;
    let telefoneVar = inputTelefone.value;
    let celularVar = inputCelular.value;
    let emailVar = inputEmail.value;
    let senhaVar = inputSenha.value;
    let cepVar = inputCep.value;
    let estadoVar = inputEstado.value;
    let cidadeVar = inputCidade.value;
    let ruaVar = inputRua.value;
    console.log(emailVar, senhaVar, nomeVar, cnpjVar, celularVar, telefoneVar)


    fetch("/usuario/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar,
            nomeServer: nomeVar,
            cnpjServer: cnpjVar,
            celularServer: celularVar,
            telefoneServer: telefoneVar,
            cepServer: cepVar,
            estadoServer: estadoVar,
            cidadeServer: cidadeVar,
            ruaServer: ruaVar


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

            savePlanType('Cadastro');

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


function validarEmail() {
    let email = inputEmail.value
    console.log('Entrei no validar email. Validando o email a seguir: ', email)

    if ((email) && (email.indexOf('@') > 1) && (email.indexOf('.') > 1)) {
        fetch("/usuario/validarEmail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                emailServer: email
            })
        }).then(function (resposta) {
            if (!resposta.ok) {
                resposta.json().then(json => {
                    const data = JSON.stringify(json)
                    if (data.length) {
                        emailExistente = true 
                    }
                });
            } else {
                emailExistente = false
            }
        }).catch(function (erro) {
            console.log(erro);
        })
    }
}

function validarCnpj() {
    let cnpj = inputCnpj.value
    console.log('Entrei no validar CNPJ. Validando o CNPJ a seguir: ', cnpj)
    if (cnpj) {
        fetch("/usuario/validarCnpj", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                cnpjServer: cnpj
            })
        }).then(function (resposta) {
            if (!resposta.ok) {
                resposta.json().then(json => {
                    const data = JSON.stringify(json)
                    if (data.length) {
                        cnpjExistente = true
                    }
                });
            } else {
                cnpjExistente = false
            }
        }).catch(function (erro) {
            console.log(erro);
        })
    }
}

function validarCelular() {
    let celular = inputCelular.value;
    console.log('Entrei no validar Celular. Validando o celular a seguir: ', celular)
    if (celular) {
        fetch("/usuario/validarCelular", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                celularServer: celular
            })
        }).then(function (resposta) {
            if (!resposta.ok) {
                resposta.json().then(json => {
                    const data = JSON.stringify(json)
                    if (data.length) {
                        celularExistente = true
                    }
                });
            } else {
                celularExistente = false
            }
        }).catch(function (erro) {
            console.log(erro);
        })
    }
}

function validarTelefone() {
    let telefone = inputTelefone.value;
    console.log('Entrei no validar telefone. Validando o telefone a seguir: ', telefone)
    if (telefone) {
        fetch("/usuario/validarTelefone", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                telefoneServer: telefone
            })
        }).then(function (resposta) {
            if (!resposta.ok) {
                resposta.json().then(json => {
                    const data = JSON.stringify(json)
                    if (data.length) {
                        telefoneExistente = true
                    }
                });
            } else {
                telefoneExistente = false
            }
        }).catch(function (erro) {
            console.log(erro);
        })
    }
}