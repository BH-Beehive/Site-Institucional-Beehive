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
    aguardar();

    let formulario = new URLSearchParams(new FormData(document.getElementById("form_login")));

    console.log("FORM LOGIN: ", formulario.get("login"));
    console.log("FORM SENHA: ", formulario.get("senha"));

    fetch("/usuario/autenticar", {
        method: "POST",
        body: formulario
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));

                sessionStorage.LOGIN_USUARIO = json.login;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.ID_USUARIO = json.id;

                setTimeout(function () {
                    window.location = "/index.html";
                }, 1000);
            });

        } else {

            console.log("Erro de login!");

            resposta.text().then(texto => {
                console.error(texto);
                
                finalizarAguardar(texto);
                
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

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

function sair() {
    aguardar();
    sessionStorage.clear();
    finalizarAguardar();
    window.location = "login.html";
}