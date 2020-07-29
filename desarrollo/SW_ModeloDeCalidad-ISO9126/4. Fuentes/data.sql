use swmciso9126;
insert into Caracteristica values (1,'Adecuacion Funcional');
insert into Caracteristica values (2,'Eficiencia de desempeño');
insert into Caracteristica values (3,'Compatibilidad');
insert into Caracteristica values (4,'Usabilidad');
insert into Caracteristica values (5,'Fiabilidad');
insert into Caracteristica values (6,'Seguridad');
insert into Caracteristica values (7,'Mantenibilidad');
insert into Caracteristica values (8,'Portabilidad');

insert into Subcaracteristica values (1,'Completitud funcional',1);
insert into Subcaracteristica values (2,'Correccion funcional',1);
insert into Subcaracteristica values (3,'Pertinencia funcional',1);

insert into Subcaracteristica values (4,'Comportamiento temporal',2);
insert into Subcaracteristica values (5,'Utilizacion de recursos',2);
insert into Subcaracteristica values (6,'Capacidad',2);

insert into Subcaracteristica values (7,'Coexistencia',3);
insert into Subcaracteristica values (8,'Interoperabilidad',3);

insert into Subcaracteristica values (9,'Inteligibilidad',4);
insert into Subcaracteristica values (10,'Aprendizaje',4);
insert into Subcaracteristica values (11,'Operabilidad',4);
insert into Subcaracteristica values (12,'Proteccion frente a errores de usuario',4);
insert into Subcaracteristica values (13,'Estetica',4);
insert into Subcaracteristica values (14,'Accesibilidad',4);

insert into Subcaracteristica values (15,'Madurez',5);
insert into Subcaracteristica values (16,'Disponibilidad',5);
insert into Subcaracteristica values (17,'Tolerancia a fallos',5);
insert into Subcaracteristica values (18,'Capacidad de recuperacion',5);

insert into Subcaracteristica values (19,'Confidencialidad',6);
insert into Subcaracteristica values (20,'Integridad',6);
insert into Subcaracteristica values (21,'No repudio',6);
insert into Subcaracteristica values (22,'Autenticidad',6);
insert into Subcaracteristica values (23,'Responsabilidad',6);

insert into Subcaracteristica values (24,'Modularidad',7);
insert into Subcaracteristica values (25,'Reusabilidad',7);
insert into Subcaracteristica values (26,'Analizabilidad',7);
insert into Subcaracteristica values (27,'Capacidad de ser modificado',7);
insert into Subcaracteristica values (28,'Capacidad de ser probado',7);

insert into Subcaracteristica values (29,'Adaptabilidad',8);
insert into Subcaracteristica values (30,'Facilidad de instalacion',8);
insert into Subcaracteristica values (31,'Capacidad de ser reemplazado',8);

insert into Metrica values (idMetrica,idSubcaracteristica,idCaracteristica,nombre);
insert into Metrica values (1,1,1,'Cobertura funcional');
insert into Metrica values (2,2,1,'Correccion funcional');
insert into Metrica values (3,3,1,'Adecuacion funcional del objetivo de uso');

insert into Metrica values (4,4,2,'Tiempo medio de respuesta');
insert into Metrica values (5,4,2,'Tiempo de respuesta adecuado');
insert into Metrica values (6,4,2,'Tiempo medio de respuesta');
insert into Metrica values (7,4,2,'Adecuacion del tiempo de respuesta');
insert into Metrica values (8,4,2,'Rendimiento medio');
insert into Metrica values (9,5,2,'Utilizacion media del procesador');
insert into Metrica values (10,5,2,'Utilizacion media de la memoria');
insert into Metrica values (11,5,2,'Utilizacion media de dispositivos de entrada y salida');
insert into Metrica values (12,5,2,'Uso de ancho de banda');
insert into Metrica values (13,6,2,'Capacidad de procesamiento de transacciones');
insert into Metrica values (14,6,2,'Capacidad de acceso del usuario');
insert into Metrica values (15,6,2,'Adecuacion del incremento de acceso de usuarios');

insert into Metrica values (16,7,3,'Coexistencia con otros productos');
insert into Metrica values (17,8,3,'Intercambiabilidad de formato de datos');
insert into Metrica values (18,8,3,'Suficiencia del protocolo de intercambio de datos');
insert into Metrica values (19,8,3,'Adecuacion de interfaz externa');


