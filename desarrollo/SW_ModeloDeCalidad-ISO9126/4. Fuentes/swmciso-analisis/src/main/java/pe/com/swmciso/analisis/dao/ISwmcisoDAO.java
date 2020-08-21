package pe.com.swmciso.analisis.dao;

import pe.com.swmciso.analisis.request.RequestGuardarMatrizPareada;
import pe.com.swmciso.analisis.request.RequestGuardarPonderacionEntidad;
import pe.com.swmciso.analisis.response.ResponseGuardarMatrizPareada;
import pe.com.swmciso.analisis.response.ResponseGuardarPonderacionEntidad;

public interface ISwmcisoDAO {
	public ResponseGuardarMatrizPareada guardarMatrizPareada(RequestGuardarMatrizPareada request);
	public ResponseGuardarPonderacionEntidad guardarPonderacionEntidad(RequestGuardarPonderacionEntidad request);
}
