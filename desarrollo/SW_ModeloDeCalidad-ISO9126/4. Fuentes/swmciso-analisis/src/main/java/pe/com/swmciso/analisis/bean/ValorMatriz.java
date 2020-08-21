package pe.com.swmciso.analisis.bean;

import java.io.Serializable;
import java.math.BigDecimal;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ValorMatriz implements Serializable, Comparable<ValorMatriz> {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Integer idx;
	private Integer idy;
	private BigDecimal valor;

	@Override
	public int compareTo(ValorMatriz matriz) {
		if (this.getIdx() == matriz.getIdx()) {
			return this.getIdy() < matriz.getIdy() ? -1 : 1;
		}
		return this.getIdx() < matriz.getIdx() ? -1 : 1;
	}
}
