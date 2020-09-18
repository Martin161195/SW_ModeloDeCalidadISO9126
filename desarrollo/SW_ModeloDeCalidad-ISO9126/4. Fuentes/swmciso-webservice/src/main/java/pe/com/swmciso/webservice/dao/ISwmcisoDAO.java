package pe.com.swmciso.webservice.dao;

import pe.com.swmciso.webservice.response.ResponseGetCaracteristicas;
import pe.com.swmciso.webservice.response.ResponseGetMetricas;
import pe.com.swmciso.webservice.response.ResponseGetSubcaracteristicas;

public interface ISwmcisoDAO {
	public ResponseGetCaracteristicas getCaracteristicas();

	public ResponseGetSubcaracteristicas getSubcaracteristicas(Integer idCaracteristica);

	public ResponseGetMetricas getMetricas(Integer idSubcaracteristica);
}
