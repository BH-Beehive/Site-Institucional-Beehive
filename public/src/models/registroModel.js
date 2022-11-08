var database = require("../database/config")

function registroPizzaMaquina(id_empresa) {
    console.log("ACESSEI O REGISTRO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function registroPizzaMaquina()", id_empresa);
    var instrucao = `
        select id_maquina as 'idMaquina', tipo_alerta as 'alerta' from setor join maquina on id_setor = fk_setor 
        join empresa on id_empresa = maquina.fk_empresa
        join registro on id_maquina = fk_maquina where id_empresa = ${id_empresa} and tipo = 'maquina' group by id_maquina;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function registroPizzaMaquinaPorSetor(id_empresa, setor) {
    console.log("ACESSEI O SETOR MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function registroPizzaMaquinaPorSetor()", id_empresa, setor);
    var instrucao = `
        select id_maquina as 'idMaquina', tipo_alerta as 'alerta' from setor join maquina on id_setor = fk_setor 
        join empresa on id_empresa = maquina.fk_empresa
        join registro on id_maquina = fk_maquina where id_empresa = ${id_empresa} and tipo = 'maquina' and id_setor = ${setor} group by id_maquina;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}



function registroPizzaServidor(id_empresa) {
    console.log("ACESSEI O REGISTRO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function registroPizzaMaquina()", id_empresa);
    var instrucao = `
        select id_maquina as 'idMaquina', tipo_alerta as 'alerta' from setor join maquina on id_setor = fk_setor 
        join empresa on id_empresa = maquina.fk_empresa
        join registro on id_maquina = fk_maquina where id_empresa = ${id_empresa} and tipo = 'servidor' group by id_maquina;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function registroPizzaServidorPorSetor(id_empresa, setor) {
    console.log("ACESSEI O SETOR MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function registroPizzaServidorPorSetor()", id_empresa, setor);
    var instrucao = `
        select id_maquina as 'idMaquina', tipo_alerta as 'alerta' from setor join maquina on id_setor = fk_setor 
        join empresa on id_empresa = maquina.fk_empresa
        join registro on id_maquina = fk_maquina where id_empresa = ${id_empresa} and tipo = 'servidor' and id_setor = ${setor} group by id_maquina;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}



module.exports = {
    registroPizzaMaquina,
    registroPizzaServidor,
    registroPizzaMaquinaPorSetor,
    registroPizzaServidorPorSetor
}