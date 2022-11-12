let database = require("../database/config")
// Querys para verificação

async function cadastrarSuporte(nomeSuporte, senha, emailSlack, telefone, celular, cpf, idEmpresa) {
    console.log("ACESSEI O GERENCIAR CONTAS MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarSuporte():", nomeSuporte, senha, emailSlack, telefone, celular, cpf, idEmpresa);
    
    let instrucao = `
        INSERT INTO usuario_suporte(nome_suporte,email_slack,senha, telefone, celular, cpf, fk_empresa)
        VALUES ('${nomeSuporte}', '${emailSlack}', '${senha}', '${telefone}', '${celular}', '${cpf}', ${idEmpresa});
    `;
    await database.executar(instrucao);
}

async function editarSuporte(nomeSuporte, senha, emailSlack, telefone, celular, cpf, idEmpresa) {
    console.log("ACESSEI O GERENCIAR CONTAS MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editarSuporte():", nomeSuporte, senha, emailSlack, telefone, celular, cpf, idEmpresa);
    
    let instrucao = `
        UPDATE usuario_suporte SET  nome_suporte = '${nomeSuporte}', senha = '${senha}', email_slack = '${emailSlack}', 
        telefone = '${telefone}',  celular = '${celular}', cpf = '${cpf}' WHERE fk_empresa = ${idEmpresa};
    `;
    await database.executar(instrucao);
}

async function deletarSuporte(idSuporte) {
    console.log("ACESSEI O GERENCIAR CONTAS MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletarSuporte():", idSuporte);
    
    let instrucao = `
        DELETE FROM usuario_suporte WHERE id_usuario = '${idSuporte}';
    `;
    await database.executar(instrucao);
}

function listarSuporte(id_empresa) {
    console.log("ACESSEI O GERENCIAR CONTAS MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarSuporte()", id_empresa);
    let instrucao = `
        SELECT nome_suporte, email_slack, id_usuario FROM usuario_suporte WHERE fk_empresa = ${id_empresa};
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