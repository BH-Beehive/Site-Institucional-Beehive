var express = require("express");
var router = express.Router();

var setorController = require("../controllers/setorController");

router.get("/", function (req, res) {
    usuarioController.testar(req, res);
});

router.get("/listar", function (req, res) {
    usuarioController.listar(req, res);
});


//Recebendo os dados do html e direcionando para a função cadastrar de maquinaController.js
router.post("/setor", function (req, res) {
    setorController.setorMaquina(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.entrar(req, res);
});


module.exports = router;