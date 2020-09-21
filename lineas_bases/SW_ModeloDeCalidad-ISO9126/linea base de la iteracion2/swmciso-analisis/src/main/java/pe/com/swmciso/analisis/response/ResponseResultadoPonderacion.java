package pe.com.swmciso.analisis.response;

import java.io.Serializable;
import java.util.List;

import lombok.Getter;
import lombok.Setter;
import pe.com.swmciso.analisis.bean.PonderacionValor;

@Getter
@Setter
public class ResponseResultadoPonderacion implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private List<PonderacionValor> listapriorizada;

}
