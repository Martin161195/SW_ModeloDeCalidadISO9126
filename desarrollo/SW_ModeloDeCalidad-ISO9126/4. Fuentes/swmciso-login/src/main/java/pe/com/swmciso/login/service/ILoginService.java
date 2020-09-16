<<<<<<< HEAD
package pe.com.swmciso.login.service;

import pe.com.swmciso.login.bean.RequestCambioClaveBean;
import pe.com.swmciso.login.bean.RequestRegistroBean;
import pe.com.swmciso.login.bean.RequestValidacionBean;
import pe.com.swmciso.login.bean.ResponseLoginBean;
import pe.com.swmciso.login.bean.ResponseValidacionBean;

public interface ILoginService {
	public ResponseLoginBean validarUsuario2(RequestValidacionBean request);
	
	public ResponseValidacionBean validarUsuario(RequestValidacionBean request);
	
	public ResponseLoginBean registrarUsuario(RequestRegistroBean request);
	
	public ResponseLoginBean cambiarClave(RequestCambioClaveBean request);
}
=======
package pe.com.swmciso.login.service;

import pe.com.swmciso.login.bean.RequestCambioClaveBean;
import pe.com.swmciso.login.bean.RequestRegistroBean;
import pe.com.swmciso.login.bean.RequestValidacionBean;
import pe.com.swmciso.login.bean.ResponseLoginBean;
import pe.com.swmciso.login.bean.ResponseValidacionBean;

public interface ILoginService {
	public ResponseLoginBean validarUsuario2(RequestValidacionBean request);
	
	public ResponseValidacionBean validarUsuario(RequestValidacionBean request);
	
	public ResponseLoginBean registrarUsuario(RequestRegistroBean request);
	
	public ResponseLoginBean cambiarClave(RequestCambioClaveBean request);
}
>>>>>>> 55afbddd3e28e49a61abd2dec2378d958cf01ff7
