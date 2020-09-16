CREATE DEFINER=`swmciso9126`@`%` PROCEDURE `PROC_guardar_ponderacion_entidad`(
	IN identidad INTEGER,
    IN idproyecto INTEGER,
    IN ponderacion NUMERIC,
    IN tipo VARCHAR(50),
    OUT code_rsp INT,
    OUT message_rsp VARCHAR(50)
)
BEGIN
  DECLARE flag_registro_ponderacion_caractristica INTEGER;
  DECLARE flag_registro_ponderacion_subcaractristica INTEGER;
  DECLARE flag_registro_ponderacion_metrica INTEGER;
  
  IF UPPER(tipo) = 'CARACTERISTICA' THEN
    SELECT COUNT(0) INTO flag_registro_ponderacion_caractristica
    FROM `swmciso9126`.`PonderacionCaracteristica`
    WHERE `PonderacionCaracteristica`.`idcaracteristica` = identidad
      AND `PonderacionCaracteristica`.`idProyecto` = idproyecto;
      
    IF flag_registro_ponderacion_caractristica = 0 THEN
      INSERT INTO `swmciso9126`.`PonderacionCaracteristica`(`idcaracteristica`, `idProyecto`, `ponderado`)
      VALUES(identidad, idproyecto, ponderacion);
      COMMIT;
      SET code_rsp = 0;
      SET message_rsp = 'REGISTRO EXITOSO';
	ELSE 
	  UPDATE `swmciso9126`.`PonderacionCaracteristica` SET `ponderado` = ponderacion
	  WHERE `PonderacionCaracteristica`.`idcaracteristica` = identidad
      AND `PonderacionCaracteristica`.`idProyecto` = idproyecto;

      SET code_rsp = 2;
      SET message_rsp = 'YA SE ENCUENTRA REGISTRADO & REGISTRO EXITOSO';
    END IF;
  ELSEIF UPPER(tipo) = 'SUBCARACTERISTICA' THEN
    SELECT COUNT(0) INTO flag_registro_ponderacion_subcaractristica
    FROM `swmciso9126`.`PonderacionSubcaracteristica`
	WHERE `PonderacionSubcaracteristica`.`idSubcaracteristica` = identidad
	  AND `PonderacionSubcaracteristica`.`idProyecto`= idproyecto;


    IF flag_registro_ponderacion_subcaractristica = 0 THEN
      INSERT INTO `swmciso9126`.`PonderacionSubcaracteristica`(`idSubcaracteristica`, `idProyecto`, `ponderacion`)
      VALUES(identidad, idproyecto, ponderacion);
      COMMIT;
      SET code_rsp = 0;
      SET message_rsp = 'REGISTRO EXITOSO';
	ELSE 
	  UPDATE `swmciso9126`.`PonderacionSubcaracteristica` SET `ponderacion` = ponderacion
	  WHERE `PonderacionSubcaracteristica`.`idSubcaracteristica` = identidad
	  AND `PonderacionSubcaracteristica`.`idProyecto` = idproyecto;
	  COMMIT;

      SET code_rsp = 2;
      SET message_rsp = 'YA SE ENCUENTRA REGISTRADO & REGISTRO EXITOSO';
    END IF;

  ELSEIF UPPER(tipo) = 'METRICA' THEN
    SELECT COUNT(0) INTO flag_registro_ponderacion_metrica
    FROM `swmciso9126`.`PonderacionMetrica`
    WHERE `PonderacionMetrica`.`idMetrica` = identidad
      AND `PonderacionMetrica`.`idProyecto` = idproyecto;

    IF flag_registro_ponderacion_metrica = 0 THEN
      INSERT INTO `swmciso9126`.`PonderacionMetrica`(`idMetrica`, `idProyecto`, `ponderado`)
      VALUES(identidad, idproyecto, ponderacion);
      COMMIT;
      SET code_rsp = 0;
      SET message_rsp = 'REGISTRO EXITOSO';
	ELSE 
	  UPDATE `swmciso9126`.`PonderacionMetrica` SET `ponderado` = ponderacion
	  WHERE `PonderacionMetrica`.`idMetrica` = identidad
      AND `PonderacionMetrica`.`idProyecto` = idproyecto;
      COMMIT;

      SET code_rsp = 2;
      SET message_rsp = 'YA SE ENCUENTRA REGISTRADO & REGISTRO EXITOSO';
    END IF;
  ELSE
    SET code_rsp = 1;
    SET message_rsp = 'NO PERTENECE AL TIPO';
  END IF;
END