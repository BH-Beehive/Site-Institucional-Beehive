function revelar() {
    let icon_revel=document.getElementById("button_icon_revel");
    let senha_revel = document.getElementById("inputSenhaLogin");
    if (senha_revel.type == "password" ) {
        senha_revel.type = "text";
        icon_revel.innerHTML='<i class="fa fa-sharp fa-solid fa-eye-slash"></i>';
        
    }
    else {
        

        senha_revel.type = "password";
        icon_revel.innerHTML='<i class="fas fa-eye"></i>';

    }
}







function entrar() {
    let email = inputEmailLogin.value
    let senha = inputEmailLogin.value
    
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

                    sessionStorage.EMAIL_USUARIO = json.email;
                    sessionStorage.NOME_USUARIO = json.nome;

                    setTimeout(function () {
                        window.location = "Login.html";
                    }, 1000); // apenas para exibir o loading
                });
            } else {
                console.log("Houve um erro ao tentar realizar o login!");
                resposta.text().then((texto) => {
                    console.error(texto);
                });
            }
        })
        .catch(function (erro) {
            console.log(erro);
        });

    return false;
}


function validarSessao() {
    aguardar();

   let login = sessionStorage.LOGIN_USUARIO;
   let nome = sessionStorage.NOME_USUARIO;

   let h1Titulo = document.getElementById("h1_titulo");

    if (login != null && nome != null) {
        // window.alert(`Seja bem-vindo, ${nome}!`);
        h1Titulo.innerHTML = `${login}`;

        finalizarAguardar();
    } else {
        window.location = "login.html";
    }
}
