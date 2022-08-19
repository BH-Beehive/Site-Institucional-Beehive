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


function limpa_formulário_cep() {

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

        limpa_formulário_cep();
        alert("CEP não encontrado.");
    }
}

function pesquisacep(valor) {

    var cep = valor.replace(/\D/g, '');

    if (cep != "") {

        var validacep = /^[0-9]{8}$/;

        if (validacep.test(cep)) {

            document.getElementById('inputCidade').value = "...";
            document.getElementById('inputEstado').value = "...";
            document.getElementById('inputRua').value = "...";

            var script = document.createElement('script');

            script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';
            document.body.appendChild(script);
        }
        else {

            limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    }
    else {

        limpa_formulário_cep();
    }
};