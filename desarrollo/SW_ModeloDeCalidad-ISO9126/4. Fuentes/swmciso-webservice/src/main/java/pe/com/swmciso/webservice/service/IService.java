package pe.com.swmciso.webservice.service;

import pe.com.swmciso.webservice.response.ResponseGetCaracteristicas;
import pe.com.swmciso.webservice.response.ResponseGetMetricas;
import pe.com.swmciso.webservice.response.ResponseGetSubcaracteristicas;

public interface IService {
	public ResponseGetCaracteristicas getCaracteristicas();

	public ResponseGetSubcaracteristicas getSubcaracteristicas(Integer idCaracteristica);

	public ResponseGetMetricas getMetricas(Integer idSubcaracteristica);
}
