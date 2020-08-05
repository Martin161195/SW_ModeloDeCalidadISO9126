CREATE DEFINER=`swmciso9126`@`%` PROCEDURE `PROC_crear_usuario`(
	IN userval VARCHAR(50),
    IN passwordval VARCHAR(50),
    OUT code_rsp INT,
    OUT message_rsp VARCHAR(50)
)
BEGIN
  DECLARE flag INTEGER;
  
  SELECT COUNT(0) INTO flag FROM Cuenta cu WHERE cu.user = userval;
  
  IF flag > 0 THEN
    SET code_rsp = 1;
    SET message_rsp = 'USUARIO YA SE ENCUENTRA REGISTRADO';
  ELSE
    INSERT INTO Cuenta(`user`,`password`) value(userval,md5(passwordval));
    COMMIT;
    SET code_rsp = 0;
    SET message_rsp = 'REGISTRO EXITOSO!';
  END IF;
  
END