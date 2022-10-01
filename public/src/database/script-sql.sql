create database Beehive;
use Beehive;

create table empresa(
id_empresa int primary key auto_increment,
nome_empresa varchar(100) not null,
cnpj char(18) unique not null,
telefone_fixo varchar(15) unique not null,
telefone_celular varchar(15) unique not null,
email varchar(50) unique not null,
senha varchar(25) not null,
cep char(8) not null,
logradouro varchar(45) not null,
estado varchar(30) not null,
cidade varchar(30) not null
);


create table usuario_suporte(
id_usuario int primary key auto_increment,
nome_suporte varchar(45) not null,
email varchar(50) unique not null,
senha varchar(50) not null,
email_slack varchar(50) unique not null,
telefone varchar(15) unique,
celular char(15) unique,
cpf char(14) unique not null,
fk_empresa int,
foreign key (fk_empresa) references empresa(id_empresa)
);


create table maquina(
id_maquina int primary key auto_increment,
host_name varchar(30) not null,
fk_empresa int,
foreign key (fk_empresa) references empresa(id_empresa),
setor char(45),
nivel_prioridade char(1),
check (nivel_prioridade = 1 or nivel_prioridade = 2 or nivel_prioridade = 3)
)auto_increment = 100;

create table registro(
id_registro int primary key auto_increment,
data_registro timestamp not null,
fk_maquina int , 
foreign key (fk_maquina) references maquina(id_maquina),
cpu decimal,
ram decimal,
hd decimal
);