var database = require("../database/config")
// Querys para verificação
function listarMaquinas(id_empresa) {
    console.log("ACESSEI O MAQUINA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarMaquinas()", id_empresa);
    var instrucao = `
    SELECT host_name , nome_setor FROM setor JOIN maquina on id_setor = fk_setor 
    JOIN empresa on id_empresa = maquina.fk_empresa WHERE id_empresa = ${id_empresa} and tipo = "Maquina";
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarInformacoesMaquina(id_empresa, host_name) {
    console.log("ACESSEI O MAQUINA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarMaquinas()", id_empresa, host_name);
    var instrucao = `
    SELECT processador, arquitetura, sistema_operacional FROM setor JOIN maquina on id_setor = fk_setor 
    JOIN empresa on id_empresa = maquina.fk_empresa WHERE id_empresa = ${id_empresa} and host_name = "${host_name}";
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarDadosMaquina(host_name) {
    console.log("ACESSEI O MAQUINA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarDadosMaquinas()",host_name);
    var instrucao = `
    SELECT ROUND(((disco_uso*100)/disco_total),0) as "disco_uso",ROUND(((memoria_uso*100)/memoria_total),0) as "memoria_uso" , cpu_uso FROM registro JOIN maquina on id_maquina = fk_maquina WHERE host_name = '${host_name}' order by id_registro desc limit 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarServidor(id_empresa) {
    console.log("ACESSEI O MAQUINA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarServidor()", id_empresa);
    var instrucao = `
    SELECT host_name , nome_setor FROM setor JOIN maquina on id_setor = fk_setor 
    JOIN empresa on id_empresa = maquina.fk_empresa WHERE id_empresa = ${id_empresa} and tipo = "Servidor";
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrarMaquina(hostname, token, tipo, empresaId, setor) {
    console.log("ACESSEI O MAQUINA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarMaquina():", hostname, token, tipo, empresaId, setor);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO maquina (host_name, token_acesso, token_ativo, tipo, fk_empresa, fk_setor) VALUES ('${hostname}', '${token}', '${tipo}', 'false', '${empresaId}',${setor});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}



module.exports = {
    cadastrarMaquina,
    listarMaquinas,
    listarServidor,
    listarInformacoesMaquina,
    listarDadosMaquina
};