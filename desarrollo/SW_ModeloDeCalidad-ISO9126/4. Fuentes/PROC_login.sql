DELIMITER //
CREATE  PROCEDURE `PROC_login`(
	IN userval VARCHAR(50),
    IN passwordval VARCHAR(50),
    OUT code_rsp INT,
    OUT message_rsp VARCHAR(50)
)
BEGIN
  declare flag int;
  
  SELECT COUNT(0) INTO flag FROM Cuenta cu WHERE cu.user = userval AND cu.password = md5(passwordval);
  
  IF flag = 1 THEN
    SET code_rsp = 0;
    SET message_rsp = 'INICIO DE SESION CORRECTO';
  ELSE
    SET code_rsp = 1;
    SET message_rsp = 'ERROR';
  END IF;
  
END
DELIMITER ;