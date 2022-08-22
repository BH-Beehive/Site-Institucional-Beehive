 create database Beehive;
 use Beehive;
 
 create table usuario(
 idUsuario int auto_increment primary key,
 nome varchar (255),
 senha varchar(255),
 email varchar (255),
 telefone varchar (12),
 cnpj varchar(20),
 cep varchar (8),
 estado varchar (255), 
 cidade varchar(255),
 rua varchar (255)
 );
 
 