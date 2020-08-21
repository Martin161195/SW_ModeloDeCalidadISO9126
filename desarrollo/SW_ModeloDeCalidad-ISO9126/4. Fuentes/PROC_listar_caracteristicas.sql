CREATE DEFINER=`swmciso9126`@`%` PROCEDURE `PROC_listar_caracteristicas`()
BEGIN
	select * from swmciso9126.Caracteristica;
END