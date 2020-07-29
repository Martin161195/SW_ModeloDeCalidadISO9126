package pe.com.swmciso.login.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.com.swmciso.login.bean.RequestLoginBean;
import pe.com.swmciso.login.bean.RequestRegisterBean;
import pe.com.swmciso.login.bean.ResponseLoginBean;
import pe.com.swmciso.login.bean.ResponseRegisterBean;
import pe.com.swmciso.login.dao.ILoginDao;
import pe.com.swmciso.login.service.ILoginService;

@Service
public class LoginServiceImpl implements ILoginService {

	@Autowired
	private ILoginDao dao;
	
	@Override
	public ResponseLoginBean actualizarCud(RequestLoginBean request) {
		return dao.actualizarCud(request);
	}

	@Override
	public ResponseRegisterBean registerUser(RequestRegisterBean requestRegisterBean) {
		return null;
	}
}
