package pe.com.swmciso.analisis.request;

import java.io.Serializable;
import java.util.List;

import lombok.Getter;
import lombok.Setter;
import pe.com.swmciso.analisis.bean.ValorMatriz;

@Getter
@Setter
public class RequestPonderacionEntidades implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Integer idProyecto;
	private String tipo;
	private Integer idEntidad;
	private List<ValorMatriz> listMatriz;

}
