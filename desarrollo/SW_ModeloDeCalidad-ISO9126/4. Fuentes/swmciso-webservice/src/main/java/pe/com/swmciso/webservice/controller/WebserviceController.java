package pe.com.swmciso.webservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import pe.com.swmciso.webservice.response.ResponseGetCaracteristicas;
import pe.com.swmciso.webservice.response.ResponseGetMetricas;
import pe.com.swmciso.webservice.response.ResponseGetSubcaracteristicas;
import pe.com.swmciso.webservice.service.IService;

@RestController
@RequestMapping("/apiwebserviceSWMCISO")
@CrossOrigin(origins = "*", methods = { RequestMethod.GET })
public class WebserviceController {

	@Autowired
	private IService service;

	@GetMapping("/getCaracteristicas")
	public ResponseEntity<ResponseGetCaracteristicas> getCaracteristicas() {
		return ResponseEntity.ok(service.getCaracteristicas());
	}

	@GetMapping("/getSubcaracteristicas")
	public ResponseEntity<ResponseGetSubcaracteristicas> getSubcaracteristicas(@RequestParam Integer idCaracteristica) {
		return ResponseEntity.ok(service.getSubcaracteristicas(idCaracteristica));
	}

	@GetMapping("/getMetricas")
	public ResponseEntity<ResponseGetMetricas> getMetricas(@RequestParam Integer idSubcaracteristica) {
		return ResponseEntity.ok(service.getMetricas(idSubcaracteristica));
	}
}
