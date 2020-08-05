package pe.com.swmciso.login.bean;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResponseLoginBean {
	private int code;
	private String message;
	private String roles;
}
