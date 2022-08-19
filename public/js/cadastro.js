function revelar() {
    var senha_revel = document.getElementById("inputSenha");

    if (senha_revel.type == "password") {
        senha_revel.type = "text";
    }
    else {
        senha_revel.type = "password";
    }
}

var etapa = 0;

function proximaEtapa() {
    if (etapa == 0) {
        for (var contador = 1; contador > etapa; etapa++){
            console.log(contador)
        campoCadastro1.style.display = "none";
        campoCadastro2.style.display = "";
    }
}
}
function anteriorEtapa() {
    if (etapa == 1) {
        for (var contador = 1; contador == etapa; etapa--) {
            campoCadastro2.style.display = "none";
            campoCadastro1.style.display = "";
        }
    }
}


//Depois o Andre termina\\\\\
function pesquisarCep() {

    var cep = valor.replace(/\D/g, '');

    if (cep != "") {

        var validacep = /^[0-9]{8}$/;

        if (validacep.teste(cep)) {

            document.getElementById('')
        }
    }
}