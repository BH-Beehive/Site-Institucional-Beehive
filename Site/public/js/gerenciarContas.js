function abrirModalSuporte() {
  var divModalSuporte = document.getElementById("divModalSuporte");
  divModalSuporte.style.display = "flex";
  var divModal = document.getElementById("divModalSuporteEditar");
  divModal.style.display = "none";
}

function fecharModalSuporte() {
  var divModalSuporte = document.getElementById("divModalSuporte");
  divModalSuporte.style.display = "none";
}

function abrirModalSuporteEditar() {
  var divModalSuporteEditar = document.getElementById("divModalSuporteEditar");
  divModalSuporteEditar.style.display = "flex";
  var divModalSuporte = document.getElementById("divModalSuporte");
  divModalSuporte.style.display = "none";
}

function fecharModalSuporteEditar() {
  var divModal = document.getElementById("divModalSuporteEditar");
  divModal.style.display = "none";
}


function cadastrarSuporte() {
  let nomeSuporteVar = inputNomeSuporte.value;
  let senhaVar = inputSenha.value;
  let emailSlackVar = inputEmailSlack.value;
  let telefoneVar = inputTel.value;
  let celularVar = inputCel.value;
  let cpfVar = inputCpf.value;
  let idEmpresaVar = sessionStorage.ID_EMPRESA;

  if (nomeSuporteVar == "" || senhaVar == "" || emailSlackVar == "" || cpfVar == "" || celularVar == "" || telefoneVar == "") {
    Swal.fire({
      icon: 'error',
      title: 'Preencha os campos!',
      text: 'Por favor, preencha os campos!',
    })
  }
  else if (emailSlackVar.indexOf('@' && '.com' && '.br') == - 1) {
    Swal.fire({
      icon: 'error',
      title: 'Email Inválido! por favor informe um e-mail seguindo os padrões de suporte',
      text: 'Por favor, informe um email válido!',
    })
  } else if (senhaVar.length < 8) {
    Swal.fire({
      icon: 'error',
      title: 'Senha inválida!',
      text: 'Digite uma senha maior que 7 digitos e com caracteres especiais!',
    })
  } else {

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
}

function editarSuporte() {
  let nomeSuporteVar = inputNomeSuporteEditar.value;
  let senhaVar = inputSenhaSuporteEditar.value;
  let cpfVar = inputCpfEditar.value;
  let emailSlackVar = inputEmailSuporteEditar.value;
  let telefoneVar = inputTelSuporteEditar.value;
  let celularVar = inputCelSuporteEditar.value;
  let idEmpresaVar = sessionStorage.ID_EMPRESA;


  if (nomeSuporteVar == "" || senhaVar == "" || emailSlackVar == "" || cpfVar == "" || celularVar == "" || telefoneVar == "") {
    Swal.fire({
      icon: 'error',
      title: 'Preencha os campos!',
      text: 'Por favor, preencha os campos!',
    })
  }
  else if (emailSlackVar.indexOf('@' && '.com') == - 1) {
    Swal.fire({
      icon: 'error',
      title: 'Email Inválido!',
      text: 'Por favor, informe um email válido!',
    })
  }else if (emailSlackVar.indexOf('.br') == - 1) {
      Swal.fire({
        icon: 'error',
        title: 'Email Inválido!',
        text: 'Por favor, informe um email válido!',
      })
  } else if (senhaVar.length < 8) {
    Swal.fire({
      icon: 'error',
      title: 'Senha inválida!',
      text: 'Digite uma senha maior que 7 digitos e com caracteres especiais!',
    })
  } else {



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

         window.location.reload(true);

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

        listarSuporte.innerHTML += `<tr>
              <th>#ID</th>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Mais</th>
              </tr>
            `

        for (var posicao = 0; posicao < resposta.length; posicao++) {
          // <div id="listarSuporte" class="listaSuporte">${resposta[posicao].nome_suporte}, ${resposta[posicao].email_slack}</div>
          listarSuporte.innerHTML += `
                    
                        <tr>
                       
                            <td>${posicao + 1}</td>
                            <td>${resposta[posicao].nome_suporte}</td>
                            <td id="idEmailSlack">${resposta[posicao].email_slack}</td>
                            <td><button class="button-table editar"><img class="icon-button-editar" src="assets/icons/icon_editar.png" onclick="abrirModalSuporteEditar()"></button>
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
function MascaraCpf(objeto, evt) {
  var theEvent = evt || window.event;
  var key = theEvent.keyCode || theEvent.which;
  key = String.fromCharCode(key);
  var regex = /^[0-9.]+$/;
  if (!regex.test(key)) {
    theEvent.returnValue = false;
    if (theEvent.preventDefault) theEvent.preventDefault();
  }

  if (objeto.value.length == 3)
    objeto.value = objeto.value + '.';
  if (objeto.value.length == 7)
    objeto.value = objeto.value + '.';
  if (objeto.value.length == 11)
    objeto.value = objeto.value + '-';
}


function validacaoModal() {
  let nome = inputNomeSuporteEditar.value
  let senha = inputSenhaSuporteEditar.value
  let email = inputEmailSuporteEditar.value
  let cpf = inputCpfEditar.value
  let celular = inputCelSuporteEditar.value
  let telefone = inputTelSuporteEditar.value


  if (nome == "" || senha == "" || email == "" || cpf == "" || celular == "" || telefone == "") {
    Swal.fire({
      icon: 'error',
      title: 'Preencha os campos!',
      text: 'Por favor, preencha os campos!',
    })
  }
  else if (email.indexOf('@' && '.com') == - 1) {
    Swal.fire({
      icon: 'error',
      title: 'Email Inválido!',
      text: 'Por favor, informe um email válido!',
    })
  } else if (senha < 8) {
    Swal.fire({
      icon: 'error',
      title: 'Senha inválida!',
      text: 'Digite uma senha maior que 7 digitos e com caracteres especiais!',
    })
  }
  else if (inputSenha.length < 8 || !regex.exec(inputSenha.value)) {
    Swal.fire({
      icon: 'error',
      title: 'Senha inválida!',
      text: 'Digite uma senha maior que 7 digitos e com caracteres especiais!',
    })
  }

}