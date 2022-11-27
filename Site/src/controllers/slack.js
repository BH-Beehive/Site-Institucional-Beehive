const slackService = require("../../public/js/slack");

function hello(req, res) {
    let nome = req.body.nomeServer;
    let tipo = req.body.tipoServer;
    let token = req.body.tokenServer;
    let setor = req.body.setorServer;

    console.log("console do payload do slack: " + nome)
    slackService.postTextMessage({
        channel: "geral", // Canal de sua preferência
        text: tipo + " : " + nome + " foi cadastrado \nSetor: "+setor+"\npara iniciar insira o token: " + token
    });
    res.status(200).json({ message: "Mensagem enviada com sucesso!" });
}


module.exports = {
    hello
}