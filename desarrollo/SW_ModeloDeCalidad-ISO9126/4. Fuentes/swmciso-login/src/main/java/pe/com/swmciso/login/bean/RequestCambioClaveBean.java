package pe.com.swmciso.login.bean;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class RequestCambioClaveBean {
	private String user;
	private String password;
	private String newPassword;
}
