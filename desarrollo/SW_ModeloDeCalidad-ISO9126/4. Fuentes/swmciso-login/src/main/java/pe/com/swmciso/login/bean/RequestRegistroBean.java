package pe.com.swmciso.login.bean;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class RequestRegistroBean {
	private String user;
	private String password;
	private String nombreEmpresa;
	private String nombrePersona;
	private String email;
}
