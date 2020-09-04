CREATE DEFINER=`swmciso9126`@`%` PROCEDURE `PROC_listar_metrica`(idCaract int, idSubcaract int)
BEGIN
	select * from swmciso9126.Metrica where idCaracteristica = idCaract and idSubcaracteristica = idSubcaract;
END