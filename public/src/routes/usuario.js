let express = require("express");
let router = express.Router();

let usuarioController = require("../controllers/usuarioController");

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


module.exports = router; 