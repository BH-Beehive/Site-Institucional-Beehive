let gerenciarContasModel = require("../models/gerenciarContasModel");

let sessoes = [];

function testar(req, res) {
    console.log("ENTRAMOS NA gerenciarContasController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function cadastrarSuporte(req, res) {
    let nomeSuporte = req.body.nomeSuporteServer;
    let senha = req.body.senhaServer;
    let emailSlack = req.body.emailSlackServer;
    let telefone = req.body.telefoneServer;
    let celular = req.body.celularServer;
    let cpf = req.body.cpfServer;
    let idEmpresa = req.body.idEmpresaServer;

    // Faça as validações dos valores
    if (nomeSuporte == undefined) {
        res.status(400).send("O nome do suporte está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (emailSlack == undefined) {
        res.status(400).send("Email slack está undefined!");
    } else if (telefone == undefined) {
        res.status(400).send("Número de telefone está undefined!");
    } else if (celular == undefined) {
        res.status(400).send("Número do celular está undefined!");
    } else if (cpf == undefined) {
        res.status(400).send("Seu cpf está undefined!");
    } else if (idEmpresa == undefined) {
        res.status(400).send("O id da empresa está undefined!");
    }
    else {
        
        gerenciarContasModel.cadastrarSuporte(nomeSuporte, senha, emailSlack, telefone, celular, cpf, idEmpresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function editarSuporte(req, res) {
    let nomeSuporte = req.body.nomeSuporteServer;
    let senha = req.body.senhaServer;
    let emailSlack = req.body.emailSlackServer;
    let telefone = req.body.telefoneServer;
    let celular = req.body.celularServer;
    let cpf = req.body.cpfServer;
    let idEmpresa = req.body.idEmpresaServer;

    // Faça as validações dos valores
    if (nomeSuporte == undefined) {
        res.status(400).send("O nome do suporte está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (emailSlack == undefined) {
        res.status(400).send("Email slack está undefined!");
    } else if (telefone == undefined) {
        res.status(400).send("Número de telefone está undefined!");
    } else if (celular == undefined) {
        res.status(400).send("Número do celular está undefined!");
    } else if (cpf == undefined) {
        res.status(400).send("Seu cpf está undefined!");
    } else if (idEmpresa == undefined) {
        res.status(400).send("O id da empresa está undefined!");
    }
    else {
        
        gerenciarContasModel.editarSuporte(nomeSuporte, senha, emailSlack, telefone, celular, cpf, idEmpresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao editar suporte! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function deletarSuporte(req, res) {
    let idSuporte = req.body.idSuporteServer;

    // Faça as validações dos valores
    if (idSuporte == undefined) {
        res.status(400).send("O id do suporte está undefined!");
    } 
    else {
        
        gerenciarContasModel.deletarSuporte(idSuporte)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao deletar suporte! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function listarSuporte(req, res) {
    var id_empresa = req.query.idEmpresa
    console.log(req.query.idEmpresa)
    console.log(id_empresa, "id na controller do dispositivo")

    gerenciarContasModel.listarSuporte(id_empresa)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    cadastrarSuporte,
    testar,
    editarSuporte,
    deletarSuporte,
    listarSuporte
}