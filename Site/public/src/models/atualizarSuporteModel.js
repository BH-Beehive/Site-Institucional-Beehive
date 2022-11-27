let database = require("../database/config")
// Querys para verificação

async function atualizarSuporte(nomeSuporte, id, senha, slack, telefone, celular, id_usuario) {
    console.log("ACESSEI O GERENCIAR CONTAS MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarSuporte():", nomeSuporte, id, senha, slack, telefone, celular, id_usuario);
    
    let instrucao = `
        UPDATE usuario_suporte SET senha = '${senha}', telefone = '${telefone}', celular = '${celular}'
         WHERE id_usuario = '${id_usuario}';
    `;
    await database.executar(instrucao);
}

function pegarSuporte(id_usuario) {
    console.log("ACESSEI O GERENCIAR CONTAS MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarSuporte()", id_usuario);
    let instrucao = `
        SELECT * FROM usuario_suporte WHERE id_usuario = '${id_usuario}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    atualizarSuporte,
    pegarSuporte
};