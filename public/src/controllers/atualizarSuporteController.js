let atualizarSuporteModel = require("../models/atualizarSuporteModel");

let sessoes = [];


function atualizarSuporte(req, res) {
    let nomeSuporte = req.body.nomeSuporteServer;
    let email = req.body.emailServer;
    let senha = req.body.senhaServer;
    let slack = req.body.slackServer;
    let telefone = req.body.telefoneServer;
    let celular = req.body.celularServer;

    
    
    if (nomeSuporte == undefined) {
        res.status(400).send("O nome do suporte está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
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
        
        atualizarSuporteModel.atualizarSuporte(nomeSuporte, email, senha, slack, telefone, celular)
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

module.exports = {
    atualizarSuporte
}