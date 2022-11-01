var express = require("express");
var router = express.Router();

var setorController = require("../controllers/setorController");

router.get("/", function (req, res) {
    usuarioController.testar(req, res);
});

router.get("/mostrarTotalMaquinas", function (req, res) {
    setorController.mostrarTotalMaquinas(req, res);
});

router.get("/mostrarTotalServidor", function (req, res) {
    setorController.mostrarTotalServidor(req, res);
});


//Recebendo os dados do html e direcionando para a função cadastrar de maquinaController.js
router.post("/cadastrarSetor", function (req, res) {
    setorController.cadastrarSetor(req, res);
})

router.get("/listarSetor", function (req, res) {
    setorController.listarSetor(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.entrar(req, res);
});


module.exports = router;