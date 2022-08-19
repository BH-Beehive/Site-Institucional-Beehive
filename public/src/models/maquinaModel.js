var database = require("../database/config")
// Querys para verificação
function listar() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT * FROM usuario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function entrar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
        SELECT * FROM usuarios WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nome, email, senha, idade) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO usuarios (nome, email, senha, idade) VALUES ('${nome}', '${email}', '${senha}',${idade});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Querys para pontuação

function enviarPontos(qtdPontos,tempoDeFinalizacao,qtdRespostasCertas,fkUsuario) {

    var instrucao = `
        INSERT INTO pontos (qtdPontos,tempoDeFinalizacao,qtdRespostasCertas,fkUsuario) VALUES ('${qtdPontos}','${tempoDeFinalizacao}','${qtdRespostasCertas}','${fkUsuario}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function calcularAcerto(fkUsuario){
    var instrucao = `
        select qtdRespostasCertas 
	        from pontos
                join usuarios 
                    on fkUsuario = idUsuario where fkUsuario =${fkUsuario} order by idPontos asc;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function selecionarTop10(){
    var instrucao = `
    select nome,max(qtdPontos) as 'maiorPontuacao' 
    from pontos 
           join usuarios
               on fkUsuario = idUsuario group by nome order by max(qtdPontos) desc limit 10;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function verHistorico(fkUsuario){
    var instrucao = `
    select qtdPontos,DATE_FORMAT(data_registro,'%d/%b/%Y  %H:%i:%s') as 'data_registro' ,tempoDeFinalizacao
	from pontos	
		join usuarios
        on fkUsuario = idUsuario where fkUsuario = ${fkUsuario} order by data_registro;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    verHistorico,
    selecionarTop10,
    calcularAcerto,
    enviarPontos,
    entrar,
    cadastrar,
    listar,
};