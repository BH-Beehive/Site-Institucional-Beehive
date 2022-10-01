let database = require("../database/config")
// Querys para verificação

async function cadastrarSuporte(nomeSuporte, email, senha, emailSlack, telefone, celular, cpf, idEmpresa) {
    console.log("ACESSEI O GERENCIAR CONTAS MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarSuporte():", nomeSuporte, email, senha, emailSlack, telefone, celular, cpf, idEmpresa);
    
    let instrucao = `
        INSERT INTO usuario_suporte(nome_suporte, email, senha, email_slack, telefone, celular, cpf, fk_empresa)
        VALUES ('${nomeSuporte}', '${email}', '${senha}', '${emailSlack}', '${telefone}', '${celular}', '${cpf}', ${idEmpresa});
    `;
    await database.executar(instrucao);
}

async function editarSuporte(nomeSuporte, email, senha, emailSlack, telefone, celular, cpf, idEmpresa) {
    console.log("ACESSEI O GERENCIAR CONTAS MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editarSuporte():", nomeSuporte, email, senha, emailSlack, telefone, celular, cpf, idEmpresa);
    
    let instrucao = `
        UPDATE usuario_suporte SET  nome_suporte = '${nomeSuporte}', email = '${email}', senha = '${senha}', email_slack = '${emailSlack}', 
        telefone = '${telefone}',  celular = '${celular}', cpf = '${cpf}' WHERE fk_empresa = ${idEmpresa};
    `;
    await database.executar(instrucao);
}

async function deletarSuporte(emailSlack) {
    console.log("ACESSEI O GERENCIAR CONTAS MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletarSuporte():", emailSlack);
    
    let instrucao = `
        DELETE FROM usuario_suporte WHERE email_slack = '${emailSlack}';
    `;
    await database.executar(instrucao);
}

function listarSuporte(id_empresa) {
    console.log("ACESSEI O GERENCIAR CONTAS MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarSuporte()", id_empresa);
    let instrucao = `
        SELECT nome_suporte, email_slack FROM usuario_suporte WHERE ${id_empresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrarSuporte,
    editarSuporte,
    deletarSuporte,
    listarSuporte
};