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

function maquinaCritica(idEmpresa,mesAtual,diaAtual) {
    console.log("ACESSEI O MAQUINA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function maquinaCritica()", idEmpresa,mesAtual,diaAtual);
    var instrucao = `
    select host_name as 'maquina' , DATE_FORMAT(data_registro,'%d %M %Y %H:%i:%s') as 'data' from setor join maquina on id_setor = fk_setor 
        join empresa on id_empresa = maquina.fk_empresa
        join registro on id_maquina = fk_maquina where id_empresa = ${idEmpresa}  and tipo = "maquina" and tipo_alerta = "Vermelho" and  date_format(data_registro, '%d-%m') = '${diaAtual}-${mesAtual}' group by host_name order by id_registro desc limit 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function servidorCritica(idEmpresa,mesAtual,diaAtual) {
    console.log("ACESSEI O MAQUINA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function maquinaCritica()", idEmpresa,mesAtual,diaAtual);
    var instrucao = `
    select host_name as 'maquina' , DATE_FORMAT(data_registro,'%d %M %Y %H:%i:%s') as 'data' from setor join maquina on id_setor = fk_setor 
        join empresa on id_empresa = maquina.fk_empresa
        join registro on id_maquina = fk_maquina where id_empresa = ${idEmpresa}  and tipo = "servidor" and tipo_alerta = "Vermelho" and  date_format(data_registro, '%d-%m') = '${diaAtual}-${mesAtual}' group by host_name order by id_registro desc limit 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarInformacoesMaquina(id_empresa, host_name) {
    console.log("ACESSEI O MAQUINA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarMaquinas()", id_empresa, host_name);
    var instrucao = `
    SELECT processador, arquitetura, sistema_operacional,ROUND(disco_total/1000) as "disco_total" FROM setor JOIN maquina on id_setor = fk_setor 
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

async function editarMaquina(hostNameNovo,tipo,fkSetor,hostNameAntigo, idEmpresa) {
    console.log("ACESSEI O GERENCIAR CONTAS MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editarMaquina():", hostNameNovo,tipo,fkSetor,hostNameAntigo, idEmpresa);
    
    let instrucao = `
    UPDATE maquina SET  host_name = '${hostNameNovo}', tipo = '${tipo}', fk_setor = ${fkSetor}  WHERE host_name = '${hostNameAntigo}' and fk_empresa = ${idEmpresa};
    `;
    await database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrarMaquina(hostname, token, tipo, empresaId, setor) {
    console.log("ACESSEI O MAQUINA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarMaquina():", hostname, token, tipo, empresaId, setor);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO maquina (host_name, token_acesso, token_ativo, tipo, fk_empresa, fk_setor) VALUES ('${hostname}', '${token}', false, '${tipo}','${empresaId}',${setor});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}



module.exports = {
    cadastrarMaquina,
    listarMaquinas,
    listarServidor,
    listarInformacoesMaquina,
    listarDadosMaquina,
    maquinaCritica,
    servidorCritica,
    editarMaquina
};