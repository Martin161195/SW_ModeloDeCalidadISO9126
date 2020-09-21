package pe.com.swmciso.analisis.service.impl;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.com.swmciso.analisis.bean.ValorMatriz;
import pe.com.swmciso.analisis.dao.ISwmcisoDAO;
import pe.com.swmciso.analisis.request.RequestGuardarMatrizPareada;
import pe.com.swmciso.analisis.request.RequestGuardarPonderacionEntidad;
import pe.com.swmciso.analisis.request.RequestPonderacionEntidades;
import pe.com.swmciso.analisis.response.ResponseGuardarMatrizPareada;
import pe.com.swmciso.analisis.response.ResponseGuardarPonderacionEntidad;
import pe.com.swmciso.analisis.response.ResponsePonderacionEntidades;
import pe.com.swmciso.analisis.response.ResponseResultadoPonderacion;
import pe.com.swmciso.analisis.service.IAnalisisService;

@Service
public class AnalisisServiceImpl implements IAnalisisService {

	@Autowired
	private ISwmcisoDAO dao;

	@Override
	public ResponsePonderacionEntidades ponderacionEntidades(RequestPonderacionEntidades request) {
		// CREANDO RESPUESTA
		ResponsePonderacionEntidades response = new ResponsePonderacionEntidades();
		List<ResponseGuardarMatrizPareada> matrizPareadaResponseList = new ArrayList<ResponseGuardarMatrizPareada>();
		List<ResponseGuardarPonderacionEntidad> ponderacionEntidadResponseList = new ArrayList<ResponseGuardarPonderacionEntidad>();

		//ALGORITMO
		List<ValorMatriz> matriz = request.getListMatriz();
		int size = (int) Math.sqrt(matriz.size());

		BigDecimal[][] matrizPareada = new BigDecimal[size][size];
		BigDecimal[][] matrizResultado = new BigDecimal[size][size];
		BigDecimal[] vectorSuma = new BigDecimal[size];
		BigDecimal[] vectorPromedio = new BigDecimal[size];

		Map<Integer, Integer> treeMapIndex = new TreeMap<Integer, Integer>();
		Map<Integer, Integer> treeMapId = new TreeMap<Integer, Integer>();

		Collections.sort(matriz);

		for (int i = 0; i < size; i++) {
			treeMapIndex.put(i, matriz.get(i).getIdy());
			treeMapId.put(matriz.get(i).getIdy(), i);
		}

		for (ValorMatriz valor : matriz) {
			matrizPareada[treeMapId.get(valor.getIdx())][treeMapId.get(valor.getIdy())] = valor.getValor();
		}

		// PRIMER PASO
		for (int i = 0; i < size; i++) {
			BigDecimal val = new BigDecimal(0);
			for (int j = 0; j < size; j++) {
				val = val.add(matrizPareada[j][i]);
			}
			vectorSuma[i] = val;
		}

		// SEGUNDO PASO
		for (int i = 0; i < size; i++) {
			BigDecimal val = vectorSuma[i];
			for (int j = 0; j < size; j++) {
				matrizResultado[i][j] = matrizPareada[i][j].divide(val, 10, RoundingMode.CEILING);
			}
		}

		// TERCER PASO
		for (int i = 0; i < size; i++) {
			BigDecimal val = new BigDecimal(0);
			for (int j = 0; j < size; j++) {
				val=val.add(matrizPareada[i][j]);
			}
			vectorPromedio[i] = val.divide(new BigDecimal(size), 10, RoundingMode.CEILING);
		}

		for (ValorMatriz valor : matriz) {

			ResponseGuardarMatrizPareada responseMatrizPareada = new ResponseGuardarMatrizPareada();
			RequestGuardarMatrizPareada requestMatrizPareada = new RequestGuardarMatrizPareada();
			requestMatrizPareada.setIdEntidadPadre(request.getIdEntidad());
			requestMatrizPareada.setIdEntidadX(valor.getIdx());
			requestMatrizPareada.setIdEntidadY(valor.getIdy());
			requestMatrizPareada.setIdProyecto(request.getIdProyecto());
			requestMatrizPareada.setTipo(request.getTipo());
			requestMatrizPareada.setValor(valor.getValor());

			responseMatrizPareada = dao.guardarMatrizPareada(requestMatrizPareada);
			matrizPareadaResponseList.add(responseMatrizPareada);

		}

		for (int i = 0; i < size; i++) {

			ResponseGuardarPonderacionEntidad responsePonderacionEntidad = new ResponseGuardarPonderacionEntidad();
			RequestGuardarPonderacionEntidad requestPonderacionEntidad = new RequestGuardarPonderacionEntidad();


			requestPonderacionEntidad.setIdEntidad(treeMapIndex.get(i));
			requestPonderacionEntidad.setIdProyecto(request.getIdProyecto());
			requestPonderacionEntidad.setPonderacion(vectorPromedio[i]);
			requestPonderacionEntidad.setTipo(request.getTipo());
			responsePonderacionEntidad = dao.guardarPonderacionEntidad(requestPonderacionEntidad);
			ponderacionEntidadResponseList.add(responsePonderacionEntidad);
		}
		response.setMatrizPareadaResponseList(matrizPareadaResponseList);
		response.setPonderacionEntidadResponseList(ponderacionEntidadResponseList);
		return response;
	}

	@Override
	public ResponseResultadoPonderacion resultadoPonderacion(Integer idProyecto) {
		return dao.resultadoPonderacion(idProyecto);
	}

}
