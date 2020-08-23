package pe.com.swmciso.analisis.bean;

import java.io.Serializable;
import java.math.BigDecimal;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class PonderacionValor implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Integer prioridad;
	private String caracteristica;
	private String metrica;
	private String subcaracteristica;
	private BigDecimal peso;
}
