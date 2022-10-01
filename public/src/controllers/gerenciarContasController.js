let usuarioModel = require("../models/gerenciarContasModel");

let sessoes = [];

function testar(req, res) {
    console.log("ENTRAMOS NA gerenciarContasController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function cadastrarSuporte(req, res) {
    let nomeSuporte = req.body.nomeSuporteServer;
    let email = req.body.emailServer;
    let senha = req.body.senhaServer;
    let emailSlack = req.body.emailSlackServer;
    let telefone = req.body.telefoneServer;
    let celular = req.body.celularServer;
    let cpf = req.body.cpfServer;
    let idEmpresa = req.body.idEmpresaServer;

    // Faça as validações dos valores
    if (nomeSuporte == undefined) {
        res.status(400).send("O nome do suporte está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
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
        
        usuarioModel.cadastrar(nomeSuporte, email, senha, emailSlack, telefone, celular, cpf, idEmpresa)
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
    let email = req.body.emailServer;
    let senha = req.body.senhaServer;
    let emailSlack = req.body.emailSlackServer;
    let telefone = req.body.telefoneServer;
    let celular = req.body.celularServer;
    let cpf = req.body.cpfServer;
    let idEmpresa = req.body.idEmpresaServer;

    // Faça as validações dos valores
    if (nomeSuporte == undefined) {
        res.status(400).send("O nome do suporte está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
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
        
        usuarioModel.cadastrar(nomeSuporte, email, senha, emailSlack, telefone, celular, cpf, idEmpresa)
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

function deletarSuporte(req, res) {
    let emailSlack = req.body.emailSlackServer;

    // Faça as validações dos valores
    if (emailSlack == undefined) {
        res.status(400).send("Email slack está undefined!");
    } 
    else {
        
        usuarioModel.cadastrar(emailSlack)
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
    cadastrarSuporte,
    testar,
    editarSuporte,
    deletarSuporte
}