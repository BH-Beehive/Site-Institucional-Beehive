CREATE DATABASE Beehive;
USE Beehive;

CREATE TABLE usuario(
id int primary key auto_increment,
nome varchar(120),
email varchar(120),
senha varchar(30)
);