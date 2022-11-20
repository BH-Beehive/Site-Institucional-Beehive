create database Beehive;
use Beehive;

create table plano(
id_plano int primary key auto_increment,
tipo_plano varchar(10),
check ( tipo_plano = "Basic" or tipo_plano = "Standart" or tipo_plano = "Premium"),
valor decimal(7,2)
);

insert into plano values(null,'Basic',100.00),
(null,'Standart',200.00),
(null,'Premium',400.00);

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
cidade varchar(30) not null,
fk_plano int,
foreign key (fk_plano) references plano(id_plano),
plano_ativo boolean
);

insert into empresa values (null,"hospital albert einstein","75.565.133/0001-04","5923-6724","(84)97242-2370" ,"albert_einstein@gmail.com","albert@114","04831120","Rua Saude", "SP","São Paulo",1,true);

create table usuario_suporte(
id_usuario int primary key auto_increment,
nome_suporte varchar(45) not null,
email_slack varchar(50) unique not null,
senha varchar(50) not null,
telefone varchar(15) unique,
celular char(15) unique,
cpf char(14) unique not null,
fk_empresa int,
foreign key (fk_empresa) references empresa(id_empresa)
);
insert into usuario_suporte values (null,"Bruno Caldeira","bruno_caldeira@albert.com","bruno@321","(87)2016-3838","(79)90508-4826","772.579.371-25",1);
select * from usuario_suporte;

SELECT nome_suporte, email_slack, id_usuario FROM usuario_suporte WHERE fk_empresa = 1;

create table setor (
id_setor int primary key auto_increment,
nome_setor varchar(45),
fk_empresa int,
foreign key (fk_empresa) references empresa(id_empresa),
nivel_prioridade char(1) not null,
check (nivel_prioridade = 1 or nivel_prioridade = 2 or nivel_prioridade = 3)
);
insert into setor values (null,"Triagem",1,2),
(null,"Laboratorio",1,1);

select * from setor;
select * from maquina;
create table maquina(
id_maquina int primary key auto_increment,
host_name varchar(30) unique not null,
token_acesso varchar(15) unique not null,
token_ativo boolean not null,
tipo varchar(15) not null,
check(tipo = "Maquina" or tipo = "Servidor"),
memoria_total double,
disco_total double,
arquitetura char(3),
sistema_operacional varchar(15),
processador varchar(75),
fk_empresa int ,
foreign key (fk_empresa) references empresa(id_empresa),
fk_setor int,
foreign key (fk_setor) references setor(id_setor)
)auto_increment = 100;

