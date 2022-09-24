let database = require("../database/config")
// Querys para verificação

async function cadastrarSuporte(nomeSuporte, email, senha, cpf, idEmpresa) {
    console.log("ACESSEI O GERENCIAR CONTAS MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarSuporte():", nomeSuporte, email, senha, cpf, idEmpresa);
    
    let instrucao = `
        INSERT INTO usuario_suporte(nome_suporte, email, senha, cpf, fk_empresa)
        VALUES ('${nomeSuporte}', '${email}', '${senha}', '${cpf}', ${idEmpresa});
    `;
    await database.executar(instrucao);
}

module.exports = {
    cadastrarSuporte
};