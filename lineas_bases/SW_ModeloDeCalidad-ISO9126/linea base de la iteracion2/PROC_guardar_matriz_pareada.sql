CREATE DEFINER=`swmciso9126`@`%` PROCEDURE `PROC_guardar_matriz_pareada`(
	IN idproyecto INTEGER,
    IN identidadx INTEGER,
    IN identidady INTEGER,
    IN valor NUMERIC,
    IN tipo VARCHAR(50),
    IN identidadpadre INTEGER,
    OUT code_rsp INT,
    OUT message_rsp VARCHAR(50)
)
BEGIN
  DECLARE flag_registro INTEGER;
  
  SELECT COUNT(0) INTO flag_registro 
  FROM `swmciso9126`.`PonderacionValues`
  WHERE `PonderacionValues`.`IdProyecto` = idproyecto
  AND `PonderacionValues`.`IdX` = identidadx
  AND `PonderacionValues`.`IdY` = identidadY;


  IF flag_registro > 0 THEN
    SET code_rsp = 1;
    SET message_rsp = 'YA SE ENCUENTRA REGISTRADO';
  ELSE
    INSERT INTO `swmciso9126`.`PonderacionValues`(`IdProyecto`, `IdX`, `IdY`, `Valor`, `Tipo`, `IdEntidad`)
    VALUES(idproyecto, identidadx, identidady, valor, UPPER(tipo), identidadpadre);
    COMMIT;
    SET code_rsp = 0;
    SET message_rsp = 'REGISTRO EXITOSO';
  END IF;
  
END