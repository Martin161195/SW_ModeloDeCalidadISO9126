package pe.com.swmciso.analisis.request;

import java.io.Serializable;
import java.math.BigDecimal;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class RequestGuardarPonderacionEntidad implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Integer idEntidad;
	private Integer idProyecto;
	private BigDecimal ponderacion;

}
