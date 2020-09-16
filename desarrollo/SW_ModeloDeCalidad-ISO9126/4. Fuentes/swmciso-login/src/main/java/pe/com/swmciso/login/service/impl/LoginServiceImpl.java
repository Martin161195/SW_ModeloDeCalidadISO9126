<<<<<<< HEAD
package pe.com.swmciso.login.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.com.swmciso.login.bean.RequestCambioClaveBean;
import pe.com.swmciso.login.bean.RequestRegistroBean;
import pe.com.swmciso.login.bean.RequestValidacionBean;
import pe.com.swmciso.login.bean.ResponseLoginBean;
import pe.com.swmciso.login.bean.ResponseValidacionBean;
import pe.com.swmciso.login.dao.ILoginDao;
import pe.com.swmciso.login.service.ILoginService;

@Service
public class LoginServiceImpl implements ILoginService {

	@Autowired
	private ILoginDao dao;

	@Override
	public ResponseLoginBean validarUsuario2(RequestValidacionBean request) {
		return dao.validarUsuario2(request);
	}

	@Override
	public ResponseLoginBean registrarUsuario(RequestRegistroBean request) {
		return dao.registrarUsuario(request);
	}

	@Override
	public ResponseValidacionBean validarUsuario(RequestValidacionBean request) {
		return dao.validarUsuario(request);
	}

	@Override
	public ResponseLoginBean cambiarClave(RequestCambioClaveBean request) {
		return dao.cambiarClave(request);
	}
}
=======
package pe.com.swmciso.login.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.com.swmciso.login.bean.RequestCambioClaveBean;
import pe.com.swmciso.login.bean.RequestRegistroBean;
import pe.com.swmciso.login.bean.RequestValidacionBean;
import pe.com.swmciso.login.bean.ResponseLoginBean;
import pe.com.swmciso.login.bean.ResponseValidacionBean;
import pe.com.swmciso.login.dao.ILoginDao;
import pe.com.swmciso.login.service.ILoginService;

@Service
public class LoginServiceImpl implements ILoginService {

	@Autowired
	private ILoginDao dao;

	@Override
	public ResponseLoginBean validarUsuario2(RequestValidacionBean request) {
		return dao.validarUsuario2(request);
	}

	@Override
	public ResponseLoginBean registrarUsuario(RequestRegistroBean request) {
		return dao.registrarUsuario(request);
	}

	@Override
	public ResponseValidacionBean validarUsuario(RequestValidacionBean request) {
		return dao.validarUsuario(request);
	}

	@Override
	public ResponseLoginBean cambiarClave(RequestCambioClaveBean request) {
		return dao.cambiarClave(request);
	}
}
>>>>>>> 55afbddd3e28e49a61abd2dec2378d958cf01ff7
