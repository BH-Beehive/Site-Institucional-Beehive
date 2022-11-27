let usuarioModel = require("../models/usuarioModel");

let sessoes = [];

function testar(req, res) {
    console.log("ENTRAMOS NA usuarioController");
    res.json("ESTAMOS FUNCIONANDO!");
}


function entrar(req, res) {

    let email = req.body.emailServer;
    let senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.entrar(email, senha)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                        Swal.fire({
                            icon: 'error',
                            title: 'Mais de um usuário com o mesmo login e senha!',
                            text: 'Por favor, verfique as informações e tente novamente!'
                        })
                        
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function entrarSuporte(req, res) {

    let email = req.body.emailServer;
    let senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.entrarSuporte(email, senha)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                        Swal.fire({
                            icon: 'error',
                            title: 'Mais de um usuário com o mesmo login e senha!',
                            text: 'Por favor, verfique as informações e tente novamente!'
                        })
                        
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}


function cadastrar(req, res) {
    let email = req.body.emailServer;
    let senha = req.body.senhaServer;
    let nome = req.body.nomeServer;
    let cnpj = req.body.cnpjServer;
    let celular = req.body.celularServer;
    let telefone = req.body.telefoneServer;
    let cep = req.body.cepServer;
    let estado = req.body.estadoServer;
    let cidade = req.body.cidadeServer;
    let nomeRua = req.body.ruaServer;

    // Faça as validações dos valores
    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (cnpj == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    } else if (celular == undefined) {
        res.status(400).send("Seu celular está undefined!");
    }else if (telefone == undefined) {
        res.status(400).send("Seu telefone está undefined!");
    }else if (cep == undefined) {
        res.status(400).send("Sua cep está undefined!");
    } else if (estado == undefined) {
        res.status(400).send("Sua estado está undefined!");
    } else if (cidade == undefined) {
        res.status(400).send("Sua cidade está undefined!");
    } else if (nomeRua == undefined) {
        res.status(400).send("Sua rua está undefined!");
    }
    else {
        
        usuarioModel.cadastrar(nome, cnpj, telefone, celular, email, senha, cep, estado, cidade, nomeRua)
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

function validarEmail(req, res) {
    var email = req.body.emailServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else {
        usuarioModel.validarEmail(email)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(409).json(resultado);
            } else {
                res.status(200).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta do email! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
    }
}

function validarCnpj(req, res) {
    var cnpj = req.body.cnpjServer;

    if (cnpj == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    } else {
        usuarioModel.validarCnpj(cnpj)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(409).json(resultado);
            } else {
                res.status(200).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta do cnpj! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
    }
}

function validarCelular(req, res) {
    var celular = req.body.celularServer;

    if (celular == undefined) {
        res.status(400).send("Seu celular está undefined!");
    } else {
        usuarioModel.validarCelular(celular)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(409).json(resultado);
            } else {
                res.status(200).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta do cnpj! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
    }
}

function validarTelefone(req, res) {
    var telefone = req.body.telefoneServer;

    if (telefone == undefined) {
        res.status(400).send("Seu telefone está undefined!");
    } else {
        usuarioModel.validarTelefone(telefone)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(409).json(resultado);
            } else {
                res.status(200).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta do cnpj! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
    }
}


module.exports = {
    entrar,
    entrarSuporte,
    validarEmail,
    validarCnpj,
    validarCelular,
    validarTelefone,
    cadastrar,
    testar,
}