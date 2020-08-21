package pe.com.swmciso.analisis.request;

import java.io.Serializable;
import java.math.BigDecimal;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class RequestGuardarMatrizPareada implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Integer idProyecto;
	private Integer idEntidadX;
	private Integer idEntidadY;
	private BigDecimal valor;
	private String tipo;
	private Integer IdEntidadPadre;

}
