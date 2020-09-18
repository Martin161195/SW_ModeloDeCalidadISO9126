CREATE DEFINER=`swmciso9126`@`%` PROCEDURE `PROC_login_validar`(
	IN userval VARCHAR(50),
    IN passwordval VARCHAR(50),
    OUT code_rsp INT,
    OUT message_rsp VARCHAR(50),
    OUT nombreempresa_rsp VARCHAR(50),
    OUT nombrepersona_rsp VARCHAR(50)
)
BEGIN
  declare flag INTEGER;
  
  SELECT COUNT(0) INTO flag FROM Cuenta cu WHERE cu.user = userval AND cu.password = md5(passwordval);
  SET nombreempresa_rsp = '';
  SET nombrepersona_rsp = '';
  IF flag = 1 THEN
    SELECT cu.nombreEmpresa, cu.nombrePersona into nombreempresa_rsp, nombrepersona_rsp FROM Cuenta cu WHERE cu.user = userval AND cu.password = md5(passwordval);
    SET code_rsp = 0;
    SET message_rsp = 'INICIO DE SESION CORRECTO';
  ELSE
    SET code_rsp = 1;
    SET message_rsp = 'ERROR';
  END IF;
  
END