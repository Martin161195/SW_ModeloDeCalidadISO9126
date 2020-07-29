package pe.com.swmciso.login.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import pe.com.swmciso.login.bean.RequestLoginBean;
import pe.com.swmciso.login.bean.RequestRegisterBean;
import pe.com.swmciso.login.bean.ResponseLoginBean;
import pe.com.swmciso.login.bean.ResponseRegisterBean;
import pe.com.swmciso.login.service.ILoginService;

@RestController
@RequestMapping("apiLoginSWMCISO")
@CrossOrigin(origins = "*", methods = { RequestMethod.POST })
public class LoginController {

	@Autowired
	private ILoginService service;
	
	@PostMapping
	public ResponseEntity<ResponseLoginBean> updateCud(@RequestBody RequestLoginBean request) {
		return ResponseEntity.ok(service.actualizarCud(request));
	}

	@PostMapping
	public ResponseEntity<ResponseRegisterBean> registerUser(@RequestBody RequestRegisterBean requestRegisterBean){
		return ResponseEntity.ok(service.registerUser(requestRegisterBean));
	}
}
