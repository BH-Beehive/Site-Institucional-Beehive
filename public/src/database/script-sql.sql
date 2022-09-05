create database Beehive;
use Beehive;

create table empresa(
id_empresa int primary key auto_increment,
nome_empresa varchar(100) not null,
cnpj char(14) unique not null,
telefone_fixo varchar(15) unique not null,
telefone_celular varchar(15) unique not null,
email varchar(15) unique not null,
senha varchar(15) not null
);

create table endereco(
id_endereco int primary key auto_increment,
cep char(8) not null,
nome_rua varchar(145) not null,
numero_rua int not null,
estado varchar(45) not null,
cidade varchar(45) not null,
fk_empresa int,
foreign key (fk_empresa) references empresa(id_empresa)
); 

create table setor (
id_setor int primary key auto_increment,
nome_setor varchar(145) not null,
fk_empresa int,
foreign key (fk_empresa) references empresa(id_empresa)
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
patrimonio varchar(145) not null,
fk_setor int,
foreign key (fk_setor) references setor(id_setor)
)auto_increment = 100;

create table componente(
id_componente int primary key auto_increment,
nome varchar(145) not null,
fk_maquina int,
foreign key (fk_maquina) references maquina(id_maquina)
);

create table alerta(
id_alerta int primary key auto_increment,
nome_alerta varchar(45) not null
);

create table unidade_medida(
id_unidade_medida int primary key auto_increment,
tipo varchar(145)
);

create table registro(
id_registro int primary key auto_increment,
data_registro timestamp not null,
valor_registrado varchar(45) not null,
fk_componente int,
fk_alerta int,
fk_unidade_medida int,
foreign key (fk_componente) references componente(id_componente),
foreign key (fk_alerta) references alerta(id_alerta),
foreign key (fk_unidade_medida) references unidade_medida(id_unidade_medida)
);










 


