package pe.com.swmciso.analisis.response;

import java.io.Serializable;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResponsePonderacionEntidades implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private List<ResponseGuardarMatrizPareada> matrizPareadaResponseList;
	private List<ResponseGuardarPonderacionEntidad> ponderacionEntidadResponseList;

}
