package pe.com.swmciso.login.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class FrontController {
	
	@RequestMapping("/swmciso")
	public String index() {
	    return "/index.html";
	}
}
