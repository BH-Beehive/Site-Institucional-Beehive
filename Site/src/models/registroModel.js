var database = require("../database/config")

function registroPizzaMaquina(id_empresa, mesAtual,diaAtual) {
    console.log("ACESSEI O REGISTRO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function registroPizzaMaquina()", id_empresa);
    var instrucao = ''
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucao = `select id_maquina as 'idMaquina', tipo_alerta as 'alerta' 
        from setor join maquina on id_setor = fk_setor 
        join empresa on id_empresa = maquina.fk_empresa
        join registro on id_maquina = fk_maquina w
        here id_empresa = ${id_empresa} and tipo = 'maquina' and format(data_registro, '%d-%M') = '${diaAtual}-${mesAtual}' 
        group by id_maquina,tipo_alerta;`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucao = `select id_maquina as 'idMaquina', tipo_alerta as 'alerta' 
        from setor join maquina on id_setor = fk_setor 
        join empresa on id_empresa = maquina.fk_empresa
        join registro on id_maquina = fk_maquina 
        where id_empresa = ${id_empresa} and tipo = 'maquina' and date_format(data_registro, '%d-%m') = '${diaAtual}-${mesAtual}' 
        group by id_maquina order by id_registro desc;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    return database.executar(instrucao);
}

function registroPizzaMaquinaPorSetor(id_empresa,setor, mesAtual,diaAtual) {
    console.log("ACESSEI O SETOR MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function registroPizzaMaquinaPorSetor()", id_empresa, setor,diaAtual,mesAtual);
    var instrucao = ''
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucao = `select id_maquina as 'idMaquina', tipo_alerta as 'alerta' 
        from setor join maquina on id_setor = fk_setor 
        join empresa on id_empresa = maquina.fk_empresa
        join registro on id_maquina = fk_maquina 
        where id_empresa = ${id_empresa} and tipo = 'maquina' and id_setor = ${setor} and format(data_registro, '%d-%M') = '${diaAtual}-${mesAtual}' 
        group by id_maquina,tipo_alerta;`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucao = `select id_maquina as 'idMaquina', tipo_alerta as 'alerta' 
        from setor join maquina on id_setor = fk_setor 
        join empresa on id_empresa = maquina.fk_empresa
        join registro on id_maquina = fk_maquina 
        where id_empresa = ${id_empresa} and tipo = 'maquina' and id_setor = ${setor} and date_format(data_registro, '%d-%m') = '${diaAtual}-${mesAtual}' 
        group by id_maquina;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    return database.executar(instrucao);
}




function registroPizzaServidor(id_empresa, mesAtual,diaAtual) {
    console.log("ACESSEI O REGISTRO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function registroPizzaMaquina()", id_empresa);
    var instrucao = ''
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucao = `select id_maquina as 'idMaquina', tipo_alerta as 'alerta' 
        from setor join maquina on id_setor = fk_setor 
        join empresa on id_empresa = maquina.fk_empresa
        join registro on id_maquina = fk_maquina w
        here id_empresa = ${id_empresa} and tipo = 'servidor' and format(data_registro, '%d-%M') = '${diaAtual}-${mesAtual}' 
        group by id_maquina,tipo_alerta;`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucao = `select id_maquina as 'idMaquina', tipo_alerta as 'alerta' 
        from setor join maquina on id_setor = fk_setor 
        join empresa on id_empresa = maquina.fk_empresa
        join registro on id_maquina = fk_maquina 
        where id_empresa = ${id_empresa} and tipo = 'servidor' and date_format(data_registro, '%d-%m') = '${diaAtual}-${mesAtual}' 
        group by id_maquina order by id_registro desc;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    return database.executar(instrucao);
}

function registroPizzaServidorPorSetor(id_empresa, setor, mesAtual,diaAtual) {
    console.log("ACESSEI O SETOR MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function registroPizzaServidorPorSetor()", id_empresa, setor);
    var instrucao = ''
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucao = `select id_maquina as 'idMaquina', tipo_alerta as 'alerta' 
        from setor join maquina on id_setor = fk_setor 
        join empresa on id_empresa = maquina.fk_empresa
        join registro on id_maquina = fk_maquina 
        where id_empresa = ${id_empresa} and tipo = 'servidor' and id_setor = ${setor} and format(data_registro, '%d-%M') = '${diaAtual}-${mesAtual}' 
        group by id_maquina,tipo_alerta;`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucao = `select id_maquina as 'idMaquina', tipo_alerta as 'alerta' 
        from setor join maquina on id_setor = fk_setor 
        join empresa on id_empresa = maquina.fk_empresa
        join registro on id_maquina = fk_maquina 
        where id_empresa = ${id_empresa} and tipo = 'servidor' and id_setor = ${setor} and date_format(data_registro, '%d-%m') = '${diaAtual}-${mesAtual}' 
        group by id_maquina;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    return database.executar(instrucao);
}



function registroGraficoLinhaTempo(hostName){
    console.log("ACESSEI O SETOR MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function registroGraficoLinhaTempo()", hostName);
    var instrucao = ''
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucao = `select top 1 FORMAT(data_registro,'hh:mm:ss') as 'data_registro',cpu_uso,memoria_uso,
        ROUND(((disco_uso*100)/disco_total),0) as 'disco_uso',tipo_alerta,memoria_total 
        from registro join maquina
        on id_maquina = fk_maquina where host_name = '${hostName}' order by id_registro desc;`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucao = `select DATE_FORMAT(data_registro,'%H:%i:%s') as data_registro,cpu_uso,memoria_uso,
        ROUND(((disco_uso*100)/disco_total),0) as "disco_uso",tipo_alerta,memoria_total 
        from registro  join maquina
        on id_maquina = fk_maquina where host_name = '${hostName}' order by id_registro desc limit 1;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    return database.executar(instrucao);
}


function historicoMensal(mesAtual,hostName,diaSelecionado){
    console.log("ACESSEI O SETOR MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function historicoMensal()",mesAtual,hostName);
    var instrucao = `
    select count(case tipo_alerta when "Vermelho" then 1 else null end) as 'qdt_vermelho', 
    count(case tipo_alerta when "amarelo" then 1 else null end) as 'qdt_amarelo' , 
    count(case tipo_alerta when "verde" then 1 else null end) as 'qdt_verde', DATE_FORMAT(data_registro,'%y/%m/%d')  as "data_registro"
                    from maquina join registro on id_maquina = fk_maquina where host_name = "${hostName}" 
                        and date_format(data_registro, '%m/%d') = "${mesAtual}/${diaSelecionado}"  group by date_format(data_registro, '%d') order by id_registro desc;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao); 
}
module.exports = {
    registroPizzaMaquina,
    registroPizzaServidor,
    registroPizzaMaquinaPorSetor,
    registroPizzaServidorPorSetor,
    registroGraficoLinhaTempo,
    historicoMensal
    
}