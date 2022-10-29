var setorModel = require("../models/setorModel");

var sessoes = [];

function testar(req, res) {
    console.log("ENTRAMOS NA setorController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function mostrarTotalMaquinas(req, res) {
    var id_empresa = req.query.idEmpresa
    console.log(req.query.idEmpresa)
    console.log(id_empresa, "id na controller do setor")
    
    setorModel.mostrarTotalMaquinas(id_empresa)
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

function mostrarTotalServidor(req, res) {
    var id_empresa = req.query.idEmpresa
    console.log(req.query.idEmpresa)
    console.log(id_empresa, "id na controller do setor")
    
    setorModel.mostrarTotalServidor(id_empresa)
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

function cadastrarSetor(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    let nome = req.body.nomeServer;
    let idEmpresa = req.body.empresaServer;
    let nivel = req.body.nivelServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (idEmpresa == undefined) {
        res.status(400).send("Sua empresa está undefined!");
    } else if (nivel == undefined) {
        res.status(400).send("Seu nivel está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        setorModel.cadastrarSetor(nome, idEmpresa, nivel)
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
    cadastrarSetor,
    mostrarTotalMaquinas,
    mostrarTotalServidor  
}