package pe.com.swmciso.login.service;

import pe.com.swmciso.login.bean.RequestLoginBean;
import pe.com.swmciso.login.bean.RequestRegisterBean;
import pe.com.swmciso.login.bean.ResponseLoginBean;
import pe.com.swmciso.login.bean.ResponseRegisterBean;

public interface ILoginService {
	 ResponseLoginBean actualizarCud(RequestLoginBean request);
	 ResponseRegisterBean registerUser(RequestRegisterBean requestRegisterBean);
}
