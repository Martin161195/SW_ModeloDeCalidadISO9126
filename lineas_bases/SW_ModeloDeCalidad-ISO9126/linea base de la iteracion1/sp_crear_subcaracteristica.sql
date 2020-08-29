CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_crear_subcaracteristica`(nombreSubcarac varchar(100),nombreCaract varchar(100))
BEGIN
	declare idcaract int;
    
    select idCaracteristica into idcaract from Caracteristica where nombre = nombreCaract;
    insert into Subcaracteristica(nombre,idCaracteristica) values (nombreSubcarac,idcaract);
    
END