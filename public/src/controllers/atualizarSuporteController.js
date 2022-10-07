let atualizarSuporteModel = require("../models/atualizarSuporteModel");

let sessoes = [];


function atualizarSuporte(req, res) {
    let nomeSuporte = req.body.nomeSuporteServer;
    let id = req.body.idServer;
    let senha = req.body.senhaServer;
    let slack = req.body.slackServer;
    let telefone = req.body.telefoneServer;
    let celular = req.body.celularServer;

    
    
    if (nomeSuporte == undefined) {
        res.status(400).send("O nome do suporte está undefined!");
    } else if (id == undefined) {
        res.status(400).send("Seu id está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (slack == undefined) {
        res.status(400).send("Seu slack está undefined!");
    } else if (telefone == undefined) {
        res.status(400).send("O id da telefone está undefined!");
    } else if (celular == undefined) {
        res.status(400).send("O id da celular está undefined!");
    }
    else {
        
        atualizarSuporteModel.atualizarSuporte(nomeSuporte, id, senha, slack, telefone, celular)
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

function pegarSuporte(req, res) {
    let id_empresa = req.query.idEmpresa
    console.log(req.query.idEmpresa)
    console.log(id_empresa, "id na controller")

    atualizarSuporteModel.pegarSuporte(id_empresa)
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
    atualizarSuporte,
    pegarSuporte
}