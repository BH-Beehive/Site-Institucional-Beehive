var database = require("../database/config")
// Querys para verificação

function listarSetor() {
    console.log("ACESSEI O SETOR MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarSetor()");
    var instrucao = `
        SELECT nome_setor FROM setor;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarPorSetor(id_setor, tipo, idEmpresa) {
    console.log("ACESSEI O SETOR MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorSetor()", id_setor, tipo, idEmpresa);
    var instrucao = `
        SELECT host_name, nome_setor FROM setor JOIN maquina ON id_setor = fk_setor 
        JOIN empresa ON id_empresa = maquina.fk_empresa WHERE id_empresa = ${idEmpresa} AND tipo = "${tipo}" AND id_setor = ${id_setor};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function mostrarTotalMaquinas(id_empresa) {
    console.log("ACESSEI O SETOR MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function mostrarTotalMaquinas()", id_empresa);
    var instrucao = `
        select count(id_maquina) as 'totalMaquinas' from setor join maquina on id_setor = fk_setor 
        join empresa on id_empresa = maquina.fk_empresa where id_empresa = ${id_empresa} and tipo = "Maquina";
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function mostrarTotalServidor(id_empresa) {
    console.log("ACESSEI O SETOR MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function mostrarTotalServidor()", id_empresa);
    var instrucao = `
        select count(id_maquina) as 'totalServidor' from setor join maquina on id_setor = fk_setor 
        join empresa on id_empresa = maquina.fk_empresa where id_empresa = ${id_empresa} and tipo = "Servidor";
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}



// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrarSetor(nome,empresaId,nivel) {
    console.log("ACESSEI O SETOR MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarSetor():", nome,empresaId,nivel);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO setor (nome_setor,fk_empresa,nivel_prioridade) VALUES ('${nome}','${empresaId}','${nivel}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}



module.exports = {
    cadastrarSetor,
    mostrarTotalMaquinas,
    listarSetor,
    listarPorSetor,
    mostrarTotalServidor
};