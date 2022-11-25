let registroModel = require("../models/registroModel");

let sessoes = [];

function registroPizzaMaquina(req, res) {
    let id_empresa = req.query.idEmpresa
    let mesAtual = req.query.mes_atual
    let diaAtual = req.query.dia_atual;
    
  
    registroModel.registroPizzaMaquina(id_empresa,mesAtual,diaAtual)
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
    let id_empresa = req.query.idEmpresa
    let mesAtual = req.query.mes_atual
    let diaAtual = req.query.dia_atual;
    
    registroModel.registroPizzaServidor(id_empresa,mesAtual,diaAtual)
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
    let id_empresa = req.query.idEmpresa
    let setor = req.query.nomeSetor
    let mesAtual = req.query.mes_atual
    let diaAtual = req.query.dia_atual;
    
    registroModel.registroPizzaMaquinaPorSetor(id_empresa,setor,mesAtual,diaAtual)
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
    let id_empresa = req.query.idEmpresa
    let setor = req.query.nomeSetor
    let mesAtual = req.query.mes_atual
    let diaAtual = req.query.dia_atual;
    console.log(req.query.idEmpresa)
    console.log(req.query.nomeSetor)
    console.log(id_empresa, setor,  "id na controller do registro")
    
    registroModel.registroPizzaServidorPorSetor(id_empresa,setor,mesAtual,diaAtual)
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

function registroGraficoLinhaTempo(req, res) {
    let hostName = req.params.hostNameMaq;
    
    
    console.log(hostName,  "hostName na controller do registro")
    
    registroModel.registroGraficoLinhaTempo(hostName)
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

function registroGraficoLinhaCPU(req, res) {
    let hostName = req.params.hostName;
    
    console.log(hostName,  "hostName na controller do registro")
    
    registroModel.registroGraficoLinhaCPU(hostName)
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
function registroGraficoLinhaRAM(req, res) {
    let hostName = req.params.host_name;
    
    console.log(hostName,  "hostName na controller do registro")
    
    registroModel.registroGraficoLinhaRAM(hostName)
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
function registroGraficoLinhaDisco(req, res) {
    let hostName = req.query.host_name;
    
    console.log(hostName,  "hostName na controller do registro")
    
    registroModel.registroGraficoLinhaDisco(hostName)
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

function historicoMensal(req, res) {
    let mesAtual = req.query.mes_atual;
    let hostName = req.query.host_name;
    
    console.log(mesAtual,  "mesAtual na controller do registro")
    
    registroModel.historicoMensal(mesAtual,hostName)
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
    registroPizzaServidorPorSetor,
    registroGraficoLinhaTempo,
    registroGraficoLinhaCPU,
    registroGraficoLinhaRAM,
    registroGraficoLinhaDisco,
    historicoMensal
    
}