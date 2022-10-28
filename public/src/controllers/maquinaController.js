var maquinaModel = require("../models/maquinaModel");

var sessoes = [];

function testar(req, res) {
    console.log("ENTRAMOS NA maquinaController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function listar(req, res) {
    usuarioModel.listar()
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


function cadastrarMaquina(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    let hostname = req.body.hostNameServer;
    let token = req.body.tokenServer;
    let tipo = req.body.tipoServer;
    let empresaId = req.body.empresaServer;
    let setor = req.body.setorServer;

    // Faça as validações dos valores
    if (hostname == undefined) {
        res.status(400).send("Seu hostname está undefined!");
    } else if (token == undefined) {
        res.status(400).send("Seu token está undefined!");
    } else if (tipo == undefined) {
        res.status(400).send("Sua tipo está undefined!");
    } else if (empresaId == undefined) {
        res.status(400).send("Sua empresa está undefined!");
    } else if (setor == undefined) {
        res.status(400).send("Seu setor está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        maquinaModel.cadastrar(hostname, token, tipo, empresaId, setor)
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
    cadastrarMaquina,
    listar,
    testar
}