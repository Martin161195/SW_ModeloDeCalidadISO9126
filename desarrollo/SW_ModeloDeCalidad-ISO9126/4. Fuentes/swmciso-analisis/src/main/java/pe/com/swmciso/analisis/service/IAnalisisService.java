package pe.com.swmciso.analisis.service;

import pe.com.swmciso.analisis.request.RequestPonderacionEntidades;
import pe.com.swmciso.analisis.response.ResponsePonderacionEntidades;

public interface IAnalisisService {
	public ResponsePonderacionEntidades ponderacionEntidades(RequestPonderacionEntidades request);

}
