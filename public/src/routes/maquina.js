var express = require("express");
var router = express.Router();

var maquinaController = require("../controllers/maquinaController");

router.get("/", function (req, res) {
    usuarioController.testar(req, res);
});

router.get("/listarMaquinas", function (req, res) {
    maquinaController.listarMaquinas(req, res);
});

router.get("/contarSetores", function (req, res) {
    maquinaController.contarSetores(req, res);
});

router.get("/listarServidor", function (req, res) {
    maquinaController.listarServidor(req, res);
});

router.get("/listarInformacoesMaquina", function (req, res) {
    maquinaController.listarInformacoesMaquina(req, res);
});

router.get("/listarDadosMaquina", function (req, res) {
    maquinaController.listarDadosMaquina(req, res);
});

router.get("/maquinaCritica", function (req, res) {
    maquinaController.maquinaCritica(req, res);
});

router.get("/servidorCritica", function (req, res) {
    maquinaController.servidorCritica(req, res);
});

router.post("/editarMaquina", function (req, res) {
    maquinaController.editarMaquina(req, res);
})


//Recebendo os dados do html e direcionando para a função cadastrar de maquinaController.js
router.post("/cadastrarMaquina", function (req, res) {
    maquinaController.cadastrarMaquina(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.entrar(req, res);
});


module.exports = router;