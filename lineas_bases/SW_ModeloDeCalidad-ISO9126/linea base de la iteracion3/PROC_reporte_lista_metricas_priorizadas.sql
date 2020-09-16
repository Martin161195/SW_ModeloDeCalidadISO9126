CREATE DEFINER=`swmciso9126`@`%` PROCEDURE `PROC_reporte_lista_metricas_priorizadas`(idProy int)
BEGIN
  SELECT c.nombre AS caracteristica,
    sc.nombre AS subcaracteristica,
    m.nombre AS metrica,
    TRUNCATE(pm.ponderado * psc.ponderacion, 10) AS peso
  FROM swmciso9126.Caracteristica c
  INNER JOIN swmciso9126.Subcaracteristica sc
    ON sc.idCaracteristica = c.idCaracteristica
  INNER JOIN swmciso9126.Metrica m
    ON m.idSubcaracteristica = sc.idSubcaracteristica
  INNER JOIN swmciso9126.PonderacionSubcaracteristica psc
    ON psc.idSubcaracteristica = sc.idSubcaracteristica
  INNER JOIN swmciso9126.PonderacionMetrica pm
    ON pm.idMetrica = m.idMetrica
  WHERE pm.idProyecto = idProy
    AND psc.idProyecto = idProy
  ORDER BY peso DESC;
END