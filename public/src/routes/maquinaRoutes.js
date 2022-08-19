var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/maquinaController");

router.get("/", function (req, res) {
    usuarioController.testar(req, res);
});

router.get("/listar", function (req, res) {
    usuarioController.listar(req, res);
});

router.get("/calcularAcerto/:fkUsuario", function (req, res) {
    usuarioController.calcularAcerto(req, res);
});
router.get("/selecionarTop10", function (req, res) {
    usuarioController.selecionarTop10(req, res);
});
router.get("/verHistorico/:fkUsuario", function (req, res) {
    usuarioController.verHistorico(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.entrar(req, res);
});
router.post("/enviarPontos", function (req, res) {
    usuarioController.enviarPontos(req, res);
});

module.exports = router;