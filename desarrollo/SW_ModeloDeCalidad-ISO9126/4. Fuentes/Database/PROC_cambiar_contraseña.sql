CREATE DEFINER=`swmciso9126`@`%` PROCEDURE `PROC_cambiar_contraseña`(
	IN userval VARCHAR(50),
    IN new_passwordval VARCHAR(100),
    OUT code_rsp INT,
    OUT message_rsp VARCHAR(50)
)
BEGIN
	IF EXISTS (SELECT 1 FROM Cuenta WHERE user=userval) then
    BEGIN
		UPDATE Cuenta set password=md5(new_passwordval) where user=userval;
		SET code_rsp = 0;
		SET message_rsp = 'SU CONTRASEÑA SE CAMBIO SATISFACTORIAMENTE';
    END;
    else
		SET code_rsp = 1;
		SET message_rsp = 'ERROR';
    END IF;
END