package pe.com.swmciso.webservice.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.com.swmciso.webservice.dao.ISwmcisoDAO;
import pe.com.swmciso.webservice.response.ResponseGetCaracteristicas;
import pe.com.swmciso.webservice.response.ResponseGetMetricas;
import pe.com.swmciso.webservice.response.ResponseGetSubcaracteristicas;
import pe.com.swmciso.webservice.service.IService;

@Service
public class ServiceImpl implements IService {

	@Autowired
	private ISwmcisoDAO dao;

	@Override
	public ResponseGetCaracteristicas getCaracteristicas() {
		return dao.getCaracteristicas();
	}

	@Override
	public ResponseGetSubcaracteristicas getSubcaracteristicas(Integer idCaracteristica) {
		return dao.getSubcaracteristicas(idCaracteristica);
	}

	@Override
	public ResponseGetMetricas getMetricas(Integer idSubcaracteristica) {
		return dao.getMetricas(idSubcaracteristica);
	}

}
