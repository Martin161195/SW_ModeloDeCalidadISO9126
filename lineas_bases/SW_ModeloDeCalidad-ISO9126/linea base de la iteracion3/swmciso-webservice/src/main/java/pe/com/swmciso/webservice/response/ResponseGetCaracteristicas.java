package pe.com.swmciso.webservice.response;

import java.io.Serializable;
import java.util.List;

import lombok.Getter;
import lombok.Setter;
import pe.com.swmciso.webservice.bean.Entidad;

@Getter
@Setter
public class ResponseGetCaracteristicas implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private List<Entidad> caracteristicas;

}
