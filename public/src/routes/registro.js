var express = require("express");
var router = express.Router();

var registroController = require("../controllers/registroController");

router.get("/registroPizzaMaquina", function (req, res) {
    registroController.registroPizzaMaquina(req, res);
});

router.get("/registroPizzaServidor", function (req, res) {
    registroController.registroPizzaServidor(req, res);
});

router.get("/registroPizzaMaquinaPorSetor", function (req, res) {
    registroController.registroPizzaMaquinaPorSetor(req, res);
});

router.get("/registroPizzaServidorPorSetor", function (req, res) {
    registroController.registroPizzaServidorPorSetor(req, res);
});

module.exports = router;