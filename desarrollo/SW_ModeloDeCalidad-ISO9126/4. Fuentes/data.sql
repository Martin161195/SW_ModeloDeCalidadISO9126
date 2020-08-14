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


insert into Metrica(idSubcaracteristica,idCaracteristica,nombre) values (9,4,'Descripcion completa de los escenarios');
insert into Metrica(idSubcaracteristica,idCaracteristica,nombre) values (9,4,'Cobertura de demostracion');
insert into Metrica(idSubcaracteristica,idCaracteristica,nombre) values (9,4,'Autodescripcion del punto de entrada');
insert into Metrica(idSubcaracteristica,idCaracteristica,nombre) values (10,4,'Completitud de la guia de usuario');
insert into Metrica(idSubcaracteristica,idCaracteristica,nombre) values (10,4,'Formularios con valores por defecto');
insert into Metrica(idSubcaracteristica,idCaracteristica,nombre) values (10,4,'Mensajes de error entendibles');
insert into Metrica(idSubcaracteristica,idCaracteristica,nombre) values (10,4,'Interfaces de usuario intuitivas');
insert into Metrica(idSubcaracteristica,idCaracteristica,nombre) values (11,4,'Consistencia operacional');
insert into Metrica(idSubcaracteristica,idCaracteristica,nombre) values (11,4,'Claridad del mensaje');
insert into Metrica(idSubcaracteristica,idCaracteristica,nombre) values (11,4,'Customizacion funcional');
insert into Metrica(idSubcaracteristica,idCaracteristica,nombre) values (11,4,'Customizacion de la interface de usuario');
insert into Metrica(idSubcaracteristica,idCaracteristica,nombre) values (11,4,'Capacidad de monitoreo');
insert into Metrica(idSubcaracteristica,idCaracteristica,nombre) values (11,4,'Capacidad de deshacer acciones');
insert into Metrica(idSubcaracteristica,idCaracteristica,nombre) values (11,4,'Categorizacion de la informacion entendible');
insert into Metrica(idSubcaracteristica,idCaracteristica,nombre) values (11,4,'Consistencia de la apariencia de las interfaces de usuario');
insert into Metrica(idSubcaracteristica,idCaracteristica,nombre) values (11,4,'Soporte de dispositivos de entrada');
insert into Metrica(idSubcaracteristica,idCaracteristica,nombre) values (12,4,'Evitar errores de operación del usuario');
insert into Metrica(idSubcaracteristica,idCaracteristica,nombre) values (12,4,'Corrección de errores de entrada de usuario');
insert into Metrica(idSubcaracteristica,idCaracteristica,nombre) values (12,4,'Recuperabilidad de errores del usuario');
insert into Metrica(idSubcaracteristica,idCaracteristica,nombre) values (13,4,'Apariencia estética de las interfaces de usuario');
insert into Metrica(idSubcaracteristica,idCaracteristica,nombre) values (14,4,'Accesibilidad para usuarios con discapacidad');
insert into Metrica(idSubcaracteristica,idCaracteristica,nombre) values (14,4,'Adecuación de los idiomas admitidos');


insert into Metrica(idSubcaracteristica,idCaracteristica,nombre) values (15,5,'Correccion de fallas');
insert into Metrica(idSubcaracteristica,idCaracteristica,nombre) values (15,5,'Tiempo medio entre fallos');
insert into Metrica(idSubcaracteristica,idCaracteristica,nombre) values (15,5,'Tasa de fallos');
insert into Metrica(idSubcaracteristica,idCaracteristica,nombre) values (15,5,'Cobertura de prueba');
insert into Metrica(idSubcaracteristica,idCaracteristica,nombre) values (16,5,'Disponibilidad del sistema');
insert into Metrica(idSubcaracteristica,idCaracteristica,nombre) values (16,5,'Tiempo de inactividad despues de un fallo');
insert into Metrica(idSubcaracteristica,idCaracteristica,nombre) values (17,5,'Evitacion de fallas');
insert into Metrica(idSubcaracteristica,idCaracteristica,nombre) values (17,5,'Redundancia de componentes');
insert into Metrica(idSubcaracteristica,idCaracteristica,nombre) values (17,5,'Tiempo de notificacion de errores');
insert into Metrica(idSubcaracteristica,idCaracteristica,nombre) values (18,5,'Tiempo medio de recuperacion');
insert into Metrica(idSubcaracteristica,idCaracteristica,nombre) values (18,5,'Integridad de los datos de respaldo');


