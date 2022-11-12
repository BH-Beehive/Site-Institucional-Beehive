function abrirModalSuporte(){
    var divModalSuporte = document.getElementById("divModalSuporte");
    divModalSuporte.style.display = "flex";
    }

    function fecharModalSuporte(){
    var divModalSuporte = document.getElementById("divModalSuporte");
    divModalSuporte.style.display = "none";
    }

function cadastrarSuporte() {
    let nomeSuporteVar = inputNomeSuporte.value;
    let senhaVar = inputSenha.value;
    let emailSlackVar = inputEmailSlack.value;
    let telefoneVar = inputTel.value;
    let celularVar = inputCel.value;
    let cpfVar = inputCpf.value;
    let idEmpresaVar = sessionStorage.ID_EMPRESA;
    
    console.log(nomeSuporteVar, senhaVar, emailSlackVar, telefoneVar, celularVar, cpfVar, idEmpresaVar)


    fetch("/usuario/cadastrarSuporte", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeSuporteServer: nomeSuporteVar,
            senhaServer: senhaVar,
            emailSlackServer: emailSlackVar,
            telefoneServer: telefoneVar,
            celularServer: celularVar,
            cpfServer: cpfVar,
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
                window.location = "gerenciarContas.html";
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
    let senhaVar = inputSenha.value;
    let cpfVar = inputCpf.value;
    let emailSlackVar = inputEmailSlack.value;
    let telefoneVar = inputTelefone.value;
    let celularVar = inputCelular.value;
    let idEmpresaVar = sessionStorage.ID_EMPRESA;
    
    console.log(nomeSuporteVar, senhaVar, emailSlackVar, telefoneVar, celularVar, cpfVar, idEmpresaVar)


    fetch("/usuario/editarSuporte", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeSuporteServer: nomeSuporteVar,
            senhaServer: senhaVar,
            emailSlackServer: emailSlackVar,
            telefoneServer: telefoneVar,
            celularServer: celularVar,
            cpfServer: cpfVar,
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
                window.location = "gerenciarContas.html";
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

function deletarSuporte(idSuporte) {
    
    console.log(idSuporte)

    Swal.fire({
        title: 'Deseja excluir?',
        text: "Você não poderá reverter isso",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, excluir!'
      }).then((result) => {
        if (result.isConfirmed) {
          fetch("/usuario/deletarSuporte", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idSuporteServer: idSuporte
            })
          }).then(function (resposta) {
            if (resposta.status == 200) {
              Swal.fire(
                'OK!',
                'Suporte excluido com sucesso!',
                'success'
              )
            }
          }).catch(function (erro) {
            console.log(erro);
          })
        }
      })
}

function listandoSuportes() {
        listarSuporte.innerHTML = ''
        let idEmpresa = sessionStorage.ID_EMPRESA
        fetch(`/usuario/listarSuporte?idEmpresa=${idEmpresa}`).then(function (resposta) {
          if (resposta.ok) {
            resposta.json().then(function (resposta) {
              for (var posicao = 0; posicao < resposta.length; posicao++) {
                // <div id="listarSuporte" class="listaSuporte">${resposta[posicao].nome_suporte}, ${resposta[posicao].email_slack}</div>
                listarSuporte.innerHTML += `
                    
                        <tr>
                            <td>${posicao + 1}</td>
                            <td>${resposta[posicao].nome_suporte}</td>
                            <td id="idEmailSlack">${resposta[posicao].email_slack}</td>
                            <td><button class="button-table editar"><img class="icon-button-editar" src="assets/icons/icon_editar.png"></button>
                                <button class="button-table excluir"><img class="icon-button-deletar" src="assets/icons/icon_deletar.png" onclick="deletarSuporte(${resposta[posicao].id_usuario})"></button>
                            </td>
                        </tr>

                    `
              }
            });
          } else {
            console.log("Houve um erro ao tentar listar suportes!");
            resposta.text().then(texto => {
              console.error(texto);
            });
          }
        })
}