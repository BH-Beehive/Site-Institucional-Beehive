function revelar() {
    let icon_revel=document.getElementById("button_icon");
    let senha_revel = document.getElementById("inputSenha");
    let senha__confirm_revel = document.getElementById("inputConfirmarSenha");
   
    if (senha_revel.type == "password" ) {  
        senha__confirm_revel.type="text";
        senha_revel.type = "text";
        icon_revel.innerHTML='<i class="fa fa-sharp fa-solid fa-eye-slash"></i>';
       
    }
    else {
       
        senha__confirm_revel.type="password";
        senha_revel.type = "password";
        icon_revel.innerHTML='<i class="fas fa-eye"></i>';

    }
}



function MascaraCelular(objeto){
    if(objeto.value.length == 0)
      objeto.value = '(' + objeto.value;
 
    if(objeto.value.length == 3)
       objeto.value = objeto.value + ')';
 
  if(objeto.value.length == 9)
      objeto.value = objeto.value + '-';
 }

function MascaraTelefone(objeto){
  if(objeto.value.length == 4)
      objeto.value = objeto.value + '-';
 }
 


function proximaEtapa() {
    var regex = /^(?=(?:.*?[A-Z]){1})(?=(?:.*?[0-9]){1})(?=(?:.*?[!@#$%*()_+^&}{:;?.]){1})(?!.*\s)[0-9a-zA-Z!@#$%;*(){}_+^&]*$/;
    if (inputEmail.value.trim() == "" || inputSenha.value == "" || inputConfirmarSenha.value == "") {
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
    } else if(inputSenha.value.trim() != inputConfirmarSenha.value){
        Swal.fire({
            icon: 'error',
            title: 'Senhas não coincidem!',
            text: 'Por favor, confira as senhas!',
        })
    }
    else if (inputSenha.length< 8 ||  !regex.exec(inputSenha.value)) {
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
    else if (inputCnpj.value.length != 14) {
        Swal.fire({
            icon: 'error',
            title: 'CNPJ inválido!',
            text: 'Por favor, insira um cnpj válido!',
        })
    }
    else if (inputCelular.value.length != 11) {
        Swal.fire({
            icon: 'error',
            title: 'Numero de celular inválido!',
            text: 'Por favor, insira um numero válido!',
        })
    } else if (inputTelefone.value.length != 8) {
        Swal.fire({
            icon: 'error',
            title: 'Telefone inválido!',
            text: 'Por favor, insira um telefone válido!',
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
   console.log(emailVar,senhaVar,nomeVar,cnpjVar,celularVar,telefoneVar)


    fetch("/usuario/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer:senhaVar,
            nomeServer:nomeVar,
            cnpjServer:cnpjVar,
            celularServer:celularVar,
            telefoneServer:telefoneVar,
            cepServer:cepVar,
            estadoServer:estadoVar,
            cidadeServer:cidadeVar,
            ruaServer:ruaVar
            
            
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


 /* fetch("/usuarios/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nomeServer: nome,
                cnpjServer: cnpj,
                fantasyNameServer: fantasyName,
                razaoSocialServer: razaoSocial,
                emailServer: email,
                passwordServer: password,
                tellphoneServer: tellphone,
                cepServer: cep,
                cidadeServer: cidade,
                stateServer: state,
                logradouroServer: logradouro,
                numberServer: number,
            })
        }).then(function (resposta) {
            if (resposta.ok) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                    didOpen: () => {
                        setInterval(() => {
                            window.location.href = 'login.html'
                        }, 1500);
                    }
                })
                Toast.fire({
                    icon: 'success',
                    title: 'cadastrado com sucesso!'
                })
            } else {
                throw ("Houve um erro ao tentar realizar o cadastro!");
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
    }
}
} */
