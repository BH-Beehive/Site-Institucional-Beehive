let database = require("../database/config")
// Querys para verificação
function listar() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    let instrucao = `
        SELECT * FROM usuario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function entrar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    let instrucao = `
        SELECT * FROM empresa WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function entrarSuporte(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    let instrucao = `
        SELECT * FROM usuario_suporte WHERE email_slack = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

 async function cadastrar(nome, cnpj, telefone, celular, email, senha, cep, nomeRua, estado, cidade) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, cnpj, telefone, celular, email, senha, cep, nomeRua, estado, cidade);
    
    let instrucao = `
        INSERT INTO empresa (nome_empresa, cnpj, telefone_fixo, telefone_celular, email, senha, cep, logradouro, estado, cidade)
         VALUES ('${nome}', '${cnpj}', '${telefone}', '${celular}', '${email}', '${senha}', '${cep}', '${cidade}', '${estado}', '${nomeRua}');
    `;
    await database.executar(instrucao);
}

function validarEmail(email){
    let instrucao = `SELECT email FROM empresa WHERE email = '${email}';`;
    return database.executar(instrucao);
}

function validarCnpj(cnpj){
    let instrucao = `SELECT cnpj FROM empresa WHERE cnpj = '${cnpj}';`;
    return database.executar(instrucao);
}

function validarCelular(celular){
    let instrucao = `SELECT telefone_celular FROM empresa WHERE telefone_celular = '${celular}';`;
    return database.executar(instrucao);
}

function validarTelefone(telefone){
    let instrucao = `SELECT telefone_fixo FROM empresa WHERE telefone_fixo = '${telefone}';`;
    return database.executar(instrucao);
}


module.exports = {
    entrar,
    entrarSuporte,
    validarEmail,
    validarCnpj,
    validarCelular,
    validarTelefone,
    cadastrar,
    listar
};