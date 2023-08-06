drop schema if exists DomandeCalcioDB;

create schema DomandeCalcioDB;

use DomandeCalcioDB;

create table Domanda (
id int auto_increment Primary Key,
testo varchar(255) not null,
rispostaEsatta varchar(255) not null);

create table RisposteDomanda (
risposta varchar(255),
domanda int auto_increment,
foreign key (domanda) references Domanda(id),
Primary Key (risposta, domanda));

insert into Domanda (testo, rispostaEsatta) VALUES 
("Domanda 1", "Vero"),
("Domanda 2", "Falso"),
("Domanda 3", "Vero"),
("Il calcio di rigore si batte a distanza di 11m dalla porta avversaria", "Vero");

insert into RisposteDomanda values 
("Vero", 1),
("Falso", 1),
("Vero", 2),
("Falso", 2),
("Vero", 3),
("Falso", 3),
("Vero", 4),
("Falso", 4);