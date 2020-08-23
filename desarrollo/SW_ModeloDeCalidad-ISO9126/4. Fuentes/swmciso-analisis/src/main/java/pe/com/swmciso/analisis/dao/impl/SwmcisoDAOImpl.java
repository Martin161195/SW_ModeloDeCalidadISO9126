package pe.com.swmciso.analisis.dao.impl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import lombok.extern.slf4j.Slf4j;
import pe.com.swmciso.analisis.bean.PonderacionValor;
import pe.com.swmciso.analisis.dao.ISwmcisoDAO;
import pe.com.swmciso.analisis.request.RequestGuardarMatrizPareada;
import pe.com.swmciso.analisis.request.RequestGuardarPonderacionEntidad;
import pe.com.swmciso.analisis.response.ResponseGuardarMatrizPareada;
import pe.com.swmciso.analisis.response.ResponseGuardarPonderacionEntidad;
import pe.com.swmciso.analisis.response.ResponseResultadoPonderacion;

@Slf4j
@Transactional
@Repository
public class SwmcisoDAOImpl implements ISwmcisoDAO {

	@Autowired
	JdbcTemplate bigTConn;

	@Override
	public ResponseGuardarMatrizPareada guardarMatrizPareada(RequestGuardarMatrizPareada request) {
		ResponseGuardarMatrizPareada response = new ResponseGuardarMatrizPareada();
		String spTransporte = "PROC_guardar_matriz_pareada";
		try (Connection conn = bigTConn.getDataSource().getConnection();) {

			CallableStatement callStmt = null;
			callStmt = conn.prepareCall("{call " + spTransporte + "(?,?,?,?,?,?,?,?)}");
			callStmt.setInt(1, request.getIdProyecto());
			callStmt.setInt(2, request.getIdEntidadX());
			callStmt.setInt(3, request.getIdEntidadY());
			callStmt.setBigDecimal(4, request.getValor());
			callStmt.setString(5, request.getTipo());
			callStmt.setInt(6, request.getIdEntidadPadre());
			callStmt.registerOutParameter(7, Types.INTEGER);
			callStmt.registerOutParameter(8, Types.VARCHAR);
			callStmt.execute();

			response.setCode(callStmt.getInt(7));
			response.setMessage(callStmt.getString(8));

			log.info(response.getMessage());

			callStmt.close();
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return response;
	}

	@Override
	public ResponseGuardarPonderacionEntidad guardarPonderacionEntidad(RequestGuardarPonderacionEntidad request) {
		ResponseGuardarPonderacionEntidad response = new ResponseGuardarPonderacionEntidad();
		String spTransporte = "PROC_guardar_ponderacion_entidad";
		try (Connection conn = bigTConn.getDataSource().getConnection();) {

			CallableStatement callStmt = null;
			callStmt = conn.prepareCall("{call " + spTransporte + "(?,?,?,?,?,?)}");
			callStmt.setInt(1, request.getIdEntidad());
			callStmt.setInt(2, request.getIdProyecto());
			callStmt.setBigDecimal(3, request.getPonderacion());
			callStmt.setString(4, request.getTipo());
			callStmt.registerOutParameter(5, Types.INTEGER);
			callStmt.registerOutParameter(6, Types.VARCHAR);
			callStmt.execute();

			response.setCode(callStmt.getInt(5));
			response.setMessage(callStmt.getString(6));

			log.info(response.getMessage());

			callStmt.close();
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return response;
	}

	@Override
	public ResponseResultadoPonderacion resultadoPonderacion(Integer idProyecto) {
		ResponseResultadoPonderacion response = new ResponseResultadoPonderacion();
		List<PonderacionValor> lista = new ArrayList<PonderacionValor>();
		String spTransporte = "PROC_reporte_lista_metricas_priorizadas";
		Integer prioridad = new Integer(1);

		try (Connection conn = bigTConn.getDataSource().getConnection();) {

			CallableStatement callStmt = null;
			callStmt = conn.prepareCall("{call " + spTransporte + "(?)}");
			callStmt.setInt(1, idProyecto);
			callStmt.execute();
			
			ResultSet rs = callStmt.getResultSet();
			
			while(rs.next()) {
				PonderacionValor valor = new PonderacionValor();
				valor.setCaracteristica(rs.getString("caracteristica"));
				valor.setSubcaracteristica(rs.getString("subcaracteristica"));
				valor.setMetrica(rs.getString("metrica"));
				valor.setPeso(rs.getBigDecimal("peso"));
				valor.setPrioridad(prioridad);
				lista.add(valor);
				prioridad += 1;
			}

			callStmt.close();
			conn.close();
			
			response.setListapriorizada(lista);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return response;
	}
}
