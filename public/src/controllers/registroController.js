var registroModel = require("../models/registroModel");

var sessoes = [];

function registroPizzaMaquina(req, res) {
    var id_empresa = req.query.idEmpresa
    console.log(req.query.idEmpresa)
    console.log(id_empresa, "id na controller do registro")
    
    registroModel.registroPizzaMaquina(id_empresa)
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

function registroPizzaServidor(req, res) {
    var id_empresa = req.query.idEmpresa
    console.log(req.query.idEmpresa)
    console.log(id_empresa, "id na controller do registro")
    
    registroModel.registroPizzaServidor(id_empresa)
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

function registroPizzaMaquinaPorSetor(req, res) {
    var id_empresa = req.query.idEmpresa
    var setor = req.query.nomeSetor
    console.log(req.query.idEmpresa)
    console.log(req.query.nomeSetor)
    console.log(id_empresa, setor,  "id na controller do registro")
    
    registroModel.registroPizzaMaquinaPorSetor(id_empresa, setor)
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

function registroPizzaServidorPorSetor(req, res) {
    var id_empresa = req.query.idEmpresa
    var setor = req.query.nomeSetor
    console.log(req.query.idEmpresa)
    console.log(req.query.nomeSetor)
    console.log(id_empresa, setor,  "id na controller do registro")
    
    registroModel.registroPizzaServidorPorSetor(id_empresa, setor)
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
    registroPizzaMaquina,
    registroPizzaServidor,
    registroPizzaMaquinaPorSetor,
    registroPizzaServidorPorSetor
}