create database Beehive;
use Beehive;

create table empresa(
id_empresa int primary key auto_increment,
nome_empresa varchar(100) not null,
cnpj char(20) unique not null,
telefone_fixo varchar(9) unique not null,
telefone_celular varchar(15) unique not null,
email varchar(150) unique not null,
senha varchar(15) not null,
cep char(8) not null,
logradouro varchar(145) not null,
estado varchar(45) not null,
cidade varchar(45) not null
);

create table usuario_suporte(
id_usuariio int primary key auto_increment,
email varchar(145) unique not null,
senha varchar(145) not null,
cpf char(11) unique not null,
fk_empresa int,
foreign key (fk_empresa) references empresa(id_empresa)
);

create table maquina(
id_maquina int primary key auto_increment,
numero_registro varchar(145) not null,
fk_empresa int,
foreign key (fk_empresa) references empresa(id_empresa),
setor varchar(45),
nivel_prioridade int
)auto_increment = 100;

create table registro(
id_registro int primary key auto_increment,
data_registro timestamp not null,
valor_registrado varchar(45) not null
);

create table historico(
id_historico int primary key auto_increment,
fk_registro int,
foreign key (fk_registro) references registro(id_registro)
);









 


