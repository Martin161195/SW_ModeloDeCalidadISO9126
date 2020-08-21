CREATE DEFINER=`swmciso9126`@`%` PROCEDURE `PROC_listar_subcaracteristica`(idCaract int)
BEGIN
	select * from swmciso9126.Subcaracteristica where idCaracteristica = idCaract;
END