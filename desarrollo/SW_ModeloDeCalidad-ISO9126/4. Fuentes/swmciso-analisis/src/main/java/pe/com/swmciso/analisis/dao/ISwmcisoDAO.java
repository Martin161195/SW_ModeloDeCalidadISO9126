package pe.com.swmciso.analisis.dao;

import pe.com.swmciso.analisis.request.RequestGuardarMatrizPareada;
import pe.com.swmciso.analisis.request.RequestGuardarPonderacionEntidad;
import pe.com.swmciso.analisis.response.ResponseGuardarMatrizPareada;
import pe.com.swmciso.analisis.response.ResponseGuardarPonderacionEntidad;
import pe.com.swmciso.analisis.response.ResponseResultadoPonderacion;

public interface ISwmcisoDAO {
	public ResponseGuardarMatrizPareada guardarMatrizPareada(RequestGuardarMatrizPareada request);
	public ResponseGuardarPonderacionEntidad guardarPonderacionEntidad(RequestGuardarPonderacionEntidad request);
	public ResponseResultadoPonderacion resultadoPonderacion(Integer idProyecto);
}
