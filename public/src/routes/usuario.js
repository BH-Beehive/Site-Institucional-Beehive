let express = require("express");
let router = express.Router();

let usuarioController = require("../controllers/usuarioController");
let gerenciarContasController = require("../controllers/gerenciarContasController")
let atualizarSuporteController = require("../controllers/atualizarSuporteController");

router.get("/", function (req, res) {
    usuarioController.testar(req, res);
});

router.get("/listar", function (req, res) {
    usuarioController.listar(req, res);
});

router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/validarEmail", function (req, res) {
    usuarioController.validarEmail(req, res);
});

router.post("/validarCelular", function (req, res) {
    usuarioController.validarCelular(req, res);
});

router.post("/validarTelefone", function (req, res) {
    usuarioController.validarTelefone(req, res);
});

router.post("/validarCnpj", function (req, res) {
    usuarioController.validarCnpj(req, res);
});


router.post("/autenticar", function (req, res) {
    usuarioController.entrar(req, res);
});

router.post("/cadastrarSuporte", function (req, res) {
    gerenciarContasController.cadastrarSuporte(req, res);
})

router.put("/editarSuporte", function (req, res) {
    gerenciarContasController.editarSuporte(req, res);
})

router.put("/deletarSuporte", function (req, res) {
    gerenciarContasController.deletarSuporte(req, res);
})

router.get("/listarSuporte", function (req, res) {
    gerenciarContasController.listarSuporte(req, res);
});

router.put("/atualizarSuporte", function (req, res) {
    atualizarSuporteController.atualizarSuporte(req, res);
})



module.exports = router; 