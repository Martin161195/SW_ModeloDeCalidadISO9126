package pe.com.swmciso.analisis.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import pe.com.swmciso.analisis.request.RequestPonderacionEntidades;
import pe.com.swmciso.analisis.response.ResponsePonderacionEntidades;
import pe.com.swmciso.analisis.service.IAnalisisService;

@RestController
@RequestMapping("/apiAnalisisSWMCISO")
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST })
public class AnalisisController {
	@Autowired
	private IAnalisisService service;

	@PostMapping("/ponderacion")
	public ResponseEntity<ResponsePonderacionEntidades> ponderacionEntidades(
			@RequestBody RequestPonderacionEntidades request) {
		return ResponseEntity.ok(service.ponderacionEntidades(request));
	}

}
