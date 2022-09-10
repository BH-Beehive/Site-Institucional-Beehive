function revelar() {
    let icon_revel = document.getElementById("button_icon_revel");
    let senha_revel = document.getElementById("inputSenhaLogin");
    if (senha_revel.type == "password") {
        senha_revel.type = "text";
        icon_revel.innerHTML = '<i class="fa fa-sharp fa-solid fa-eye-slash"></i>';

    }
    else {

        senha_revel.type = "password";
        icon_revel.innerHTML = '<i class="fas fa-eye"></i>';

    }
}


function isInputsOk() {
    let senha = inputSenhaLogin.value;
    if (inputEmailLogin.value == "" || inputSenhaLogin.value == "") {
        Swal.fire({
            icon: 'error',
            title: 'Preencha os campos',
            text: 'Por favor, preencha os campos!',
        })

        return false;

    }
    else if (inputEmailLogin.value.trim().indexOf('@' && '.com') == - 1) {
        Swal.fire({
            icon: 'error',
            title: 'Email Inválido!',
            text: 'Por favor, informe um email válido!',
        })

        return false;

    } else if (senha.length < 8) {
        Swal.fire({
            icon: 'error',
            title: 'Senha inválida!',
            text: 'Tamanho inválido de senha',
        })
        return false;
    }

    return true;
}



function entrar() {

    let email = inputEmailLogin.value
    let senha = inputSenhaLogin.value

    if (isInputsOk()) {
        fetch("/usuario/autenticar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                emailServer: email,
                senhaServer: senha,
            }),
        })
            .then(function (resposta) {
                console.log("ESTOU NO THEN DO entrar()!");
                if (resposta.ok) {
                    console.log(resposta);

                    resposta.json().then((json) => {
                        console.log(json);
                        console.log(JSON.stringify(json));

                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Logado com sucesso!',
                            showConfirmButton: false,
                            timer: 1500
                        })

                        sessionStorage.EMAIL_USUARIO = json.email;
                        sessionStorage.NOME_USUARIO = json.nome;

                        setTimeout(function () {
                            window.location = "index.html";
                        }, 1000);
                    });
                } else {
                    console.log("Houve um erro ao tentar realizar o login!");
                    resposta.text().then((texto) => {
                        console.error(texto);

                        Swal.fire({
                            icon: 'error',
                            title: 'Email e/ou senha inválidos',
                            text: 'Verifique e tente novamente!',
                        })
                    });
                }
            })
            .catch(function (erro) {
                console.log(erro);
            });
    }


    return false;
}