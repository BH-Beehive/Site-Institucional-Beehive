create database berserquiz;
use berserquiz;

create table usuarios (
idUsuario int primary key auto_increment,
nome varchar(120),
email varchar(120),
senha varchar(100),
idade int);



create table pontos(
idPontos int primary key auto_increment,
qtdPontos int,
data_registro datetime default current_timestamp,
tempoDeFinalizacao int,
fkUsuario int,
foreign key (fkUsuario) references usuarios(idUsuario))
;
select * from pontos;
select * from usuarios;

select nome,qtdPontos 
from usuarios  
join pontos
on fkUsuario = idUsuario group by fkUsuario order by qtdPontos desc;