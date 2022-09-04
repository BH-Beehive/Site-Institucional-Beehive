letdatabase = require("../database/config")
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
        SELECT * FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
 async function cadastrarEmpresa(nome, cnpj, telefone, celular, email, senha, cep, estado, cidade, nomeRua) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, cnpj, telefone, celular, email, senha, cep, estado, cidade, nomeRua);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    let instrucao = `
        INSERT INTO empresa (nome_empresa, cnpj, telefone_fixo, telefone_celular, email, senha)
         VALUES ('${nome}', '${cnpj}', '${telefone}', '${celular}', '${email}', '${senha}');
    `;
    await database.executar(instrucao);
    return cadastrarEndereco(cep, estado, cidade, nomeRua)
}

    async function cadastrarEndereco(cep, estado, cidade, nomeRua){

    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", cep, estado, cidade, nomeRua);
    
    var instrucaoSelect = `
    SELECT id_empresa FROM empresa WHERE cnpj = '${cnpj}'`
    await database.executar(instrucaoSelect).then(async (empresa) => {
        var fk_empresa = Object.values(JSON.parse(JSON.stringify(empresa)))
        var id_empresa = fk_empresa[0].id_empresa
        var instrucao = `
        INSERT INTO endereco (cep, nome_rua, estado, cidade, fk_empresa) VALUES ('${cep}', '${nomeRua}', '${estado}', '${cidade}', '${id_empresa}');
        `
        return await database.executar(instrucao);
    }).catch((err) => {
        console.log(err)
    })
}


module.exports = {
    entrar,
    cadastrarEndereco,
    cadastrarEmpresa,
    listar,
};