select * from maquina;





 insert into maquina values (null,'633791bb8af21','491072A',true,'maquina','500000000','200000000','x64','linux','
Intel(R) Core(TM) i7-6700 CPU @ 3.40GHz',1,1);

update maquina set memoria_total = 10.0 , disco_total = 10.0 , arquitetura = 64 , sistema_operacional = "linux" , processador = "alguma" where token_acesso = "138e813kj1323";
select * from maquina;

-- select by componete por setor
-- select memoria_uso as 'uso_ram' , setor from registro join maquina on id_maquina = fk_maquina where setor = 'triagem' order by id_registro desc;
-- select cpu_uso as 'uso_cpu' , setor from registro join maquina on id_maquina = fk_maquina where setor = 'triagem' order by id_registro desc ;
-- select disco_uso as 'uso_disco' , setor from registro join maquina on id_maquina = fk_maquina where setor = 'triagem' order by id_registro desc ;

-- select by componete por maquina
-- select host_name , memoria_uso as 'uso_ram' , cpu_uso as 'uso_cpu' , disco_uso as 'uso_disco' from registro join maquina on id_maquina = fk_maquina order by id_registro desc limit 1;

create table registro(
id_registro int primary key auto_increment,
data_registro timestamp default current_timestamp not null,
fk_maquina int not null, 
foreign key (fk_maquina) references maquina(id_maquina),
memoria_uso double,
cpu_uso double,
disco_uso double,
tipo_alerta varchar(15),
check ( tipo_alerta = "VERDE" or tipo_alerta = "AMARELO" or tipo_alerta = "VERMELHO")
);

select cpu_uso , memoria_uso,disco_uso from registro join maquina on id_maquina = fk_maquina where host_name = "633791bb8af21" order by id_registro desc limit 1;
 

 insert into maquina values (null,'maq04','61072A',true,'servidor','500000000','200000000','x64','linux','
Intel(R) Core(TM) i7-6700 CPU @ 3.40GHz',1,1),
(null,'maq05','605072B',true,'maquina','500000000','200000000','x64','linux','
Intel(R) Core(TM) i7-6700 CPU @ 3.40GHz',1,2);

select * from empresa;
select * from registro order by id_registro desc;

select * from maquina;

update maquina set disco_total = 237000 where id_maquina = 107;

select count(id_maquina) as 'total_maquinas' from setor join maquina on id_setor = fk_setor 
join empresa on id_empresa = maquina.fk_empresa where id_empresa = 1 and id_setor = 1 and tipo = "maquina";

select count(id_maquina) as 'total_maquinas' from setor join maquina on id_setor = fk_setor 
join empresa on id_empresa = maquina.fk_empresa where id_empresa = 1 and id_setor = 2 and tipo = "servidor";

select count(tipo_alerta) from registro where tipo_alerta = 'AMARELO' AND tipo_alerta = 'vermelho' AND tipo_alerta = 'verde';
select count(tipo_alerta) from registro where tipo_alerta = 'vermelho';

select id_maquina , tipo_alerta, nome_setor from setor join maquina on id_setor = fk_setor 
join empresa on id_empresa = maquina.fk_empresa
join registro on id_maquina = fk_maquina where id_empresa = 1 and id_setor = 1 and tipo = "maquina" group by tipo_alerta;

select id_maquina, host_name ,tipo_alerta from registro join maquina  on id_maquina = fk_maquina group by tipo_alerta;

select id_maquina as 'idMaquina', tipo_alerta as 'alerta' from setor join maquina on id_setor = fk_setor
        join empresa on id_empresa = maquina.fk_empresa
        join registro on id_maquina = fk_maquina where id_empresa = 1 and tipo = 'maquina' group by id_maquina order by id_registro desc;
        
        
select memoria_uso from setor join maquina on id_setor = fk_setor 
join empresa on id_empresa = maquina.fk_empresa
join registro on id_maquina = fk_maquina where id_empresa = 1 and id_setor = 1 and tipo = "maquina" order by id_registro desc;

select disco_total,disco_uso,ROUND(((disco_uso*100)/disco_total),0) as "Porcetagem" from registro join maquina on id_maquina = fk_maquina;

SELECT ROUND(((disco_uso*100)/disco_total),0) as "disco",ROUND(((memoria_uso*100)/memoria_total),0) as "Ram" , cpu_uso FROM registro JOIN maquina on id_maquina = fk_maquina WHERE host_name = "633791bb8af21" order by id_registro desc limit 1;

update registro set tipo_alerta = "Vermelho" where id_registro = 5;

select count(tipo_alerta) as 'qdt_alerta',tipo_alerta,data_registro  from maquina join registro on id_maquina = fk_maquina where host_name = "633791bb8af21" and data_registro BETWEEN '2022-11-01' and '2022-11-30' group by date_format(data_registro, '%d') order by id_registro desc;
select now(); 

select * from registro order by id_registro desc;
update registro set tipo_alerta = "Vermelho" where fk_maquina = "102";
select nome_setor,tipo_alerta from empresa join setor on id_empresa = fk_empresa 
join maquina on id_setor = maquina.fk_setor join registro on id_maquina = fk_maquina where id_empresa = 1  group by nome_setor order by id_registro desc;
select * from setor;
select nome_setor as 'setor', tipo_alerta as 'alerta' from setor join maquina on id_setor = fk_setor 
        join empresa on id_empresa = maquina.fk_empresa
        join registro on id_maquina = fk_maquina where id_empresa = 1 group by tipo_alerta;
        
	select DATE_FORMAT(data_registro,'%H:%i:%s') as data_registro,cpu_uso,memoria_uso,disco_uso,disco_total from registro 
    join maquina
    on id_maquina = fk_maquina where host_name = '633791bb8af21' order by id_registro desc limit 1;
    
  select * from maquina;
  
  select ROUND(disco_uso, 0) from registro;
    
        
        select host_name , DATE_FORMAT(data_registro,'%d %M %Y %H:%i:%s') as 'data' from setor join maquina on id_setor = fk_setor 
        join empresa on id_empresa = maquina.fk_empresa
        join registro on id_maquina = fk_maquina where id_empresa = 1 and tipo = "servidor" and tipo_alerta = "vermelho" group by host_name order by id_registro  AND nivel_prioridade desc limit 1;