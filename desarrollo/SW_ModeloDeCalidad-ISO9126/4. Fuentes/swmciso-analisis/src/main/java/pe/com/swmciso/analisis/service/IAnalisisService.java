package pe.com.swmciso.analisis.service;

import pe.com.swmciso.analisis.request.RequestPonderacionEntidades;
import pe.com.swmciso.analisis.response.ResponsePonderacionEntidades;
import pe.com.swmciso.analisis.response.ResponseResultadoPonderacion;

public interface IAnalisisService {
	public ResponsePonderacionEntidades ponderacionEntidades(RequestPonderacionEntidades request);
	
	public ResponseResultadoPonderacion resultadoPonderacion(Integer idProyecto);

}
