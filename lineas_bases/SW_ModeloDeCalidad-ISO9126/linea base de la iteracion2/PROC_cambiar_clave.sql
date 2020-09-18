CREATE DEFINER=`swmciso9126`@`%` PROCEDURE `PROC_cambiar_clave`(
	IN userval VARCHAR(50),
    IN passwordval VARCHAR(100),
    IN new_passwordval VARCHAR(100),
    OUT code_rsp INT,
    OUT message_rsp VARCHAR(50)
)
BEGIN
  DECLARE flag_user INTEGER;
  DECLARE flag_pass INTEGER;
  
  SELECT COUNT(0) INTO flag_user FROM Cuenta cu WHERE cu.user = userval;
  SELECT COUNT(0) INTO flag_pass FROM Cuenta cu WHERE cu.user = userval AND cu.password = md5(passwordval);
  
  IF flag_user != 1 THEN
    SET code_rsp = 1;
    SET message_rsp = 'USUARIO NO SE ENCUENTRA REGISTRADO';
  ELSEIF flag_pass != 1 THEN
    SET code_rsp = 1;
    SET message_rsp = 'CLAVE INVALIDA';
  ELSE
    UPDATE Cuenta SET password=md5(new_passwordval) WHERE user = userval AND password = md5(passwordval);
    COMMIT;
	SET code_rsp = 0;
	SET message_rsp = 'SU CONTRASEÑA SE CAMBIO SATISFACTORIAMENTE';
  END IF;
END