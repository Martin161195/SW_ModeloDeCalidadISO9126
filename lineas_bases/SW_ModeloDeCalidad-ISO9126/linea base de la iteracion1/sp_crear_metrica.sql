CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_crear_metrica`(nombreMetric varchar(100),nombreCaract varchar(100),nombreSubcaract varchar(100))
BEGIN
	declare idcaract int;
    declare idsubcaract int;
    
    select idCaracteristica into idcaract from Caracteristica where nombre = nombreCaract;
    select idSubcaracteristica into idsubcaract from Subcaracteristica where nombre = nombreSubcaract;
    
    insert into Metrica (idCaracteristica,idSubcaracteristica,nombre) values (idcaract,idsubcaract,nombreMetric);
END