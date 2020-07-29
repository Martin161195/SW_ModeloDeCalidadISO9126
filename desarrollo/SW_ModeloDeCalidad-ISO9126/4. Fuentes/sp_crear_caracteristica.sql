CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_crear_caracteristica`(nombreCaract varchar(100))
BEGIN
	insert into caracteristica(nombre) values (nombreCaract);
END