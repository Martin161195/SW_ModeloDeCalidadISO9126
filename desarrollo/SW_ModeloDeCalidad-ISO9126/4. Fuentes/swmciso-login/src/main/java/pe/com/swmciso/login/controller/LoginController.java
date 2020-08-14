package pe.com.swmciso.login.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import pe.com.swmciso.login.bean.RequestCambioClaveBean;
import pe.com.swmciso.login.bean.RequestRegistroBean;
import pe.com.swmciso.login.bean.RequestValidacionBean;
import pe.com.swmciso.login.bean.ResponseLoginBean;
import pe.com.swmciso.login.bean.ResponseValidacionBean;
import pe.com.swmciso.login.service.ILoginService;

@RestController
@RequestMapping("/apiLoginSWMCISO")
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST})
public class LoginController {

	@Autowired
	private ILoginService service;
	
	@GetMapping
	public String hello() {
		return "Hello World";
	}
	
	@PostMapping
	public ResponseEntity<ResponseLoginBean> validarUsuario2(@RequestBody RequestValidacionBean request) {
		return ResponseEntity.ok(service.validarUsuario2(request));
	}
	
	@PostMapping("/validar")
	public ResponseEntity<ResponseValidacionBean> validarUsuario(@RequestBody RequestValidacionBean request) {
		return ResponseEntity.ok(service.validarUsuario(request));
	}
	
	@PostMapping("/registrar")
	public ResponseEntity<ResponseLoginBean> registrarUsuario(@RequestBody RequestRegistroBean request) {
		return ResponseEntity.ok(service.registrarUsuario(request));
	}
	
	@PostMapping("/cambiarclave")
	public ResponseEntity<ResponseLoginBean> cambiarClave(@RequestBody RequestCambioClaveBean request) {
		return ResponseEntity.ok(service.cambiarClave(request));
	}
}
