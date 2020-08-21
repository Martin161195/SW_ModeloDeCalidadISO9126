CREATE DEFINER=`swmciso9126`@`%` PROCEDURE `PROC_reporte_lista_metricas_priorizadas`(idProy int)
BEGIN
	select a.nombre ,b.ponderado * (select distinct ponderacion
						              from swmciso9126.PonderacionSubcaracteristica
									 where idSubcaracteristica = a.idSubcaracteristica) ponderado
      from swmciso9126.PonderacionMetrica b,
		   swmciso9126.Metrica a
     where b.idProyecto = 1
       and b.idMetrica = a.idMetrica;
END