insert into Metrica(idSubcaracteristica,idCaracteristica,nombre) values (19,6,'Control de acceso');
insert into Metrica(idSubcaracteristica,idCaracteristica,nombre) values (19,6,'Correctitud del cifrado de datos');
insert into Metrica(idSubcaracteristica,idCaracteristica,nombre) values (19,6,'Fuerza de los algoritmos criptográficos');
insert into Metrica(idSubcaracteristica,idCaracteristica,nombre) values (20,6,'Integridad de datos');
insert into Metrica(idSubcaracteristica,idCaracteristica,nombre) values (20,6,'Prevencion de la corrupcion de datos internos');
insert into Metrica(idSubcaracteristica,idCaracteristica,nombre) values (20,6,'Prevención de desbordamiento de búfer');
insert into Metrica(idSubcaracteristica,idCaracteristica,nombre) values (21,6,'Uso de firma digital');
insert into Metrica(idSubcaracteristica,idCaracteristica,nombre) values (22,6,'Integridad de la pista de auditoría del usuario');
insert into Metrica(idSubcaracteristica,idCaracteristica,nombre) values (22,6,'Retencion del log del sistema');
insert into Metrica(idSubcaracteristica,idCaracteristica,nombre) values (23,6,'Suficiencia del mecanismo de autenticación');
insert into Metrica(idSubcaracteristica,idCaracteristica,nombre) values (23,6,'Conformidad de las reglas de autenticacion');


insert into Metrica(idSubcaracteristica,idCaracteristica,nombre) values (24,7,'Acoplamiento de componentes');
insert into Metrica(idSubcaracteristica,idCaracteristica,nombre) values (24,7,'Adecuacion de la complejidad ciclomatica');
insert into Metrica(idSubcaracteristica,idCaracteristica,nombre) values (25,7,'Reusabilidad de los activos');
insert into Metrica(idSubcaracteristica,idCaracteristica,nombre) values (25,7,'Conformidad de las reglas de codificacion');
insert into Metrica(idSubcaracteristica,idCaracteristica,nombre) values (26,7,'Completitud del log del sistema');
insert into Metrica(idSubcaracteristica,idCaracteristica,nombre) values (26,7,'Efectividad de la función de diagnóstico');
insert into Metrica(idSubcaracteristica,idCaracteristica,nombre) values (26,7,'Suficiencia de la función de diagnóstico');
insert into Metrica(idSubcaracteristica,idCaracteristica,nombre) values (27,7,'Eficiencia de la modificacion');
insert into Metrica(idSubcaracteristica,idCaracteristica,nombre) values (27,7,'Correccion de la modificacion');
insert into Metrica(idSubcaracteristica,idCaracteristica,nombre) values (27,7,'Capacidad de la modificacion');
insert into Metrica(idSubcaracteristica,idCaracteristica,nombre) values (28,7,'Integridad de la función de prueba');
insert into Metrica(idSubcaracteristica,idCaracteristica,nombre) values (28,7,'Testabilidad autónoma');
insert into Metrica(idSubcaracteristica,idCaracteristica,nombre) values (28,7,'Prueba de reiniciabilidad');



insert into Metrica(idSubcaracteristica,idCaracteristica,nombre) values (29,8,'Adaptabilidad ambiental del hardware');
insert into Metrica(idSubcaracteristica,idCaracteristica,nombre) values (29,8,'Adaptabilidad ambiental del software del sistema');
insert into Metrica(idSubcaracteristica,idCaracteristica,nombre) values (29,8,'Adaptabilidad ambiental operativa');

insert into Metrica(idSubcaracteristica,idCaracteristica,nombre) values (30,8,'Eficiencia del tiempo de instalacion');
insert into Metrica(idSubcaracteristica,idCaracteristica,nombre) values (30,8,'Facilidad de instalacion');

insert into Metrica(idSubcaracteristica,idCaracteristica,nombre) values (31,8,'Similitud de uso');
insert into Metrica(idSubcaracteristica,idCaracteristica,nombre) values (31,8,'Equivalencia de calidad del producto');
insert into Metrica(idSubcaracteristica,idCaracteristica,nombre) values (31,8,'Inclusividad funcional');
insert into Metrica(idSubcaracteristica,idCaracteristica,nombre) values (31,8,'Capacidad de reutilización / importación de datos');
