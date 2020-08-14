package pe.com.swmciso.login.bean;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResponseValidacionBean {
	private int code;
	private String message;
	private String nombreEmpresa;
	private String nombrePersona;
}
